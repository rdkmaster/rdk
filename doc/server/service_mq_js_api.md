<rdk_title>Rest服务中的消息队列API</rdk_title>


RDK可以利用ActiveMQ与其他进程实现通信，可以给任意进程或者其他RDK应用发送任意消息，也可以监听其他进程或者其他RDK应用的消息。

RDK的 `mq` 变量提供了一组处理消息的函数：

###  `mq.p2p()` {#mq_p2p}

可以利用该函数发送一个p2p消息。

定义：

	function p2p(subject, message);

参数：

- subject 字符串。消息主题。
- message 字符串。消息内容。

返回：undefined。

说明：往消息队列中发出一个**点对点消息**，注意，点对点消息只用于一个主题监听者的情形，如果有多个监听者，则系统会随机挑选一个监听者来处理消息，其他的监听者均不会收到该消息。

点对点消息比较可靠，并且节约系统资源，应该优先选择。

如果是一个主题多个监听者，请采用 [`mq.broadcast()`](#mq_bc) 来发。

下面是一个示例：

	mq.p2p('my_subject', 'hello mq!')

只要有人监听了这个主题，那它就可以收到这个消息啦。

###  `mq.rpc()` {#mq_rpc}
可利用函数实现一个将异步的消息转为同步等待的场景。

定义：

	function rpc(subject, replySubject, message, timeout)

参数：

- subject 字符串。发送消息主题。
- replySubject 字符串。接收消息主题。
- message 字符串。发送消息内容。
- timeout 整型数字。等待超时时间,单位为秒。

返回：对端发来的字符串，异常时返回空字符串。

说明：

有些时候，我们发出消息之后，期望得到对方的应答，则可以使用下面的代码

	var reply = mq.rpc('my_subject.req','my_subject.ack', 'hello mq!',5)

对端应答的数据会直接返回给reply变量，并且应用会一直等待到对方应答或者超时为止。超时以后，reply的值为空字符串。

注意到请求的主题是 `my_subject.req`，应答的主题是 `my_subject.ack`，这个方式是RDK推荐的，把请求和应答的主题分开，分别使用req和ack标识。


###  `mq.broadcast()` {#mq_bc}
可用来发布一个广播类型的消息。

定义：

	function broadcast(subject, message);

参数：

- subject 字符串。消息主题。
- message 字符串。消息内容。

返回：undefined。

往消息队列中发出一个**广播消息**。与 [`mq.p2p()`](#mq_p2p) 功能非常类似，区别在于用此函数发出的主题可以被多个监听者同时处理。

	mq.broadcast('my_subject.req', 'hello mq!')

###  `mq.subscribe()` {#mq_sub}
用来订阅用户感兴趣的主题，一但监听到该主题的消息即可调用用户自定义函数进行处理。

定义：

	function subscribe(topic,callbackFunctionName, jsfile);

参数：

- topic 字符串。消息主题。
- callbackFunctionName 字符串。处理该消息导出对象属性名。
- jsfile 字符串，回调函数所在js文件名，注意该文件默认相对路径为你应用的server目录，若该js文件位于server的子目录下，则应将相对server的目录也带上，比如js文件位于app/example/server/sss/callback.js，则参数应取值为"sss/callback.js"。
 

返回：调用该回调函数返回的值对应的json串。

`callbackFunctionName` 导出对象的属性名很重要，它是使用 [`mq.unsubscribe()`](#mq_unsub) 取消订阅主题的一个标志。

示例：
   
   比如example应用需要订阅主题为“rdk_Message”的消息，并在回调函数callback中打印监听到的消息。
由于我们希望订阅的执行过程只执行一次，因此我们可以在example应用下的[init.js](#init)中编写订阅代码：

	(function () {
		function _init_() {
			mq.subscribe("rdk_Message","callback","callback.js");
		}
		return {
			init: _init_
		}
	})();
   
接下来就可以在该应用的server目录下新建一个callback.js文件，并编写回调函数代码：

	(function () {
	    function _callback(msg) {
	        log("message recvived:"+msg.body)
	    }
	    return {
	        callback: _callback,
	    }
    })();

### `mq.unsubscribe()` {#mq_unsub}
用来取消已经订阅的主题。
定义：

	function unsubscribe(topic,callbackFunctionName, jsfile);

参数：

- topic 字符串。消息主题。
- callbackFunctionName 字符串。处理该消息导出对象属性名。
- jsfile 字符串，回调函数所在js文件名，注意该文件默认相对路径为你应用的server目录，若该js文件位于server的子目录下，则应将相对server的目录也带上，比如js文件位于app/example/server/sss/callback.js，则参数应取值为"sss/callback.js"。

返回：undefined。

