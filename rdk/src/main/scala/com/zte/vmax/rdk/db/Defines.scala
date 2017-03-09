package com.zte.vmax.rdk.db

/**
  * Created by 10054860 on 2016/9/20.
  */
object Defines {

  /**
    * @param maxWait                获取连接最大等待时长（ms）
    * @param initialSize            数据库初始化时，创建的连接个数
    * @param maxActive              最大活跃连接数
    * @param minIdle                最小空闲连接数
    * @param maxIdle                数据库最大空闲连接数
    * @param minEvictableIdleTime   空闲连接n秒中后释放
    * @param testOnBorow            在获取连接的时候检查有效性, 默认true
    * @param removeAbandoned        回收泄露连接
    * @param removeAbandonedTimeout 回收泄露连接时长(s)
    */
  case class DbPoolInfo(maxWait: Int, initialSize: Int, maxActive: Int, minIdle: Int, maxIdle: Int,
                        minEvictableIdleTime: Int, testOnBorow: Boolean, removeAbandoned: Boolean,
                        removeAbandonedTimeout: Int,validationQuery:String) {

    override def toString: String = {
      s"DbPoolInfo(maxWait: $maxWait, initialSize: $initialSize, " +
        s"maxActive: $maxActive, minIdle: $minIdle, maxIdle: $maxIdle,minEvictableIdleTime: $minEvictableIdleTime, " +
        s"testOnBorow: $testOnBorow, removeAbandoned: $removeAbandoned, " +
        s"removeAbandonedTimeout: $removeAbandonedTimeout ,validationQuery=$validationQuery )"
    }

  }


  /**
    *
    * @param name   数据源名称
    * @param driver 驱动
    * @param url    jdbc url
    */
  case class DatabaseInfo(name: String, driver: String, url: String, poolRef: String)

  /**
    * 数据源主键
    * @param driver  驱动
    * @param url      jdbc url
    * @param poolName 连接池名字
    */
  case class DataSourceKey(driver: String, url: String, poolName: String)

}
