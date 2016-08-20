package com.zte.vmax.rdk.proxy

import java.sql.ResultSet

import com.zte.vmax.rdk.actor.Messages._


trait DBAccessTrait {
  def fetch(appName: String, sql: String, maxLine: Long, nullToString: String = "null"): Option[DataTable]

  def batchFetch(appName: String, sqlArr: List[String], maxLine: Long, timeout: Long): List[DataTable]

  def executeUpdate(appName: String, sql: String): Option[Int]

  def batchExecuteUpdate(appName: String, sqlArr: List[String]): Option[List[Int]]
}

trait ActiveMQTrait {
  def p2p(topic: String, body: String): Unit

  def rpc(app: String, topic: String, replyTopic: String, body: String, timeout: Int): String

  def broadcast(topic: String, body: String): Unit

  def reply(app: String, replyTopic: String, body: String): Unit

  def subscribe(app: String, topic: String, functionName: String, jsFile: String): Unit

  def unSubscribe(app: String, topic: String, functionName: String, jsFile: String): Unit

}

//为了兼容而保留
@deprecated("DO NOT USE IT", "2.1")
trait DeprecatedDBAccessTrait {
  def sql(appName: String, sql: String): ResultSet

  def clear(appName: String, rs: ResultSet)
}
