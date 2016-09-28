### `websock.broadcast()` ###

rdk可以向[`订阅`](#ws_subscribe)了某个主题的客户端推送该主题的相关消息

定义：

    function broadcast(subject, message);


参数：

- subject: 字符串，推送消息主题。

- message: 字符串，推送消息内容。


返回：
 
  undefined

示例：

比如example应用需要通过[mq订阅](service_mq_js_api.md#mq_sub)主题为“alarm”的告警消息，并在回调函数callback中将消息通过websocket推送至浏览器客户端。

因此我们可以在example应用下的[init.js](service_api.md#init)中编写订阅代码：

	(function () {
		function _init_() {
			mq.subscribe("alarm","callback","callback.js");
		}
		return {
			init: _init_
		}
	})();
   
接下来就可以在该应用的server目录下新建一个callback.js文件，并编写回调函数代码：

	(function () {
	    function _callback(msg) {
	        websock.broadcast("alarm",msg.body)
	    }
	    return {
	        callback: _callback,
	    }
    })();

这样，凡是事先通过websocket的客户端[`订阅`](#ws_subscribe)了“alarm”主题的都可以接收到此告警消息。

###websocket的客户端

WebSocket protocol 是HTML5一种新的协议,当前主流版本的浏览器都支持该协议，客户端开发者只需要
创建一个websocket实例并复写其onopen(),send(),onmessage(),onclose()等方法方便的进行消息的收发。

     	// 创建一个Socket实例
		var socket = new WebSocket('ws://localhost:8080'); 
		// 打开Socket 
		socket.onopen = function(event) { 
		  // 发送一个初始化消息
		  socket.send('I am the client and I\'m listening!'); 
		  // 监听消息
		  socket.onmessage = function(event) { 
		    console.log('Client received a message',event); 
		  }; 
		  // 监听Socket的关闭
		  socket.onclose = function(event) { 
		    console.log('Client notified socket has closed',event); 
		  }; 
		  // 关闭Socket.... 
		  //socket.close() 
		}; 

 [（客户端实现参考）](http://www.cnblogs.com/wei2yi/archive/2011/03/23/1992830.html)

###  `订阅` {#ws_subscribe}

要想订阅来自rdk推送的消息，只需要使用实现了websocket的客户端向rdk发送一个订阅消息，该消息是一个json串，结构为

        {
            "head": ["xxx"], 
            "subscribe": {
                "topic": ["xxx"]
            }
        }

之后当rdk在使用该函数进行推送的主题subject与此topic相同时，客户端即可在其onmessage方法中监听到message信息。

###`取消订阅`

取消订阅只需要使用实现了websocket的客户端向rdk发送一个取消订阅消息的json串即可，消息结构为

        {
            "head": ["xxx"], 
            "unSubscribe": {
                "topic": ["xxx"]
            }
        }

