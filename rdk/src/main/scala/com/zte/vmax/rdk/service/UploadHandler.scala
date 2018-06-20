package com.zte.vmax.rdk.service

import akka.actor.{ActorRef, ActorSystem}
import akka.pattern.ask
import akka.util.Timeout
import com.zte.vmax.rdk.actor.Messages.UploadServiceParam
import com.zte.vmax.rdk.util.Logger
import spray.http.MultipartFormData
import spray.routing.Directives

import scala.concurrent.duration._

 /*
 * Created by 10184092 on 2016/12/6.
 */
class UploadHandler(system: ActorSystem, router: ActorRef) extends Directives with Logger {
  implicit val _sys = system
  implicit val timeout = Timeout(ServiceConfig.uploadTimeout second)
  implicit val dispatcher = system.dispatcher

  def runRoute =
    path("rdk" / "service" / "common" / "upload") {
      post {
        entity(as[MultipartFormData]) {
          formData => ctx =>
            val begin = System.currentTimeMillis()
            val future = (router ? UploadServiceParam(formData, begin)).mapTo[Either[Exception, String]]
            future.onFailure {
              case e => ctx.failWith(e)
            }
            future.onSuccess {
              case Left(e) => ctx.failWith(e)
              case Right(path) => ctx.complete(path)
            }
        }
      }
    }
}
