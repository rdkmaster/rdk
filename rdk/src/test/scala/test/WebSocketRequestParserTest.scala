package test

import com.zte.vmax.rdk.actor.Messages.{NoneContext, WSUnSubscribe, WSSubscribe, WSCallJSMethod}
import com.zte.vmax.rdk.util.RdkUtil
import com.zte.vmax.rdk.websock.RequestParser
import org.scalatest.{FunSpec, Matchers}
 /*
  * Created by 10054860 on 2016/8/11.
  */

class WebSocketRequestParserTest extends FunSpec with Matchers {

  describe("WebSocket.RequestParser Methods Test") {

//    it("runtime"){
//      val runtime = com.zte.vmax.rdk.env.Runtime.newInstance
//      val r = RdkUtil.handleJsRequest(runtime,NoneContext,"app/example/server/my_service1.js",null,null,"get")
//      r should be ("ok")
//
//    }
    //描述这个测试用例
    it("--WSCallJSMethod--") {
      //描述测试项

      val json =
        """
          |{
          |    "head": [
          |        "wsheader"
          |    ],
          |    "request": {
          |        "script": "app/example/server/my_service1.js",
          |        "param": "",
          |        "app": "",
          |        "method": "put"
          |    }
          |}
        """.stripMargin
      val obj = RequestParser.parse(json)
      obj.get.isInstanceOf[WSCallJSMethod] should be(true)


    }
    it("--WSSubscribe--") {
      //描述测试项

      val json =
        """
          |{
          |    "head": [
          |        "wsheader"
          |    ],
          |    "subscribe": {
          |        "topic": ["alarm"]
          |    }
          |}
        """.stripMargin
      val obj = RequestParser.parse(json)
      obj.get.isInstanceOf[WSSubscribe] should be(true)

    }

    it("--WSUnSubscribe--") {
      //描述测试项

      val json =
        """
          |{
          |    "head": [
          |        "wsheader"
          |    ],
          |    "unSubscribe": {
          |        "topic": ["alarm"]
          |    }
          |}
        """.stripMargin
      val obj = RequestParser.parse(json)
      obj.get.isInstanceOf[WSUnSubscribe] should be(true)

    }
  }
}