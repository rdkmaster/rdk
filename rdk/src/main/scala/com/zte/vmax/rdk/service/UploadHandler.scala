package com.zte.vmax.rdk.service

import java.io.{FileOutputStream, File}

import akka.actor.{ActorRef, ActorSystem}
import akka.util.Timeout
import com.zte.vmax.rdk.util.Logger
import spray.http.MultipartFormData
import spray.routing.Directives
import scala.concurrent.duration._

/**
 * Created by 10184092 on 2016/12/6.
 */
class UploadHandler(system: ActorSystem, router: ActorRef) extends Directives with Logger {
  implicit val _sys = system
  implicit val timeout = Timeout(ServiceConfig.requestTimeout second)
  implicit val dispatcher = system.dispatcher

  def runRoute =
    path("upload") {
      post {
        entity(as[MultipartFormData]) { formData =>
          val ftmp = File.createTempFile("upload", "tmp", new File("."))
          val out = new FileOutputStream(ftmp)
          formData.fields.foreach {
            f =>
              try {
                out.write(f.entity.data.toByteArray)
              } catch {
                case e: Throwable => logger.error("" + e)
              } finally {
                out.close()
              }
          }
          complete("upload")
        }
      }
    }
}
