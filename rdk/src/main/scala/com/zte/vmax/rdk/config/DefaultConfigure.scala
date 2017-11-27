package com.zte.vmax.rdk.config

import java.io.{FileReader}
import java.util.Properties

import com.typesafe.config.{ConfigFactory, Config => TypeSafeConfig}
import com.zte.vmax.rdk.util.Logger

 /*
  * Created by 10054860 on 2016/9/26.
  * 读取vmax系统的配置文件
  */
//scalastyle:off
object DefaultConfigure extends Logger {

   /*
    * 从配置文件读取属性值
    *
    * @param file
    * @param lookUpKey 属性键

    */

  @edu.umd.cs.findbugs.annotations.SuppressWarnings(
    value = Array("OS_OPEN_STREAM", "DM_DEFAULT_ENCODING"),
    justification = "false alarm")
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

   /*
    * 构造rdk 默认jdbc url（gbase）
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

   /*
    * 从proc/conf/extension.cfg文件属性项获取默认配置的参数，包括
    * local.ip
    * ums.local
    * database.gbase.hostList
    * db.default 数据源配置
    *
    * @return
    */
  def getConfig: TypeSafeConfig = {
    val gbHost = getKey(Config.get("extension.gbase.host.config"), Config.get("extension.gbase.host.key"))
    val localIp = getKey(Config.get("extension.http.server.ip.config"), Config.get("extension.http.server.ip.key"))
    val lang = getKey(Config.get("extension.locale.config"),Config.get("extension.locale.key"))
    val defaultDbCfg =
      s"""
         |local.ip="${localIp}"
         |${Config.get("extension.locale.key")}="${lang}"
         |database.gbase.hostList="${gbHost}"
         |db.default.driver=com.gbase.jdbc.Driver
         |#连接池
         |db.default.poolRef=pool.default
      """.stripMargin
    //
    ConfigFactory parseString defaultDbCfg

  }


}
//scalastyle:off
