package com.zte.vmax.rdk.service

import akka.actor.{ActorRef, ActorSystem}
import akka.pattern.{CircuitBreaker, ask}
import akka.util.Timeout
import com.google.gson.internal.StringMap
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.util.{Logger, RdkUtil}
import org.apache.log4j.{Level, LogManager}
import org.json4s.{DefaultFormats, Formats}
import spray.http._
import spray.httpx.Json4sSupport
import spray.routing.{Directives, RequestContext}

import scala.concurrent.duration._

//scalastyle:off cyclomatic.complexity method.length  public.methods.have.type
class RestHandler(system: ActorSystem, router: ActorRef) extends Json4sSupport with Directives with Logger {
  implicit def json4sFormats: Formats = DefaultFormats

  implicit val _sys = system
  implicit val timeout = Timeout(ServiceConfig.requestTimeout second)
  implicit val dispatcher = system.dispatcher


  implicit def str2ServiceCallParam(json: String): ServiceParam = {
    RdkUtil.json2Object[ServiceParam](json).orNull
  }

  def completeWithError(rct: RequestContext, status: StatusCode, detail: String): Unit = {
    rct.complete(HttpResponse(status, detail))
  }

  def completeWithError(rct: RequestContext, exception: IllegalRequestException): Unit = {
    rct.complete(HttpResponse(exception.status, exception.getMessage))
  }

  def completeWithError(rct: RequestContext, exception: RequestProcessingException): Unit = {
    rct.complete(HttpResponse(exception.status, exception.getMessage))
  }

  def completeWithError(rct: RequestContext, exception: Exception): Unit = {
    exception match {
      case e: IllegalRequestException =>
        completeWithError(rct, e)
      case e: RequestProcessingException =>
        completeWithError(rct, e)
      case _ =>
        completeWithError(rct, StatusCodes.InternalServerError, exception.getMessage)
    }
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

  def doDispatch(rct: RequestContext, url: List[String], app: String, param: AnyRef, isResultWrapped: Boolean): Unit = {
    val urls = url mkString "/"
    logger.debug(s"${urls},$param")
    val method = rct.request.method.name.toLowerCase
    val begin = System.currentTimeMillis()
    val body = () => (router ? ServiceRequest(
      HttpRequestContext(rct), url.mkString("/"), app, param, method, begin)
      ).mapTo[Either[Exception, ServiceRawResult]]

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
      case Left(e) => completeWithError(rct, e)
      case Right(s) =>
        if (isResultWrapped) {
          rct.complete(ServiceResult(s.content))
        } else {
          rct.complete(
            HttpResponse(StatusCodes.OK,
              HttpEntity(ContentType(s.contentType, HttpCharsets.`UTF-8`), s.content), s.headers)
          )
        }
    }
  }

  def runRoute =
    path("rdk" / "service" / Segments) {
      url => {
        get {
          parameters('p.as[ServiceParam]) {
            req =>
              ctx =>
                logger.warn( s"""query param type deprecated ! please use this type: uri?key1=val1&key2=val2&... """)
                if (req == null) {
                  completeWithError(ctx, StatusCodes.BadRequest, "bad argument")
                } else {
                  doDispatch(ctx, url, req.app, req.param, true)
                }
          }
        } ~
          get {
            parameterMap {
              req =>
                ctx =>
                  req match {
                    case null =>
                      completeWithError(ctx, StatusCodes.BadRequest, "bad argument")
                    case _ =>
                      doDispatch(ctx, url, req.getOrElse("app", null), req, false)
                  }
            }
          } ~
          get { ctx =>
            //这个分支应该走不进来
            doDispatch(ctx, url, null, null, true)
          } ~
          (put | post | delete) {
            ctx =>
              val json = ctx.request.entity.asString(HttpCharsets.`UTF-8`)
              val req = RdkUtil.json2Object[AnyRef](json).orNull
              try {
                val strMap = req.asInstanceOf[StringMap[AnyRef]]
                val app = strMap.get("app")
                val appStr: String = if (app == null) null else app.toString
                val param = strMap.get("param")
                if (param == null) {
                  doDispatch(ctx, url, appStr, req, false)
                } else {
                  doDispatch(ctx, url, appStr, param.asInstanceOf[AnyRef], true)
                }
              } catch {
                case t: Throwable =>
                  doDispatch(ctx, url, null, json, false)
              }
          }
      }
    } ~
      path("rdk" / "service") {
        get {
          parameters('p.as[ServiceParam]) {
            req =>
              ctx =>
                if (req == null || req.service == null || req.app == null || req.param == null) {
                  completeWithError(ctx, StatusCodes.BadRequest, "bad argument, need service/app/param property!")
                } else {
                  doDispatch(ctx, req.service :: Nil, req.app, req.param, true)
                }
          }
        } ~
          (put | post | delete) {
            ctx =>
              val json = ctx.request.entity.asString(HttpCharsets.`UTF-8`)
              val req = str2ServiceCallParam(json)
              if (req == null || req.service == null || req.app == null || req.param == null) {
                completeWithError(ctx, StatusCodes.BadRequest, "bad argument, need service/app/param property!")
              } else {
                doDispatch(ctx, req.service :: Nil, req.app, req.param, true)
              }
          }
      }

}
//scalastyle:off cyclomatic.complexity method.length  public.methods.have.type



