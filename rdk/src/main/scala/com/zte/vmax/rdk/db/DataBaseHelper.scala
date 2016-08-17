package com.zte.vmax.rdk.db

import java.sql.Connection

import akka.util.Timeout
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.actor.Messages.DataTable
import com.zte.vmax.rdk.defaults.Misc
import com.zte.vmax.rdk.util.Logger

import scala.collection.mutable.ArrayBuffer
import scala.concurrent.{Await, Future}

import scala.concurrent.duration._

/**
  * Created by 10054860 on 2016/7/19.
  */
object DataBaseHelper extends Logger {

  /**
    * 查询数据
    *
    * @param sql     select sql语句
    * @param maxLine 返回的最大行数
    * @return
    */
  def fetch(appName:String,sql: String, maxLine: Long, nullToString: String = "null"): Option[DataTable] = {

    val connection: Connection = RDKDataSource.getConnection
    if (connection == null) {
      appLogger(appName).error("create RDKDataSource.getConnection() failed.")
      return None
    }
    try {
      appLogger(appName).debug(s"begin execute:$sql,maxLine=$maxLine")
      val statement = connection.createStatement
      val rs = statement.executeQuery(sql)
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

      safeClose(appName,rs)
      safeClose(appName,statement)
      safeClose(appName,connection)
      return Some(DataTable(fieldNames, fieldTypes, dataArray.toArray))
    }
    catch {
      case e: Exception => {
        appLogger(appName).error("fetch data error", e)
        safeClose(appName,connection, e.getMessage)
      }
    }
    return None

  }


  /**
    * 批量查询数据库(并发查询)
    *
    * @param sqlArr  select sql数组
    * @param maxLine 每个sql返回的最大行数
    * @param timeout 超时时间（秒）
    * @return 数据表集合
    */
  def batchFetch(appName:String,sqlArr: List[String], maxLine: Long, timeout: Long): List[DataTable] = {
    if (sqlArr.isEmpty) {
      return Nil
    }
    implicit val ec = RdkServer.system.dispatchers.lookup(Misc.blocking_io_dispatcher)
    implicit val myTimeout = Timeout(timeout seconds)
    val result = sqlArr.map(sql => {
      Future {
        fetch(appName,sql, maxLine)
      }(ec)
    })

    Await.result(Future.sequence(result), myTimeout.duration).asInstanceOf[List[DataTable]]
  }

  private def safeClose(appName:String,closeable: AutoCloseable, extraErrMsg: String = ""): Unit = {
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
