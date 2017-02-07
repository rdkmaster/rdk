package com.zte.vmax.rdk.util



import java.io.{File, FileOutputStream, FilenameFilter}
import java.lang.reflect.Method
import java.net.InetAddress
import java.nio.file._
import java.nio.file.attribute.BasicFileAttributes
import java.util.UUID
import java.util.regex.{Matcher, Pattern}

import akka.util.Timeout
import com.google.gson.internal.StringMap

import scala.concurrent.duration._
import com.google.gson.{Gson, GsonBuilder}
import com.typesafe.config.{Config => TypeSafeConfig}
import com.zte.vmax.activemq.rdk.RDKActiveMQ
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.cache.CacheHelper
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.defaults.{Misc, RequestMethod}
import com.zte.vmax.rdk.env.Runtime
import com.zte.vmax.rdk.jsr.FileHelper
import com.zte.vmax.rdk.service.ServiceConfig
import jdk.nashorn.api.scripting.ScriptObjectMirror
import jdk.nashorn.internal.runtime.{ECMAException, Undefined}
import spray.http._

import scala.concurrent.{Await, Future}
import scala.reflect.ClassTag
import scala.sys.process.ProcessBuilder
import scala.util.Try
import akka.pattern.ask
import spray.http.StatusCodes.{ClientError, ServerError}




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
    if (!fileExist(FileHelper.fixPath(realJs, realApp))) {
      return Left(new IllegalRequestException(StatusCodes.NotFound, realJs))
    }

    try {
      val service = runtime.require(realJs).asInstanceOf[ScriptObjectMirror]
      val callable: AnyRef = service.getMember(method)
      if (isDefined(callable) && callable.isInstanceOf[ScriptObjectMirror]) {
        Right(runtime.callService(callable.asInstanceOf[ScriptObjectMirror], param, realJs))
      }
      else if (method == RequestMethod.GET) {
        if (service.isFunction) {
          Right(runtime.callService(service, param, realJs))
        } else {
          Left(new IllegalRequestException(StatusCodes.MethodNotAllowed,
            "invalid service implement, need '" + method + "' method!"))
        }
      }
      else {
        Left(new IllegalRequestException(StatusCodes.MethodNotAllowed,
          "invalid service implement, need '" + method + "' method!"))
      }
    }
    catch {
      case e: RequestProcessingException => {
        Left(e)
      }
      case e: ECMAException => {
        val som = e.getEcmaError.asInstanceOf[ScriptObjectMirror]
        val status = som.getMember("status").asInstanceOf[Int]
        if (status >= 400 && status <= 499) {
          Left(new IllegalRequestException(
            StatusCode.int2StatusCode(status).asInstanceOf[ClientError],
            som.getMember("detail").asInstanceOf[String]))
        } else if (status >= 500 && status <= 599) {
          Left(new RequestProcessingException(
            StatusCode.int2StatusCode(status).asInstanceOf[ServerError],
            som.getMember("detail").asInstanceOf[String]))
        } else {
          Left(new RequestProcessingException(
            StatusCodes.InternalServerError,
            som.getMember("detail").asInstanceOf[String]))
        }
      }
      case e: Exception => {
        val error: String = "service error: " + e.getMessage + ", param=" + param + ", service path='" + realJs
        appLogger(app).error(error, e)
        Left(new RequestProcessingException(StatusCodes.InternalServerError, e.getMessage))
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
    logger.info("*" * 20 + s"rdk init begin..." + "*" * 20)
    val initScripts: List[String] = forEachDir(Paths.get("app"))

    implicit val ec = RdkServer.system.dispatchers.lookup(Misc.routeDispatcher)

    val result = initScripts.map(script => {
      val scriptFixSepartor = script.replaceAllLiterally("\\", "/")
      val request = ServiceRequest(ctx = NoneContext, scriptFixSepartor.substring(scriptFixSepartor.indexOf("/app/") + 1),
        app = null, param = null, method = "init", timeStamp = System.currentTimeMillis())
      implicit val timeout: Timeout = Timeout(ServiceConfig.initTimeout second)
      Future {
        val future = RdkServer.appRouter ? request
        Await.result(future, ServiceConfig.initTimeout second)
      }(ec)
    })
    try {
      Await.result(Future.sequence(result), ServiceConfig.initTimeout second)
      logger.info("*" * 20 + s"rdk init complete" + "*" * 20)
    } catch {
      case ex: java.util.concurrent.TimeoutException => logger.warn("init timeout!" + ex)
      case x: Exception => logger.warn("unexpected exception:" + x)
    }

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
  def getVSql(dbSession: DBSession, sql: String): Option[String] = {

    dbSession.opDataSource.map(dsName => {
      val VSqlProcessorKey = "#_#VSqlProcessor#_#"

      CacheHelper.getAppCache(dbSession.appName).get(VSqlProcessorKey + dsName, None) match {
        case None => sql
        case method: Method =>
        try {
            method.invoke(null, sql).asInstanceOf[String]
        } catch {
            case e: Exception =>
              logger.error(s"toVsql failed: $sql")
              sql
            }
        case _ =>sql
          }
        }
    )

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

  def uploadFile(runtime: Runtime, formData: MultipartFormData, fileName: String): Either[Exception, String] = {
    val file = new File(fileName)
    runtime.fileHelper.ensureFileExists(file)
    val out = new FileOutputStream(file)
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
    result
  }

  def getHostName: String = {
    InetAddress.getLocalHost().getHostName
  }

  def getHostIps: Array[String] = {
    InetAddress.getAllByName(getHostName).map(_.getHostAddress).filter(!_.contains(":"))
  }

  private def getFileParam(fileParamMap: StringMap[String], fileType: String): Tuple2[String, String] = {
    fileType.toLowerCase match {
      case param if param.equals("csv") || param.equals("excel") =>
        val excludeIndexes: String =
          if (fileParamMap != null) RdkUtil.toJsonString(fileParamMap.get("excludeIndexes")) else null
        val option: String =
          if (fileParamMap != null) RdkUtil.toJsonString(fileParamMap.get("option")) else null
        (excludeIndexes, option)
      case param if param.equals("txt") =>
        val append: String =
          if (fileParamMap != null) RdkUtil.toJsonString(fileParamMap.get("append")) else null
        val encoding: String =
          if (fileParamMap != null) RdkUtil.toJsonString(fileParamMap.get("encoding")) else null
        (append, encoding)
    }
  }

  def writeExportTempFile(runtime: Runtime, sourceData: String, fileType: String, fileParam: AnyRef): Option[String] = {
    val fileNamePreFix = UUID.randomUUID()
    val fparam = getFileParam(fileParam.asInstanceOf[StringMap[String]], fileType)
    var writeData = sourceData
    RdkUtil.json2Object[ServiceResult](sourceData) match {
      case Some(rdkResult) =>
        writeData = rdkResult.result
      case None =>
    }

    fileType.toLowerCase match {
      case "excel" =>
        try {
          runtime.getEngine.eval(s"file.saveAsEXCEL('${fileNamePreFix}.xls',${writeData},${fparam._1},${fparam._2})")
          Some(fileNamePreFix + ".xls")
        } catch {
          case e: Throwable =>
            logger.error("call file.saveAsEXCEL error =>" + e)
            None
        }

      case "csv" =>
        try {
          runtime.getEngine.eval(s"file.saveAsCSV('${fileNamePreFix}.csv',${writeData},${fparam._1},${fparam._2})")
          Some(fileNamePreFix + ".csv")
        } catch {
          case e: Throwable =>
            logger.error("call file.saveAsCSV error =>" + e)
            None
        }

      case "txt" =>
        try {
          runtime.getEngine.eval(s"file.save('${fileNamePreFix}.txt','${writeData}',${fparam._1},${fparam._2})")
          Some(fileNamePreFix + ".txt")
        } catch {
          case e: Throwable =>
            logger.error("call file.save error =>" + e)
            None
        }
      case _ =>
        None
    }

  }

  def executeShell(cmd: String, option: String, args: ScriptObjectMirror): String = {
    val params: List[String] = (for (elem <- 2 to args.size - 1) yield args.getMember(elem.toString).toString).toList
    val pb: ProcessBuilder = if (params.isEmpty) cmd else cmd :: params
    option match {
      case "0" => ShellExecutor.getReturnCode(pb) match {
        case Left(returnCode) => returnCode.toString
        case Right(error) => "-1"
      }
      case "1" => ShellExecutor.getOutputLines(pb).getOrElse("null")
      case _ => s"unexpected option ${option}"
    }
  }
}
