

RDK的消息对列功能可以完美的支持java程序

### 依赖下载 ###

- 下载与本服务器RDK版本**匹配**的 [activemq-vmax.jar](/rdk_server/lib/activemq-vmax.jar) 包
- 下载**最新版本**的 [activemq-vmax.jar](http://10.5.70.3/ZXVMAX/CODE/dev/ZXVMAX/vmax-app-cn/CODE/ZTECOMMON/ServerCode/activemq/client/java/activemq-vmax/lib/activemq-vmax.jar) 包(SVN)

其他第三方包下载，所有包都需要，和 activemq-vmax.jar 一起使用。

- [activemq-broker-5.13.1.jar](/rdk_server/lib/activemq-broker-5.13.1.jar)
- [activemq-client-5.13.1.jar](/rdk_server/lib/activemq-client-5.13.1.jar)
- [geronimo-j2ee-management_1.1_spec-1.0.1.jar](/rdk_server/lib/geronimo-j2ee-management_1.1_spec-1.0.1.jar)
- [geronimo-jms_1.1_spec-1.1.1.jar](/rdk_server/lib/geronimo-jms_1.1_spec-1.1.1.jar)
- [hawtbuf-1.11.jar](/rdk_server/lib/hawtbuf-1.11.jar)
- [slf4j-api-1.7.13.jar](/rdk_server/lib/slf4j-api-1.7.13.jar)



### 创建 `RDKActiveMQ` 实例 ###

使用下面代码就可以实现Java程序与RDK应用收发**点对点消息**了

	RDKActiveMQ mq = new RDKActiveMQ("localhost", "61616");
	mq.createDurableConnection();
	mq.rcvP2PMsg("my_subject.req", new MyListener());

其中 `RDKActiveMQ` 的构造函数接收两个参数，分别是ActiveMQ服务器的ip和端口，一般是应用层主机IP，如果你的进程也运行在应用层，则直接给localhost即可，端口为61616不变。

注意：共用一个mq对象进行收发不同主题的信息时，将会影响性能；这是由于在利用该共享mq对象进行收发消息时，RDK会对其进行加锁以适应多线程的场景，若对性能有所要求，应创建多个mq对象分别进行收发。

如果要**接收广播消息**，只需要将第三行改为

	mq.rcvTopicNonPersistentMsg("my_subject.req", new MyListener());

注意，RDK目前不支持收发持久化消息。

### 定义监听器 ###

`MyListener` 的定义：

	public class MyListener implements MessageListener {
		@Override
		public void onMessage(Message message) {
			RDKMessage rm = (RDKMessage) message;
			System.out.println("body: " + rm);
		}
	}

这样就实现了一个简单的能够接收RDK消息的程序了。

### 直接应答发送者 ###

如果与rdk应用约定了阻塞等待消息应答的方式，则可以使用这个代码给rdk一个应答消息。其中应答的主题需要和rdk应用事先约定好。

RDK推荐一个消息事务使用一个特定字符串主题，比如 mysubject，并且约定请求的主题采用 mysubject.req，应答的主题采用 mysubject.ack的方式。

	public class MyListener implements MessageListener {
		@Override
		public void onMessage(Message message) {
			RDKMessage rm = (RDKMessage) message;

			try {
				rm.reply("my_subject.ack", "this is my ack data!");
			} catch (JMSException e) {
				e.printStackTrace();
			}
		}
	}

### 处理异常消息 ###

如果Java进程使用的jar包与RDK使用的jar包版本不一致，则会出现异常消息，通过下面的方法可以处理掉它们：

	public class MyListener implements MessageListener {
		@Override
		public void onMessage(Message message) {
			if (message instanceof RDKMessage) {
				//收到了有效的消息，正常流程
				RDKMessage rm = (RDKMessage) message;
				System.out.println("body: " + rm);
			} else if (message instanceof VersionMismatchMessage) {
				//说明当前使用的 activemq-vmax.jar 包版本低于RDK所使用的包
				//需要在本页开头部分下载匹配的 activemq-vmax.jar 包
				VersionMismatchMessage vmm = (VersionMismatchMessage) message;
				System.out.println("currentVersion:  " + vmm.currentVersion);
				System.out.println("receivedVersion: " + vmm.receivedVersion);
			} else if (message == null) {
				//说明收到的是无效的rdk消息，请和rdk维护团队联系。
				System.out.println("invalid rdk message!");
			}
		}
	}

如果收到的消息类型是 `VersionMismatchMessage`，说明你的进程使用的activemq-vmax.jar版本与**本服务器的RDK服务进程**所使用的版本不匹配，请[单击这里](/rdk_server/lib/activemq-vmax.jar)下载一个匹配的jar包，注意此链接下载到的不一定是最新的activemq-vmax.jar。

[单击这里](http://10.5.70.3/ZXVMAX/CODE/dev/ZXVMAX/vmax-app-cn/CODE/ZTECOMMON/ServerCode/activemq/client/java/activemq-vmax/lib/activemq-vmax.jar)可以下载到最新版本的activemq-vmax.jar。



<div title="Java程序与RDK应用交互的消息队列API" id="__hidden__">
<script src="/doc/tools/doc_js/misc.js"></script>
</div>