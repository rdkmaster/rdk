package test

import java.sql.ResultSet

import com.zte.vmax.rdk.actor.Messages.DBSession
import com.zte.vmax.rdk.db.DataBaseHelper
import com.zte.vmax.rdk.proxy.{DeprecatedDBAccessTrait, ProxyManager}
import jdk.nashorn.api.scripting.ScriptObjectMirror
import org.scalatest.{FunSpec, Matchers}
import test.mock.db.{BaseConnectionMock, BaseMetaData, BaseResultSetMock, BaseStatementMock}

 /*
  * Created by 10054860 on 2016/7/14.
  */
class DBHelperTestSpec extends FunSpec with Matchers {

  val _meta = new BaseMetaData {
    def getColumnType(column: Int) = 1
    def getColumnCount = 1
    def getColumnLabel(column: Int) = "ID"
  }

  val _rs = new BaseResultSetMock {
    def next(): Boolean = true
    def getString(columnIndex: Int): String = "ok"
    def getMetaData = _meta
  }

  val _stat = new BaseStatementMock {
    def executeQuery(sql: String): ResultSet = _rs
    def executeUpdate(sql: String): Int = 1
    def executeBatch(): Array[Int] = Array(1)
  }

  val _conn = new BaseConnectionMock {
    def createStatement() = _stat
  }


  val deprecatedDbAccess = new DeprecatedDBAccessTrait {
    val TAB_AAA = new BaseResultSetMock {
      def next() = true
      def getString(columnIndex: Int) = "ok"
      def getMetaData = _meta
    }
    override def sql(session: DBSession, sql: String): ResultSet = TAB_AAA
    override def clear(session: DBSession, rs: ResultSet): Unit = {}
  }

  describe("ProxyManager.dbAccess Testing") {
    ProxyManager.dbAccess = _ =>Some(_conn)

    it("fetch() should return true") {
      val data = DataBaseHelper.fetchV2(DBSession("test",None), "select * from AAA", 1,  null)
      data should not be (None)
    }

    it("batchFetch() should return true") {
      val data = DataBaseHelper.batchFetchV2(DBSession("test",None), "select * from AAA" :: Nil, 1, 1)
      data should not be (Nil)
    }

    it("executeUpdate() should return true") {
      val data = DataBaseHelper.executeUpdate(DBSession("test",None), "insert into AAA values(1)")
      data should be(Some(1))

    }

    it("batchExecuteUpdate() should return true") {
      val data = DataBaseHelper.batchExecuteUpdate(DBSession("test",None), "insert into AAA values(1)" :: Nil)
      data should be(Some(List(1)))
    }

  }

  describe("ProxyManager.deprecatedDbAccess Testing") {
    ProxyManager.deprecatedDbAccess = deprecatedDbAccess

    it("sql() should return true") {
      val rs = ProxyManager.deprecatedDbAccess.sql(DBSession("test",None), "select * from AAA")
      rs.next()
      rs.getString(1) should be("ok")
    }

    it("clear() should return true") {
      val db = ProxyManager.deprecatedDbAccess
      val rs = db.sql(DBSession("test",None), "select * from AAA")
      db.clear(DBSession("test",None), rs)
    }
  }


}
