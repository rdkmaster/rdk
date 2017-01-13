package com.zte.vmax.rdk.util

import scala.sys.process.ProcessBuilder

/**
 * Created by 10184092 on 2016/12/29.
 */
trait ShellExecutor extends Logger {

  /**
   * 执行命令行，获取返回值
   * @param cmd 命令Seq，如 “ls -al” 或者 Seq("ls", "-a", "-l")
   * @return
   */
  def getReturnCode(cmd: ProcessBuilder): Either[Int, String]

  /**
   * 执行命令行，获取返回值
   * @param cmd 命令字符串，如 “ls -al” 或者 Seq("ls", "-a", "-l")
   * @return
   */
  def getOutputLines(cmd: ProcessBuilder): Option[String]

}
