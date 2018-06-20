package com.zte.vmax.rdk.db

import java.sql.Types._
import java.sql.{Connection, ResultSet}

import akka.util.Timeout
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.actor.Messages.{DBSession, DataTable}
import com.zte.vmax.rdk.defaults.Misc
import com.zte.vmax.rdk.proxy.ProxyManager
import com.zte.vmax.rdk.util.{Logger, RdkUtil}
import jdk.nashorn.api.scripting.ScriptObjectMirror

import scala.collection.mutable.ArrayBuffer
import scala.concurrent.duration._
import scala.concurrent.{Await, Future}

 /*
  * Created by 10054860 on 2016/7/19.
  */
object DataBaseHelper extends Logger {
  case class DBError(error: String)

  var createJavascriptObject: ScriptObjectMirror = _

  /**
    * 原来的接口，目前已知pluto在用
    *
    * @param session
    * @param sql
    * @param maxLine
    * @param nullToString
    * @return
    */
  def fetch(session: DBSession, sql: String, maxLine: Long, nullToString: String = "null"): Option[AnyRef] = {
    getConnection(session).flatMap(connection =>
      try {
        val currentTime = System.currentTimeMillis()
        val statement = connection.createStatement
        val opSql = RdkUtil.getVSql(session, sql)
        if (opSql.isEmpty) {
          return None
        }
        val rs = statement.executeQuery(opSql.get)
        val meta = rs.getMetaData
        val fieldCnt = meta.getColumnCount

        val fieldLst = 1 to fieldCnt map (i => (meta.getColumnLabel(i), meta.getColumnType(i)))
        val fieldNames = fieldLst.map(_._1).toArray
        val fieldTypes = fieldLst.map(_._2).toArray
        val dataArray = new ArrayBuffer[Array[String]]
        var i = 0L
        while (rs.next() && i < maxLine) {
          dataArray.append(getRowValue(rs, fieldCnt, fieldTypes, nullToString))
          i = i + 1
        }

        RdkUtil.safeClose(rs)
        RdkUtil.safeClose(statement)
        RdkUtil.safeClose(connection)
        appLogger(session.appName).debug(s"fetch->$sql (${System.currentTimeMillis - currentTime} ms)")
        Some(DataTable(fieldNames, fieldTypes, dataArray.toArray))
      }
      catch {
        case e: Throwable =>
          appLogger(session.appName).error("fetch data error", e)
          RdkUtil.safeClose(connection)
          Some(DBError(e.toString))
      })
  }

  /**
    * runtime中使用这个接口查询数据，返回js对象给runtime
    *
    * @param session
    * @param sql
    * @param maxLine
    * @param nullToString
    * @return
    */
  def fetchV2(session: DBSession, sql: String, maxLine: Long, nullToString: String): ScriptObjectMirror = {
    val result = createJavascriptObject.call(null, "DataTable").asInstanceOf[ScriptObjectMirror]
    getConnection(session).map(connection =>
      try {
        val currentTime = System.currentTimeMillis()
        val statement = connection.createStatement
        val opSql = RdkUtil.getVSql(session, sql)
        if (opSql.isEmpty) {
          return result
        }
        val rs = statement.executeQuery(opSql.get)
        val meta = rs.getMetaData
        val fieldCnt = meta.getColumnCount
        val field = result.getMember("field").asInstanceOf[ScriptObjectMirror]
        val header = result.getMember("header").asInstanceOf[ScriptObjectMirror]

        val fieldTypes = new Array[Int](fieldCnt)
        for (i <- 1 to fieldCnt) {
          field.callMember("push", meta.getColumnLabel(i))
          header.callMember("push", meta.getColumnLabel(i))
          fieldTypes.update(i-1, meta.getColumnType(i))
        }

        var i = 0L
        while (rs.next() && i < maxLine) {
          val row = createJavascriptObject.call(null, "array").asInstanceOf[ScriptObjectMirror]
          result.getMember("data").asInstanceOf[ScriptObjectMirror].callMember("push", row)
          getRowValue(rs, fieldCnt, fieldTypes, nullToString).foreach(item => row.callMember("push", item))
          i = i + 1
        }

        RdkUtil.safeClose(rs)
        RdkUtil.safeClose(statement)
        RdkUtil.safeClose(connection)
        appLogger(session.appName).debug(s"fetch->$sql (${System.currentTimeMillis - currentTime} ms)")
        result
      }
      catch {
        case e: Throwable =>
          appLogger(session.appName).error("fetch data error", e)
          RdkUtil.safeClose(connection)
          result.setMember("error", e.toString)
          result
      })
    result
  }

  private def getRowValue(rs: ResultSet, fieldCnt: Int, fieldTypes: Array[Int], nullToString: String): Array[String] = {
    val row = 1 to fieldCnt map (i => {
      if (rs.getObject(i) != null) {
        fieldTypes(i - 1) match {
          case INTEGER => rs.getInt(i)
          case BIGINT => rs.getLong(i)
          case NUMERIC | DECIMAL => rs.getBigDecimal(i)
          case CHAR => rs.getString(i)
          case VARCHAR | LONGVARCHAR => rs.getString(i)
          case TIMESTAMP => rs.getTimestamp(i)
          case DOUBLE => rs.getDouble(i)
          case BIT | BOOLEAN => rs.getBoolean(i)
          case TINYINT => rs.getByte(i)
          case SMALLINT => rs.getShort(i)
          case FLOAT | REAL => rs.getFloat(i)
          case DATE => rs.getDate(i)
          case TIME => rs.getTime(i)
          case BINARY | VARBINARY | LONGVARBINARY | JAVA_OBJECT | OTHER | STRUCT => rs.getBytes(i)
          case NULL | DISTINCT => null
          case ARRAY => rs.getArray(i)
          case BLOB => rs.getBlob(i)
          case CLOB => rs.getClob(i)
          case ROWID => rs.getRowId(i)
          case NCHAR | NVARCHAR | LONGNVARCHAR => rs.getNString(i)
          case NCLOB => rs.getNClob(i)
          case SQLXML => rs.getSQLXML(i)
          case _ => null
        }
      } else null
    })
    row.map(it => if (it == null) nullToString else it.toString).toArray
  }

  /**
    * 原来的接口，目前已知pluto在用
    *
    * @param session
    * @param sqlArr
    * @param maxLine
    * @param timeout
    * @return
    */
  def batchFetch(session: DBSession, sqlArr: List[String], maxLine: Long, timeout: Long): List[Option[AnyRef]] = {
    if (sqlArr.isEmpty) {
      return Nil
    }
    val currentTime = System.currentTimeMillis()

    implicit val ec = RdkServer.system.dispatchers.lookup(Misc.blocking_io_dispatcher)
    implicit val myTimeout = Timeout(timeout seconds)
    val result = sqlArr.map(sql => {
      Future {
        fetch(session, sql, maxLine)
      }(ec)
    })

    val value = Await.result(Future.sequence(result), myTimeout.duration)
    appLogger(session.appName).debug(s"batchFetch->${sqlArr mkString} (${System.currentTimeMillis - currentTime} ms)")
    value
  }

   /*
    * 批量查询数据库(并发查询)
    *
    * @param sqlArr  select sql数组
    * @param maxLine 每个sql返回的最大行数
    * @param timeout 超时时间（秒）
    * @return 数据表集合
    */
  def batchFetchV2(session: DBSession, sqlArr: List[String], maxLine: Long, timeout: Long): ScriptObjectMirror = {
    val resultArray = createJavascriptObject.call(null, "array").asInstanceOf[ScriptObjectMirror]
    if (sqlArr.isEmpty) {
      return resultArray
    }
    val currentTime = System.currentTimeMillis()

    implicit val ec = RdkServer.system.dispatchers.lookup(Misc.blocking_io_dispatcher)
    implicit val myTimeout = Timeout(timeout seconds)
    val futureResult = sqlArr.map(sql => {
      Future {
        fetchV2(session, sql, maxLine, "null")
      }(ec)
    })

    val futureResults = Await.result(Future.sequence(futureResult), myTimeout.duration)
    futureResults.foreach(r => resultArray.callMember("push", r))
    appLogger(session.appName).debug(s"batchFetch->${sqlArr mkString} (${System.currentTimeMillis - currentTime} ms)")
    resultArray
  }

   /*
    * 执行sql语句，用于insert,update,delete或DDL操作（事务）
    *
    * @param sql 待执行的sql语句
    * @return 执行成功返回true，否则false
    */
  def executeUpdate(session: DBSession, sql: String): Option[Any] = {
    batchExecuteUpdate(session, sql :: Nil).map(_.head)
  }


   /*
    * 批量执行sql语句，用于insert,update,delete或DDL操作（事务）
    *
    * @param sqlArr 待执行的sql语句数组
    * @return 全部执行执行成功返回int列表，其中每个元素即为相应的sql执行结果，否则None
    */
  def batchExecuteUpdate(session: DBSession, sqlArr: List[String]): Option[List[Any]] = {
    getConnection(session).map(connection =>
      try {
        val currentTime = System.currentTimeMillis()
        connection.setAutoCommit(false)
        val statement = connection.createStatement()
        val result = sqlArr.map(sql => statement.executeUpdate(sql))
        connection.commit()
        RdkUtil.safeClose(statement)
        RdkUtil.safeClose(connection)
        appLogger(session.appName).debug(s"ExecuteUpdate->${sqlArr mkString} (${System.currentTimeMillis - currentTime} ms)")
        result.toList
      }
      catch {
        case e: Throwable =>
          appLogger(session.appName).error(e.getMessage)
          connection.rollback()
          RdkUtil.safeClose(connection)
          List(DBError(e.toString))
      })

  }

  private def getConnection(session: DBSession): Option[Connection] = {
    val opConn = ProxyManager.dbAccess(session)
    if (opConn.isEmpty) {
      appLogger(session.appName).error("create RDKDataSource.getConnection() failed.")
    }
    opConn
  }

}
