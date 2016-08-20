package com.zte.vmax.rdk.db

import java.sql.{Connection, Statement, ResultSet}
import java.util.concurrent.ConcurrentHashMap
import com.zte.vmax.rdk.proxy.DeprecatedDBAccessTrait
import com.zte.vmax.rdk.util.Logger


/**
  * Created by 10054860 on 2016/8/19.
  */
@deprecated("DO NOT USE IT","2.1")
class DeprecatedDataBaseHelper extends DeprecatedDBAccessTrait with Logger {

  case class DBContext(conn: Connection, stm: Statement, timestamp: Long = System.currentTimeMillis())

  private val statements = new ConcurrentHashMap[ResultSet, DBContext]

  def sql(appName: String, sql: String): ResultSet = {
    var statement: Statement = null
    val connection: Connection = RDKDataSource.getConnection
    if (connection == null) {
      appLogger(appName).error("create RDKDataSource.getConnection() failed, connection == null")
      return null
    }
    try {
      statement = connection.createStatement
    }
    catch {
      case e: Exception => {
        logger.error("create statement error", e)
        safeClose(connection, "createStatement: close connection error")
        return null
      }
    }
    var resultSet: ResultSet = null
    try {
      resultSet = statement.executeQuery(sql)
    }
    catch {
      case e: Exception => {
        logger.error("exe sql error", e)
        safeClose(statement, "executeQuery: close statement error")
        safeClose(connection, "executeQuery: close connection error")
        return null
      }
    }
    statements.put(resultSet, DBContext(connection, statement))
    return resultSet
  }

  def clear(appName: String, rs: ResultSet) {
    appLogger(appName).debug("clearing resultSet...statements.size=" + statements.size)
    val ctx: DBContext = statements.remove(rs)
    safeClose(rs, "clear: close resultSet error")
    safeClose(ctx.stm, "clear: close statement error")
    safeClose(ctx.conn, "clear: close connection error")
  }

  private def safeClose(closeable: AutoCloseable, extraErrMsg: String) {
    try {
      closeable.close
    }
    catch {
      case e: Exception => {
        logger.error(extraErrMsg, e)
      }
    }
  }
}


