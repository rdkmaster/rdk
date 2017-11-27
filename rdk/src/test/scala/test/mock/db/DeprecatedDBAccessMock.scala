package test.mock.db

import java.sql.ResultSet

import com.zte.vmax.rdk.actor.Messages.DBSession
import com.zte.vmax.rdk.proxy.DeprecatedDBAccessTrait

 /*
  * Created by 10054860 on 2016/8/20.
  */
object DeprecatedDBAccessMock extends DeprecatedDBAccessTrait {


  val Dim_Ne = new BaseResultSetMock {
    def next() = true

    def getString(columnIndex: Int) = "ok"

    def getMetaData = null
  }

  override def sql(session: DBSession, sql: String): ResultSet = {
    sql match {
      case "select * from dim_ne" => Dim_Ne
      case _ => null
    }

  }

  override def clear(session: DBSession, rs: ResultSet): Unit = {

  }
}
