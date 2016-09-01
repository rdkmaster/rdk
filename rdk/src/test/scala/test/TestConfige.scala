package test

import org.scalatest.{Matchers, FunSpec}
import com.zte.vmax.rdk.config.Config
/**
 * Created by 10184092 on 2016/8/15.
 */
class TestConfige extends FunSpec with Matchers{
      Config.setConfig(ConstForTest.testRelayFilePath)
      Config.setConfigFiles("conf1.propertites","conf2.propertites")
      describe("function pass test ok conf()"){
        it("conf load ok"){
          Config.get("conf1") should ===("conf1")
        }

        it("from cover latter"){
          Config.get("conf") should ===("conf1")
        }
      }

}
