package com.zte.vmax.rdk.proxy

import java.sql.ResultSet

import com.zte.vmax.rdk.actor.Messages.DBSession

//为了兼容而保留
//@deprecated("DO NOT USE IT", "2.1")
trait DeprecatedDBAccessTrait {
  def sql(session: DBSession, sql: String): ResultSet

  def clear(session: DBSession, rs: ResultSet): Unit
}
