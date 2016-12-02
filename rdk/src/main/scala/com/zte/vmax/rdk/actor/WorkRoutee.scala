package com.zte.vmax.rdk.actor

import java.text.SimpleDateFormat
import java.util._
import java.util.Date
import javax.script.{ScriptEngineManager, ScriptEngine}

import akka.actor.Actor
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.env.Runtime
import com.zte.vmax.rdk.service.ServiceConfig
import com.zte.vmax.rdk.util.{Logger, RdkUtil}
import jdk.nashorn.api.scripting.ScriptObjectMirror
import org.json4s.{DefaultFormats, Formats}
import spray.httpx.Json4sSupport


/**
  * Created by 10054860 on 2016/7/7.
  */
class WorkRoutee extends Actor with Json4sSupport with Logger {

  lazy val runtime: Runtime = Runtime.newInstance

  implicit def json4sFormats: Formats = DefaultFormats

  //判读请求超时
  def isRequestTimeout(timeStamp: Long): Boolean = {
    ServiceConfig.requestTimeout < (System.currentTimeMillis() - timeStamp) / 1000
  }

  override def receive: Receive = {
    case (no: Long, ServiceRequest(ctx, script, app, param, method, timeStamp)) =>
      val currentTimeMillis = System.currentTimeMillis()

      runtime.setContext(ctx)

      if (isRequestTimeout(timeStamp)) {
        //超时消息直接丢弃
        logger.debug(s"<No.${no}> Drop timeout request: $script (${currentTimeMillis - timeStamp}ms)")
      } else {
        val result = RdkUtil.handleJsRequest(runtime, ctx, script, app, param, method)
        logger.debug(s"<No.${no}> $script (${System.currentTimeMillis() - timeStamp}ms)")

        if (sender != context.system.deadLetters) {
          if (isRequestTimeout(timeStamp)) {
            logger.debug(s"<No.${no}> Drop timeout result of : $script")
          } else {
            sender ! result
          }
        }
      }


    case WSCallJSMethod(head, body) =>
      val result = RdkUtil.handleJsRequest(runtime, NoneContext, body.script, body.app, body.param, body.method)
      sender ! WSResponse(head, if (result.isLeft) result.left.get.getMessage else result.right.get)


    case (no: Long, ExportParam(source, fileType, param,timeStamp)) =>
      logger.debug(s"<No.${no}> ${source} export fileType:${fileType}")
      runtime.setAppName("export")
      var sourceData: String = ""
      try {
        sourceData = runtime.getEngine.eval(s"rest.get('${source.url}',${RdkUtil.toJsonString(source.peerParam)})").asInstanceOf[String]
      } catch {
        case e:Throwable =>
          logger.error("get source error:" + e)
      }

      val fileNamePreFix = RdkUtil.getCurrentTime
      val excludeIndexes = RdkUtil.toJsonString(if (param != null) param.excludeIndexes else null)
      val option = RdkUtil.toJsonString(if (param != null) param.option else null)

      RdkUtil.json2Object[ServiceResult](sourceData) match {
        case Some(rdkResult) =>
          val rdkData = rdkResult.result
          fileType match {
            case "excel" =>
              runtime.getEngine.eval(s"file.saveAsEXCEL('${fileNamePreFix}.xls',${rdkData},${excludeIndexes},${option})")
              logger.debug(s"<No.${no}> $source (${System.currentTimeMillis() - timeStamp}ms)")
              sender ! fileNamePreFix + ".xls"
            case "csv" =>
              runtime.getEngine.eval(s"file.saveAsCSV('${fileNamePreFix}.csv',${rdkData},${excludeIndexes},${option})")
              logger.debug(s"<No.${no}> $source (${System.currentTimeMillis() - timeStamp}ms)")
              sender ! fileNamePreFix + ".csv"
            case "txt" =>
              runtime.getEngine.eval(s"file.save('${fileNamePreFix}.txt','${rdkData}',${excludeIndexes},${option})")
              logger.debug(s"<No.${no}> $source (${System.currentTimeMillis() - timeStamp}ms)")
              sender ! fileNamePreFix + ".txt"
          }
        case None =>
          RdkUtil.json2Object[ArrayList[String]](sourceData) match{
            case Some(arrayData)=>
                fileType match {
                  case "csv" =>
                    runtime.getEngine.eval(s"file.saveAsCSV('${fileNamePreFix}.csv',${sourceData},${excludeIndexes},${option})")
                    logger.debug(s"<No.${no}> $source (${System.currentTimeMillis() - timeStamp}ms)")
                    sender ! fileNamePreFix + ".csv"
                  case "txt" =>
                    runtime.getEngine.eval(s"file.save('${fileNamePreFix}.txt','${sourceData}',${excludeIndexes},${option})")
                    logger.debug(s"<No.${no}> $source (${System.currentTimeMillis() - timeStamp}ms)")
                    sender ! fileNamePreFix + ".txt"
                }
            case None =>
              runtime.getEngine.eval(s"file.save('${fileNamePreFix}.txt','${sourceData}',${excludeIndexes},${option})")
              logger.debug(s"<No.${no}> $source (${System.currentTimeMillis() - timeStamp}ms)")
              sender ! fileNamePreFix + ".txt"
          }
      }


  }
}
