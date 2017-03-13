package com.zte.vmax.rdk.cache

import java.util.concurrent.ConcurrentHashMap
import com.zte.vmax.rdk.util.Logger
import jdk.nashorn.api.scripting.ScriptObjectMirror
import jdk.nashorn.internal.runtime.Undefined

import scala.collection.JavaConverters._
import akka.actor.Actor
import com.zte.vmax.rdk.actor.Messages.AgingValue
import scala.concurrent.duration._

/**
 * Created by 10184092 on 2016/11/18.
 */
object AgingCache extends Logger {

  private val map = new ConcurrentHashMap[String, AgingValue] {}

  def get(key: String, default: AgingValue): AnyRef = {
    val elem = map.getOrDefault(key, default)
    if (elem == null) {
      return null
    }
    val value = elem.value
    map.put(key, AgingValue(System.currentTimeMillis(), elem.ttl, value, elem.callback))
    return value
  }

  def put(key: String, value: AnyRef, ttl: Long, callback: Object): AnyRef = {
    if (value != null) {
      map.put(key, AgingValue(System.currentTimeMillis(), ttl, value, callback))
    } else {
      null
    }

  }

  def remove(key: String): Unit = map.remove(key)

  class AgingCacheActor extends Actor {

    import context._

    private val startTimerMessage = "StartTimer"
    context.system.scheduler.schedule(1 minute, 30 second) {
      self ! startTimerMessage
    }

    def receive = {
      case startTimerMessage =>
        checkAgingCache
    }

    //检查oplogcache中超时sessionid并remove
    def checkAgingCache: Unit = {
      val currentTime = System.currentTimeMillis()
      val entrySet = map.entrySet().asScala
      for (entry <- entrySet) {
        val value = entry.getValue
        if (currentTime - value.timeStamp > value.ttl * 1000) {
          map.remove(entry.getKey)
          val callback = value.callback
          if (!callback.isInstanceOf[Undefined]) {
            val callable = callback.asInstanceOf[ScriptObjectMirror]
            try {
              callable.call(callable)
            } catch {
              case e: Throwable =>
                logger.error("callback function error:" + e)
            }

          }
        }
      }
    }
  }

}
