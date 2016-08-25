package com.zte.vmax.rdk.actor

import akka.actor.{Actor}
import com.zte.vmax.activemq.rdk.RDKActiveMQ
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.proxy.ProxyManager
import scala.concurrent.duration._
import com.zte.vmax.rdk.mq.MQCreator
import com.zte.vmax.rdk.util.{HashTrait, RdkUtil}

import scala.util.Try


/**
  * Created by 10054860 on 2016/7/28.
  */
class SubscribeMQActor extends Actor with MQCreator {

  private val CheckCallBack = "CheckCallBack"
  //主题订阅回调函数
  val callbackMap = new HashTrait[String, Set[SubCallback]] {}

  import context._

  context.system.scheduler.schedule(5 minutes, 5 minutes) {
    self ! CheckCallBack
  }

  /**
    * 订阅消息
    *
    * @param topic
    * @param callback
    */
  def subscribe(topic: String, callback: SubCallback): Unit = {
    if (RdkUtil.isBlank(callback.func_name) || RdkUtil.isBlank(callback.jsFile)) {
      logger.warn("${self.path}-> callback is null, just discard it.")
      return
    }
    logger.debug(s"${self.path}-> subscribe topic=$topic,callback_func=${callback.func_name},jsFileName=${callback.jsFile} ")

    callbackMap.get(topic) match {
      case Some(set) => callbackMap.put(topic, set + callback)
      case None => callbackMap.put(topic, Set(callback))
    }
    withMQ.map(mq => {
      val listener = new MQMessageListener(self, topic)
      mq.rcvP2PMsg(topic, listener)
      mq.rcvTopicNonPersistentMsg(topic, listener)
    }
    )
  }

  //订阅回调函数
  def notifyCallback(rm: RDKTopicMessageNotify): Unit = {
    callbackMap.get(rm.topic) match {
      case Some(set) => set.foreach(callback => {
        logger.info(s"${self.path}-> callback for file=${callback.jsFile} method=${callback.func_name}")
        RdkServer.appRouter ! ServiceRequest(ctx = NoneContext, script = callback.jsFile, app = null, param = rm.msg, method = callback.func_name,timeStamp = System.currentTimeMillis())
      })
      case None =>
    }
  }

  //取消订阅
  def unSubscribe(topic: String, callback: SubCallback): Unit = {
    callbackMap.get(topic) match {
      case Some(set) =>
        logger.debug(s"${self.path}-> unSubscribe topic=$topic,callback_func=${callback.func_name},jsFileName=${callback.jsFile} ")
        val newSet = set - callback

        if (newSet.isEmpty) {
          callbackMap.remove(topic)

        } else {
          callbackMap.put(topic, newSet)
        }

      case None =>
    }
  }

  //检查callbackMap，如果为空，释放mq连接对象
  def onCheckCallBack: Unit = {
    if (callbackMap.isEmpty && opMQ.nonEmpty) {
      logger.debug("----Now close mq connection in {}", self.path)
      dispose()
    }
  }

  override def receive: Actor.Receive = {
    case msg: MQ_Subscribe => subscribe(msg.topic, msg.callback)
    case msg: MQ_UnSubscribe => unSubscribe(msg.topic, msg.callback)
    case msg: RDKTopicMessageNotify => notifyCallback(msg)
    case CheckCallBack => onCheckCallBack
  }

  override def createActiveMQ: Try[RDKActiveMQ] = ProxyManager.mqAccess(false)
}
