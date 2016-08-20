package test.api

import com.zte.vmax.rdk.actor.Messages.NoneContext
import com.zte.vmax.rdk.proxy.ProxyManager
import com.zte.vmax.rdk.util.RdkUtil
import org.scalatest.{FunSpec, Matchers}
import test.mock.{DeprecatedDBAccessMock, DBAccessMock}

/**
  * Created by 10054860 on 2016/8/11.
  */

class DbApiTestSpec extends FunSpec with Matchers {
  ProxyManager.dbAccess = Some(DBAccessMock)
  ProxyManager.deprecatedDbAccess = () => DeprecatedDBAccessMock

  it("sql") {
    val runtime = com.zte.vmax.rdk.env.Runtime.newInstance
    val r = RdkUtil.handleJsRequest(runtime, NoneContext, "app/example/server/fff.js", null, null, "get")
    r should be("ok")

  }

}
