package test

import akka.actor.{ActorSystem, Props}
import akka.testkit.{DefaultTimeout, ImplicitSender, TestKit}
import com.zte.vmax.rdk.actor.Messages.GetSequence
import com.zte.vmax.rdk.actor.SequenceGenActor
import org.scalatest.{BeforeAndAfterAll, WordSpecLike}
import org.specs2.matcher.Matchers

import scala.concurrent.duration._

/**
  * Created by 10054860 on 2016/7/14.
  */
class SequenceGenActorTestSpec extends TestKit(ActorSystem("testsystem"))
  with DefaultTimeout with ImplicitSender
  with WordSpecLike with Matchers with BeforeAndAfterAll {

  val seqGenRef = system.actorOf(Props[SequenceGenActor], "xxxx")

  "A ForwardingActor" should {
    "Forward a message it receives" in {
      within(500 millis) {
        seqGenRef ! GetSequence
        expectMsg(1L)
        seqGenRef ! GetSequence
        expectMsg(2L)
      }
    }
  }

  override def afterAll {
    shutdown()
  }
}
