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

比如在example服务文件my\_service.js中需要通过[mq订阅](service_mq_js_api.md#mq_sub)主题为“alarm”的告警消息，并在回调函数callback中将消息通过websocket推送至浏览器客户端。详细代码如下：

	(function () {
	    function _callback_(msg) {
	        websock.broadcast("alarm",msg.body)
	    }
	    function _get_(request, script){
	        mq.subscribe("alarm","callback","my_service.js");
	    }
	    return {
	        callback: _callback_,
	        get:_get_
	    }
    })();

这样，凡是事先通过websocket的客户端[`订阅`](#ws_subscribe)了“alarm”主题的都可以接收到此告警消息。
###  `订阅` {#ws_subscribe}

要想订阅来自rdk推送的消息，只需要使用实现了websocket的客户端[（详细客户端实现方法参考）](http://blog.csdn.net/sunfeizhi/article/details/48181919)向rdk发送一个订阅消息，该消息是一个json串，结构为

        {
            "head": ["xxx"], 
            "subscribe": {
                "topic": ["xxx"]
            }
        }

之后当rdk在使用该函数进行推送的主题subject与此topic相同时，客户端即可在其onMessage方法中监听到message信息。

####`取消订阅`

取消订阅只需要使用实现了websocket的客户端向rdk发送一个取消订阅消息的json串即可，消息结构为

        {
            "head": ["xxx"], 
            "unSubscribe": {
                "topic": ["xxx"]
            }
        }

####`发送rest请求`
客户端甚至可以通过websocket发送rest请求，只需要使用实现了websocket的客户端向rdk发送一个类似以下结构的json串即可

	    {
	        "head":["xxx"],
	        "request": {
	            "script": "app/example/server/my_service.js",
	            "param": "",
	            "app": "example",
	            "method": "get"
	        }
	    }
