package com.zte.vmax.rdk.util


import java.io.{File, FilenameFilter}
import java.nio.file._
import java.nio.file.attribute.BasicFileAttributes
import java.util.UUID
import java.util.regex.{Matcher, Pattern}
import javax.script.ScriptException


import com.google.gson.{Gson, GsonBuilder}
import com.zte.vmax.activemq.rdk.RDKActiveMQ
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.actor.Messages.{NoneContext, RDKContext, MQ_Message, ServiceRequest}
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.defaults.RequestMethod
import com.zte.vmax.rdk.env.Runtime
import jdk.nashorn.api.scripting.ScriptObjectMirror
import jdk.nashorn.internal.runtime.Undefined
import spray.routing.RequestContext

import scala.reflect.ClassTag
import scala.util.Try

/**
  * Created by 10054860 on 2016/7/15.
  */
object RdkUtil extends Logger {
  /**
    * 获取真实的app名称
    */
  def getRealApp(script: String, app: String): String = {
    if (app == null) {
      val pattern: Pattern = Pattern.compile("app/(.*)/server")
      val matcher: Matcher = pattern.matcher(script)
      val realApp = if (matcher.find) {
        matcher.group(1)
      }
      else if (script.startsWith("app/common/")) {
        "common"
      }
      else {
        script
      }
      logger.warn("invalid app name: app == null, so using '" + realApp + "' as app name.")
      realApp
    } else {
      app
    }
  }

  /**
    * 判断字符串是否为null或空白
    *
    * @param str
    * @return
    */
  def isBlank(str: String): Boolean = {
    if (str == null || str.isEmpty) true else false
  }

  /**
    * 创建ActiveMQ对象
    *
    * @param send true:单纯发送，false：接收订阅类型的对象
    * @return
    */
  def createActiveMQ(send: Boolean): Try[RDKActiveMQ] = {

    val ip: String = Config.get("ActiveMQ.ip", "localhost")
    val port: String = Config.get("ActiveMQ.port", "61616")

    logger.error(s"creating ActiveMQ...$ip:$port")

    Try {
      val mq = new RDKActiveMQ(ip, port)
      if (send) mq.createConnection else mq.createDurableConnection
      mq
    }

  }



  /**
    * 运行js文件
    *
    * @param runtime
    * @param script
    * @param app
    * @param param
    * @param method
    * @return
    */
  def handleJsRequest(runtime: Runtime, ctx: RDKContext, script: String, app: String, param: AnyRef, method: String): String = {
    def isDefined(obj: AnyRef): Boolean = {
      return !(obj.isInstanceOf[Undefined])
    }

    val realJs = if (script.toLowerCase.endsWith(".js")) script else script + ".js"
    val realApp = RdkUtil.getRealApp(realJs, app)
    runtime.setAppName(realApp)
    appLogger(realApp).info(s"handling request($realApp), script=$realJs , method=$method param=$param")

    try {
      val service = runtime.require(realJs).asInstanceOf[ScriptObjectMirror]
      val callable: AnyRef = service.getMember(method)

      if (isDefined(callable) && callable.isInstanceOf[ScriptObjectMirror]) {
        runtime.callService(callable.asInstanceOf[ScriptObjectMirror], param, realJs)
      }
      else if (method == RequestMethod.GET) {
        runtime.callService(service, param, realJs)
      }
      else {
        "invalid service implement, need '" + method + "' method!"
      }

    }
    catch {
      case e: ScriptException => {
        val error: String = "service error: " + e.getMessage + ", param=" + param + "service path='" + realJs
        appLogger(app).error(error, e)
        return error
      }
    }

  }

  /**
    * 通过json字符串构造MQ_Message对象
    *
    * @param json
    * @return
    */
  def makeMQ_Message(json: String): Option[MQ_Message] = {
    json2Object[MQ_Message] (json)
  }
  /**
    * 通过json字符串构造对象
    *
    * @param json
    * @return
    */
  def json2Object[T: ClassTag](json: String ): Option[T] = {
    try {
      val msg = new Gson().fromJson(json, implicitly[ClassTag[T]].runtimeClass).asInstanceOf[T]
      Some(msg)
    } catch {
      case t: Throwable =>
        logger.error(t.getMessage)
        None
    }
  }

  /**
    * Object 转成 json 字符串
    *
    * @param obj
    * @return 字符串
    */
  def toJsonString(obj: AnyRef): String = {
    (new GsonBuilder().disableHtmlEscaping().create()).toJson(obj)
  }

  /**
    * 生成UUID
    *
    * @return
    */
  def genUUID: String = UUID.randomUUID().toString



  /**
    * RDK启动时，调用应用的初始化脚本
    */
  def initApplications: Unit = {
    val initScripts: List[String] = forEachDir(Paths.get("app"))
    initScripts.foreach(script => {
      val request = ServiceRequest(ctx = NoneContext, script = script.substring(script.indexOf("app")).replaceAllLiterally("\\", "/"), app = null, param = null, method = "init")
      RdkServer.appRouter ! request
    })
  }

  def forEachDir(path: Path):List[String] = {
    var pathLst: List[String] = Nil
    if (path.toFile.isDirectory)
      Files.walkFileTree(path, new SimpleFileVisitor[Path] {
        override def preVisitDirectory(dir: Path, attributes: BasicFileAttributes) = {
          if (dir.endsWith("server")) {
            val initJs = dir.toFile.listFiles(new FilenameFilter {
              override def accept(dir: File, name: String): Boolean = name == "init.js"
            })
            initJs.foreach(it => pathLst = (it.getCanonicalPath) :: pathLst)
          }
          FileVisitResult.CONTINUE
        }
      })
    pathLst
  }
}
