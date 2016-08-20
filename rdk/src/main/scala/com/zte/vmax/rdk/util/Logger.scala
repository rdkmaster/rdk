package com.zte.vmax.rdk.util


import org.slf4j.LoggerFactory

trait Logger {
  protected val logger = LoggerFactory.getLogger(this.getClass.getName)

  protected def appLogger(appName: String) = LoggerFactory.getLogger(if (appName == null) this.getClass.getName else appName)

}
