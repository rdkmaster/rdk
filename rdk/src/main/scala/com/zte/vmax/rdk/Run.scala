package com.zte.vmax.rdk

 /*
  * Created by 10045812 on 16-3-21.
  */


import java.io.File
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

import akka.actor.{ActorRef, ActorSystem, Props}
import akka.util.Timeout
import com.typesafe.config.ConfigFactory
import com.zte.vmax.rdk.actor.{AppRouter, Async, MQRouter, WebSocketServer}
import com.zte.vmax.rdk.cache.AgingCache.AgingCacheActor
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.db.DataSource
import com.zte.vmax.rdk.service.{ExportHandler, RestHandler, UploadHandler}
import com.zte.vmax.rdk.util.{Logger, RdkUtil}
import org.apache.log4j.PropertyConfigurator
import spray.routing.{Route, SimpleRoutingApp}

import scala.collection.JavaConversions._
import scala.concurrent.duration._
import scala.util.{Failure, Success}



@edu.umd.cs.findbugs.annotations.SuppressWarnings(
  value = Array("EI_EXPOSE_REP"),
  justification = "false alarm")
//scalastyle:off  line.size.limit
object Run extends App with SimpleRoutingApp with Logger {
  implicit lazy val system = RdkServer.system
  implicit val bindingTimeout: Timeout = 10.second
  implicit lazy val dispatcher = system.dispatcher

  def start: Unit = {
    //init log4j and watch it's change every 30seconds
    PropertyConfigurator.configureAndWatch("proc/conf/log4j.properties", 30000)
    logger.info("#" * 50)
    logger.info(s"  RDK Server is bootstrapping...")
    logger.info("#" * 50)

    //config setting
    Config.setConfig("proc/conf/")

    //初始化扩展配置信息
    RdkUtil.initExtensionConfig

    //bind http 端口
    val ip = Config.get("listen.ip")
    val port = Config.getInt("listen.port")
    val wsPort = Config.getInt("listen.websocket.port", 0)
    if (wsPort != 0) {
      WebSocketServer.startWebSocket(ip, wsPort)
    }

    //init datasource
    if (!DataSource.init(Config.config)) {
      logger.error("Fail to init datasource config.")
      return
    }

    //初始化应用
    RdkUtil.initApplications

    startServer(interface = ip, port = port) {
      concatRestHandler
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
  def concatRestHandler: Route = {
    val main = new ExportHandler(system, RdkServer.appRouter).runRoute ~ new UploadHandler(system, RdkServer.appRouter).runRoute ~ new RestHandler(system, RdkServer.appRouter).runRoute
    RdkServer.addRestHandler(main)
    RdkServer.getRestHandler.reduce(_~_)
  }

  //start now
  start

}

object RdkServer {
  val akkaConfig = ConfigFactory.parseFile(new File("proc/conf/akka.conf"))
  val remoteConfig = ConfigFactory.parseFile(new File("proc/conf/remote-actor.conf"))
  val system = ActorSystem("rdk-server", akkaConfig.withFallback(ConfigFactory.load()))
  //http-rest处理路由
  val appRouter: ActorRef = system.actorOf(Props[AppRouter], "appRouter")
  //MQ 处理路由
  val mqRouter: ActorRef = system.actorOf(Props[MQRouter], "mqRouter")
  //aging cache 检查老化
  val agingActor: ActorRef = system.actorOf(Props[AgingCacheActor], "agingActor")

  //进行异步任务
  val remotesSystem = ActorSystem("rdk-server-remote", remoteConfig.withFallback(ConfigFactory.load()))

  val asyncActor: ActorRef = remotesSystem.actorOf(Props[Async], "asyncActor")

  //本RDK-server的唯一标识
  val uuid: String = UUID.randomUUID().toString

  private val restHandMap = new ConcurrentHashMap[Route, Int] {}
  //注册路由
  def addRestHandler(route: Route): Unit = {
    restHandMap.put(route, 1)
  }
  def getRestHandler: Set[Route] = restHandMap.keySet().toSet

}
//scalastyle:off  line.size.limit
