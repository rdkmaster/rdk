package com.zte.vmax.rdk.monitor

import com.zte.vmax.rdk.util.Logger

/**
  * Created by 10054860 on 2016/8/18.
  */
object MemoryUsage extends Logger {

  case class MemoryInfo(total: Long, free: Long, useRatio: Double,timeStamp:Long)

  def getMemoryInfo: MemoryInfo = {
    val total = Runtime.getRuntime.maxMemory()
    val free = Runtime.getRuntime.freeMemory()
    val useRatio = 1.0 - (free * 1.0 / total * 1.0)
    MemoryInfo(total, free, useRatio,System.currentTimeMillis())

  }
}
