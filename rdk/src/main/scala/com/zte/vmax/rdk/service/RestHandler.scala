package com.zte.vmax.rdk.service

import akka.actor.{ActorRef, ActorSystem}
import akka.pattern.ask
import akka.util.Timeout
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.util.Logger
import org.apache.log4j.{Level, LogManager}
import org.json4s.{DefaultFormats, Formats, JObject}
import spray.http.HttpRequest
import spray.httpx.Json4sSupport
import spray.httpx.unmarshalling._
import spray.routing.{Directives, RequestContext}

import scala.concurrent.Future
import scala.concurrent.duration._


class RestHandler(system: ActorSystem, router: ActorRef) extends Json4sSupport with Directives with Logger {
  implicit def json4sFormats: Formats = DefaultFormats

  implicit val _sys = system
  implicit val timeout = Timeout(getDuration second)
  implicit val dispatcher = system.dispatcher

  private def getDuration: Int = system.settings.config.getString("spray.can.server.request-timeout") match {
    case "infinite" ⇒ Int.MaxValue
    case x ⇒ Duration(x).toSeconds.toInt
  }

  implicit def str2ServiceCallParam(json: String): ServiceParam = {
    try {
      val gson = new Gson
      val mapType = new TypeToken[ServiceParam] {}.getType
      gson.fromJson(json, mapType).asInstanceOf[ServiceParam]
    } catch {
      case t: Throwable => t.printStackTrace(); null;
    }
  }



  implicit def str2ServiceCallParam(json: JObject): ServiceParam = {
    try {
      val gson = new Gson
      val mapType = new TypeToken[ServiceParam] {}.getType
      gson.fromJson(json.toString, mapType).asInstanceOf[ServiceParam]
    } catch {
      case t: Throwable => t.printStackTrace(); null;
    }
  }


  def doDispatch(rct: RequestContext, url: List[String], app: String, param: AnyRef): Future[ServiceResult] = {
    val method = rct.request.method.name.toLowerCase
    val begin = System.currentTimeMillis()
    val future = (router ? ServiceRequest(HttpRequestContext(rct), url.mkString("/"), app, param, method,begin)).mapTo[String]
    for (
      x <- future
    ) yield ServiceResult(x)
  }

  //中文注释
  def runRoute =
    path("runtime" / "log") {
      get {
        parameters('level.as[String]) {
          req =>
            complete {
              val level = req.toUpperCase()
              level match {
                case "DEBUG" => LogManager.getRootLogger.setLevel(Level.DEBUG)
                case "INFO" => LogManager.getRootLogger.setLevel(Level.INFO)
                case "WARN" => LogManager.getRootLogger.setLevel(Level.WARN)
                case "ERROR" => LogManager.getRootLogger.setLevel(Level.ERROR)
                case "FATAL" => LogManager.getRootLogger.setLevel(Level.FATAL)
                case _ => LogManager.getRootLogger.setLevel(Level.ERROR)
              }
              "log level changed to " + LogManager.getRootLogger.getLevel()
            }
        }
      }
    } ~
      path("rdk" / "service" / Segments) {
        url => {
          get {
            parameters('p.as[ServiceParam]) {
              req => ctx =>
                ctx.complete {
                  doDispatch(ctx, url, req.app, req.param)
                }
            }
          }
        } ~
          get { ctx =>
            ctx.complete {
              doDispatch(ctx, url, null, null)
            }
          } ~
          put {
            entity(as[ServiceParamStr]) {
              req => ctx =>
                ctx.complete {
                  doDispatch(ctx, url, req.app, req.param)
                }
            }
          } ~
          post {
            entity(as[ServiceParamStr]) {
              req => ctx =>
                ctx.complete {
                  doDispatch(ctx, url, req.app, req.param)
                }
            }
          } ~
          delete {
            entity(as[ServiceParamStr]) {
              req => ctx =>
                ctx.complete {
                  doDispatch(ctx, url, req.app, req.param)
                }
            }
          }
      } ~
      path("rdk" / "service") {
        get {
          parameters('p.as[ServiceParam]) {
            req => ctx =>
              ctx.complete {
                doDispatch(ctx, req.service :: Nil, req.app, req.param)
              }
          }
        } ~
          put {
            entity(as[ServiceParamStr]) {
              req => ctx =>
                ctx.complete {
                  doDispatch(ctx, req.service :: Nil, req.app, req.param)
                }
            }
          } ~
          post {
            entity(as[ServiceParamStr]) {
              req => ctx =>
                ctx.complete {
                  doDispatch(ctx, req.service :: Nil, req.app, req.param)
                }
            }
          } ~
          delete {
            entity(as[ServiceParamStr]) {
              req => ctx =>
                ctx.complete {
                  doDispatch(ctx, req.service :: Nil, req.app, req.param)
                }
            }
          }
      }
}

