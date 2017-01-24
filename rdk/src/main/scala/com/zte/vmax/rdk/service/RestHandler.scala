package com.zte.vmax.rdk.service

import akka.actor.{ActorRef, ActorSystem}
import akka.pattern.{CircuitBreaker, ask}
import akka.util.Timeout
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.util.{Logger, RdkUtil}
import org.apache.log4j.{Level, LogManager}
import org.json4s.{DefaultFormats, Formats}
import spray.http.HttpCharsets
import spray.httpx.Json4sSupport
import spray.routing.{ Directives, RequestContext}
import scala.concurrent.duration._


class RestHandler(system: ActorSystem, router: ActorRef) extends Json4sSupport with Directives with Logger {
  implicit def json4sFormats: Formats = DefaultFormats

  implicit val _sys = system
  implicit val timeout = Timeout(ServiceConfig.requestTimeout second)
  implicit val dispatcher = system.dispatcher


  implicit def str2ServiceCallParam(json: String): ServiceParam = {
    RdkUtil.json2Object[ServiceParam](json).getOrElse(null)
  }

  private lazy val breaker = new CircuitBreaker(system.scheduler,
    maxFailures = ServiceConfig.maxFailures,
    callTimeout = ServiceConfig.callTimeout seconds,
    resetTimeout = ServiceConfig.resetTimeout seconds).
    onOpen(
      logger.warn("circuit breaker opened!")).
    onClose(
      logger.warn("circuit breaker closed!")).
    onHalfOpen(
      logger.warn("circuit breaker half-open!"))

  def doDispatch(rct: RequestContext, url: List[String], app: String, param: AnyRef): Unit = {
    val urls = url mkString "/"
    logger.debug(s"${urls},$param")
    val method = rct.request.method.name.toLowerCase
    val begin = System.currentTimeMillis()

    val body = () => (router ? ServiceRequest(HttpRequestContext(rct),
      url.mkString("/"), app, param, method, begin)).mapTo[Either[Exception, String]]

    val future = if (ServiceConfig.enable) {
      breaker.withCircuitBreaker(body())
    } else {
      body()
    }
    //
    future.onFailure {
      case e => rct.failWith(e)
    }
    future.onSuccess {
      case Left(e) => rct.failWith(e)
      case Right(s) => rct.complete(ServiceResult(s))
    }

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
//          get {
//            parameters('p.as[ServiceParam]) {
//              req => ctx =>
//                doDispatch(ctx, url, req.app, req.param)
//            }
//          } ~
            get {
              parameters('service,'param,'app ) {
                (service,param,app) => ctx =>
                   var x= param
                    ""
//                  doDispatch(ctx, url, req.app, req.param)
              }
            } ~
            get { ctx =>
              doDispatch(ctx, url, null, null)
            } ~
            (put | post | delete) {
              ctx =>
                val json = ctx.request.entity.asString(HttpCharsets.`UTF-8`)
                val req = str2ServiceCallParam(json)
                doDispatch(ctx, url, req.app, req.param)
            }
        }
      } ~
      path("rdk" / "service") {
        get {
          parameters('p.as[ServiceParam]) {
            req => ctx =>
              doDispatch(ctx, req.service :: Nil, req.app, req.param)
          }
        } ~
          (put | post | delete) {
            ctx =>
              val json = ctx.request.entity.asString(HttpCharsets.`UTF-8`)
              val req = str2ServiceCallParam(json)
              doDispatch(ctx, req.service :: Nil, req.app, req.param)
          }
      }

}



