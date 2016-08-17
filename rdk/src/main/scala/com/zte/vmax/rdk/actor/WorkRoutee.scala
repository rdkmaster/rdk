package com.zte.vmax.rdk.actor

import akka.actor.Actor
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.env.Runtime
import com.zte.vmax.rdk.util.{Logger, RdkUtil}


/**
  * Created by 10054860 on 2016/7/7.
  */
class WorkRoutee extends Actor with Logger {

  lazy val runtime: Runtime = Runtime.newInstance

  override def receive: Receive = {
    case ServiceRequest(ctx, script, app, param, method) =>
      val result = RdkUtil.handleJsRequest(runtime, ctx, script, app, param, method)
      if (sender != context.system.deadLetters) {
        sender ! result
      }
    case WSCallJSMethod(head,body) =>
      val result = RdkUtil.handleJsRequest(runtime, NoneContext, body.script, body.app, body.param,body.method)
      sender ! WSResponse(head,result)


  }
}
