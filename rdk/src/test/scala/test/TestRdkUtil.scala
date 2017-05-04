package test


import java.io.File
import java.nio.file.Paths

import com.zte.vmax.rdk.actor.Messages.MQ_P2P
import com.zte.vmax.rdk.env._
import com.zte.vmax.rdk.util.RdkUtil
import org.specs2.mutable.Specification
import org.scalatest.{FunSpec, Matchers}


import scala.util.Try

/**
  * Created by 10054860 on 2016/7/27.
  */
class RdkUtilTest extends FunSpec with Matchers{



    describe("RdkUtilTest Unit ")  {
      describe("check pass function makeMQ_Message()") {
      val json_right=s"""
         |{
         |    "head": {
         |        "reply_topic": "test.ack",
         |        "sequence": "123",
         |        "ver": "1.0"
         |    },
         |    "body": "How Are You?"
         |}
        """.stripMargin
      val msg_right = RdkUtil.makeMQ_Message(json_right)

        it("json transfer ok"){
          msg_right.get.head.reply_topic should ===("test.ack")
        }


      val json_wrong=s"""
                        |{
                        |    "head": {
                        |        "reply_topic": "test.ack",
                        |        "sequence": "123",
                        |        "ver": "1.0"
                        |    },
                        |    "body: "How Are You?"
                        |}
        """.stripMargin

      val msg_wrong = RdkUtil.makeMQ_Message(json_wrong)
        it("json transfer error"){
          msg_wrong should ===(None)
        }
    }

      describe("check pass function getRealApp() "){
        it("param app not null then app"){
          RdkUtil.getRealApp("app/example/server","namedApp") should ===("namedApp")
        }

        it("param app null and param script begin with 'app/' endwith '/server' then get as app"){
          RdkUtil.getRealApp("app/example/server",null) should ===("example")
        }

        it("param app null and param script begin with 'app/common' endNotWith '/server' then 'common' as app"){
          RdkUtil.getRealApp("app/common/example",null) should ===("common")
        }

        it("others app=script"){
          RdkUtil.getRealApp("app/test/example",null) should ===("app/test/example")
        }

    }

      describe("check pass function isBlank() ")  {
        it("param=null then true"){
          RdkUtil.isBlank(null) should ===(true)
        }
        it("param='' then true"){
          RdkUtil.isBlank("") should ===(true)
        }
        it("param!='' or null then false"){
          RdkUtil.isBlank("not blank") should ===(false)
        }

    }

      describe("check pass function createActiveMQ()"){
        it("createActiveMQ error return Failure"){
          RdkUtil.createActiveMQ(true).isFailure should be (true)
        }
    }

      describe("check pass function toJsonString()"){
        it("transfer scala object to json"){
          val mq_p2p=MQ_P2P("rdk_server","message")
          RdkUtil.toJsonString(mq_p2p) should equal (s"""{"subject":"rdk_server","data":"message"}""")
        }
      }

      describe("check pass function handleJsRequest()"){
         val runtime: Runtime = Runtime.newInstance
        it("script return string type"){
          RdkUtil.handleJsRequest(runtime,null,ConstForTest.testRelayFilePath+"testForhandleJsRequest_returnStr.js",null,null,"get").right.get.content should be("return string")
        }

        it("script return obj type"){
          RdkUtil.handleJsRequest(runtime,null,ConstForTest.testRelayFilePath+"testForhandleJsRequest_returnObj.js",null,null,"get").right.get.content should be(s"""{"head":"header","body":"message"}""")
        }

        it("callable defined post"){
          RdkUtil.handleJsRequest(runtime,null,ConstForTest.testRelayFilePath+"testForhandleJsRequest_callableDefined_post.js",null,null,"post").right.get.content should be("return post function")
        }

        it("callable defined delete"){
          RdkUtil.handleJsRequest(runtime,null,ConstForTest.testRelayFilePath+"testForhandleJsRequest_callableDefined_delete.js",null,null,"delete").right.get.content should be("return delete function")
        }

        it("callable defined put"){
          RdkUtil.handleJsRequest(runtime,null,ConstForTest.testRelayFilePath+"testForhandleJsRequest_callableDefined_put.js",null,null,"put").right.get.content should be("return put function")
        }
      }

        describe("check pass function forEachDir()"){
          it("function return type List[String]"){
            val initScripts: List[String] = RdkUtil.forEachDir(Paths.get("app"))
            initScripts.isInstanceOf[List[String]] should equal (true)
          }

        }

      describe("check pass function writeExportTempFile()") {
        it("export file ok") {
          val runtime = Runtime.newInstance
          runtime.setAppName("export")
          val fileName: Option[String] = RdkUtil.writeExportTempFile(runtime, "test export", "txt", null)

          fileName match {
            case Some(file) =>
              file.isEmpty should be(false)
              new File(file).delete()
            case None =>
          }

        }

      }
  }


}
