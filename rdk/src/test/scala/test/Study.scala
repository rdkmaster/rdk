package test

import scala.annotation.{switch, tailrec}

/**
  * Created by 10054860 on 2016/8/9.
  */
 import scala.language.dynamics


class DynImpl extends Dynamic {
  var map = Map.empty[String, Any]
  def selectDynamic(name: String) = map.get(name)
  def updateDynamic(name: String)(value: Any) {
    map += name -> value
  }
  def applyDynamic(name: String)(args: Any*) = s"method '$name' called with arguments ${args.mkString("'", "', '", "'")}"
  def applyDynamicNamed(name: String)(args: (String, Any)*) = s"method '$name' called with arguments ${args.mkString("'", "', '", "'")}"
}


object Study extends App {

  val d = new DynImpl
  println(d.foo)
  d.foo = 10
  println(d.foo)
  println(d.ints(1, 2, 3))
  println(d.ints(i1 = 1, i2 = 2, 3))

}
