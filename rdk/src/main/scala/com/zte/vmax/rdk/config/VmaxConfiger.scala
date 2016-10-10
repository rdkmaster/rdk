package com.zte.vmax.rdk.config

import java.io.{FileReader}
import java.util.Properties

import com.typesafe.config.{ConfigFactory, Config => TypeSafeConfig}
import com.zte.vmax.rdk.util.Logger

/**
  * Created by 10054860 on 2016/9/26.
  * 读取vmax系统的配置文件
  */
object VmaxConfiger extends Logger {

  private val ICT_BASE: String = "../../../../../../../.."
  private val `serviceaddress.properties`: String = ICT_BASE + "/utils/vmax-conf/serviceaddress.properties"
  private val `deploy-console.properties`: String = ICT_BASE + "/utils/console/works/console1/conf/deploy-console.properties"
  private val `deploy-usf.properties`: String = ICT_BASE + "/works/global/deploy/deploy-usf.properties"

  /**
    * 从配置文件读取属性值
    *
    * @param file
    * @param lookUpKey 属性键

    */
  private def getKey(file: String, lookUpKey: String): String = {

    val prop = new Properties()
    try {
      prop.load(new FileReader(file))
      prop.getProperty(lookUpKey, "")
    } catch {
      case e: Exception =>
        logger.error(s"load config file error:${file} ")
        return ""
    }

  }

  /**
    * 构造vmax数据看jdbc url（gbase）
    *
    * @return
    */
  def getGbaseUrl: String = {

    val hostList: String = Config.get("database.gbase.hostList", "")
    val databaseName: String = Config.get("database.gbase.databaseName", "")
    val user: String = Config.get("database.gbase.user", "")
    val password: String = Config.get("database.gbase.password", "")
    val failoverEnable: String = Config.get("database.gbase.failoverEnable", "false")
    val gclusterId: String = Config.get("database.gbase.gclusterId", "")
    var port: String = Config.get("database.gbase.port", "5258")
    val hosts: Array[String] = hostList.split(",")
    val url_pre: String = s"jdbc:gbase://${hosts(0)}:${port}/${databaseName}"
    val paramLst = ("user", user) ::("password", password) ::("gclusterId", gclusterId) ::
      ("failoverEnable", failoverEnable) ::("hostList", hostList) :: Nil

    val params = paramLst.filter(_._2.nonEmpty).map(it => s"${it._1}=${it._2}").mkString("&")
    val url = s"${url_pre}?${params}"
    logger.debug(url)
    return url
  }

  /**
    * 获取VMAX配置的参数，包括
    * local.ip
    * ums.local
    * database.gbase.hostList
    * db.default 数据源配置
    *
    * @return
    */
  def getConfig: TypeSafeConfig = {
    val gbHost = getKey(`serviceaddress.properties`, "vmaxcn.gbasehost")
    val localIp = getKey(`deploy-console.properties`, "console.main.ip")
    val lang = getKey(`deploy-usf.properties`, "ums.locale")
    val vmaxDbCfg =
      s"""
         |local.ip="${localIp}"
         |ums.locale="${lang}"
         |database.gbase.hostList="${gbHost}"
         |db.default.driver=com.gbase.jdbc.Driver
         |#连接池
         |db.default.poolRef=pool.default
      """.stripMargin
    //
    ConfigFactory parseString vmaxDbCfg

  }


}
