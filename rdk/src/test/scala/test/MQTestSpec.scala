package test

import akka.actor.ActorSystem
import akka.actor.Props
import akka.testkit.{TestActorRef, TestKit, ImplicitSender}
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.proxy.ProxyManager
import org.apache.log4j.PropertyConfigurator
import org.scalatest.WordSpecLike
import org.scalatest.Matchers
import org.scalatest.BeforeAndAfterAll
import com.zte.vmax.rdk.actor.{SubscribeMQActor, P2PMQActor}
import test.mock.mq.BaseRDKActiveMQMock

import scala.util.Success


 /*
  * Created by 10054860 on 2016/7/26.
  */

class MQTestSpec() extends TestKit(ActorSystem("MQTestSpec")) with ImplicitSender
  with WordSpecLike with Matchers with BeforeAndAfterAll {

  override def afterAll {
    TestKit.shutdownActorSystem(system)
  }

  override def beforeAll: Unit = {
    PropertyConfigurator.configure("proc/conf/log4j.properties")

    //config setting
    Config.setConfig("proc/conf/")
    ProxyManager.mqAccess = _ => Success(new BaseRDKActiveMQMock("1.2.3.4", "2222", self))
  }

  "P2PMQActor Tests" must {
    val p2p = system.actorOf(Props[P2PMQActor])
    "p2p back messages unchanged topic" in {
      p2p ! MQ_P2P("topic", "body")
      expectMsg("topic")
    }
    "rpc call return Some(ok)" in {
      val mqMsg = MQ_Message(MQ_Head("reply_topic"), "body")
      p2p ! MQ_Rpc("rpc", mqMsg)
      expectMsg("ok")
    }
    "reply call return ok " in {

      p2p ! MQ_Reply("ok", "body")
      expectMsg("ok")
    }
    "broadcast call return ok " in {

      p2p ! MQ_BroadCast("ok", "body")
      expectMsg("ok")

    }

  }
  "SubscribeMQActor Tests" must {

    val sub = TestActorRef[SubscribeMQActor]
    val callback = SubCallback("testFun", "abc.js")
    "subscribe topic return true" in {

      sub ! MQ_Subscribe("topic", callback)
      expectMsg("topic")
      val set = sub.underlyingActor.callbackMap.get("topic").get
      set.contains(callback) should be(true)

    }
    "unSubscribe topic return None" in {

      sub ! MQ_UnSubscribe("topic", callback)

      sub.underlyingActor.callbackMap.get("topic") should be(None)

    }

  }
}