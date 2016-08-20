package test

import com.zte.vmax.rdk.cache.CacheHelper
import com.zte.vmax.rdk.config.Config
import org.apache.log4j.PropertyConfigurator
import org.specs2.mutable.Specification

/**
  * Created by 10054860 on 2016/7/14.
  */
class CacheTestSpec extends Specification {
  PropertyConfigurator.configure("proc/conf/log4j.properties")
  Config.setConfig("proc/conf/")


  "CacheHelper" should {
    "put-get-remove test ok" in {

      val app = "example"
      val key = "key"
      val value = "value"
      CacheHelper.getAppCache(app).put(key, value)
      CacheHelper.getAppCache(app).get(key, "") must_== (value)
      CacheHelper.getAppCache(app).size() must_== (1)

      CacheHelper.getAppCache(app).remove(key)

      CacheHelper.getAppCache(app).size() must_== (0)

    }
  }


}
