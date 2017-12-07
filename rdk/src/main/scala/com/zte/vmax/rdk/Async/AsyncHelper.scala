package com.zte.vmax.rdk.Async

import java.util.concurrent.TimeoutException

import akka.util.Timeout
import akka.pattern.ask
import com.zte.vmax.rdk.Async.AsyncTaskMessages._
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.defaults.Misc
import com.zte.vmax.rdk.util.{Logger, RdkUtil}
import jdk.nashorn.api.scripting.ScriptObjectMirror

import scala.concurrent.Await
import scala.concurrent.duration._

object AsyncHelper extends Logger {
  implicit val ec = RdkServer.system.dispatchers.lookup(Misc.async_call_dispatcher)

  def runAsync(scriptObjectMirror: ScriptObjectMirror, context: AnyRef): Any = {
    implicit val timeoutForAsyncRun = Timeout(30 seconds)

    val runMessage = AsyncRunMessage(scriptObjectMirror, context)
    //打印callback的部分信息
    val future = (RdkServer.asyncActor ? runMessage)
    try {
      Await.result(future, timeoutForAsyncRun.duration) match {
        case AsyncRunError(errorMessage) => {
          logger.error(s"Async run callback failed, details follow: ${errorMessage}")
        }
        case res: String => {
          logger.info(s"Async run callback succeed with result: ${res}" )
          res
        }
        case unknown: Any => {
          val unknownRes = unknown.toString
          logger.error(s"Async run callback return with unknown message，details follow: ${unknownRes}" )
        }
      }
    } catch {
      case ex: TimeoutException => {
        logger.error(s"Async run callback failed with timeout, details follow: ${ex.getMessage}")
      }
      case e: Throwable => {
        logger.error(s"Async run callback failed, details follow: ${e.getMessage}")
      }
    }
  }

  def readAsync(remoteToken: String, deleteAfterRead: Boolean): Any = {
    implicit val timeoutForAsyncRead = Timeout(30 seconds)

    val future = (RdkServer.asyncActor ? AsyncGetMessageLocalToken(remoteToken, deleteAfterRead))
    try {
      Await.result(future, timeoutForAsyncRead.duration) match {
        case AsyncGetMessageError(errorMsg: String) => {
          logger.error(s"Async read for ${remoteToken} failed, details follow: ${errorMsg}")
        }
        case res: Any => {
          logger.info(s"Async read for ${remoteToken} succeed")
          res
        }
      }
    } catch {
      case ex: TimeoutException => {
        logger.error(s"Async read for ${remoteToken} failed with timeout, details follow: ${ex.getMessage}")
      }
      case e: Throwable => {
        logger.error(s"Async read for ${remoteToken} failed, details follow: ${e.getMessage}")
      }
    }
  }

  def checkStatus(remoteToken: String, deleteAfterCheckStatus: Boolean): Any = {
    implicit val timeoutForAsyncCheckStatus = Timeout(30 seconds)
    val future = (RdkServer.asyncActor ? AsyncCheckStatusLocalToken(remoteToken, deleteAfterCheckStatus))
    try {
      Await.result(future, timeoutForAsyncCheckStatus.duration) match {
        case AsyncCheckStatusError(errorMsg: String) => {
          logger.error(s"Async check status for ${remoteToken} failed, details follow: ${errorMsg}")
        }
        case res: Any => {
          val resMessage = res.toString
          logger.info(s"Async check status for ${remoteToken} return with result: ${resMessage}")
          res
        }
      }
    } catch {
      case ex: TimeoutException => {
        logger.error(s"Async check status for ${remoteToken} failed with timeout, details follow: ${ex.getMessage}")
      }
      case e: Throwable => {
        logger.error(s"Async check status for ${remoteToken} failed, details follow: ${e.getMessage}")
      }
    }
  }
}

