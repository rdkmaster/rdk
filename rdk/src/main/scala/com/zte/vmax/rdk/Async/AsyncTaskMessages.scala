package com.zte.vmax.rdk.Async

import jdk.nashorn.api.scripting.ScriptObjectMirror

@edu.umd.cs.findbugs.annotations.SuppressWarnings(
  value = Array("ST_WRITE_TO_STATIC_FROM_INSTANCE_METHOD"),
  justification = "false alarm")
object AsyncTaskMessages {
  /*
 * RemoteToken 含有获取远程actor引用的关键信息
 * @param actorName   远程actor的名字
 * @param hostIp    远程主机的IP地址
 */
  case class RemoteToken(actorName: String, hostIp: String)

  /*
 * @param scriptObjectMirror    远程调用的JS实体
 * @param context   远程调用的参数
 */
  case class AsyncRunMessage(scriptObjectMirror: ScriptObjectMirror, context: AnyRef)

  /*
 * 发送给Async run actor的消息
 */
  case class AsyncRunMsg_ReadToken(msg: AsyncRunMessage, remoteToken: RemoteToken)

  /*
  * 执行异步任务失败返回的消息
  * @param   hostIp  错误发生的主机
  * @param   callback  异步执行函数的具体信息
  * @param   errorMsg  错误的具体内容
  */
  case class AsyncRunError(errorMsg: String)

  /*
 * 检查Remote Run Actor的状态
 * @param   remoteToken RemoteToken序列化之后的String对象
 */
  case class AsyncCheckStatusLocalToken(remoteToken: String, deleteAfterCheckStatus: Boolean)

  /*
 * @param   actorName 根据actor名字从AgingCahe里获取异步actor的状态
 */
  case class AsyncCheckStatusRemoteToken(actorName: String, deleteAfterCheckStatus: Boolean)

  /*
 * 获取异步状态失败返回的消息
 * @param   errorMsg  错误的具体内容
 */
  case class AsyncCheckStatusError(errorMsg: String)

  /*
 * 读取异步调用的结果
 * @param   remoteToken RemoteToken序列化之后的String对象
 */
  case class AsyncGetMessageLocalToken(remoteToken: String, deleteAfterRead: Boolean)

  /*
 * @param   actorName 根据actor名字从AgingCahe里获取异步actor的结果
 */
  case class AsyncGetMessageRemoteToken(actorName: String, deleteAfterRead: Boolean)

  /*
 * 获取异步结果失败返回的消息
 * @param   errorMsg  错误的具体内容
 */
  case class AsyncGetMessageError(errorMsg: String)

}
