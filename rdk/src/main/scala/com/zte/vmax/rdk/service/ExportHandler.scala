package com.zte.vmax.rdk.service

import java.io.File

import akka.actor.{ActorRef, ActorSystem}
import akka.util.Timeout
import com.zte.vmax.rdk.actor.Messages.ExportParam
import com.zte.vmax.rdk.util.{RdkUtil, Logger}
import org.json4s.{DefaultFormats, Formats}
import spray.http.HttpHeaders.`Content-Disposition`
import spray.httpx.Json4sSupport
import spray.routing.{RoutingSettings, Directives}
import scala.concurrent.duration._
import scala.concurrent.Await
import akka.pattern.ask

//scalastyle:off public.methods.have.type
 /*
 * Created by 10184092 on 2016/12/5.
 */
class ExportHandler(system: ActorSystem, router: ActorRef) extends Json4sSupport with Directives with CustomMarshallers with Logger {
  implicit def json4sFormats: Formats = DefaultFormats

  override def routeSettings = implicitly[RoutingSettings]

  implicit val actorRefFactory = system
  implicit val dispatcher = system.dispatcher
  implicit val timeout = Timeout(ServiceConfig.exportTimeout second)

  implicit def str2SExportParam(json: String): ExportParam = {
    RdkUtil.json2Object[ExportParam](json).getOrElse(null)
  }

  def runRoute =
    path("rdk" / "service" / "common" / "export") {
      detach() {
        get {
          parameters('p.as[ExportParam]) {
            exportParam =>
              val begin = System.currentTimeMillis()
              val future = router ? exportParam.copy(timeStamp = begin)
              Await.result(future, ServiceConfig.exportTimeout second).asInstanceOf[Option[String]]
              match {
                case Some(path) =>
                  val tempResultsFile = new File(path)
                  respondWithHeader(`Content-Disposition`(s"attachment;" +
                    s"filename=${new String(tempResultsFile.getName.getBytes("UTF-8"), "ISO_8859_1")}")) {
                    respondWithLastModifiedHeader(tempResultsFile.lastModified) {
                      complete(tempResultsFile)
                    }
                  }
                case None =>
                  complete("file export error")
              }
          }
        }
      }
    }
}
//scalastyle:off public.methods.have.type
