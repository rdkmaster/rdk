package com.zte.vmax.rdk.util

/**
  * Created by 10054860 on 2016/7/11.
  */
trait KeyTrait[A] {
  def key: A
}

trait HashTrait[Key, Value] {
  private var _map: Map[Key, Value] = Map()

  def get(k: Key): Option[Value] = _map.get(k)

  def put(k: Key, v: Value): Unit = {
    synchronized {
      _map = _map + ((k, v))
    }
  }

  def insert(map: Map[Key, Value]): Unit = {
    synchronized {
      map.foreach(x => put(x._1, x._2))
    }
  }

  def remove(k: Key): Unit = {
    synchronized {
      _map = _map - k
    }
  }

  def clear = {
    synchronized {
      _map = Map()
    }
  }
  def isEmpty ={
    _map.isEmpty
  }

  def getKeys = {
    synchronized {
      _map.keys
    }
  }

  def getValues = {
    synchronized {
      _map.values
    }
  }

  def getMap = {
    synchronized{
      _map
    }
  }

}