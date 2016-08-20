package test

import com.zte.vmax.rdk.util.RdkUtil
import org.specs2.mutable.Specification

/**
  * Created by 10054860 on 2016/7/27.
  */
class RdkUtilTestSpec extends Specification {

  "RdkUtilTest Unit " should {
    "check pass function makeMQ_Message() " in {
      val json ="""
           {
                "head": {
                  "ack_topic": "mml.ack",
                  "sequence": 123,
                  "ver": "1.0"
                },
                "body": "Hello"
              }
           """
      val msg = RdkUtil.makeMQ_Message(json)
      msg should_!=(None)
      msg.get.head.reply_topic must_==("mml.ack")
    }
  }
}
