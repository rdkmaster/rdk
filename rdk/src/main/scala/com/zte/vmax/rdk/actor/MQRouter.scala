package com.zte.vmax.rdk.actor

import akka.actor._
import akka.routing.FromConfig
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.defaults.Misc
import com.zte.vmax.rdk.util.Logger

 /*
  * Created by 10054860 on 2016/7/7.
  */
class MQRouter extends Actor with Logger {
  val p2pRouter = context.actorOf(FromConfig.props(Props[P2PMQActor].withDispatcher(Misc.active_mq_dispatcher)), Misc.p2p_router)
  val subscribeRouter = context.actorOf(FromConfig.props(Props[SubscribeMQActor].withDispatcher(Misc.active_mq_dispatcher)), Misc.subscribe_router)

  def receive = {
    case x@(_: MQ_P2P | _: MQ_Rpc | _: MQ_Reply | _: MQ_BroadCast) => p2pRouter.forward(x)
    case x@(_: MQ_Subscribe | _: MQ_UnSubscribe) => subscribeRouter.forward(x)
    case Terminated(a) =>
      logger.error(s"Terminated:${a.path}")
  }

}
