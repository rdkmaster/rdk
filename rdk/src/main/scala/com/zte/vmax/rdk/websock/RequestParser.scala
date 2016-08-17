package com.zte.vmax.rdk.websock

import com.typesafe.config.{ConfigFactory, Config}
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.util.RdkUtil
import scala.collection.JavaConversions._

/**
  * Created by 10054860 on 2016/8/10.
  */
object RequestParser {

  //javascript 请求调用
  private def parseJSCall(conf: Config, json: String): Option[WSCallJSMethod] = {
    val keys = "request.script" :: "request.method" :: Nil
    if (keys.forall(conf.hasPath(_))) RdkUtil.json2Object[WSCallJSMethod](json) else None
  }

  //解析头
  private def parserRequestHead(conf: Config): Option[WSHead] = {
    val key = "head"
    if (conf.hasPath(key)) Some(conf.getStringList(key).toList.toArray) else None
  }

  //解析订阅消息
  private def parserSubscribe(conf: Config, json: String): Option[WSSubscribe] = {
    if (conf.hasPath("subscribe.topic")) RdkUtil.json2Object[WSSubscribe](json) else None
  }

  //解析取消订阅消息
  private def parserUnSubscribe(conf: Config, json: String): Option[WSUnSubscribe] = {
    if (conf.hasPath("unSubscribe.topic")) RdkUtil.json2Object[WSUnSubscribe](json) else None
  }

  /**
    * 解析
    *
    * @param json
    * @return
    */
  def parse(json: String): Option[WSRequest] = {
    try {
      val conf = ConfigFactory.parseString(json)
      parserRequestHead(conf).flatMap(_ => parseJSCall(conf, json) orElse parserSubscribe(conf, json) orElse parserUnSubscribe(conf, json))
    } catch {
      case _: Throwable => None
    }

  }
}
