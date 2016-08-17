package com.zte.vmax.rdk.actor

import akka.actor.Actor
import akka.actor.Actor.Receive
import com.zte.vmax.rdk.actor.Messages.GetSequence
import com.zte.vmax.rdk.util.Logger

/**
  * Created by 10054860 on 2016/7/13.
  * 生成sequence的actor
  */
class SequenceGenActor extends Actor with Logger{
  var current: Long = 0

  override def receive: Receive = {
    case GetSequence =>
      current = current + 1
      logger.debug(s"SequenceGenActor returns $current")
      sender() ! current
  }
}
