package test

import com.zte.vmax.rdk.cache.CacheHelper

import org.scalatest.{FunSpec, Matchers}

 /*
  * Created by 10054860 on 2016/7/14.
  */
class CacheTestSpec extends FunSpec with Matchers {

  describe("Cache Function Testing") {
    it("put,get,size,remove,override tests should pass") {


      val app = "example"
      val key = "key"
      val value = "value"
      CacheHelper.getAppCache(app).put(key, value)
      CacheHelper.getAppCache(app).get(key, "") should be(value)
      CacheHelper.getAppCache(app).size() should be(1)

      CacheHelper.getAppCache(app).remove(key)

      CacheHelper.getAppCache(app).size() should be(0)

      CacheHelper.getAppCache(app).put(key, "new_value")
      CacheHelper.getAppCache(app).get(key, "") should be("new_value")
    }
  }


}
