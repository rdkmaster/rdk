package test

import com.zte.vmax.rdk.cache.{AgingCache, CacheHelper}
import org.scalatest.{Matchers, FunSpec}
import com.zte.vmax.rdk.env.Runtime


class CacheTest extends FunSpec with Matchers {
  describe("Cache Test") {
    val app = "exampel"
    val key = "key"
    val value = "value"
    it("put get ok") {
      CacheHelper.getAppCache(app).put(key, value)
      CacheHelper.getAppCache(app).get(key, "default") should ===("value")
    }

    it("remove ok") {
      CacheHelper.getAppCache(app).put(key, value)
      CacheHelper.getAppCache(app).get(key, "default") should ===("value")
      CacheHelper.getAppCache(app).remove(key)
      CacheHelper.getAppCache(app).get(key, "default") should ===("default")
    }

    it("size ok") {
      CacheHelper.getAppCache(app).size() should ===(0)
      CacheHelper.getAppCache(app).put(key, value)
      CacheHelper.getAppCache(app).size() should ===(1)
    }

    it("clear ok"){
      CacheHelper.getAppCache(app).put(key, value)
      CacheHelper.clearAppCache(app)
      CacheHelper.getAppCache(app).size() should ===(0)
    }
  }

  describe("Aging Cache Test") {
    val key = s"'key'"
    val value = s"'value'"
    val runtime = Runtime.newInstance
    it("put get ok") {
      runtime.getEngine.eval(s"Cache.aging.put(${key},${value})")
      AgingCache.get("key", null) should ===("value")
    }

    it("remove ok") {
      AgingCache.remove("key")
      AgingCache.get("key", null) should ===(null)
    }

  }
}