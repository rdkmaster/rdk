package com.zte.vmax.rdk.mq

import com.zte.vmax.activemq.rdk.RDKActiveMQ
import com.zte.vmax.rdk.util.Logger

import scala.util.{Failure, Success, Try}

 /*
  * Created by 10054860 on 2016/7/28.
  */
trait MQCreator extends Logger {

  var opMQ: Option[RDKActiveMQ] = None

  def createActiveMQ: Try[RDKActiveMQ]

  //创建send类型的mq
  def withMQ(): Option[RDKActiveMQ] = {
    if (opMQ.isEmpty) {
      createActiveMQ match {
        case Success(it) => opMQ = Some(it)
        case Failure(ex) => logger.error("create mq error: ", ex)
      }
    }
    //尝试连接
    opMQ.map(it => if (it.isConnected == false) it.createConnection())
    opMQ
  }

  //释放资源
  def dispose(): Unit = {
    opMQ.map(it =>
      if (it.isConnected) {
        it.closeSession()
        it.closeConn()
        logger.debug("MQ connection closed.")
      })
    opMQ = None
  }

  def trySendP2P(subject: String, data: String): Unit = {
    logger.debug("begin trySendP2P, subject=" + subject)
    withMQ.map(mq => {
      Try {
        mq.sendP2PMsg(subject, data)
      } match {
        case Success(_) => logger.debug(s"send p2p msg subject=${subject} ok.")
        case Failure(ex) => logger.error("send p2p msg error: ", ex)
      }
    })
  }

  def trySendTopic(subject: String, data: String, persistMode: Int): Unit = {

    logger.debug("trySendTopic, subject=" + subject + ", persistMode=" + persistMode + "  (1:non_persist,2:persist)")
    withMQ.map(mq => {
      Try {
        mq.sendTopicMsg(subject, persistMode, data)
      } match {
        case Success(_) => logger.debug(s"send topic :${subject} ok.")

        case Failure(ex) => logger.error(s"send topic :${subject} failed. ${ex.getMessage}")

      }
    })

  }
}
