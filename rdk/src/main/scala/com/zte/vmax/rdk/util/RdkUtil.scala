package com.zte.vmax.rdk.util


import java.io.{File, FilenameFilter}
import java.nio.file._
import java.nio.file.attribute.BasicFileAttributes
import java.util.UUID
import java.util.regex.{Matcher, Pattern}

import com.google.gson.{Gson, GsonBuilder}
import com.typesafe.config.{Config=>TypeSafeConfig}
import com.zte.vmax.activemq.rdk.RDKActiveMQ
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.actor.Messages.{MQ_Message, NoneContext, RDKContext, ServiceRequest}
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.db.GbaseOptimizer
import com.zte.vmax.rdk.defaults.RequestMethod
import com.zte.vmax.rdk.env.Runtime
import com.zte.vmax.rdk.jsr.FileHelper
import jdk.nashorn.api.scripting.ScriptObjectMirror
import jdk.nashorn.internal.runtime.Undefined
import spray.http.{IllegalRequestException, StatusCodes}

import scala.reflect.ClassTag
import scala.util.Try

/**
  * Created by 10054860 on 2016/7/15.
  */
object RdkUtil extends Logger {


  private lazy val usingStandardSQL: Boolean = Config.getBool("database.StandardSQL.on", false)
  private lazy val strictMode: Boolean = Config.getBool("database.StandardSQL.strict", false)

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
      logger.info("invalid app name: app == null, so using '" + realApp + "' as app name.")
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

    logger.info(s"creating ActiveMQ...$ip:$port")

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
  def handleJsRequest(runtime: Runtime, ctx: RDKContext, script: String, app: String, param: AnyRef, method: String): Either[Exception, String] = {
    def isDefined(obj: AnyRef): Boolean = {
      return !(obj.isInstanceOf[Undefined])
    }

    val realJs = if (script.toLowerCase.endsWith(".js")) script else script + ".js"
    val realApp = RdkUtil.getRealApp(realJs, app)
    runtime.setAppName(realApp)
    runtime.resetDataSource
    appLogger(realApp).info(s"handling request($realApp), script=$realJs , method=$method param=$param")
    if (false == fileExist(FileHelper.fixPath(realJs, realApp))) {
      return Left(new IllegalRequestException(StatusCodes.NotFound, realJs))
    }

    try {
      val service = runtime.require(realJs).asInstanceOf[ScriptObjectMirror]
      val callable: AnyRef = service.getMember(method)
      if (isDefined(callable) && callable.isInstanceOf[ScriptObjectMirror]) {
        Right(runtime.callService(callable.asInstanceOf[ScriptObjectMirror], param, realJs))
      }
      else if (method == RequestMethod.GET) {
        Right(runtime.callService(service, param, realJs))
      }
      else {
        Left(new IllegalRequestException(StatusCodes.MethodNotAllowed, "invalid service implement, need '" + method + "' method!"))
      }

    }
    catch {
      case e: Exception => {
        val error: String = "service error: " + e.getMessage + ", param=" + param + "service path='" + realJs
        appLogger(app).error(error, e)

        Left(new IllegalRequestException(StatusCodes.BadRequest, e.getMessage))
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
    json2Object[MQ_Message](json)
  }

  /**
    * 通过json字符串构造对象
    *
    * @param json
    * @return
    */
  def json2Object[T: ClassTag](json: String): Option[T] = {
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
      val scriptFixSepartor=script.replaceAllLiterally("\\", "/")
      val request = ServiceRequest(ctx = NoneContext, scriptFixSepartor.substring(scriptFixSepartor.indexOf("/app/")+1),
        app = null, param = null, method = "init", timeStamp = System.currentTimeMillis())
      RdkServer.appRouter ! request
    })
  }

  def forEachDir(path: Path): List[String] = {
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


  /**
    * 获取标准sql
    */
  def getStandardSql(sql: String): Option[String] = {
    usingStandardSQL match {
      case true =>
        try {
          Some(GbaseOptimizer.optimizeSql(sql))
        } catch {
          case e: Exception => {
            logger.warn("optimize sql error", e)
            strictMode match {
              case true =>
                logger.warn("sql not standard, return null in strictMode, sql=" + sql)
                None
              case false => Some(sql)
            }
          }
        }
      case false => Some(sql)
    }

  }

  /**
    * 安全关闭对象
    *
    * @param closeable
    */
  def safeClose(closeable: AutoCloseable) {
    try {
      closeable.close
    }
    catch {
      case e: Exception => {
        logger.error(e.getMessage)
      }
    }
  }

  /**
    * 判断文件是否存在
    *
    * @param file
    * @return
    */
  def fileExist(file: String): Boolean = {
    new File(file).exists()
  }

  def withOption[A](op: => A): Option[A] = {
    try {
      Some(op)
    } catch {
      case e: Exception => None
    }
  }

  def getConfigValue[A](prop: String)(implicit config: TypeSafeConfig): Option[A] =
    withOption(config.getAnyRef(prop)) match {
      case r:Some[A] =>r
      case _ =>None
    }

}
