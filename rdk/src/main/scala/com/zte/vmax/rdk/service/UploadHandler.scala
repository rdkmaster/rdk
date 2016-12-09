package com.zte.vmax.rdk.service

import java.io.{FileOutputStream, File}
import java.util.UUID
import akka.actor.{ActorRef, ActorSystem}
import akka.util.Timeout
import com.zte.vmax.rdk.actor.Messages.{ServiceResult, UploadServiceParam, HttpRequestContext, ServiceRequest}
import com.zte.vmax.rdk.util.{RdkUtil, Logger}
import spray.http.MultipartFormData
import spray.routing.Directives
import scala.concurrent.duration._
import akka.pattern.ask

import scala.util.{Failure, Success}

/**
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
            val fileName: String = formData.fields.headOption.flatMap(_.name).getOrElse(UUID.randomUUID().toString)
            val future = (router ? UploadServiceParam(HttpRequestContext(ctx), formData, fileName, begin))
              .mapTo[Either[Exception, String]]
            future.onFailure {
              case e => ctx.failWith(e)
            }
            future.onSuccess {
              case Left(e) => ctx.failWith(e)
              case Right(s) => ctx.complete(s)
            }

        }
      }
    }
}
