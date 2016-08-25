package com.zte.vmax.rdk.proxy

import java.sql.ResultSet

//为了兼容而保留
@deprecated("DO NOT USE IT", "2.1")
trait DeprecatedDBAccessTrait {
  def sql(appName: String, sql: String): ResultSet

  def clear(appName: String, rs: ResultSet):Unit
}
