package com.zte.vmax.rdk.actor

import akka.actor._
import akka.routing.FromConfig
import com.zte.vmax.rdk.actor.Messages.{ExportParam, UploadServiceParam, WSCallJSMethod, ServiceRequest}
import com.zte.vmax.rdk.defaults.Misc
import com.zte.vmax.rdk.util.Logger

/**
  * Created by 10054860 on 2016/7/7.
  */
class AppRouter extends Actor with Logger {
  val httpRouter = context.actorOf(FromConfig.props(Props[WorkRoutee].
    withDispatcher(Misc.routeDispatcher).
    withMailbox("akka.actor.boundedmailbox")), Misc.router)
  var msgNO = 0L

  def receive = {
    case msg: ServiceRequest =>
      printLog(msg)
      httpRouter.forward((msgNO, msg))
    case msg: WSCallJSMethod =>
      printLog(msg)
      httpRouter.forward(msg)
    case msg: UploadServiceParam =>
      printLog(msg)
      httpRouter.forward((msgNO, msg))
    case msg: ExportParam =>
      printLog(msg)
      httpRouter.forward((msgNO, msg))
    case Terminated(a) =>
      logger.error(s"Terminated:${a.path}")
  }

  def printLog(msg: AnyRef): Unit = {
    msgNO = msgNO + 1
    logger.info(s">>>>>>Request No. ${msgNO}, ${msg.toString}")
  }

}
