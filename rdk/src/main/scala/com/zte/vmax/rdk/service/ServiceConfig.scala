package com.zte.vmax.rdk.service

import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.config.Config

import scala.concurrent.duration.Duration

/**
  * Created by 10054860 on 2016/8/29.
  */
object ServiceConfig {
  val enable = Config.getBool("overload.protection.enable", true)
  val callTimeout = Config.getInt("overload.protection.callTimeout", 180)
  val maxFailures = Config.getInt("overload.protection.maxFailures", 32)
  val resetTimeout = Config.getInt("overload.protection.resetTimeout", 20)

  val requestTimeout: Int = RdkServer.system.settings.config.getString("spray.can.server.request-timeout") match {
    case "infinite" ⇒ 1800//30 min
    case x ⇒ Duration(x).toSeconds.toInt
  }

  val uploadTimeout: Int = RdkServer.system.settings.config.getString("spray.can.server.upload-timeout") match {
    case "infinite" ⇒ 1800 //30 min
    case x ⇒ Duration(x).toSeconds.toInt
  }
}
