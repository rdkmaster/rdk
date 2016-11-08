package com.zte.vmax.rdk.env

import javax.script._

import com.google.gson.GsonBuilder
import com.zte.vmax.rdk.actor.Messages.{DBSession, WSBroadcast}
import com.zte.vmax.rdk.actor.WebSocketServer
import com.zte.vmax.rdk.cache.CacheHelper
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.db.DataBaseHelper
import com.zte.vmax.rdk.jsr._
import com.zte.vmax.rdk.mq.MqHelper
import com.zte.vmax.rdk.proxy.ProxyManager
import com.zte.vmax.rdk.util.{RdkUtil, Logger}
import jdk.nashorn.api.scripting.ScriptObjectMirror


/**
  * Created by 10054860 on 2016/7/11.
  */
class Runtime(engine: ScriptEngine) extends Logger {
  def jsLogger = appLogger

  var serviceCaller: ScriptObjectMirror = null
  private var jsonParser: ScriptObjectMirror = null

  implicit var application: String = ""
  val locale: String = Config.get("ums.locale") match{
    case ""=>"zh_CN"
    case x =>x
  }

  val fileHelper = new FileHelper

  val restHelper = new RestHelper
  val jarHelper = new JarHelper
  val dbHelper = ProxyManager.deprecatedDbAccess

  //当前数据源
  private var opCurDataSource: Option[String] = None

  def setAppName(appName: String): Unit = {
    application = appName
    fileHelper.setAppName(appName)
    restHelper.setAppName(appName)
    jarHelper.setAppName(appName)

  }
  //重置当前数据源
  def resetDataSource: Unit = {
    opCurDataSource = None
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
    val begin = System.currentTimeMillis()
    val result = engine.eval("load('" + realScript + "')")
    val timeUsed = System.currentTimeMillis() - begin
    appLogger.info(s"loading script:$script (${timeUsed}ms)")
    result
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
        appLogger.error(error, e)
        return error
      }
    }
  }

  /**
    * 缓冲数据功能实现区，线程安全在js中控制了，这里不需要控�?    */

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

  def useDataSource(dataSourceName: String): Unit = {
    if (RdkUtil.isBlank(dataSourceName)) {
      appLogger.warn("useDataSource with empty ,use default one.")
      opCurDataSource = None
    } else {
      appLogger.debug(s"useDataSource:$dataSourceName")
      opCurDataSource = Some(dataSourceName)
    }

  }

  def fetch(sql: String, maxLine: Int): String = {
    val data = DataBaseHelper.fetch(useDbSession, sql, maxLine)
    objectToJson(data getOrElse "null") //转json？
  }

  def batchFetch(sqlArr: ScriptObjectMirror, maxLine: Int, timeout: Long): String = {
    val lst = for (i <- 0 until sqlArr.size()) yield (sqlArr.get(i.toString).toString)
    val data = DataBaseHelper.batchFetch(useDbSession, lst.toList, maxLine, timeout)
    val ret = data.map(it => if (it.nonEmpty) it.get else Nil)
    objectToJson(ret.toArray)
  }

  def fetch_first_cell(sql: String): String = {
    val option = DataBaseHelper.fetch(useDbSession, sql, 1)
    option.map(it => {
      if (it.data.length >= 1) Some(objectToJson(it.data(0)(0))) else None
    }).flatten getOrElse objectToJson("null")

  }

  def executeUpdate(appName: String, sql: String): Int = {
    val affectNums: Option[Int] = DataBaseHelper.executeUpdate(useDbSession, sql)
    affectNums.getOrElse(0)
  }

  def batchExecuteUpdate(appName: String, sqlArr: ScriptObjectMirror): String = {
    val lst = for (i <- 0 until sqlArr.size()) yield (sqlArr.get(i.toString).toString)
    val res = DataBaseHelper.batchExecuteUpdate(useDbSession, lst.toList)
    val ret: List[Int] = if (res.nonEmpty) res.get else Nil
    objectToJson(ret.toArray)
  }

  /**
    * p2p消息发送
    *
    * @param topic 发送的主题
    * @param body  消息体内容
    */
  def p2p(topic: String, body: String): Unit = MqHelper.p2p(topic, body)


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
    MqHelper.rpc(application, topic, replyTopic, body, timeout)
  }

  /**
    * 广播消息
    *
    * @param topic 主题名称
    * @param body  消息内容
    */
  def broadcast(topic: String, body: String): Unit = MqHelper.broadcast(topic, body)

  /**
    * 回复消息
    *
    * @param replyTopic 回复的主题
    * @param body       消息内容
    */
  def reply(replyTopic: String, body: String): Unit = MqHelper.reply(application, replyTopic, body)

  /**
    * 订阅主题
    *
    * @param topic        主题名
    * @param functionName 回调函数名
    * @param jsFile       回调的js文件名，文件路径自动拼装到文件名前面
    */
  def subscribe(topic: String, functionName: String, jsFile: String): Unit = MqHelper.subscribe(application, topic, functionName, jsFile)

  /**
    * 取消订阅主题
    *
    * @param topic        主题名
    * @param functionName 回调函数名
    * @param jsFile       回调的js文件名，文件路径自动拼装到文件名前面
    */
  def unSubscribe(topic: String, functionName: String, jsFile: String): Unit = MqHelper.unSubscribe(application, topic, functionName, jsFile)


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