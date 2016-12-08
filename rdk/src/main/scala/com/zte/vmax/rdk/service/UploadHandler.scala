package com.zte.vmax.rdk.service

import java.io.{FileOutputStream, File}
import java.util.UUID
import akka.actor.{ActorRef, ActorSystem}
import akka.util.Timeout
import com.zte.vmax.rdk.util.{RdkUtil, Logger}
import spray.http.MultipartFormData
import spray.routing.Directives
import scala.concurrent.duration._

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
            val fileName: String = "upload/" + formData.fields.headOption.flatMap(_.name).getOrElse(UUID.randomUUID().toString)
            val ftmp = new File(fileName)
            RdkUtil.ensureFileExists(ftmp)
            val out = new FileOutputStream(ftmp)
            var result: Either[Exception, String] = Right("upload file success!")
            formData.fields.foreach {
              field =>
                try {
                  out.write(field.entity.data.toByteArray)
                } catch {
                  case e: Throwable =>
                    result = Left(new Exception(e))
                } finally {
                  out.close()
                }
            }
            result match {
              case Left(e) => ctx.complete(e)
              case Right(x) => ctx.complete(x)
            }

        }
      }
    }
}
