package com.zte.vmax.rdk.actor


import java.nio.file.{Path, WatchEvent}

import akka.routing.ConsistentHashingRouter.ConsistentHashable
import com.zte.vmax.activemq.rdk.RDKMessage
import spray.routing.RequestContext

import scala.language.existentials

/**
  * Created by 10054860 on 2016/7/12.
  * MQ 服务消息定义
  */

object Messages {

  trait RDKContext

  case object NoneContext extends RDKContext

  case class HttpRequestContext(wrap: RequestContext) extends RDKContext

  case class Session(appName: String)

  case class ServiceParam(service: String, param: String, app: String)

  case class ServiceRequest(ctx: RDKContext, script: String,
                            app: String, param: AnyRef, method: String)

  case class ServiceResult(result: String)


  //websocket 消息类型定义
  //websocket 消息头
  type WSHead = Array[String]

  //websocket 消息体
  trait WSBody

  /**
    * websocket 请求
    *
    * @param head 请求头，回传给客户端
    */
  class WSRequest(head: WSHead, body: WSBody)


  /**
    * websocket 调用js脚本方法的消息封装
    *
    * @param script javascript 路径，如app/example/server/alarm.js
    * @param app    应用名称
    * @param param  参数
    * @param method 调用的方法，js文件导出的函数名
    */
  case class WSCallJSMethodBody(script: String, app: String, param: String, method: String) extends WSBody

  /**
    * websocket 调用js脚本方法
    */
  case class WSCallJSMethod(head: WSHead, request: WSCallJSMethodBody) extends WSRequest(head, request)

  /**
    *
    * @param topic 订阅的主题
    */
  case class WSSubscribeBody(topic: Array[String]) extends WSBody

  /**
    * websocket 订阅消息
    */
  case class WSSubscribe(head: WSHead, subscribe: WSSubscribeBody) extends WSRequest(head, subscribe)

  /**
    *
    * @param topic 取消订阅的主题
    */
  case class WSUnSubscribeBody(topic: Array[String]) extends WSBody

  /**
    * websocket 取消订阅消息
    */
  case class WSUnSubscribe(head: WSHead, unSubscribe: WSUnSubscribeBody) extends WSRequest(head, unSubscribe)

  /**
    * websocket 应答
    *
    * @param head 同WSRequest的head
    * @param body
    */
  case class WSResponse(head: WSHead, body: String)

  /**
    * websocket 广播消息
    *
    * @param topic   消息主题
    * @param message 消息内容
    */
  case class WSBroadcast(topic: String, message: String)

  case object GetSequence

  /**
    * MQ消息头定义
    *
    * @param reply_topic 期望监听的应答消息（对端回复）
    * @param sequence    本次消息流水号
    * @param ver         版本号
    */
  case class MQ_Head(reply_topic: String = "", sequence: Long = 0, ver: String = "1.0")

  case class MQ_Message(head: MQ_Head, body: String)


  case class MQ_P2P(subject: String, data: String)

  /**
    * RPC调用消息
    *
    * @param subject 主题
    * @param data    消息内容
    * @param timeout 超时时间（单位毫秒）
    */
  case class MQ_Rpc(subject: String, data: MQ_Message, timeout: Int = 60 * 1000)

  case class MQ_Reply(dest: String, data: String)

  case class MQ_BroadCast(subject: String, data: String, persist: Boolean = false)

  case class MQ_Subscribe(topic: String, callback: SubCallback) extends ConsistentHashable {
    override def consistentHashKey: Any = topic
  }

  case class MQ_UnSubscribe(topic: String, callback: SubCallback) extends ConsistentHashable {
    override def consistentHashKey: Any = topic
  }


  case class RDKTopicMessageNotify(topic: String, msg: RDKMessage) extends ConsistentHashable {
    override def consistentHashKey: Any = topic
  }

  //主题回调函数定义
  case class SubCallback(func_name: String, jsFile: String)

  //批量查询数据库
  case class BatchFetchDataTable(sqls: List[String], maxLine: Long)

  case class FetchDataTable(sql: String)

  //数据表
  case class DataTable(fieldNames: Array[String], fieldTypes: Array[Int], data: Array[Array[String]])

  //缓存
  case class CachePut(app: String, key: String, value: AnyRef)

  case class CacheGet(app: String, key: String, initValue: AnyRef)

  case class CacheRemove(app: String, key: String)

  /**
    * Message case class for telling a MonitorActor that an
    * event has happened and at what path
    *
    * @param event WatchEvent.Kind[Path], one of ENTRY_CREATE, ENTRY_MODIFY, ENTRY_DELETE
    * @param path  Path (Java object) pointing to a file/directory
    */
  case class EventAtPath(event: WatchEvent.Kind[_], path: Path)

}
