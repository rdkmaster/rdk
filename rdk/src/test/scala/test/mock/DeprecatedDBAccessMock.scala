package test.mock

import java.sql.ResultSet

import com.zte.vmax.rdk.proxy.DeprecatedDBAccessTrait

/**
  * Created by 10054860 on 2016/8/20.
  */
object DeprecatedDBAccessMock extends DeprecatedDBAccessTrait {


  val Dim_Ne = new BaseResultSetMock {
    def next() = true

    def getString(columnIndex: Int) = "ok"
  }

  override def sql(appName: String, sql: String): ResultSet = {
    sql match {
      case "select * from dim_ne" => Dim_Ne
      case _ => null
    }

  }

  override def clear(appName: String, rs: ResultSet): Unit = {

  }
}
