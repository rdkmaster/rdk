package com.zte.vmax.rdk.actor

import akka.actor.{Actor, Props}
import com.zte.vmax.rdk.Async.AsyncTaskMessages._
import com.zte.vmax.rdk.RdkServer
import com.zte.vmax.rdk.cache.AgingCache
import com.zte.vmax.rdk.config.Config
import com.zte.vmax.rdk.util.RdkUtil.json2Object
import com.zte.vmax.rdk.util.{Logger, RdkUtil}
import java.net.InetAddress

@edu.umd.cs.findbugs.annotations.SuppressWarnings(
  value = Array("RCN_REDUNDANT_NULLCHECK_OF_NONNULL_VALUE"),
  justification = "false alarm")
class Async extends Actor with Logger {
  //scalastyle:off cyclomatic.complexity method.length
  val remoteActorSystemPrefix = "akka.tcp://rdk-server-remote@"
  val remoteActorSystemSuffix = RdkServer.remoteConfig.getString("akka.remote.netty.tcp.port") + "/user/asyncActor"
  override def receive: Receive = {
    case msg: AsyncRunMessage => {
      //构造remote token
      var asyncRunActorName = RdkUtil.genUUID
      var errorMsg = ""
      var hostIp = Config.get("http.server.ip", "") match {
        case "localhost" | "" => {
          errorMsg = "AsyncRunMessage: failed to get host IP during async run"
          ""
        }
        case ip : String => {
          val inetAddress = InetAddress.getByName(ip.toString)
          if(!inetAddress.isReachable(5000)) errorMsg = "AsyncRunMessage: host IP " + ip + " is not reachable during async run"
          ip
        }
      }
      if (errorMsg == "") {
          val remoteToken = RemoteToken(asyncRunActorName, hostIp)
          //创建一个async run actor执行异步任务
          val asyncRunActor = context.actorOf(Props[AsyncRun], asyncRunActorName)
          asyncRunActor.forward(AsyncRunMsg_ReadToken(msg, remoteToken))
      } else {
        sender() ! AsyncRunError(errorMsg)
        logger.error(s"${errorMsg}")
      }
    }
    case AsyncGetMessageLocalToken(remoteTokenString, deleteAfterRead) => {
      val remoteToken = json2Object[RemoteToken](remoteTokenString).orNull
      if (remoteToken != null) {
        //
        //此处去掉了try catch是因为以下两个语句都不会抛出异常，如果目标地址不合法或目标actor已死，只会打一条
        //RemoteActorRefProvider$RemoteDeadLetterActorRef 类似的log，因此感觉没有必要try catch 浪费性能
        //
        //根据远程ip和actor名，获取远程actor的引用
        val remoteUrl = remoteActorSystemPrefix + remoteToken.hostIp + ":" +  remoteActorSystemSuffix
        logger.info(s"AsyncGetMessageLocalToken: ${remoteUrl}")
        context.actorSelection(remoteUrl).forward(AsyncGetMessageRemoteToken(remoteToken.actorName, deleteAfterRead))
      }
      else {
        val errorMsg = "AsyncGetMessageToken: the remote token for async read is invalid"
        sender() ! AsyncGetMessageError(errorMsg)
        logger.error(s"${errorMsg}, message detais-${remoteTokenString}")
      }
    }
    //获取异步调用的结果
    case AsyncGetMessageRemoteToken(actorName, deleteAfterRead) => {
      //数据量特别多的情况
      val result = AgingCache.get(actorName, null)

      if (result != null) {
        try
          sender() ! RdkUtil.toJsonString(result)
        catch {
          case ex: Exception => {
            val errorMsg = "AsyncGetMessage: fail to convert result to json: " + ex.getMessage
            sender() ! AsyncGetMessageError(errorMsg)
            logger.error(s"${errorMsg}, message detais ${actorName}")
          }
        }
        logger.info(s"AsyncGetMessage : actorName ${actorName}, deleteAfterRead ${deleteAfterRead}")

        if (deleteAfterRead) {
          AgingCache.remove(actorName)
        }
      } else {
        val errorMsg = "AsyncGetMessage: get async result failed with null result"
        sender() ! AsyncGetMessageError(errorMsg)
        logger.error(s"${errorMsg}, message detais ${actorName}")
      }
    }
    //获取异步调用的状态
    case AsyncCheckStatusLocalToken(remoteTokenString, deleteAfterCheckStatus) => {
      val remoteToken = json2Object[RemoteToken](remoteTokenString).orNull
     //同38行
      if (remoteToken != null) {
        val remoteUrl = remoteActorSystemPrefix  + remoteToken.hostIp + ":" +  remoteActorSystemSuffix
        logger.info(s"AsyncCheckStatusLocalToken: ${remoteUrl}")
        context.actorSelection(remoteUrl).forward(AsyncCheckStatusRemoteToken(remoteToken.actorName, deleteAfterCheckStatus))
      }
      else {
        val errorMsg = "AsyncCheckStatusToken: the remote token for async check status is invalid"
        sender() ! AsyncCheckStatusError(errorMsg)
        logger.error(s"${errorMsg}, message detais: ${remoteTokenString}")
      }
    }
    case AsyncCheckStatusRemoteToken(actorName, deleteAfterCheckStatus) => {
      val result = AgingCache.get("asyncActor_" + actorName + "_status", null)
      if (result != null) {
        sender() ! result
        logger.info(s"AsyncCheckStatus : actorName ${actorName}, deleteAfterCheckStatus ${deleteAfterCheckStatus}")

        if (deleteAfterCheckStatus && "Finished".equals(result.toString)) {
          AgingCache.remove("asyncActor_" + actorName + "_status")
        }
      } else {
        val errorMsg = "AsyncCheckStatus: get actor status failed with null result"
        sender() ! AsyncCheckStatusError(errorMsg)
        logger.error(s"${errorMsg} for ${actorName}")
      }
    }
  }
  //scalastyle:off cyclomatic.complexity method.length

}

