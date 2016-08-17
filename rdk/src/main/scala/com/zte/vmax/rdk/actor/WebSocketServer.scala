package com.zte.vmax.rdk.actor

import java.net.InetSocketAddress

import akka.actor._
import akka.io.IO
import akka.pattern.ask
import akka.util.Timeout
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.util.{Logger, RdkUtil}
import com.zte.vmax.rdk.websock.RequestParser
import spray.can.server.UHttp
import spray.can.websocket.FrameCommandFailed
import spray.can.websocket.frame.{BinaryFrame, PingFrame, TextFrame}
import spray.can.{Http, websocket}
import spray.http.HttpRequest
import spray.routing.{HttpServiceActor, Rejected}

import scala.concurrent.Await
import scala.concurrent.duration._


object WebSocketServer extends Logger {

  private[WebSocketServer] case object Ping
  private[WebSocketServer] case object StartPing
  /**
    * Created by 10054860 on 2016/8/10.
    */
  class WebSocketServer extends Actor {

    def receive = {
      // when a new connection comes in we register a WebSocketConnection actor as the per connection handler
      case Http.Connected(remoteAddress, localAddress) =>
        logger.info("Connection comes from : {}", remoteAddress)
        val serverConnection = sender()
        val conn = context.actorOf(Props(classOf[WebSocketWorker], serverConnection, remoteAddress))
        conn ! StartPing
        serverConnection ! Http.Register(conn)
    }

  }

  class WebSocketWorker(val serverConnection: ActorRef, val remoteAddress: InetSocketAddress) extends HttpServiceActor
    with websocket.WebSocketServerWorker {
    override def receive = noneBusinessRoute orElse handshaking orElse closeLogic

    implicit def obj2TextFrame(obj: AnyRef): TextFrame = TextFrame(RdkUtil.toJsonString(obj))
    import context._


    //订阅的主题集合
    var topicMap: Map[String, String] = Map()
    var pinger : Option[Cancellable] = None
    val pingInterval = 10

    private def ping() : Unit = pinger match {
      case None => // nothing to do
      case Some(timer) =>
        if (!timer.isCancelled) timer.cancel
        pinger = Some(context.system.scheduler.scheduleOnce(pingInterval seconds, self, Ping))
    }

    private def noneBusinessRoute : Receive = {
      case req : HttpRequest =>handshaking(req)
      case StartPing =>
        pinger = Some(context.system.scheduler.scheduleOnce(pingInterval seconds, self, Ping))

      case Rejected(rejections) =>
        logger.info("Rejecting with {}", rejections)
        context stop self
    }

   override def closeLogic: Receive = {
      case ev: Http.ConnectionClosed =>
        pinger.map(it=>it.cancel())
        context.stop(self)
        logger.info("Connection closed on event: {}", ev)
    }
    def businessLogic: Receive = {

      case Ping =>
        send(PingFrame())
        ping
      //do nothing
      case BinaryFrame(msg) =>

      //客户端请求
      case TextFrame(msg) =>
        val json = msg.utf8String
        logger.info(json)
        RequestParser.parse(json).map(self ! _)

      //javascript 方法调用
      case m: WSCallJSMethod => RdkServer.appRouter ! m
      //主题订阅
      case WSSubscribe(_, body) => body.topic.foreach(it => topicMap = topicMap + (it -> it))

      //主题取消订阅
      case WSUnSubscribe(_, body) => body.topic.foreach(it => topicMap = topicMap - it)

      //客户端应答
      case response: WSResponse => send(response)

      //推送消息
      case s: WSBroadcast =>
        topicMap.get(s.topic).map(_ => send(s))

      case x: FrameCommandFailed =>
        logger.error("frame command failed", x)

    }


  }

  /**
    * 向所有客户端广播消息
    *
    * @param message
    * @param system
    */
  def broadcast(message: WSBroadcast)(implicit system: ActorSystem = RdkServer.system): Unit = {
    system.actorSelection("/user/RDK-WebSocket/*") ! message
  }

  /**
    * 启动WebSocket
    *
    * @param ip   主机
    * @param port 端口
    * @param system
    */
  def startWebSocket(ip: String, port: Int)(implicit system: ActorSystem): Unit = {
    implicit val bindingTimeout: Timeout = 10.second
    val server = system.actorOf(Props[WebSocketServer], "RDK-WebSocket")

    val future = IO(UHttp) ? Http.Bind(server, ip, port)
    // Since the UTttp extension extends from Http extension,
    // it starts an actor whose name will later collide with the Http extension.
    system.actorSelection("/user/IO-HTTP") ! PoisonPill
    //wait it finish
    Await.result(future, bindingTimeout.duration) match {
      case ex: Exception =>
        logger.error(s"!!! WebSocket Server starts failed. ${ex}")
      case band =>
        logger.info("-*-*-" * 10)
        logger.info(s"  WebSocket Server is running on ${ip}:${port}")
        logger.info("-*-*-" * 10)
    }

  }
}
