package com.zte.vmax.rdk.actor

import akka.actor._
import akka.routing.FromConfig
import com.zte.vmax.rdk.actor.Messages.{MemoryOverrunRestore, MemoryOverrunAlarm, WSCallJSMethod, ServiceRequest}
import com.zte.vmax.rdk.defaults.Misc
import com.zte.vmax.rdk.util.Logger

/**
  * Created by 10054860 on 2016/7/7.
  */
class AppRouter extends Actor with Logger {
  val httpRouter = context.actorOf(FromConfig.props(Props[WorkRoutee].withDispatcher(Misc.routeDispatcher)), Misc.router)
  var msgCount = 0L

  def receive = {
    case MemoryOverrunAlarm =>
      logger.error(s"Memory Overrun Alarm, service offline...")
      context.become({
        case MemoryOverrunRestore =>
          logger.error(s"Memory Overrun Restore,service online...")
          context.unbecome()
        case msg:ServiceRequest =>
          sender() ! "Memory is overrun,please try later"
        case msg: WSCallJSMethod =>
          sender() ! "Memory is overrun,please try later"

      })
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
