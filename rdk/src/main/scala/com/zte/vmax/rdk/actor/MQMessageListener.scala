package com.zte.vmax.rdk.actor

import javax.jms.{Message, MessageListener}

import akka.actor.ActorRef
import com.zte.vmax.activemq.rdk.{RDKMessage}
import com.zte.vmax.rdk.actor.Messages.RDKTopicMessageNotify
import com.zte.vmax.rdk.util.Logger

 /*
  * Created by 10054860 on 2016/7/12.
  */
class MQMessageListener(actorRef: ActorRef, topic: String) extends Logger with MessageListener {
  override def onMessage(message: Message): Unit = {
    message match {
      case msg: RDKMessage =>
        logger.info(s"onMessage: topic=${topic},msg=${msg.toString}")
        actorRef ! RDKTopicMessageNotify(topic, msg)
      case x: Any =>
        logger.info(s"receive Unknown message ${x}")
    }
  }
}
