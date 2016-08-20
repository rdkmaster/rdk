package test.mock

import com.zte.vmax.rdk.actor.Messages.DataTable
import com.zte.vmax.rdk.proxy.DBAccessTrait

/**
  * Created by 10054860 on 2016/8/20.
  */
object DBAccessMock extends DBAccessTrait{
  override def fetch(appName: String, sql: String, maxLine: Long, nullToString: String): Option[DataTable] = {
    None
  }

  override def batchExecuteUpdate(appName: String, sqlArr: List[String]): Option[List[Int]] = {
    None
  }

  override def batchFetch(appName: String, sqlArr: List[String], maxLine: Long, timeout: Long): List[DataTable] = {
    Nil
  }

  override def executeUpdate(appName: String, sql: String): Option[Int] = {
    None
  }
}
