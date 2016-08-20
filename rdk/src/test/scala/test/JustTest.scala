package test

import com.google.gson.{GsonBuilder, JsonElement, Gson}
import com.typesafe.config.ConfigFactory
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.actor.Messages.{WSHead, MQ_Rpc, MQ_Message}
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.mq.MqHelper
import com.zte.vmax.rdk.util.RdkUtil
import com.zte.vmax.rdk.websock.RequestParser
import org.apache.log4j.PropertyConfigurator

import scala.concurrent.Future
import scala.util.control.ControlThrowable

/**
  * Created by 10054860 on 2016/7/15.
  */
object JustTest extends App {
  util.Properties.setProp("scala.time","")

  val json=
    """
      |{
      |  "head": {
      |    "tag": ["tag","1"]
      |  },
      |  "subscribe": {
      |    "topic": "alarm",
      |
      |  }
      |}
    """.stripMargin
  val a = RdkUtil.json2Object[WSHead](json)

  val req =
    s"""
       |{
       |    "head1": {
       |        "reply_topic": "test.ack",
       |        "sequence": "123",
       |        "ver": "1.0"
       |    },
       |    "body1": "How Are You?"
       |}
        """.stripMargin
  val m =  RdkUtil.json2Object[MQ_Message](req)

  val m1 =  RdkUtil.makeMQ_Message(req)
  println(m == m1)


  def foo(a: Any): Unit = {

    a match {
      case 1 | 2 =>
      case "sss" | "w" => println(" sss  |  w ")
      case _: Int | _: Long => println(" Int | Long")

      case _ => println("other")
    }
  }

  //  foo(1)
  // foo("w")
  //  foo(null)

  case class Tag(id: String)

  val test = Tag("< >  &")

  println(new GsonBuilder().disableHtmlEscaping().create().toJson(test))
  println(new GsonBuilder().create().toJson(test))

  //  PropertyConfigurator.configure("proc/conf/log4j.properties")
  //  Config.setConfig("proc/conf/")
  //  (1 to 10).foreach(i =>
  //    Future {
  //      val t  =MqHelper.rpc("abc","hello","abc.ack",20)
  //      println(t)
  //    }
  //
  //  )
  //
  //  RdkServer.system.shutdown()


//  sealed trait List[+A]
//
//  case object Nil extends List[Nothing]
//
//  case class Cons[+A](head: A, tail: List[A]) extends List[A]
//
//  object List {
//    def sum(ints: List[Int]): Int = ints match {
//      case Nil => 0
//      case Cons(x, xs) => x + sum(xs)
//    }
//
//    def product(ds: List[Double]): Double = ds match {
//      case Nil => 1.0
//      case Cons(0.0, _) => 0.0
//      case Cons(x, xs) => x * product(xs)
//    }
//
//    def apply[A](as: A*): List[A] =
//      if (as.isEmpty) Nil
//      else Cons(as.head, apply(as.tail: _*))
//
//    val example = Cons(1, Cons(2, Cons(3, Nil)))
//    val example2 = List(1, 2, 3)
//    val total = sum(example)
//  }

  val l = "a" :: "b" :: "c" :: Nil

  val length = l.foldRight(0)((_,i) => 1)

}
