package test

/**
  * Created by 10054860 on 2016/8/8.
  */
object Ui extends App {
  val l  = (1 to 2).toList

  println(last(l))
  println(penultimate(l))

  def last[A](l: List[A]): A = {
    l match {
      case h :: Nil => h
      case _ :: y => last(y)
      case _ => throw new NoSuchElementException
    }
  }

  def penultimate[A](l: List[A]): A = {
    l match {
      case x :: _ :: Nil => x
      case _ :: y => penultimate(y)
      case _ => throw new NoSuchElementException
    }
  }
}
