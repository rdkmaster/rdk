package com.zte.vmax.rdk.config

import java.io.File

import com.typesafe.config.ConfigFactory
import com.zte.vmax.rdk.util.Logger

trait ConfigTrait extends Logger {
  var config: com.typesafe.config.Config = null

  //get path from envrioment to relative path
  protected var configHome = "./"

  /**
    * 设置配置文件，只写文件名即可。
    *
    * 默认从configHome路径去读文件，同时如果resources下有同名文件也会读取   *
    * 注意：在前面的文件会覆盖后面的文件的相同key的配置值
    *
    * @param files
    */
  def setConfigFiles(files: String*): Unit = {
    logger.debug(s"config home: $configHome")
    config = files.toList.map(load).reduce((a, b) => a.withFallback(b))
  }

  protected def load(file: String): com.typesafe.config.Config = {
    val resourceFile = file
    val configFile = new File(makePath(file))
  //  log.debug(configFile.getAbsolutePath())
    if (configFile.exists()) {
      logger.debug(s"loading file[ ${configFile.getPath} ] and resource[ $resourceFile ]")
      ConfigFactory.parseFile(configFile).withFallback(ConfigFactory.load(resourceFile))
    }
    else {
      logger.debug(s"loading resource[$resourceFile]")
      ConfigFactory.load(resourceFile)
    }
  }

  protected def makePath(filename: String): String = {
    val newDir = configHome.trim.replaceAll( """\\""", "/")
    if (newDir.endsWith("/")) configHome + filename
    else configHome + "/" + filename
  }
}

/**
  * Created by 10054860 on 2016/7/9.
  */
object Config extends ConfigTrait {
  private val ICT_BASE: String = "../../../../../.."
  private val `serviceaddress.properties`: String = ICT_BASE + "/utils/vmax-conf/serviceaddress.properties"
  private val `deploy-console.properties`: String = ICT_BASE + "/utils/console/works/console1/conf/deploy-console.properties"
  private val `deploy-usf.properties`: String = ICT_BASE + "/works/global/deploy/deploy-usf.properties"

  def setConfig(path:String) = {
    configHome = path
    //前面文件中的配置项优先
    setConfigFiles(
      `deploy-usf.properties`,
      "rdk.cfg",
      `serviceaddress.properties`,
      `deploy-console.properties`)
  }

  def getStringOption(prop:String):Option[String] = withOption(config.getString(prop))

  def getIntOption(prop:String):Option[Int] = withOption(config.getInt(prop))


  private def withOption[A](op: => A): Option[A] = {
    try {
      Some(op)
    } catch {
      case e: Exception => None
    }
  }


  def get(key: String, defaultValue: String): String = {
    getStringOption(key).getOrElse(defaultValue)
  }

  def getInt(key: String, defaultValue: Int): Int = {
    val value: String = get(key)
    try {
      return value.toInt
    }
    catch {
      case e: NumberFormatException => {
        return defaultValue
      }
    }
  }

  def getInt(key: String): Int = {
    return getInt(key, -1)
  }

  def getBool(key: String, defaultValue: Boolean): Boolean = {
    val value: String = get(key, defaultValue + "")
    return value.equalsIgnoreCase("true")
  }

  def getBool(key: String): Boolean = {
    return getBool(key, false)
  }

  def set(key: String, value: String) {
    config = config.withFallback(ConfigFactory.parseString(s"$key=$value"))
  }

  def get(key: String): String = {
    return get(key, null)
  }


}