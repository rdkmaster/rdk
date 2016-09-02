package test.mock.mq

import javax.jms.{Destination, TextMessage, Message, MessageListener}

import akka.actor.ActorRef
import com.zte.vmax.activemq.rdk.{RDKMessage, RDKActiveMQ}

/**
  * Created by 10054860 on 2016/8/23.
  */
class BaseRDKActiveMQMock(ip: String, port: String,actor:ActorRef) extends RDKActiveMQ(ip, port) {
  override def rcvTopicNonPersistentMsgWithSelector(topicName: String, listener: MessageListener, selector: String) = super.rcvTopicNonPersistentMsgWithSelector(topicName, listener, selector)

  override def rcvTopicNonPersistentMsg(topicName: String, listener: MessageListener) = {

    actor ! topicName
  }


  override def rcvTopicPersistentMsg(topicName: String, listener: MessageListener) = super.rcvTopicPersistentMsg(topicName, listener)

  override def rcvP2PMsgWithSelector(queueName: String, listener: MessageListener, selector: String) = super.rcvP2PMsgWithSelector(queueName, listener, selector)

  override def rcvTopicPersistentMsgWithSelector(topicName: String, listener: MessageListener, selector: String) = super.rcvTopicPersistentMsgWithSelector(topicName, listener, selector)

  override def rcvP2PMsg(queueName: String, listener: MessageListener) = {

  }

  override def createConnection() = super.createConnection()

  override def rpc(queueName: String, content: String, timeout: Int) : Message = {
    new TextMessage {def setText(s: String) = ???

      def getText = "ok"

      def setJMSExpiration(l: Long) = ???

      def acknowledge() = ???

      def setJMSPriority(i: Int) = ???

      def setShortProperty(s: String, i: Short) = ???

      def getJMSDestination = ???

      def setJMSDestination(destination: Destination) = ???

      def propertyExists(s: String) = ???

      def getBooleanProperty(s: String) = ???

      def setJMSDeliveryMode(i: Int) = ???

      def getJMSMessageID = ???

      def clearBody() = ???

      def getByteProperty(s: String) = ???

      def getPropertyNames = ???

      def getObjectProperty(s: String) = ???

      def setByteProperty(s: String, b: Byte) = ???

      def setObjectProperty(s: String, o: scala.Any) = ???

      def setJMSMessageID(s: String) = ???

      def getIntProperty(s: String) = ???

      def getJMSCorrelationIDAsBytes = ???

      def getJMSPriority = ???

      def getJMSTimestamp = ???

      def setJMSCorrelationID(s: String) = ???

      def getFloatProperty(s: String) = ???

      def getJMSReplyTo = ???

      def getJMSDeliveryMode = ???

      def setStringProperty(s: String, s1: String) = ???

      def getJMSType = ???

      def setJMSTimestamp(l: Long) = ???

      def getStringProperty(s: String) = ???

      def clearProperties() = ???

      def getJMSExpiration = ???

      def setJMSCorrelationIDAsBytes(bytes: Array[Byte]) = ???

      def getLongProperty(s: String) = ???

      def setJMSType(s: String) = ???

      def getShortProperty(s: String) = ???

      def getJMSCorrelationID = ???

      def setLongProperty(s: String, l: Long) = ???

      def setBooleanProperty(s: String, b: Boolean) = ???

      def setIntProperty(s: String, i: Int) = ???

      def setJMSReplyTo(destination: Destination) = ???

      def setDoubleProperty(s: String, v: Double) = ???

      def getDoubleProperty(s: String) = ???

      def setFloatProperty(s: String, v: Float) = ???

      def getJMSRedelivered = ???

      def setJMSRedelivered(b: Boolean) = ???
    }
  }

  override def createDurableConnection() = super.createDurableConnection()

  override def sendTopicMsgWithSelector(topicName: String, deliveryMode: Int, content: String, SelectorName: String, SelectorValue: String) = super.sendTopicMsgWithSelector(topicName, deliveryMode, content, SelectorName, SelectorValue)

  override def sendP2PMsg(queueName: String, content: String):Unit = {
    actor ! queueName
  }


  override def sendTopicMsg(topicName: String, deliveryMode: Int, content: String) = {
    actor ! topicName
  }

  override def closeConn() = super.closeConn()

  override def closeSession() = super.closeSession()

  override def sendP2PMsgWithSelector(queueName: String, content: String, SelectorName: String, SelectorValue: String) = super.sendP2PMsgWithSelector(queueName, content, SelectorName, SelectorValue)
}
