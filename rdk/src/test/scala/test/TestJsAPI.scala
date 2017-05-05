package test

import java.io.File
import java.sql.ResultSet
import com.zte.vmax.rdk.actor.Messages._
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.env._
import com.zte.vmax.rdk.proxy.{DeprecatedDBAccessTrait, ProxyManager}
import com.zte.vmax.rdk.util.RdkUtil
import org.scalatest.{Matchers, FunSpec}
import test.mock.db.{BaseMetaData, BaseResultSetMock}


/**
  * Created by 10184092 on 2016/8/19.
  */
class TestJsAPI extends FunSpec with Matchers {
  Config.setConfig("proc/conf/")
  //  PropertyConfigurator.configureAndWatch("proc/conf/log4j.properties", 30000)
  val _meta = new BaseMetaData {
    def getColumnType(column: Int) = 1

    def getColumnCount = 2

    def getColumnLabel(column: Int) = column match {
      case 1 => "neid"
      case 2 => "name"
    }
  }

  ProxyManager.deprecatedDbAccess = new DeprecatedDBAccessTrait {
    def TAB_AAA = new BaseResultSetMock {
      var i = 0

      def next() = {
        i = i + 1;
        i < 2
      }

      def getString(columnIndex: Int) = "ok"

      def getMetaData = _meta

      override def getBytes(param: String): Array[Byte] = param match {
        case "name" => Array(2.toByte)
        case "neid" => Array(1.toByte)
      }

      override def getBytes(param: Int): Array[Byte] = param match {
        case 1 => Array(2.toByte)
        case 2 => Array(1.toByte)
      }
    }

    override def sql(session: DBSession, sql: String): ResultSet = TAB_AAA

    override def clear(session: DBSession, rs: ResultSet): Unit = {

    }
  }

  describe("check pass JS API File function") {
    val runtime: Runtime = Runtime.newInstance

    it("Cache functions=> test cases passed!") {
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "Cache_get")
        .right.get.content should be("cachetest")
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "Cache_del")
        .right.get.content should be("null")
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "Cache_clear").right.get.content should be("null")
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "Cache_gobal_get").right.get.content should be("cachetest")
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "Cache_gobal_del").right.get.content should be("null")
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "Cache_aging_get").right.get.content should be("cachetest")
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "Cache_aging_del").right.get.content should be("null")
    }

    it("File functions=> test cases passed!") {
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_loadProperty").right.get.content should be("conf1")

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_loadPropertyerror").right.get.content should be("false")

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null,
        "file_readString").right.get.content.contains("abc") should be(true)

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null,
        "file_readXml").right.get.content.contains("orderedProviders") should be(true)

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null,
        "file_readCSV").right.get.content.contains("网元") should be(true)

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null,
        "file_readExcel").right.get.content.contains("B") should be(true)


      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null,
        "file_save")
      new File(ConstForTest.testRelayFilePath + "save.txt").exists() should be(true)
      new File(ConstForTest.testRelayFilePath + "save.txt").delete()

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_savepathnull").right.get.content should be("false")

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_savecontentnull").right.get.content should be("false")

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_save_dirfalse").right.get.content should be("false")

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null,
        "file_saveAsCSV")
      new File(ConstForTest.testRelayFilePath + "save.csv").exists() should be(true)
      new File(ConstForTest.testRelayFilePath + "save.csv").delete()

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_saveAsCSVopUndefined")
      new File(ConstForTest.testRelayFilePath + "save.csv").exists() should be(true)
      new File(ConstForTest.testRelayFilePath + "save.csv").delete()

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null,
        "file_saveAsEXCEL")
      new File(ConstForTest.testRelayFilePath + "test.xls").exists() should be(true)
      new File(ConstForTest.testRelayFilePath + "test.xls").delete()

      val fileList = RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_list")
      fileList.right.get.content.contains("conf1.propertites") should be(true)
    }


    it("web()=>test cases passed!") {
      val fixWeb = RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "file_web")
      fixWeb.right.get.content should be("app/test/web")
    }

    it("svr()=>test cases passed!") {
      val fixWeb = RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "file_svr")
      fixWeb.right.get.content should be("app/test/server")
    }

    it("base()=>test cases passed!") {
      val fixWeb = RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "file_base")
      fixWeb.right.get.content should be("app/test")
    }

    it("kv()=>test cases passed!") {
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "kvTest").right.get.content should be("no")
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "kvTestdefaultvaluenull").right.get.content should be("2")
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "kvTestdefaultvalue").right.get.content should be("defaultvalue")
    }

    it("require()=>test cases passed!") {
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "requireTest").right.get.content should be("load ok!")
    }

    it("buffer()、getbuffer()、removebuffer()=>test cases passed!") {
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "bufferTest").right.get.content should be("f")
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "bufferTestfalse").right.get.content should be("null")
    }


    it("json(data, indent)=>test cases passed!") {
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "jsonTest").right.get.content should be("[\n  1,\n  2\n]")
    }

    it("JVM.load_class(className, jar)=>test cases passed!") {
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "load_classTest").right.get.content should be("from test lib!")

      //       RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "load_classTesterror").fold(ex=>ex.toString.contains("+++")  should be (true),v=> v)
    }

    it("i18n(key)=>no test cases !") {
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", ConstForTest.testRelayFilePath + "server/i18n.js", null, "i18nTest").right.get.content should be("测试")

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", ConstForTest.testRelayFilePath + "server/i18n.js", null, "i18nArrayTest").right.get.content should be("[\"测试\",\"测试1\"]")

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", ConstForTest.testRelayFilePath + "server/i18n.js", null, "i18nparamlenthzero").right.get.content should be("undefined")

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", ConstForTest.testRelayFilePath + "server/i18n.js", null, "i18nkeynotstr").right.get.content should be("{\"a\":1}")
    }

    it("sql(sql)=>test cases passed!") {
      val r = RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "sqlTest")
      r.right.get.content should be("ok")
    }

    it("mapper(resultSet, key, value, keepResultSet)=>test cases passed!") {
      var runtime: Runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "mapperTest").right.get.content should be("{\"\\u0001\":\"\\u0002\"}")
      runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "mapperTestkeynull").right.get.content should be("{}")
      runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "mapperTestvaluenull").right.get.content should be("{}")
      runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "mapperTestResultSetnull").right.get.content should be("{}")
    }

    it("matrix(resultSet, mapIterator, keepResultSet)=>test cases passed!") {
      var runtime: Runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", ConstForTest.testRelayFilePath + "server/i18n.js", null, "matrixTest").right.get.content should be("{\"header\":[\"网元id\",\"name\"],\"field\":[\"neid\",\"name\"],\"data\":[[\"\\u0002\",\"\\u0001\"]]}")
      runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", ConstForTest.testRelayFilePath + "server/i18n.js", null, "matrixTestmapIterator").right.get.content should be("{\"header\":[\"网元id\",\"name\"],\"field\":[\"neid\",\"name\"],\"data\":[[\"\\u0002\",\"\\u0001ttt\"]]}")
      runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", ConstForTest.testRelayFilePath + "server/i18n.js", null, "matrixTestError").right.get.content should be("{\"header\":[],\"field\":[],\"data\":[]}")
    }

    //===========new  api=============//

    it("DataTable=>test cases passed!") {
      var runtime: Runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "DataTable_transfer").right.get.content should be("{\"header\":[\"网元\",\"名字\"],\"field\":[\"neid\",\"name\"],\"data\":[[\"30test\",\"test1ffff\"],[\"20test\",\"test2ffff\"]]}")
      runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "DataTable_select").right.get.content should be("{\"header\":[\"名字\"],\"field\":[\"name\"],\"data\":[[\"test1\"],[\"test2\"]],\"paging\":{}}")
    }

    it("Mapper=>test cases passed!") {
      var runtime: Runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "Mapper_from_object").right.get.content should be("否")
      runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "Mapper_from_datatable").right.get.content should be("test1")
    }

    it("getRequestContextHeader=>test cases passed!") {
      var runtime: Runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "getReqCtxHeader").right.get.content should be("")
    }
  }
}
