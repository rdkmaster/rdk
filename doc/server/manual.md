<rdk_title>RDK应用开发基础</rdk_title>

## 应用包结构

下面是一个应用的目录结构，所有应用都采用下面的结构保存文件

	my_app/                  --> 应用根目录
		web/                 --> 前端html和代码
			index.html
			css/
			scripts/
				main.js
				utils.js

		server/             --> 后端服务代码
			my_service.js
			other_service.js

		build/              --> 应用编译相关（可选）
			make_app.sh


## 搭建基于windows的开发环境 <font color=red>(待补充...)</font> {#make-dev-env}


## 开发第一个应用

新手宝典：[天龙八步](/doc/best_practise/index.html)，把一个应用拆分出若干个步骤讲解开发过程，隆重推荐。

## 开发前端部分

这部分请参考[rdk客户端部分的文档](/doc/client/index.html)。注意最好查看当前环境所使用的rdk客户端对应版本的文档。


## 开发后端部分

### 定义服务

后端采用js语言开发，下面是一个简单的后端服务例子的代码

	(function() {
	
	    return function(request, script) {
			//在这里写下你的第一行代码
			return "这是来自 " + script + " 服务的问候！"
	    }
	
	})();

给上面这段代码起个名字叫做 my_service.js，并将它保存到应用目录下的 server 目录下，这样我就定义好了一个叫 `my_service` 的服务了，并且它现在已经可以开始工作了。


### 调用服务

可以使用浏览器直接调试服务。在浏览器中敲入下面url就可以调用 `app/example/server/my_service` 服务了：
	
	http://10.43.149.193:26180/rdk/service/app/example/server/my_service

如果需要给服务传递参数，可以使用下面的url

	http://10.43.149.193:26180/rdk/service/app/example/server/my_service?p={%22param%22:{},%22app%22:%22example%22}

注意到多了一个 ?p=xxxx 的部分，这个部分中的数据可以由RDK携带给对应的服务，它被url编码过了，解码后，它的内容为：

	?p={"param":{},"app":"example"}

是一个非常简单的json字符串。

注：

- 参数部分**必须使用url编码**，在RDK客户端会自动进行url编码，但是手工调服务必须自己编码
- [这个网页](http://tool.oschina.net/encode?type=4)提供了一个好用的在线url编解码转换工具

	
服务的应答数据会以字符串的形式直接呈现在浏览器上，注意，此时看到的应答的数据结构为原始数据结构，在实际开发中，RDK会自动将这些字符串转为json对象的。

使用这个方式只能调试服务的GET请求，如果要调试其他的请求，需要下载专门的rest调试工具，比如[这个工具](http://code.fosshub.com/WizToolsorg-RESTClient/downloads)就挺好用。


### 调试服务
### 日志 ###

RDK提供了一组记录日志的函数，它们有共同的定义：
	
	function log(msg1, msg2, msg3, ...)；

参数：

- `msg1`, `msg2`, ... 任意对象。可选。RDK会尝试将这些对象转为字符串写入日志中，目前完美支持Date，任意结构的json对象。对其他复杂对象支持不好，不支持Java对象。

一共有这些（日志级别由低到高）：

- `log()` / `Log.debug()`：记录debug级别的日志
- `Log.info()`：记录info级别的日志
- `Log.warn()`：记录warn级别的日志
- `Log.error()`：记录error级别的日志
- `Log.fatal()`：记录fatal级别的日志
- `Log.crit()`：记录一些关键日志，级别最高

RDK日志分为总的日志和应用日志，默认生成总的日志，日志路径为proc/log目录下

**应用若要生成自己的日志文件需要配置proc/conf/log4j.propertites文件**。

该文件中已经配置好了总的日志，控制台日志以及example应用日志，用户只需要参照example日志进行配置即可。

简便可靠的做法是复制example配置部分，在此基础上进行修改。

示例：应用‘用户查询’位置为app/sqm/query_server/userQuery

要生成该应用的日志需要在log4j.propertites文件中添加配置：

    log4j.logger.sqm/query_server/userQuery=DEBUG,sqm/query_server/userQuery
    log4j.appender.sqm/query_server/userQuery=org.apache.log4j.RollingFileAppender
    log4j.appender.sqm/query_server/userQuery.File=./proc/logs/userQuery_log.txt
    log4j.appender.sqm/query_server/userQuery.Threshold=DEBUG
    log4j.appender.sqm/query_server/userQuery.Append=true
    log4j.appender.sqm/query_server/userQuery.MaxFileSize=10MB
    log4j.appender.sqm/query_server/userQuery.MaxBackupIndex=10
    log4j.appender.sqm/query_server/userQuery.layout=org.apache.log4j.PatternLayout
    log4j.appender.sqm/query_server/userQuery.layout.ConversionPattern=%d %p [%c] - %m%n
    log4j.additivity.sqm/query_server/userQuery=true


文件配置后无需重启rdk服务，30秒后自动生效。



### 调试服务 进阶篇

本小节介绍如何**在实现服务的js文件中设置断点debug**！

为了能够设置断点，我们需要在本地搭建一个后端服务的运行环境，听起来好像很复杂，实际上，的确有些麻烦。

[点击这里继续](how_to_debug_service.html)


### Web页面中使用服务

下面看看如何调用这个服务。

在前端定义一个数据源，将url指向这个服务：

	<!-- 这里演示了如何调用后端服务，应用需要根据自身所在路径修改服务路径 -->
	<p ds_url="app/example/server/my_service"
		ng-bind="msgFromSvr" ds="msgFromSvr" ds_query_if="ready">
	</p>

上面这段代码会调用后端的 `my_service` 服务，并将它的值通过 `p` 标签显示在网页上。有几个地方需要关注：

- ds 属性。它定义了一个名为 `msgFromSvr` 数据源。
- ds_url 属性。它的值就是前面我们定的 `my_service` 服务的url。
- ds&#x5f;query&#x5f;if 属性。它在网页加载完毕之后立即调用 `my_service` 服务。关于这3个属性的更多信息，请参考前端的开发手册。
- ng-bind 属性。使用双向绑定将从后端查询得到的数据作为 `p` 标签的内容。


### 处理请求参数

前端调用服务的时候，可以传递任意结构的数据到后端，后端可以通过 `request` 来应用这些参数：


	(function() {
	
	    return function(request, script) {
			//直接将前端传递过来的参数打印到日志中。
			log(request);
	    }
	
	})();

此外，RDK框架还会把当前脚本的url传递进来，通过 `script` 变量可以应用到。


### 返回服务数据

服务将需要返回的数据组装成一个json对象，通过js的关键字 `return` 返回即可：

	var result = ...
	return result;

注意，`result` 必须是一个json对象。java对象是无法序列号为json字符串的，因此java对象无法直接返回。`sql()` 函数返回的值就是一个java对象，因此 `sql()` 函数的返回无法直接返回给前端。


### 处理其他HTTP动词

下面代码只能处理HTTP GET请求：

	(function() {
	
	    return function(request, script) {
			//在这里写下你的第一行代码
			return "这是来自 " + script + " 服务的问候！"
	    }
	
	})();

对于其他的HTTP动词，可以这样写：

	(function() {
	
		function _get(request, script) {
			return 'http get result!';
		}
		function _put(request, script) {
			return 'http put result!';
		}
		function _post(request, script) {
			return 'http post result!';
		}
		function _delete(request, script) {
			return 'http delete result!';
		}

	    return {
			//注意大小写敏感
			get: _get,
			put: _put,
			post: _post,
			delete: _delete
	    }
	
	})();

即返回的值如果是一个函数，则认为是HTTP GET请求的处理函数，如果返回的是一个对象，则取出其中对应HTTP动词对应的属性作为其处理函数。

