package com.zte.vmax.rdk.actor

import akka.actor.Actor
import com.zte.vmax.rdk.Async.AsyncTaskMessages.{AsyncRunError, AsyncRunMessage, AsyncRunMsg_ReadToken}
import com.zte.vmax.rdk.cache.AgingCache
import com.zte.vmax.rdk.util.{Logger, RdkUtil}

import scala.concurrent.duration._

object ActorStatus extends Enumeration {
  type STATUS = Value
  val RUNNING = Value("Running")
  val FINISHED = Value("Finished")
  val KILLED = Value("Killed")
}

class AsyncRun extends Actor with Logger {
  //缓存超时时间
  val ttl = 24 * 60 * 60;

  import context._

  context.system.scheduler.scheduleOnce(4 hour) {
    logger.debug("AsyncRun stopped by timer")
    context.stop(self)
  }

  override def postStop(): Unit = {
    AgingCache.put("asyncActor_" + self.path.name + "_status", ActorStatus.KILLED, ttl, null)
  }

  override def receive: Receive = {
    case AsyncRunMsg_ReadToken(AsyncRunMessage(scriptObjectMirror, context), remoteToken) => {

      //将remote token返回给application，以便后续读取结果/状态使用
      val remoteTokenString = RdkUtil.toJsonString(remoteToken)
      sender() ! remoteTokenString
      AgingCache.put("asyncActor_" + self.path.name + "_status", ActorStatus.RUNNING, ttl, null)

      //调用异步方法
      try {
        scriptObjectMirror.call(context, self.path.name.toString)
      } catch {
        case e: Exception => {
          //因为之前已经给sender发送过 RemoteToken了，sender 的await也会因此返回，即认为callback成功，因此此时即使出错,
          //也没有必要向sender发送AsyncRunError
          val errorMsg = "AsyncRunMsg_ReadToken: AsyncRun failed with: " +  e.getMessage
          logger.error(s"${errorMsg} for ${remoteTokenString}")
        }
      }
      AgingCache.put("asyncActor_" + self.path.name + "_status", ActorStatus.FINISHED, ttl, null)
      logger.info("Finished async callback")
    }
    case _ => {
      logger.debug("AsyncRunMsg_ReadToken: AsyncRun received unknown message")
    }
  }
}
