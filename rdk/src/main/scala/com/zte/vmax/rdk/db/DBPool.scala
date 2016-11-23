package com.zte.vmax.rdk.db

import java.sql.Connection
import javax.sql.{DataSource => SqlDataSource}

import com.zte.vmax.rdk.db.Defines.{DatabaseInfo, DbPoolInfo}

import com.zte.vmax.rdk.loader.RdkClassLoader
import com.zte.vmax.rdk.util.Logger

/**
  * Created by 10054860 on 2016/9/20.
  */
trait DBPool {
  def getConnection: Option[Connection]
}

object DBPoolFactory {

  def newPool(dbInfo: DatabaseInfo, poolInfo: DbPoolInfo): DBPool = {
    new DbcpConnectionPool(dbInfo, poolInfo)
  }
}

private class DbcpConnectionPool(dbInfo: DatabaseInfo, poolInfo: DbPoolInfo) extends DBPool with Logger {
  private lazy val dataSource: SqlDataSource = initDataSource

  def initDataSource: SqlDataSource = {
    val bs: RdkBasicDataSource = new RdkBasicDataSource
    bs.setDriverClassLoader(RdkClassLoader)
    bs.setDriverClassName(dbInfo.driver)
    bs.setUrl(dbInfo.url)

    // 获取连接最大等待时长（ms）
    bs.setMaxWait(poolInfo.maxWait)
    // 数据库初始化时，创建的连接个数
    bs.setInitialSize(poolInfo.initialSize)
    // 最大活跃连接数
    bs.setMaxActive(poolInfo.maxActive)
    // 最小空闲连接数
    bs.setMinIdle(poolInfo.minIdle)
    // 数据库最大空闲连接数
    bs.setMaxIdle(poolInfo.maxIdle)
    // 空闲连接60秒中后释放
    bs.setMinEvictableIdleTimeMillis(poolInfo.minEvictableIdleTime)
    // 在获取连接的时候检查有效性, 默认false
    bs.setTestOnBorrow(poolInfo.testOnBorow)
    //回收泄露连接
    bs.setRemoveAbandoned(poolInfo.removeAbandoned)
    //回收泄露连接时长
    bs.setRemoveAbandonedTimeout(poolInfo.removeAbandonedTimeout)
    bs
  }

  def getConnection: Option[Connection] = {
    try {
      Some(dataSource.getConnection)
    } catch {
      case e: Exception =>
        logger.error(e.getMessage)
        None
    }

  }

}