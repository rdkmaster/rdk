package com.zte.vmax.rdk.cache

import java.util.concurrent.ConcurrentHashMap

import akka.actor.Actor
import com.zte.vmax.rdk.actor.Messages.AgingValue
import scala.concurrent.duration._

/**
 * Created by 10184092 on 2016/11/18.
 */
object AgingCache {

  private val map = new ConcurrentHashMap[String, AgingValue] {}

  def get(key: String, default: AgingValue): AnyRef = {
    val elem = map.getOrDefault(key, default)
    if (elem == null) {
      return null
    }
    val value = elem.value
    map.put(key, AgingValue(System.currentTimeMillis(), 24 * 60 * 60, value))
    return value
  }

  def put(key: String, value: AnyRef): AnyRef = {
    map.put(key, AgingValue(System.currentTimeMillis(), 24 * 60 * 60, value))
  }

  def remove(key: String): Unit = map.remove(key)

  class AgingCacheActor extends Actor {

    import context._

    private val startTimerMessage = "StartTimer"
    context.system.scheduler.schedule(30 second, 30 second) {
      self ! startTimerMessage
    }

    def receive = {
      case startTimerMessage =>
        checkAgingCache
    }

    //检查oplogcache中超时sessionid并remove
    def checkAgingCache: Unit = {
      val currentTime = System.currentTimeMillis()
      val keys = map.keySet()
      if (keys != null) {
        val iterator = keys.iterator()
        while (iterator.hasNext()) {
          val key = iterator.next()
          val value = map.get(key)
          if (currentTime - value.timeStamp > value.ttl * 1000) {
            map.remove(key)
          }
        }
      }
    }

  }

}
