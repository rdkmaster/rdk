package com.zte.vmax.rdk.cache

import com.zte.vmax.rdk.defaults.Misc
import com.zte.vmax.rdk.util.HashTrait

/**
  * Created by 10054860 on 2016/7/21.
  */

class AppCache(appName: String) {
  private val map = new HashTrait[String, AnyRef] {}

  //获取缓存值，不存在则返回默认数据
  def get(key: String, default: AnyRef): AnyRef = {
    map.get(key).getOrElse(default)
  }

  //put缓存对象
  def put(key: String, value: AnyRef): AnyRef = {
    map.put(key, value)
    value
  }

  def size() = map.getKeys.size
  //清除缓存
  def remove(key: String): Unit = map.remove(key)
}


object CacheHelper {
  private val map = new HashTrait[String, AppCache] {}

  object globalCache extends AppCache(Misc.GlobalCache)

  def getAppCache(implicit appName: String): AppCache = {

    map.get(appName) match {
      case None =>
        val newOne = new AppCache(appName)
        map.put(appName, newOne)
        newOne
      case Some(cache) => cache
    }

  }

}
