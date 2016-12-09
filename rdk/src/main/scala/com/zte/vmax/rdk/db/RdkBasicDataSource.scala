package com.zte.vmax.rdk.db

import org.apache.tomcat.dbcp.dbcp.DriverConnectionFactory
import java.sql.Driver
import java.sql.DriverManager
import java.sql.SQLException

import com.zte.vmax.rdk.util.Logger
import org.apache.tomcat.dbcp.dbcp.{BasicDataSource, ConnectionFactory}

/**
  * Created by 10054860 on 2016/11/22.
  */
class RdkBasicDataSource extends BasicDataSource with Logger {
  @throws[SQLException]
  override protected def createConnectionFactory: ConnectionFactory = {

    if (this.validationQuery == null) {
      this.setTestOnBorrow(false)
      this.setTestOnReturn(false)
      this.setTestWhileIdle(false)
    }
    if (this.username != null) {
      this.connectionProperties.put("user", this.username)
    }

    if (this.password != null) {
      this.connectionProperties.put("password", this.password)
    }

    try {
      val driver = Class.forName(this.driverClassName, true, this.driverClassLoader).newInstance.asInstanceOf[Driver]
      DriverManager.registerDriver(driver)
      new DriverConnectionFactory(driver, this.url, this.connectionProperties)
    }
    catch {
      case e: Throwable => {
        logger.error(e.getMessage)
        throw new SQLException(e.getMessage)
      }
    }


  }

  def getParentLogger = null
}
