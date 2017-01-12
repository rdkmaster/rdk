package com.zte.vmax.rdk.util

import scala.sys.process._

/**
 * Created by 10184092 on 2016/12/29.
 */
object ShellExecutorImp extends ShellExecutor {

  private def _getLines(cmd: ProcessBuilder): Option[String] = {
    try {
      logger.debug(cmd.toString)
      val output = (cmd.!!).trim
      logger.debug(output)
      Some(output)
    } catch {
      case x: Throwable => logger.error(x.toString); None
    }
  }

  private def _getExitCode(cmd: ProcessBuilder): Either[Int, String] = {
    try {
      logger.debug(cmd.toString)
      Left(cmd.!)
    } catch {
      case x: Throwable => logger.error(x.toString); Right(x.getMessage)
    }
  }

  /**
   * 执行命令行，获取返回值
   * @param cmd 命令字符串，如 “ls -al”
   * @return
   */
  def getReturnCode(cmd: String): Either[Int, String] = _getExitCode(cmd)

  /**
   * 执行命令行，获取返回值
   * @param cmd 命令Seq，如Seq("ls", "-a", "-l")
   * @return
   */
  def getReturnCode(cmd: Seq[String]): Either[Int, String] = _getExitCode(cmd)

  /**
   * 执行命令行，获取返回值
   * @param cmd 命令字符串，如 “ls -al”
   * @return
   */
  def getOutputLines(cmd: String): Option[String] = _getLines(cmd)

  /**
   * 执行命令行，获取返回值
   * @param cmd 命令Seq，如Seq("ls", "-a", "-l")
   * @return
   */
  def getOutputLines(cmd: Seq[String]): Option[String] = _getLines(cmd)

}
