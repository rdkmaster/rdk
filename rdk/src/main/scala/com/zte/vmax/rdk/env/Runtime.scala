package com.zte.vmax.rdk.env

import java.util
import javax.script._

import com.google.gson.GsonBuilder
import com.zte.vmax.rdk.actor.Messages.{DBSession, WSBroadcast}
import com.zte.vmax.rdk.actor.WebSocketServer
import com.zte.vmax.rdk.cache.{AgingCache, CacheHelper}
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.db.{DataBaseHelper, DataSource}
import com.zte.vmax.rdk.jsr._
import com.zte.vmax.rdk.mq.MqHelper
import com.zte.vmax.rdk.proxy.ProxyManager
import com.zte.vmax.rdk.util.{Logger, RdkUtil}
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.db.DataBaseHelper.DBError
import jdk.nashorn.api.scripting.ScriptObjectMirror
import jdk.nashorn.internal.runtime.Undefined
import spray.http.HttpHeaders.RawHeader
import spray.http.MediaTypes
import spray.http.MediaType

import scala.collection.mutable.ArrayBuffer

 /*
  * Created by 10054860 on 2016/7/11.
  */

@edu.umd.cs.findbugs.annotations.SuppressWarnings(
  value = Array("NP_NULL_PARAM_DEREF", "NP_NULL_PARAM_DEREF_ALL_TARGETS_DANGEROUS"),
  justification = "false alarm")
//scalastyle:off line.size.limit method.name number.of.methods token  public.methods.have.type
class Runtime(engine: ScriptEngine) extends Logger {
  def jsLogger = appLogger

  var serviceCaller: ScriptObjectMirror = _
  var createJavascriptObject: ScriptObjectMirror = _
  private var jsonParser: ScriptObjectMirror = _

  implicit var application: String = ""

  val fileHelper = new FileHelper

  val restHelper = new RestHelper
  val jarHelper = new JarHelper
  val dbHelper = ProxyManager.deprecatedDbAccess

  var context: Option[RDKContext] = None

  def setContext(context: RDKContext): Unit = {
    if (context != NoneContext) {
      this.restHelper.setOriginHeader(getCurrentReqCtxHeaderArray(context).toIterator)
      this.context = Option(context)
    }
  }

  def reloadDataSource: Unit = {
    DataSource.init(Config.config)
  }

  def removeDBInfoByName(dbName: String) = {
    DataSource.removeDBInfoByName(dbName)
  }

  //获取context信息
  def getReqCtxHeaderInfo: String = {
    this.context match {
      case Some(ctx) => RdkUtil.toJsonString(getCurrentReqCtxHeaderArray(ctx))

      case None => ""
    }
  }

  def getCurrentReqCtxHeaderArray(ctx: RDKContext): Array[Header] = ctx.asInstanceOf[HttpRequestContext].wrap.request.headers.map { header => Header(header.name, header.value) }.toArray

  //获取主机名
  def getHostName: String = RdkUtil.getHostName

  //获取主机ips
  def getHostIps: String = RdkUtil.toJsonString(RdkUtil.getHostIps)

  //shell脚本调用
  def executeShell(cmd: String, option: String, args: ScriptObjectMirror) = {
    RdkUtil.executeShell(cmd, option, args)
  }

  //当前数据源
  private var opCurDataSource: Option[String] = Some("db.default")

  def setAppName(appName: String): Unit = {
    application = appName
    fileHelper.setAppName(appName)
    restHelper.setAppName(appName)
    jarHelper.setAppName(appName)

  }

  //重置当前数据源
  def resetDataSource: Unit = {
    opCurDataSource = ProxyManager.getDefaultDataSource(application) match {
      case None => Some("db.default")
      case x => x
    }
  }

  //数据库访问会话
  def useDbSession: DBSession = DBSession(application, opCurDataSource)

  def init: Unit = {
    try {
      require("proc/utils/underscore-1.8.3.js")
      require("proc/utils/date.js")
      require("proc/utils/runtime_helper.js")
    }
    catch {
      case e: Exception => {
        logger.error("run js lib error: ", e)
      }
    }
    try {
      serviceCaller = eval("_callService")
      createJavascriptObject = eval("_createJavascriptObject")
      jsonParser = eval("json")
    }
    catch {
      case e: ScriptException => {
        logger.error("internal error! no '_callService()/json()/createJavascriptObject()' defined!")
      }
    }

    DataBaseHelper.createJavascriptObject = createJavascriptObject
  }

  @throws(classOf[ScriptException])
  def require(script: String): AnyRef = {
    val realScript = FileHelper.fixPath(script, application)
    val begin = System.currentTimeMillis()
    val result = engine.eval("load('" + realScript + "')")
    val timeUsed = System.currentTimeMillis() - begin
    appLogger.info(s"loading script:$script (${timeUsed}ms)")
    result
  }

  @throws(classOf[ScriptException])
  def eval(script: String): ScriptObjectMirror = {
    engine.eval(script).asInstanceOf[ScriptObjectMirror]
  }

  def getEngine: ScriptEngine = {
    engine
  }

  def callService(callable: ScriptObjectMirror, param: AnyRef, script: String): ServiceRawResult = {
    val headerMap = new util.HashMap[String, String]()
    val result: AnyRef = serviceCaller.call(callable, callable, param, script, headerMap)

    var ct: MediaType = if (result.isInstanceOf[String]) MediaTypes.`text/plain` else MediaTypes.`application/json`
    if (headerMap.containsKey("Content-Type")) {
      ct = MediaType.custom(headerMap.get("Content-Type"))
      headerMap.remove("Content-Type")
    }

    val it = headerMap.entrySet().iterator()
    val headers = new Array[RawHeader](headerMap.size())
    var index = 0
    while (it.hasNext) {
      val entry = it.next()
      headers(index) = RawHeader(entry.getKey, entry.getValue)
      index += 1
    }

    if (result.isInstanceOf[String]) ServiceRawResult(result.toString, ct, headers.toList)
    else ServiceRawResult(jsonParser.call(callable, result, "").toString, ct, headers.toList)
  }

  def locale(): String = {
    Config.get("other.locale")
  }

   /*
    * 缓冲数据功能实现区，线程安全在js中控制了，这里不需要控制
    */

  def buffer(key: String, data: AnyRef): AnyRef = {
    CacheHelper.getAppCache.put(key, data)
  }

  //Perhaps null
  def buffer(key: String): AnyRef = {
    CacheHelper.getAppCache.get(key, null)
  }

  def removeBuffer(key: String): Unit = {
    CacheHelper.getAppCache.remove(key)
  }

  def clearAppCache(appName: String): Unit = {
    CacheHelper.clearAppCache(appName)
  }

  def cachePut(key: String, data: AnyRef) = buffer(key, data)

  def cacheGet(key: String) = buffer(key)

  def cacheDel(key: String) = removeBuffer(key)

  def globalCachePut(key: String, data: AnyRef) = CacheHelper.globalCache.put(key, data)

  def globalCacheGet(key: String) = CacheHelper.globalCache.get(key, null)

  def globalCacheDel(key: String) = CacheHelper.globalCache.remove(key)

  def agingCachePut(key: String, data: AnyRef, ttl: Long, callback: Object) = AgingCache.put(key, data, ttl, callback)

  def agingCacheGet(key: String) = AgingCache.get(key, null)

  def agingCacheDel(key: String) = AgingCache.remove(key)

   /*
    * 数据库数据获取处理
    */

  def objectToJson(obj: Object): String = {
    (new GsonBuilder()).disableHtmlEscaping().create().toJson(obj)
  }

  def useDataSource(dataSourceName: String): Unit = {
    if (RdkUtil.isBlank(dataSourceName)) {
      appLogger.warn("useDataSource with empty ,use default one.")
      opCurDataSource = None
    } else {
      appLogger.debug(s"useDataSource:$dataSourceName")
      opCurDataSource = Some(dataSourceName)
    }

  }

  def fetch(sql: String, maxLine: Int): ScriptObjectMirror = {
    if (cacheGet("#_#allowNullToString#_#").asInstanceOf[Boolean]) {
      DataBaseHelper.fetchV2(useDbSession, sql, maxLine, null)
    } else {
      DataBaseHelper.fetchV2(useDbSession, sql, maxLine, "null")
    }
  }

  def fetchWithDataSource(dataSource: String, sql: String, maxLine: Int): ScriptObjectMirror = {
    if (cacheGet("#_#allowNullToString#_#").asInstanceOf[Boolean]) {
      DataBaseHelper.fetchV2(DBSession(application, Some(dataSource)), sql, maxLine, null)
    } else {
      DataBaseHelper.fetchV2(DBSession(application, Some(dataSource)), sql, maxLine, "null")
    }
  }

  def batchFetch(sqlArr: ScriptObjectMirror, maxLine: Int, timeout: Long): ScriptObjectMirror = {
    val lst = for (i <- 0 until sqlArr.size()) yield sqlArr.get(i.toString).toString
    DataBaseHelper.batchFetchV2(useDbSession, lst.toList, maxLine, timeout)
  }

  def batchFetchWithDataSource(dataSource: String, sqlArr: ScriptObjectMirror, maxLine: Int, timeout: Long): ScriptObjectMirror = {
    val lst = for (i <- 0 until sqlArr.size()) yield sqlArr.get(i.toString).toString
    DataBaseHelper.batchFetchV2(DBSession(application, Some(dataSource)), lst.toList, maxLine, timeout)
  }

  def fetchFirstCell(sql: String): String = {
    val result = DataBaseHelper.fetchV2(useDbSession, sql, 1, "null")
    if (result.hasMember("error")) {
      return null
    }

    val data = result.getMember("data").asInstanceOf[ScriptObjectMirror]
    if (data.getMember("length").asInstanceOf[Int] > 0) {
      val value = data.get("0").asInstanceOf[ScriptObjectMirror].get("0")
      if (!value.isInstanceOf[Undefined]) value.toString
    }

    null
  }

  def executeUpdate(appName: String, sql: String, ifErrorInfo: Boolean): Any = {
    DataBaseHelper.executeUpdate(useDbSession, sql) match {
      case Some(dataOrError) =>
        dataOrError match {
          case num: Int => num
          case error: DBError if ifErrorInfo => objectToJson(error)
          case _ => 0
        }
      case _ => 0
    }
  }

  def batchExecuteUpdate(appName: String, sqlArr: ScriptObjectMirror, ifErrorInfo: Boolean): Any = {
    val lst = for (i <- 0 until sqlArr.size()) yield sqlArr.get(i.toString).toString
    DataBaseHelper.batchExecuteUpdate(useDbSession, lst.toList) match {
      case Some(dataOrError) =>
        dataOrError.head match {
          case num: Integer => objectToJson(dataOrError.toArray)
          case error: DBError if ifErrorInfo => objectToJson(error)
          case _ => objectToJson(Array.apply())
        }
      case _ =>
    }

  }

   /*
    * p2p消息发送
    *
    * @param topic 发送的主题
    * @param body  消息体内容
    */
  def p2p(topic: String, body: String): Unit = MqHelper.p2p(topic, body)


   /*
    * MQ的RPC调用
    *
    * @param topic      请求主题名称
    * @param replyTopic 应答主题
    * @param body       请求的内容
    * @param timeout    超时时间，单位秒
    * @return 失败或超时返回空字符串
    */
  def rpc(topic: String, replyTopic: String, body: String, timeout: Int): String = {
    MqHelper.rpc(application, topic, replyTopic, body, timeout)
  }

   /*
    * 广播消息
    *
    * @param topic 主题名称
    * @param body  消息内容
    */
  def broadcast(topic: String, body: String): Unit = MqHelper.broadcast(topic, body)

   /*
    * 回复消息
    *
    * @param replyTopic 回复的主题
    * @param body       消息内容
    */
  def reply(replyTopic: String, body: String): Unit = MqHelper.reply(application, replyTopic, body)

   /*
    * 订阅主题
    *
    * @param topic        主题名
    * @param functionName 回调函数名
    * @param jsFile       回调的js文件名，文件路径自动拼装到文件名前面
    */
  def subscribe(topic: String, functionName: String, jsFile: String): Unit = MqHelper.subscribe(application, topic, functionName, jsFile)

   /*
    * 取消订阅主题
    *
    * @param topic        主题名
    * @param functionName 回调函数名
    * @param jsFile       回调的js文件名，文件路径自动拼装到文件名前面
    */
  def unSubscribe(topic: String, functionName: String, jsFile: String): Unit = MqHelper.unSubscribe(application, topic, functionName, jsFile)


   /*
    * 通过websocket广播消息
    *
    * @param topic
    * @param message
    */
  def webSocketBroadcast(topic: String, message: String): Unit = {
    WebSocketServer.broadcast(WSBroadcast(topic, message))
  }
}

//半生对象
object Runtime {

  //构造Runtime
  def newInstance: Runtime = {
    val mgr: ScriptEngineManager = new ScriptEngineManager
    val engine: ScriptEngine = mgr.getEngineByName("nashorn")
    val newContext: ScriptContext = new SimpleScriptContext
    val bindings: Bindings = newContext.getBindings(ScriptContext.ENGINE_SCOPE)
    engine.setBindings(bindings, ScriptContext.ENGINE_SCOPE)

    val runtime = new Runtime(engine)
    //绑定名字到引擎
    bindings.put("rdk_runtime", runtime)
    runtime.init
    runtime
  }
}
//scalastyle:off line.size.limit method.name number.of.methods token  public.methods.have.type
