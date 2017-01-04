package com.zte.vmax.rdk.util

/**
 * Created by 10184092 on 2016/12/29.
 */
trait ShellExecutor extends Logger{

  /**
   * 执行命令行，获取返回值
   * @param cmd 命令字符串，如 “ls -al”
   * @return
   */
  def getReturnCode(cmd: String): Either[Int,String]
  /**
   * 执行命令行，获取返回值
   * @param cmd 命令Seq，如Seq("ls", "-a", "-l")
   * @return
   */
  def getReturnCode(cmd: Seq[String]):  Either[Int,String]

  /**
   * 执行命令行，获取返回值
   * @param cmd 命令字符串，如 “ls -al”
   * @return
   */
  def getOutputLines(cmd:String):Option[String]

  /**
   * 执行命令行，获取返回值
   * @param cmd 命令Seq，如Seq("ls", "-a", "-l")
   * @return
   */
  def getOutputLines(cmd: Seq[String]):Option[String]
}
