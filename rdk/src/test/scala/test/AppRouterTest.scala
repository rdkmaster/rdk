package test

import akka.actor.{Props, ActorSystem}
import com.zte.vmax.rdk.actor.AppRouter
import akka.pattern.ask
import scala.concurrent.duration._
import akka.util.Timeout

import scala.util.{Failure, Success}

/**
  * Created by 10054860 on 2016/7/7.
  */
object AppRouterTest extends App{

  implicit val system = ActorSystem("rdk-server")
  implicit val exector = system.dispatcher
  implicit val timeout = Timeout(20 seconds)
  val router = system.actorOf(Props[AppRouter],"appRouter")
  val begin = System.currentTimeMillis()
  val result = (1 to 100).map(i => router ? i.toString)
  val a = List(1)

  result.foreach(f=>
  {
    f.onComplete(it =>

      it match {
        case Success(v) =>
          val end = System.currentTimeMillis()
          println(end-begin)
          println(v)
        case Failure(ex) =>
          println(ex.getMessage)
      }
    )
  }
  )

  system.shutdown()
}
