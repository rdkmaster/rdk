package com.zte.vmax.rdk.db


import com.typesafe.config.Config
import scala.collection.mutable.Map
import com.zte.vmax.rdk.db.Defines.{DbPoolInfo, DatabaseInfo, DataSourceKey}
import com.zte.vmax.rdk.util.{RdkUtil, Logger}
import scala.collection.JavaConverters._

 /*
  * Created by 10054860 on 2016/9/20.
  */
object DataSource extends Logger {
  private case class KeyAndDefaultValue[A](key: String, default: A)

  private val DbUrlMatch = "db.*.url"
  private val Driver = ".driver"
  private val URL = ".url"
  private val PoolRef = ".poolRef"
  private val MaxWait = KeyAndDefaultValue(".maxWait", 6000)
  private val InitSize = KeyAndDefaultValue(".initialSize", 1)
  private val MaxActive = KeyAndDefaultValue(".maxTotal", 8)
  private val MinIdle = KeyAndDefaultValue(".minIdle", 1)
  private val MaxIdle = KeyAndDefaultValue(".maxIdle", 5)
  private val MinEvicIdleTime = KeyAndDefaultValue(".minEvictableIdleTimeMillis", 15000)
  private val TestOnBorrow = KeyAndDefaultValue(".testOnBorrow", false)
  private val RemoveAbandoned = KeyAndDefaultValue(".removeAbandoned", true)
  private val RemoveAbandonedTimeout = KeyAndDefaultValue(".removeAbandonedTimeout", 300)
  private val ValidationQuery = KeyAndDefaultValue(".validationQuery", "")

  private val poolMap = Map[DataSourceKey, DBPool]()
  private val dbName2DSKeyMap = Map[String, DataSourceKey]()
  private var opConfig: Option[Config] = None


  //初始化数据源配置
  def init(implicit config: Config): Boolean = {

    if (config == null) return false

    opConfig = Some(config)
    val entrySet = config.entrySet().asScala
    val dbConfigList = entrySet.filter(_.getKey.matches(DbUrlMatch)).map(_.getKey).map(key => key.substring(0, key.indexOf(URL)))
    logger.debug(dbConfigList.toString())

    dbConfigList.foreach(key => {

      val driver = RdkUtil.getConfigValue[String](key + Driver) getOrElse ""
      val url = RdkUtil.getConfigValue[String](key + URL) getOrElse ""
      val poolRef = RdkUtil.getConfigValue[String](key + PoolRef) getOrElse ""
      if (driver.nonEmpty && url.nonEmpty && poolRef.nonEmpty) {
        if (config.hasPath(poolRef)) {
          val poolInfo = getDbPoolInfo(poolRef)
          val dbInfo = DatabaseInfo(key, driver, url, poolRef)
          logger.debug(s"$poolRef|$poolInfo -> $dbInfo")
          val pool = DBPoolFactory.newPool(dbInfo, poolInfo)
          val dsKey = DataSourceKey(driver, url, poolRef)
          poolMap.put(dsKey, pool)
          dbName2DSKeyMap.put(key, dsKey)
        } else {
          logger.error(s"Database config of [${poolRef}] must be exist, please check !")
        }

      } else {
        logger.error(s"Database config of [${key}], 'driver' and 'url' and 'poolRef' must be valid, please check!")
      }

    })
    true
  }

  //读取连接池配置
  private def getDbPoolInfo(poolName: String)(implicit config: Config): DbPoolInfo = {

    def getConfigValue[A](keyPair: KeyAndDefaultValue[A]): A = RdkUtil.getConfigValue[A](poolName + keyPair.key) getOrElse keyPair.default
    //
    DbPoolInfo(
      getConfigValue[Int](MaxWait),
      getConfigValue[Int](InitSize),
      getConfigValue[Int](MaxActive),
      getConfigValue[Int](MinIdle),
      getConfigValue[Int](MaxIdle),
      getConfigValue[Int](MinEvicIdleTime),
      getConfigValue[Boolean](TestOnBorrow),
      getConfigValue[Boolean](RemoveAbandoned),
      getConfigValue[Int](RemoveAbandonedTimeout),
      getConfigValue[String](ValidationQuery)
    )

  }

   /*
    * 根据数据源名字，获取连接池对象
    * @param dataSourceName
    * @return
    */
  def getDbPool(dataSourceName: String): Option[DBPool] = {
    val fixedName = if (dataSourceName.startsWith("db.")) dataSourceName else "db." + dataSourceName
    dbName2DSKeyMap.get(fixedName).flatMap(poolMap.get(_))
  }

   /*
    * 根据数据源名字，删除数据源对象及其对应的连接池对象
    */
  def removeDBInfoByName(dbName: String) = {
    dbName2DSKeyMap.get(dbName).map(poolMap.remove(_))
    dbName2DSKeyMap.remove(dbName)
  }

}
