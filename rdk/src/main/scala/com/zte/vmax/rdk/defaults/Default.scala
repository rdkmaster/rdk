package com.zte.vmax.rdk.defaults

/**
  * Created by 10054860 on 2016/5/11.
  */


object RequestMethod {

  val GET: String = "get"
  val PUT: String = "put"
  val POST: String = "post"
  val DELETE: String = "delete"

}

object Misc {
  val GlobalCache = "__Global__Cache__"
  val routeDispatcher = "route-dispatcher"
  val router = "router"
  val active_mq_dispatcher = "active-mq-dispatcher"
  val p2p_router = "p2p-router"
  val subscribe_router = "subscribe-router"
  val blocking_io_dispatcher ="blocking-io-dispatcher"
  val monitorFile = "proc/monitor/list.conf"
}

object Const {
  val uploadFileDir = "upload_files/"
}
