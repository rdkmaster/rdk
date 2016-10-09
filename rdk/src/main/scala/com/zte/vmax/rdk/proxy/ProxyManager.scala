package com.zte.vmax.rdk.proxy

import java.sql.Connection

import com.zte.vmax.activemq.rdk.RDKActiveMQ
import com.zte.vmax.rdk.actor.Messages.DBSession
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.db.{DataSource, DeprecatedDataBaseHelper}
import com.zte.vmax.rdk.util.{Logger, RdkUtil}

import scala.util.Try

/**
  * Created by 10054860 on 2016/8/19.
  */
object ProxyManager extends Logger {

  private final val DefaultDataSourcePosfix = ".defaultDataSource"
  private final val DS_Default = "db.default"

  //读取rdk.cfg中默认数据源配置
  private def getDefaultDataSource(configKey: String): Option[String] = {
    Config.get(configKey, null) match {
      case null => None
      case s: String => Some(s)
    }
  }

  var dbAccess: DBSession => Option[Connection] = session => {

    implicit val appName = session.appName
    val  opDataSource = session.opDataSource

    val dsName = opDataSource.getOrElse {
      appLogger.debug("Try to get the default datasource name setting in rdk.cfg")
      val dsNameForApp = getDefaultDataSource(appName + DefaultDataSourcePosfix)
      dsNameForApp.getOrElse {
        //rdk.cfg中没有配置默认数据源时，使用db.default
        appLogger.debug("Default datasource name absent,try to use `db.default` as default")
        //
        DS_Default
      }
    }

    appLogger.debug(s"Try to get db connection with name '${dsName}'")
    val opConn = DataSource.getDbPool(dsName).flatMap(_.getConnection)
    if (opConn == None) {
      appLogger.error(s"Failed to get db connection, please check!")
    }
    opConn

  }

  var mqAccess: Boolean => Try[RDKActiveMQ] = RdkUtil.createActiveMQ

  var deprecatedDbAccess: DeprecatedDBAccessTrait = new DeprecatedDataBaseHelper

}
