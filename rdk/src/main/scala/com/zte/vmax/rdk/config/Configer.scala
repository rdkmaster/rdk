package com.zte.vmax.rdk.config

import java.io.File

import com.typesafe.config.ConfigFactory
import com.zte.vmax.rdk.util.{Logger, RdkUtil}

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
    config = config.withFallback(DefaultConfigure.getConfig).resolve()
    //注册默认的数据源(gbase)
    val defaultGbaseDataSource =
      s"""db.default.url="${DefaultConfigure.getGbaseUrl}" """
    config = config.withFallback(ConfigFactory.parseString(defaultGbaseDataSource)).resolve()
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

  def setConfig(path: String) = {
    configHome = path
    //前面文件中的配置项优先
    setConfigFiles(
      "rdk.cfg",
      "datasource.cfg",
      "extension.cfg"
    )
  }

  def get(key: String, defaultValue: String): String = {
    RdkUtil.getConfigValue[AnyRef](key)(config) match {
      case Some(x) => x.toString
      case _ => defaultValue
    }
  }

  def getInt(key: String, defaultValue: Int): Int = {
    RdkUtil.getConfigValue[Int](key)(config).getOrElse(defaultValue)
  }

  def getInt(key: String): Int = {
    return getInt(key, -1)
  }

  def getBool(key: String, defaultValue: Boolean): Boolean = {
    RdkUtil.getConfigValue[Boolean](key)(config).getOrElse(defaultValue)
  }

  def getBool(key: String): Boolean = {
    return getBool(key, false)
  }

  def set(key: String, value: String) {
    config = ConfigFactory.parseString(s"$key=$value").withFallback(config)
  }

  def set(json: String) {
    config = ConfigFactory.parseString(json).withFallback(config)
  }

  def get(key: String): String = {
    return get(key, null)
  }

  def getConfig(key: String): com.typesafe.config.Config = {
    return config.getConfig(key);
  }

  def withoutPath(path: String) = {
    config = config.withoutPath(path);
  }

}
