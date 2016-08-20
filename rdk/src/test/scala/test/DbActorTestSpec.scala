package test

import akka.actor.ActorSystem
import akka.testkit.{DefaultTimeout, ImplicitSender, TestKit}
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.db.DataBaseHelper
import org.apache.log4j.PropertyConfigurator
import org.scalatest.{BeforeAndAfterAll, WordSpecLike}
import org.specs2.matcher.Matchers

/**
  * Created by 10054860 on 2016/7/14.
  */
class DbActorTestSpec extends TestKit(ActorSystem("testsystem"))
  with DefaultTimeout with ImplicitSender
  with WordSpecLike with Matchers with BeforeAndAfterAll {
  PropertyConfigurator.configure("proc/conf/log4j.properties")
  Config.setConfig("proc/conf/")

  "Database Query By Future" should {
    "query" in {

      val sqlArr = (1 to 10).map(i => s"select * from dim_ne;").toList
      val result = DataBaseHelper.batchFetch("", sqlArr, 10000, 200)

      println(result)
    }
  }
  "Database execute update" should {
    "executeCreateTable" in {
      DataBaseHelper.executeUpdate("", "drop table rdk_test1")
      val ret = DataBaseHelper.executeUpdate("", "create table rdk_test1 (name varchar(20));")
      assert(ret != None)
      val ret1 = DataBaseHelper.executeUpdate("", "insert into rdk_test1 values('1');")
      assert(ret1 != None)
      val result = DataBaseHelper.fetch("", "select * from rdk_test1", 100)
      assert(result.get.data.length == 1)
      println(result)
    }

  }

  override def afterAll {
    shutdown()
  }
}
