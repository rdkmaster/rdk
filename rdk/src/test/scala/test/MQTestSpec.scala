package test

import akka.pattern.ask
import akka.util.Timeout
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.util.RdkUtil
import org.apache.log4j.PropertyConfigurator
import org.specs2.mutable.Specification

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}


/**
  * Created by 10054860 on 2016/7/26.
  */
class MQTestSpec extends Specification {
  PropertyConfigurator.configure("proc/conf/log4j.properties")
  Config.setConfig("proc/conf/")

  implicit val system = RdkServer.system
  implicit val dispatcher = system.dispatcher

  implicit val timeout = Timeout(Duration(30, "seconds"))


  def subscribe(id: Int): Unit = {
    //订阅主题，然后取消订阅
    val topic = s"alarm-topic_${id}"
    Future {
      Thread.sleep(100)
      val callback = SubCallback("showAlarm", "app/example/server/alarm.js")
      RdkServer.mqRouter ! MQ_Subscribe(topic, callback)
      Thread.sleep(10000)
      RdkServer.mqRouter ! MQ_UnSubscribe(topic, callback)
     // Thread.sleep(30000)
      RdkServer.mqRouter ! MQ_Subscribe(topic, callback)

    }

    //广播消息
    Future {
      Thread.sleep(1000)
      (1 `to` 1).foreach(it => RdkServer.mqRouter ! MQ_BroadCast(topic,  s" id =$id ,yes,$it ", false))

    }

  }

  def rpc_call(i:Int): Unit ={
    val answer = "OK,It is RPC ANSWER"
    //延迟启动对端应答，模拟一问一答
    Future {
      Thread.sleep(100)
      RdkServer.mqRouter ! MQ_Reply("test.ack", answer)
    }

    val req =
      s"""
         |{
         |    "head": {
         |        "reply_topic": "test.ack",
         |        "sequence": "123",
         |        "ver": "1.0"
         |    },
         |    "body": "How Are You?"
         |}
        """.stripMargin
    val future = RdkServer.mqRouter ? MQ_Rpc("test", RdkUtil.makeMQ_Message(req).get)
  }

  def p2p_call(i:Int): Unit ={

    val req =
      s"""
         |{
         |    "head": {
         |        "reply_topic": "test.ack",
         |        "sequence": "123",
         |        "ver": "1.0"
         |    },
         |    "body": "How Are You?"
         |}
        """.stripMargin
      RdkServer.mqRouter ! MQ_P2P("test", req)
  }

  "ActiveMQ Test Units" >> {
    "rpc-reply test passed" >> {

      (1 to 10000).foreach(i => p2p_call(i))
      Thread.sleep(200000*1000)
      Nil
      1 must_== (1)

    }

//    "subscribe call test" >> {
//
//      (1 to 1).foreach(i => subscribe(i))
////      (List(1,1,2)).foreach(i => subscribe(i))
//
//      Thread.sleep(200000*1000)
//      1 must_== (1)
//
//    }
  }


}
