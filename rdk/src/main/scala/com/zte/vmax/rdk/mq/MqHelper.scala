package com.zte.vmax.rdk.mq

import akka.util.Timeout
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.util.Logger

import scala.concurrent.duration._
import akka.pattern.ask

import scala.concurrent.{Await, Future}

/**
  * Created by 10054860 on 2016/7/28.
  */
object MqHelper extends Logger {

  private val default_timeout: Int = 60

  //构造唯一的主题
  private def makeUniqueReplyTopic(app: String, replyTopic: String) = s"${replyTopic}@${app}@${RdkServer.uuid}"

  /**
    * p2p消息发送
    *
    * @param topic 发送的主题
    * @param body  消息体内容
    */
  def p2p(topic: String, body: String): Unit = {
    RdkServer.mqRouter ! MQ_P2P(topic, body)
  }

  /**
    * MQ的RPC同步调用
    *
    * @param topic      请求主题名称
    * @param replyTopic 应答主题
    * @param body       请求的内容
    * @param timeout    超时时间，单位秒
    * @return 失败或超时返回空字符串
    */
  def rpc(app: String, topic: String, replyTopic: String, body: String, timeout: Int = default_timeout): String = {
    if (replyTopic.isEmpty || topic.isEmpty) {
      appLogger(app).error("mq.rpc is forbidden, topic or replyTopic is empty")
      return ""
    }
    implicit val myTimeout = Timeout(timeout seconds)
    val mqMsg = MQ_Message(MQ_Head(makeUniqueReplyTopic(app, replyTopic)), body)
    val future = RdkServer.mqRouter ? MQ_Rpc(topic, mqMsg, timeout * 1000)
    Await.result(future, myTimeout.duration) match {
      case s: Some[_] => s.get.toString
      case None => ""
      case e: Throwable =>
        appLogger(app).error(e.getMessage)
        ""
    }
  }

  /**
    * 广播消息
    *
    * @param topic 主题名称
    * @param body  消息内容
    */
  def broadcast(topic: String, body: String): Unit = {
    RdkServer.mqRouter ! MQ_BroadCast(topic, body)
  }

  /**
    * 回复消息
    *
    * @param replyTopic 回复的主题
    * @param body       消息内容
    */
  def reply(app: String, replyTopic: String, body: String): Unit = {
    RdkServer.mqRouter ! MQ_P2P(makeUniqueReplyTopic(app, replyTopic), body)
  }

  /**
    * 订阅主题
    *
    * @param app          应用名
    * @param topic        主题名
    * @param functionName 回调函数名
    * @param jsFile       回调的js文件名，文件路径自动拼装到文件名前面
    */
  def subscribe(app: String, topic: String, functionName: String, jsFile: String): Unit = {
    if (functionName.isEmpty || jsFile.isEmpty) {
      appLogger(app).error("mq.subscribe is forbidden, functionName or jsFile is empty")
      return
    }
    RdkServer.mqRouter ! MQ_Subscribe(topic, SubCallback(functionName, s"app/${app}/server/${jsFile}"))
  }

  def unSubscribe(app: String, topic: String, functionName: String, jsFile: String): Unit = {
    if (functionName.isEmpty || jsFile.isEmpty) {
      appLogger(app).error("mq.unSubscribe is forbidden, functionName or jsFile is empty")
      return
    }
    RdkServer.mqRouter ! MQ_UnSubscribe(topic, SubCallback(functionName, s"app/${app}/server/${jsFile}"))
  }

}
