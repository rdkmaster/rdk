package com.zte.vmax.rdk.env

import javax.script._

import com.google.gson.GsonBuilder
import com.zte.vmax.rdk.actor.Messages.{WSBroadcast}
import com.zte.vmax.rdk.actor.WebSocketServer
import com.zte.vmax.rdk.cache.CacheHelper
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.jsr._
import com.zte.vmax.rdk.proxy.ProxyManager
import com.zte.vmax.rdk.util.Logger
import jdk.nashorn.api.scripting.ScriptObjectMirror


/**
  * Created by 10054860 on 2016/7/11.
  */
class Runtime(engine: ScriptEngine) extends Logger {
  lazy val jsLogger = appLogger(application)

  var serviceCaller: ScriptObjectMirror = null
  private var jsonParser: ScriptObjectMirror = null

  var application: String = ""
  val locale: String = Config.get("ums.locale")

  val fileHelper = new FileHelper

  val restHelper = new RestHelper
  val jarHelper = new JarHelper
  val dbHelper = ProxyManager.deprecatedDbAccess.apply()

  def setAppName(appName: String): Unit = {
    application = appName
    fileHelper.setAppName(appName)
    restHelper.setAppName(appName)
    jarHelper.setAppName(appName)
  }

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
      jsonParser = eval("json")
    }
    catch {
      case e: ScriptException => {
        logger.error("internal error! no '_callService()/json()' defined!")
      }
    }
  }

  @throws(classOf[ScriptException])
  def require(script: String): AnyRef = {
    val realScript = FileHelper.fixPath(script, application)
    appLogger(application).info("loading script:{} ", script)
    return engine.eval("load('" + realScript + "')")
  }

  @throws(classOf[ScriptException])
  def eval(script: String): ScriptObjectMirror = {
    return engine.eval(script).asInstanceOf[ScriptObjectMirror]
  }

  def callService(callable: ScriptObjectMirror, param: AnyRef, script: String): String = {
    try {
      val result: AnyRef = serviceCaller.call(callable, callable, param, script)
      if (result.isInstanceOf[String]) {
        return result.toString
      }
      else {
        return jsonParser.call(callable, result, "").toString
      }
    }
    catch {
      case e: Exception => {
        val error: String = "service error, message: " + e.getMessage + ", param=" + param + ", path=" + script
        appLogger(application).error(error, e)
        return error
      }
    }
  }

  /**
    * 缓冲数据功能实现区，线程安全在js中控制了，这里不需要控�?    */

  def buffer(key: String, data: AnyRef): AnyRef = {
    CacheHelper.getAppCache(application).put(key, data)
  }

  //Perhaps null
  def buffer(key: String): AnyRef = {
    CacheHelper.getAppCache(application).get(key, null)
  }

  def removeBuffer(key: String): Unit = {
    CacheHelper.getAppCache(application).remove(key)
  }

  def cachePut(key: String, data: AnyRef) = buffer(key, data)

  def cacheGet(key: String) = buffer(key)

  def cacheDel(key: String) = removeBuffer(key)

  def globalCachePut(key: String, data: AnyRef) = CacheHelper.globalCache.put(key, data)

  def globalCacheGet(key: String) = CacheHelper.globalCache.get(key, null)

  def globalCacheDel(key: String) = CacheHelper.globalCache.remove(key)


  /**
    * 数据库数据获取处理
    */

  def objectToJson(obj: Object): String = {
    (new GsonBuilder()).disableHtmlEscaping().create().toJson(obj)
  }

  def fetch(sql: String, maxLine: Int): String = {
    val data = ProxyManager.dbAccess.map(_.fetch(application, sql, maxLine)).flatten
    objectToJson(data getOrElse "null") //转json？

  }

  //  def batchFetch(sqlArr: Array[String], maxLine: Int): String = {
  //    val data = ProxyManager.dbAccess.map(_.batchFetch(application, sqlArr, maxLine))
  //    objectToJson(data.getOrElse("null")) //转json？
  //
  //  }

  def fetch_first_cell(sql: String): String = {
    val option = ProxyManager.dbAccess.map(_.fetch(application, sql, 1)).flatten
    option.map(it => {
      if (it.data.length >= 1) Some(objectToJson(it.data(0)(0))) else None
    }).flatten getOrElse objectToJson("null")

  }

  /**
    * p2p消息发送
    *
    * @param topic 发送的主题
    * @param body  消息体内容
    */
  def p2p(topic: String, body: String): Unit = ProxyManager.mqAccess.foreach(_.p2p(topic, body))


  /**
    * MQ的RPC调用
    *
    * @param topic      请求主题名称
    * @param replyTopic 应答主题
    * @param body       请求的内容
    * @param timeout    超时时间，单位秒
    * @return 失败或超时返回空字符串
    */
  def rpc(topic: String, replyTopic: String, body: String, timeout: Int): String = {
    ProxyManager.mqAccess.map(_.rpc(application, topic, replyTopic, body, timeout)) getOrElse ""
  }

  /**
    * 广播消息
    *
    * @param topic 主题名称
    * @param body  消息内容
    */
  def broadcast(topic: String, body: String): Unit = ProxyManager.mqAccess.foreach(_.broadcast(topic, body))

  /**
    * 回复消息
    *
    * @param replyTopic 回复的主题
    * @param body       消息内容
    */
  def reply(replyTopic: String, body: String): Unit = ProxyManager.mqAccess.foreach(
    _.reply(application, replyTopic, body))

  /**
    * 订阅主题
    *
    * @param topic        主题名
    * @param functionName 回调函数名
    * @param jsFile       回调的js文件名，文件路径自动拼装到文件名前面
    */
  def subscribe(topic: String, functionName: String, jsFile: String): Unit = ProxyManager.mqAccess.foreach(
    _.subscribe(application, topic, functionName, jsFile))

  /**
    * 取消订阅主题
    *
    * @param topic        主题名
    * @param functionName 回调函数名
    * @param jsFile       回调的js文件名，文件路径自动拼装到文件名前面
    */
  def unSubscribe(topic: String, functionName: String, jsFile: String): Unit = ProxyManager.mqAccess.foreach(
    _.unSubscribe(application, topic, functionName, jsFile))

  /**
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