package test


import com.typesafe.config.ConfigFactory
import com.zte.vmax.rdk.db.DataSource
import org.scalatest.{FunSpec, Matchers}


/**
  * Created by 10054860 on 2016/7/26.
  */

class DataSourceTestSpec() extends FunSpec with Matchers {

  val configString =
    """
      |
      |########################################################
      |#                    连接池配置信息
      |########################################################
      |pool{
      |    #默认连接池配置
      |    default{
      |        #获取连接最大等待时长（ms）
      |        maxWait=6000
      |        #设置数据库初始化时，创建的连接个数
      |        initialSize=10
      |        #最大活跃连接数
      |        maxTotal=128
      |        #设置最小空闲连接数
      |        minIdle=10
      |        #设置最大空闲连接数
      |        maxIdle=50
      |        #设置空闲连接多长时间后释放(单位ms)
      |        minEvictableIdleTimeMillis=15000
      |        #自动回收泄露连接时长(单位s)
      |        removeAbandonedTimeout=300
      |        #设置在获取连接的时候检查有效性, 默认true
      |        testOnBorrow=true
      |    }
      |    #用户自定义连接池配置
      |    my_custom{
      |        #获取连接最大等待时长（ms）
      |        maxWait=6000
      |        #设置数据库初始化时，创建的连接个数
      |        initialSize=1
      |        #最大活跃连接数
      |        maxTotal=20
      |        #设置最小空闲连接数
      |        minIdle=1
      |        #设置最大空闲连接数
      |        maxIdle=5
      |        #设置空闲连接多长时间后释放(单位ms)
      |        minEvictableIdleTimeMillis=15000
      |        #自动回收泄露连接时长(单位s)
      |        removeAbandonedTimeout=300
      |        #设置在获取连接的时候检查有效性, 默认true
      |        testOnBorrow=true
      |    }
      |
      |}
      |########################################################
      |#              JDBC连接配置信息
      |########################################################
      |db{
      |  default{
      |    #驱动(必选)
      |    driver=com.gbase.jdbc.Driver
      |    #gbase负载均衡主机列表
      |    hostList=""
      |    #jdbc url(必选)
      |    url="jdbc:gbase://10.43.149.157:52581/zxvmax?user=zxvmax&password=ZXvmax2016&gclusterId=gcl1&failoverEnable=true&hostList="${db.default.hostList}
      |    #引用连接池(必选)，连接池定义见上节pool
      |    poolRef=pool.default
      |    }
      |
      |  mysql_xdr{
      |    #驱动(必选)
      |    driver=com.mysql.jdbc.Driver
      |    #jdbc url(必选)
      |    url="jdbc:mysql://10.43.149.231:3306/javademo?user=root&password=root&useUnicode=true&characterEncoding=UTF8"
      |    #引用连接池(必选)，连接池定义见上节pool
      |    poolRef=pool.my_custom
      |    }
      |}
      |
    """.stripMargin

  describe("DataSource Function Testing") {
    it("init , getDbPool function tests should pass") {
      val config = ConfigFactory.parseString(configString).resolve()

      DataSource.init(config) should be(true)
      DataSource.getDbPool("db.mysql_xdr") should not be(None)
      DataSource.getDbPool("mysql_xdr") should not be(None)
      DataSource.getDbPool("not_exist") should be(None)
      val pool = DataSource.getDbPool("default")
       pool should not be(None)
//      pool.get.getConnection should not be(None)

    }
  }


}