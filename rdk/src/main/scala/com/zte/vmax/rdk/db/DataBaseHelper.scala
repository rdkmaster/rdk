package com.zte.vmax.rdk.db

import java.sql.{Statement, Connection}

import akka.util.Timeout
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.actor.Messages.DataTable
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.defaults.Misc
import com.zte.vmax.rdk.proxy.DBAccessTrait
import com.zte.vmax.rdk.util.Logger

import scala.collection.mutable.ArrayBuffer
import scala.concurrent.{Await, Future}

import scala.concurrent.duration._

/**
  * Created by 10054860 on 2016/7/19.
  */
object DataBaseHelper extends DBAccessTrait with Logger {
  private val usingStandardSQL: Boolean = Config.getBool("database.StandardSQL.on", false)
  private val strictMode: Boolean = Config.getBool("database.StandardSQL.strict", false)

  //获取标准sql
  private def getStandardSql(sql: String): Option[String] = {
    usingStandardSQL match {
      case true =>
        try {
          Some(GbaseOptimizer.optimizeSql(sql))
        } catch {
          case e: Exception => {
            logger.warn("optimize sql error", e)
            strictMode match {
              case true =>
                logger.warn("sql not standard, return null in strictMode, sql=" + sql)
                None
              case false => Some(sql)
            }
          }
        }
      case false => Some(sql)
    }

  }

  //设置结果集的最大行数
  private def setMaxRows(st: Statement, maxLine: Long): Unit = {
    try {
      st.setLargeMaxRows(maxLine)
    } catch {
      //可能不支持这个调用
      case e: Throwable =>
        logger.warn(e.getMessage)
    }

  }

  /**
    * 查询数据
    *
    * @param sql     select sql语句
    * @param maxLine 返回的最大行数
    * @return
    */
  def fetch(appName: String, sql: String, maxLine: Long, nullToString: String = "null"): Option[DataTable] = {

    getConnection(appName).map(connection =>
      try {
        appLogger(appName).debug(s"begin execute:$sql,maxLine=$maxLine")
        val statement = connection.createStatement
        setMaxRows(statement, maxLine)
        val opSql = getStandardSql(sql)
        if (opSql.isEmpty) {
          return None
        }
        val rs = statement.executeQuery(opSql.get)
        val meta = rs.getMetaData
        val fieldCnt = meta.getColumnCount

        val fieldLst = 1 to fieldCnt map (i => (meta.getColumnLabel(i), meta.getColumnType(i)))
        val fieldNames = fieldLst.map(_._1).toArray
        val fieldTypes = fieldLst.map(_._2).toArray
        rs.beforeFirst()
        val dataArray = new ArrayBuffer[Array[String]]
        var i = 0L
        while (rs.next() && i < maxLine) {

          val row = 1 to fieldCnt map (i => {
            val bytes = rs.getBytes(i)
            if (bytes == null) nullToString else new String(bytes)
          })
          dataArray.append(row.toArray)
          i = i + 1
        }

        safeClose(appName, rs)
        safeClose(appName, statement)
        safeClose(appName, connection)
        Some(DataTable(fieldNames, fieldTypes, dataArray.toArray))
      }
      catch {
        case e: Throwable =>
          appLogger(appName).error("fetch data error", e)
          safeClose(appName, connection, e.getMessage)
          None

      }).flatten


  }


  /**
    * 批量查询数据库(并发查询)
    *
    * @param sqlArr  select sql数组
    * @param maxLine 每个sql返回的最大行数
    * @param timeout 超时时间（秒）
    * @return 数据表集合
    */
  def batchFetch(appName: String, sqlArr: List[String], maxLine: Long, timeout: Long): List[DataTable] = {
    if (sqlArr.isEmpty) {
      return Nil
    }
    implicit val ec = RdkServer.system.dispatchers.lookup(Misc.blocking_io_dispatcher)
    implicit val myTimeout = Timeout(timeout seconds)
    val result = sqlArr.map(sql => {
      Future {
        fetch(appName, sql, maxLine)
      }(ec)
    })

    Await.result(Future.sequence(result), myTimeout.duration).asInstanceOf[List[DataTable]]
  }

  /**
    * 执行sql语句，用于insert,update,delete或DDL操作（事务）
    *
    * @param sql 待执行的sql语句
    * @return 执行成功返回true，否则false
    */
  def executeUpdate(appName: String, sql: String): Option[Int] = {
    batchExecuteUpdate(appName, sql :: Nil).map(_ match {
      case head :: _ => head
      case Nil => 0
    })
  }


  /**
    * 批量执行sql语句，用于insert,update,delete或DDL操作（事务）
    *
    * @param sqlArr 待执行的sql语句数组
    * @return 全部执行执行成功返回int列表，其中每个元素即为相应的sql执行结果，否则None
    */
  def batchExecuteUpdate(appName: String, sqlArr: List[String]): Option[List[Int]] = {
    getConnection(appName).map(connection =>
      try {
        appLogger(appName).info(sqlArr mkString)
        connection.setAutoCommit(false)
        val statement = connection.createStatement()
        val result = sqlArr.map(sql => statement.executeUpdate(sql))
        connection.commit()
        safeClose(appName, statement)
        safeClose(appName, connection)
        result.toList
      }
      catch {
        case e: Throwable =>
          appLogger(appName).error(e.getMessage)
          connection.rollback()
          safeClose(appName, connection)
          Nil
      })

  }

  private def getConnection(appName: String): Option[Connection] = {
    val connection: Connection = RDKDataSource.getConnection
    if (connection == null) {
      appLogger(appName).error("create RDKDataSource.getConnection() failed.")
      None
    } else {
      Some(connection)
    }
  }

  private def safeClose(appName: String, closeable: AutoCloseable, extraErrMsg: String = ""): Unit = {
    try {
      closeable.close
    }
    catch {
      case e: Exception => {
        appLogger(appName).error(extraErrMsg, e)
      }
    }
  }

}
