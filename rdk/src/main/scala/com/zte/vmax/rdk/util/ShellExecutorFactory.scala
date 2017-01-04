package com.zte.vmax.rdk.util

/**
 * Created by 10184092 on 2016/12/29.
 */
object ShellExecutorFactory {
  import scala.collection.mutable.Map
  private val map:Map[AnyRef,ShellExecutor]=Map[AnyRef,ShellExecutor]()
  def register(key:AnyRef,shell:ShellExecutor): Unit ={
    map(key) = shell
  }
  def get(key:AnyRef):ShellExecutor={
    map.getOrElse(key,ShellExecutorImp)
  }
}
