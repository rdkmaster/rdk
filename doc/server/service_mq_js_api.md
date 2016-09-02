<rdk_title>Rest服务中的消息队列API</rdk_title>


RDK可以利用ActiveMQ与其他进程实现通信，可以给任意进程或者其他RDK应用发送任意消息，也可以监听其他进程或者其他RDK应用的消息。

RDK的 `mq` 变量提供了一组处理消息的函数：

###  `mq.p2p()` {#mq_p2p}

定义：

	function p2p(subject, message);

参数：

- subject 字符串。消息主题。
- message 字符串。消息内容。

返回：一个Sequence对象，一般无需关注它。

说明：往消息队列中发出一个**点对点消息**，注意，点对点消息只用于一个主题监听者的情形，如果有多个监听者，则系统会随机挑选一个监听者来处理消息，其他的监听者均不会收到该消息。

点对点消息比较可靠，并且节约系统资源，应该有限选择。

如果是一个主题多个监听者，请采用 [`mq.broadcast()`](#mq_bc) 来发。

下面是一个示例：

	mq.p2p('my_subject', 'hello mq!')

只要有人监听了这个主题，那它就可以收到这个消息啦。

有些时候，我们发出消息之后，期望得到对方的应答，则可以使用下面的代码

	var reply = mq.p2p('my_subject.req', 'hello mq!').wait('my_subject.ack', 5000)

对端应答的数据会直接返回给reply变量，并且应用会一直等待到对方应答或者超时为止。超时以后，reply的值为null（而非undefined）。

注意到请求的主题是 `my_subject.req`，应答的主题是 `my_subject.ack`，这个方式是RDK推荐的，把请求和应答的主题分开，分别使用req和ack标识。


###  `mq.broadcast()` {#mq_bc}

定义：

	function broadcast(subject, message, persit);

参数：

- subject 字符串。消息主题。
- message 字符串。消息内容。
- persit 布尔值。是否发送持久化消息，暂未启用。

返回：一个Sequence对象，一般无需关注它。

往消息队列中发出一个**广播消息**。与 [`mq.p2p()`](#mq_p2p) 功能非常类似，区别在于用此函数发出的主题可以被多个监听者同时处理。同样的，也支持等待应答：

	var reply = mq.broadcast('my_subject.req', 'hello mq!').wait('my_subject.ack', 5000)

注意，只要众多的监听者中，谁发出的应答先被接收，则会得到该应答的值，其他的应答会被无视。


###  `mq.subscribe()` {#mq_sub}

定义：

	function subscribe(subject, callback, context);

参数：

- subject 字符串。消息主题。
- callback 函数。处理该消息的函数，**不允许使用匿名函数**，否则报错。
- context 对象，可选。`callback` 执行的上下文对象。

返回：无。

监听一个消息主题，可以监听点对点的消息，也可以监听广播消息。接收到消息之后，`callback` 函数会被调用，该函数的定义如下：

	function (message) {
		//...
	}

最常用的方式示例：

	mq.subscribe('my_subject', function myCallback(message) {
		log('message received:', message);
	});

`context` 的使用示例：

	mq.subscribe('my_subject', function myCallback(message) {
		log('test context:', this.prop); //输出：test context: my context data
	}, {prop: 'my context data'});

`callback` 函数的函数名很重要，它是使用 [`mq.unsubscribe()`](#mq_unsub) 取消订阅主题的一个标志，不允许与本应用已经注册的回调函数名重复，也不允许为空（匿名函数）。

#### 在订阅回调函数中应答消息 ####

我们可以在回调函数中立即给发送方发出应答消息

示例：

	mq.subscribe('my_subject.req', function myCallback(message) {
		log('message received:', message);
		//立即给对方一个应答
		message.reply('my_subject.ack', 'hi there, this is my reply!');
	});

### `mq.unsubscribe()` {#mq_unsub}

定义：

	function unsubscribe(subject, callback);

参数：

- subject 字符串。消息主题。
- callback 函数名字符串，可选。函数名需要与通过 [`mq.subscribe()`](#mq_sub) 注册的函数名要一致。

返回：无。

如果不提供 `callback`，则会取消本应用所有该主题的订阅：

	//取消本应用所有my_subject主题的订阅
	mq.unsubscribe('my_subject');

如果提供了 `callback`，则只取消该主题下该函数的订阅：

	//仅取消my_subject这个主题下 my_callback函数的订阅
	mq.unsubscribe('my_subject'， 'my_callback');

### `wait()` ###

定义：

	function wait(subject, timeout);

参数：

- subject 字符串。应答的消息主题。
- timeout 数字，默认值60000。超时毫秒数。

返回：对方应答的数据，或者超时则得到null。

阻塞等待应答，直到接收到应答消息或者超时，代码才会继续往下执行




