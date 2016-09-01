package test

import com.zte.vmax.rdk.cache.CacheHelper
import com.zte.vmax.rdk.config.Config
import org.apache.log4j.PropertyConfigurator
import org.scalatest.{Matchers, FunSpec}
import org.specs2.mutable.Specification


class CacheTest extends FunSpec with Matchers{
  describe("Cache Test"){
    val app="exampel"
    val key = "key"
    val value = "value"
    it("put get ok"){
      CacheHelper.getAppCache(app).put(key,value)
      CacheHelper.getAppCache(app).get(key,"default") should ===("value")
    }

    it("remove ok"){
      CacheHelper.getAppCache(app).put(key,value)
      CacheHelper.getAppCache(app).get(key,"default") should ===("value")
      CacheHelper.getAppCache(app).remove(key)
      CacheHelper.getAppCache(app).get(key,"default") should ===("default")
    }

    it("size ok"){
      CacheHelper.getAppCache(app).size() should ===(0)
      CacheHelper.getAppCache(app).put(key,value)
      CacheHelper.getAppCache(app).size() should ===(1)
    }
  }
}