package com.zte.vmax.rdk.actor

import javax.jms.TextMessage

import akka.actor.Actor
import com.zte.vmax.activemq.ActiveMQ
import com.zte.vmax.activemq.rdk.RDKActiveMQ
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.mq.MQCreator
import com.zte.vmax.rdk.proxy.ProxyManager
import com.zte.vmax.rdk.util.{RdkUtil}

import scala.util.{Failure, Success, Try}
import scala.concurrent.duration._

 /*
  * Created by 10054860 on 2016/7/28.
  * P2P 功能的MQ实现
  *
  */
class P2PMQActor extends Actor with MQCreator {

  import context._

  private val CheckMessage = "CheckMessage"
  private var messageCount = 0
  context.system.scheduler.schedule(5 minutes, 5 minutes) {
    self ! CheckMessage
  }

   /*
    * 发送p2p消息
    *
    * @param subject
    * @param data
    * @return
    */
  def p2p(subject: String, data: String): Unit = {

    logger.debug(s"${self.path}-> sending p2p msg, subject=${subject}")
    trySendP2P(subject, data)

  }

   /*
    * 同步RPC调用
    *
    * @param subject 主题
    * @param data    数据
    * @param timeout 超时（毫秒）
    * @return
    */
  def rpc(subject: String, data: MQ_Message, timeout: Int): String = {
    withMQ.map(mq => {
      Try {
        logger.debug(s"${self.path}-> Begin rpc call subject=${subject},data=${data},timeout=${timeout}")
        val result = mq.rpc(subject, RdkUtil.toJsonString(data), timeout)
        result.asInstanceOf[TextMessage].getText
      } match {
        case Success(x) =>
          logger.debug(s"${self.path}-> rpc call success.result=${x}")
          Some(x)
        case Failure(ex) =>
          logger.error(ex.getMessage)
          None
      }
    }).flatten.getOrElse("")

  }

   /*
    * 回复消息
    *
    * @param dest
    * @param data
    */
  def reply(dest: String, data: String): Unit = {
    trySendP2P(dest, data)
  }

   /*
    * 广播消息
    *
    * @param subject
    * @param data
    * @param persist
    */
  def broadcast(subject: String, data: String, persist: Boolean): Unit = {
    logger.debug(s"${self.path}-> sending broadcast msg, subject=${subject}")
    trySendTopic(subject, data, if (persist) ActiveMQ.PERSISTENT_MODE else ActiveMQ.NON_PERSISTENT_MODE)

  }

  def incMessageCount = messageCount = messageCount + 1

  override def receive: Receive = {
    case msg: MQ_P2P => incMessageCount; p2p(msg.subject, msg.data)
    case msg: MQ_Rpc => incMessageCount; sender() ! rpc(msg.subject, msg.data, msg.timeout)
    case msg: MQ_Reply => incMessageCount; reply(msg.dest, msg.data)
    case msg: MQ_BroadCast => incMessageCount; broadcast(msg.subject, msg.data, msg.persist)
    case CheckMessage =>
      if (messageCount == 0 && opMQ.nonEmpty) {
        logger.debug(s"${self.path} call dispose()")
        dispose()
      }
      messageCount = 0
  }

  override def createActiveMQ: Try[RDKActiveMQ] = ProxyManager.mqAccess(true)
}
