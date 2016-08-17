package com.zte.vmax.rdk.actor

import akka.actor._
import akka.routing.FromConfig
import com.zte.vmax.rdk.actor.Messages.{WSCallJSMethod, ServiceRequest}
import com.zte.vmax.rdk.defaults.Misc
import com.zte.vmax.rdk.util.Logger

/**
  * Created by 10054860 on 2016/7/7.
  */
class AppRouter extends Actor with Logger {
  val httpRouter = context.actorOf(FromConfig.props(Props[WorkRoutee].withDispatcher(Misc.routeDispatcher)), Misc.router)
  var msgCount = 0L

  def receive = {
    case msg: ServiceRequest =>
      printLog(msg)
      httpRouter.forward(msg)
    case msg :WSCallJSMethod =>
      printLog(msg)
      httpRouter.forward(msg)
    case Terminated(a) =>
      logger.error(s"Terminated:${a.path}")
  }

  def printLog(msg:AnyRef): Unit ={
    msgCount = msgCount + 1
    logger.debug(s">>>>>>Request No. ${msgCount}, ${msg.toString}")
  }

}
