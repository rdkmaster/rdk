package test

import java.io.File
import java.sql.ResultSet

import com.zte.vmax.rdk.actor.Messages.{DBSession, NoneContext}
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.env._
import com.zte.vmax.rdk.proxy.{DeprecatedDBAccessTrait, ProxyManager}
import com.zte.vmax.rdk.util.RdkUtil
import org.apache.log4j.PropertyConfigurator
import org.scalatest.{Matchers, FunSpec}
import test.mock.db.{BaseMetaData, BaseResultSetMock}


/**
 * Created by 10184092 on 2016/8/19.
 */
class TestOldJsAPI extends FunSpec with Matchers{
  Config.setConfig("proc/conf/")

  val _meta = new BaseMetaData {
    def getColumnType(column: Int) = 1

    def getColumnCount = 2

    def getColumnLabel(column: Int) = column match{
      case 1 => "neid"
      case 2 => "name"
    }
  }

  ProxyManager.deprecatedDbAccess =  new DeprecatedDBAccessTrait{
    def TAB_AAA = new BaseResultSetMock {
      var i= 0
      def next() = {i=i+1;i<2}

      def getString(columnIndex: Int) = "ok"

      def getMetaData = _meta

      override def getBytes(param:String):Array[Byte]=param match {
        case "name" => Array(2.toByte)
        case "neid" => Array(1.toByte)
      }

      override def getBytes(param:Int):Array[Byte]=param match {
        case 1 => Array(2.toByte)
        case 2 => Array(1.toByte)
      }
    }

    override def sql(session: DBSession, sql: String): ResultSet = TAB_AAA

    override def clear(session: DBSession, rs: ResultSet): Unit = {

    }
  }

  describe("check pass Old API File function") {
    val runtime: Runtime = Runtime.newInstance
    it("loadProperty(file)=> test cases passed!") {
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_loadProperty").fold(ex=>ex,v=> v should be("conf1"))
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_loadPropertyerror").fold(ex=>ex,v=> v should be("false"))
    }

    it("save(file, content, append, encoding)=>test cases passed!") {
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_save")
      new File(ConstForTest.testRelayFilePath+"save.txt").exists() should be(true)
      new File(ConstForTest.testRelayFilePath+"save.txt").delete()

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_savepathnull").fold(ex=>ex,v=> v should be("false"))

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_savecontentnull").fold(ex=>ex,v=> v should be("false"))

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_save_dirfalse").fold(ex=>ex,v=> v should be("false"))
 }


    it("saveAsCSV(file, content, excludeIndexes, option)=>option defined ok return true"){
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_saveAsCSV")
      new File(ConstForTest.testRelayFilePath+"save.csv").exists() should be(true)
      new File(ConstForTest.testRelayFilePath+"save.csv").delete()

      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_saveAsCSVopUndefined")
      new File(ConstForTest.testRelayFilePath+"save.csv").exists() should be(true)
      new File(ConstForTest.testRelayFilePath+"save.csv").delete()
    }

    it("saveAsEXCEL(file, content, excludeIndexes, option)=>option defined ok return true"){
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_saveAsEXCEL")
      new File(ConstForTest.testRelayFilePath+"test.xls").exists() should be(true)
      new File(ConstForTest.testRelayFilePath+"test.xls").delete()

    }



    it("list()=>ok return file lists") {
      val fileList=RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "file_list")
      fileList.right.get.contains("conf1.propertites") should be (true)
    }

   it("web()=>test cases passed!") {
          val fixWeb=RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "file_web")
          fixWeb.right.get should be ("app/test/web")
  }

  it("svr()=>test cases passed!") {
    val fixWeb=RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "file_svr")
    fixWeb.right.get should be ("app/test/server")
  }

  it("base()=>test cases passed!") {
    val fixWeb=RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "file_base")
    fixWeb.right.get should be ("app/test")
  }

    it("kv()=>test cases passed!"){
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "kvTest").fold(ex=>ex,v=> v should be("no"))
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "kvTestdefaultvaluenull").fold(ex=>ex,v=> v should be("2"))
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "kvTestdefaultvalue").fold(ex=>ex,v=> v should be("defaultvalue"))
    }

    it("require()=>test cases passed!"){
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "requireTest").fold(ex=>ex,v=> v should be("load ok!"))
    }

    it("buffer()、getbuffer()、removebuffer()=>test cases passed!"){
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "bufferTest").fold(ex=>ex,v=> v should be("f"))
      RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "bufferTestfalse").fold(ex=>ex,v=> v should be("null"))
    }


    it("json(data, indent)=>test cases passed!"){
       RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", null, null, "jsonTest").fold(ex=>ex,v=> v should be("[\n  1,\n  2\n]"))
    }

    it("JVM.load_class(className, jar)=>test cases passed!"){
       RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "load_classTest").fold(ex=>ex,v=> v should be("from test lib!"))

//       RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "load_classTesterror").fold(ex=>ex.toString.contains("+++")  should be (true),v=> v)
    }

    it("i18n(key)=>test cases passed!"){
        RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "i18nTest").fold(ex=>ex,v=> v should be("测试"))

        RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "i18nArrayTest").fold(ex=>ex,v=> v should be("[\"测试\",\"测试1\"]"))

        RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "i18nparamlenthzero").fold(ex=>ex,v=> v should be("undefined"))

        RdkUtil.handleJsRequest(runtime, null, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "i18nkeynotstr").fold(ex=>ex,v=> v should be("{\"a\":1}"))
    }

    it("sql(sql)=>test cases passed!") {
      val r = RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "sqlTest")
      r.fold(ex=>ex,v=> v should be("ok"))
    }

    it("mapper(resultSet, key, value, keepResultSet)=>test cases passed!"){
      var runtime: Runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "mapperTest").fold(ex=>ex,v=> v should be("{\"\\u0001\":\"\\u0002\"}"))
      runtime=Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "mapperTestkeynull").fold(ex=>ex,v=> v should be("{}"))
      runtime=Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "mapperTestvaluenull").fold(ex=>ex,v=> v should be("{}"))
      runtime=Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "mapperTestResultSetnull").fold(ex=>ex,v=> v should be("{}"))
    }

    it("matrix(resultSet, mapIterator, keepResultSet)=>test cases passed!"){
      var runtime: Runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "matrixTest").fold(ex=>ex,v=> v should be("{\"header\":[\"网元id\",\"name\"],\"field\":[\"neid\",\"name\"],\"data\":[[\"\\u0002\",\"\\u0001\"]]}"))
      runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "matrixTestmapIterator").fold(ex=>ex,v=> v should be("{\"header\":[\"网元id\",\"name\"],\"field\":[\"neid\",\"name\"],\"data\":[[\"\\u0002\",\"\\u0001ttt\"]]}"))
      runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "matrixTestError").fold(ex=>ex,v=> v should be("{\"header\":[],\"field\":[],\"data\":[]}"))
    }

    //===========new  api=============//

    it("DataTable=>test cases passed!"){
      var runtime: Runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "DataTable_transfer").fold(ex=>ex,v=> v should be("{\"header\":[\"网元\",\"名字\"],\"field\":[\"neid\",\"name\"],\"data\":[[\"30test\",\"test1ffff\"],[\"20test\",\"test2ffff\"]]}"))
      runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "DataTable_select").fold(ex=>ex,v=> v should be("{\"header\":[\"名字\"],\"field\":[\"name\"],\"data\":[[\"test1\"],[\"test2\"]]}"))
    }

    it("Mapper=>test cases passed!"){
      var runtime: Runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "Mapper_from_object").fold(ex=>ex,v=> v should be("否"))
      runtime = Runtime.newInstance
      RdkUtil.handleJsRequest(runtime, NoneContext, ConstForTest.testRelayFilePath + "testForOldJSAPI.js", "test", null, "Mapper_from_datatable").fold(ex=>ex,v=> v should be("test1"))
    }
  }
}
