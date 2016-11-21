package com.zte.vmax.rdk

/**
  * Created by 10045812 on 16-3-21.
  */


import java.io.File
import java.util.UUID

import akka.actor.{ActorRef, ActorSystem, Props}

import akka.util.Timeout
import com.typesafe.config.ConfigFactory
import com.zte.vmax.rdk.actor.{WebSocketServer, AppRouter, MQRouter}
import com.zte.vmax.rdk.cache.AgingCache.AgingCacheActor
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.db.DataSource
import com.zte.vmax.rdk.service.RestHandler
import com.zte.vmax.rdk.util.{Logger, RdkUtil}


import org.apache.log4j.PropertyConfigurator

import spray.routing.SimpleRoutingApp

import scala.concurrent.duration._
import scala.util.{Failure, Success}


object Run extends App with SimpleRoutingApp with Logger {
  implicit lazy val system = RdkServer.system
  implicit val bindingTimeout: Timeout = 10.second
  implicit lazy val dispatcher = system.dispatcher

  def start: Unit = {
    //init log4j and watch it's change every 30seconds
    PropertyConfigurator.configureAndWatch("proc/conf/log4j.properties", 30000)

    //config setting
    Config.setConfig("proc/conf/")

    //init datasource
    if (false == DataSource.init(Config.config )) {
      logger.error("Fail to init datasource config.")
      return
    }

    //bind http 端口
    val ip = Config.get("listen.ip")
    val port = Config.getInt("listen.port")
    val wsPort = Config.getInt("listen.websocket.port", 0)
    if (wsPort != 0) {
      WebSocketServer.startWebSocket(ip, wsPort)
    }
    //初始化应用
    RdkUtil.initApplications

    startServer(interface = ip, port = port) {
      new RestHandler(system, RdkServer.appRouter).runRoute
    } onComplete {
      case Success(x) =>
        logger.info("#" * 50)
        logger.info(s"  RDK Server is running on ${ip}:${port} ...")
        logger.info("#" * 50)
      case Failure(ex) =>
        logger.error(s"!!! RDK Server starts failed. ${ex}")
        system.shutdown()
    }
  }

  //start now
  start

}

object RdkServer {
  val akkaConfig = ConfigFactory.parseFile(new File("proc/conf/akka.conf"))
  val system = ActorSystem("rdk-server", akkaConfig.withFallback(ConfigFactory.load()))
  //http-rest处理路由
  val appRouter: ActorRef = system.actorOf(Props[AppRouter], "appRouter")
  //MQ 处理路由
  val mqRouter: ActorRef = system.actorOf(Props[MQRouter], "mqRouter")
  //aging cache 检查老化
  val agingActor:ActorRef =system.actorOf(Props[AgingCacheActor], "agingActor")
  //本RDK-server的唯一标识
  val uuid: String = UUID.randomUUID().toString

}
