package com.zte.vmax.rdk.proxy

import java.sql.Connection

import com.zte.vmax.activemq.rdk.RDKActiveMQ
import com.zte.vmax.rdk.db.{RDKDataSource, DeprecatedDataBaseHelper}
import com.zte.vmax.rdk.util.RdkUtil

import scala.util.Try

/**
  * Created by 10054860 on 2016/8/19.
  */
object ProxyManager {

  var dbAccess: () => Option[Connection] = () => {
    RDKDataSource.getConnection match {
      case null => None
      case conn => Some(conn)
    }

  }

  var mqAccess: Boolean => Try[RDKActiveMQ] = RdkUtil.createActiveMQ

  var deprecatedDbAccess: () => DeprecatedDBAccessTrait = () => new DeprecatedDataBaseHelper

}
