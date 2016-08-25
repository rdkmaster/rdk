package com.zte.vmax.rdk.monitor

import akka.actor.{ActorRef, Actor}
import com.zte.vmax.rdk.actor.Messages.{GetMemory, MemoryOverrunRestore, MemoryOverrunAlarm}
import com.zte.vmax.rdk.monitor.MemoryUsage.MemoryInfo

import com.zte.vmax.rdk.util.Logger
import scala.concurrent.duration._
import com.zte.vmax.rdk.config.Config

/**
  * Created by 10054860 on 2016/8/18.
  */
class MemMonitor(alamListener: ActorRef) extends Actor with Logger {

  //是否启用
  val enable = Config.getBool("memory.overrun.check.enable", false)

  //检查间隔
  val interval = Config.getInt("memory.overrun.check.interval", 5)
  //连续超限次数
  val maxCount = Config.getInt("memory.overrun.count", 3)
  //阈值上限
  val threshold = Config.get("memory.overrun.threshold", "0.95").toDouble

  import context._

  if(enable){
    context.system.scheduler.schedule(20 seconds, interval seconds) {
      self ! "CheckMemory"
    }
  }


  //采样数据
  private var sampleValue: List[MemoryInfo] = Nil

  private def alarmReceive: Receive = {
    case "CheckMemory" =>
      val memInfo = MemoryUsage.getMemoryInfo
      logger.debug(formatMemInfo(memInfo))
      sampleValue = sampleValue :+ memInfo
      if (sampleValue.length >= maxCount) {
        sampleValue = sampleValue.takeRight(maxCount)
        if (sampleValue.forall(_.useRatio >= threshold)) {
          logger.warn(formatMemInfo(memInfo))
          alamListener ! MemoryOverrunAlarm
          Runtime.getRuntime.gc()
          logger.warn("call gc")
          sampleValue = Nil
          become(restoreReceive)
        }
      }
  }

  private def restoreReceive: Receive = {
    case "CheckMemory" =>
      val memInfo = MemoryUsage.getMemoryInfo
      logger.debug(formatMemInfo(memInfo))
      if (memInfo.useRatio < threshold) {
        logger.warn(formatMemInfo(memInfo))
        alamListener ! MemoryOverrunRestore
        become(alarmReceive)
      }

  }

  override def receive: Receive = alarmReceive


  def formatMemInfo(mem: MemoryInfo): String = {
    val unit = 1024.0 * 1024.0
    ">>>>>>>Total:%.1fM,free:%.1fM,useRatio:%.1f%%,threshold:%.1f%%<<<<<<<<<".format(mem.total / unit,
      mem.free / unit, mem.useRatio * 100,threshold *100)
  }


}
