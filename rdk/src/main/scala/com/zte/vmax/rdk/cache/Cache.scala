package com.zte.vmax.rdk.cache

import java.util.concurrent.ConcurrentHashMap

import com.zte.vmax.rdk.defaults.Misc


/**
  * Created by 10054860 on 2016/7/21.
  */

class AppCache(appName: String) {
  private val map = new ConcurrentHashMap[String, AnyRef] {}

  //获取缓存值，不存在则返回默认数据
  def get(key: String, default: AnyRef): AnyRef = {
    map.getOrDefault(key, default)
  }

  //put缓存对象
  def put(key: String, value: AnyRef): AnyRef = {
    if (value != null) {
      map.put(key, value)
    }
    value
  }

  def size() = map.size()

  //清除缓存
  def remove(key: String): Unit = map.remove(key)
}


object CacheHelper {
  private val map = new ConcurrentHashMap[String, AppCache] {}

  object globalCache extends AppCache(Misc.GlobalCache)

  def getAppCache(implicit appName: String): AppCache = {
    if (map.containsKey(appName)) {
      map.get(appName)
    } else {
      map.put(appName, new AppCache(appName))
      map.get(appName)
    }
  }

  def clearAppCache(implicit appName: String): AppCache = {
    map.remove(appName)
  }

}
