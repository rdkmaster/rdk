package com.zte.vmax.rdk.db

import java.sql.{Connection, ResultSet, Statement}
import java.util.concurrent.ConcurrentHashMap

import com.zte.vmax.rdk.actor.Messages.DBSession
import com.zte.vmax.rdk.proxy.{DeprecatedDBAccessTrait, ProxyManager}
import com.zte.vmax.rdk.util.{Logger, RdkUtil}


 /*
 * Created by 10054860 on 2016/8/19.
 */
//@deprecated("DO NOT USE IT", "2.1")
class DeprecatedDataBaseHelper extends DeprecatedDBAccessTrait with Logger {

  case class DBContext(conn: Connection, stm: Statement, sql: String, timestamp: Long = System.currentTimeMillis())

  private val statements = new ConcurrentHashMap[ResultSet, DBContext]

  private def getConnection(session: DBSession): Option[Connection] = {
    ProxyManager.dbAccess(session)
  }

  def sql(session: DBSession, sql: String): ResultSet = {
    var statement: Statement = null
    val opConn = getConnection(session)

    if (opConn.isEmpty) {
      appLogger(session.appName).error("create RDKDataSource.getConnection() failed, connection == null")
      return null
    }
    val connection: Connection = opConn.get

    try {
      statement = connection.createStatement
    }
    catch {
      case e: Exception => {
        logger.error("create statement error", e)
        RdkUtil.safeClose(connection)
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
        RdkUtil.safeClose(statement)
        RdkUtil.safeClose(connection)
        return null
      }
    }
    statements.put(resultSet, DBContext(connection, statement, sql))
    return resultSet
  }

  def clear(session: DBSession, rs: ResultSet) {
    appLogger(session.appName).debug("clearing resultSet...statements.size=" + statements.size)
    if (rs != null) {
      val ctx: DBContext = statements.remove(rs)
      RdkUtil.safeClose(rs)
      RdkUtil.safeClose(ctx.stm)
      RdkUtil.safeClose(ctx.conn)
      appLogger(session.appName).debug(s"sql->${ctx.sql} (${System.currentTimeMillis - ctx.timestamp} ms)")
    }

  }


}


