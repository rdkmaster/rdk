
## RDK初始化事件

### 页面下载完成事件
在页面所有文件下载完成后，AngularJS开始工作之前，RDK会发出一个 `app_loaded` 事件。此时，你可以通过jquery对整个dom树做任何操作。

通过下面的代码可以监听到这个事件：

	window.addEventListener('app_loaded', onAppLoaded);

	//用document.body监听也行
	document.body.addEventListener('app_loaded', onAppLoaded);

	function onAppLoaded() {
		//AngularJS还没开始渲染页面，因此此时可以任意修改DOM树
		$("#mySpan").html("{{mySpanValue}}");
	}

### 页面就绪事件
在AngularJS完成对整个页面的修改之后，RDK会发出另一个 `EventService.ready` 事件。此时就不能随意修改dom的结构了，那样会破坏AngularJS的正常运行。此时必须通过AngularJS的方式去更新dom。

通过下面的代码可以处理这个事件：

	//推荐这个方式
	Utils.onReady = function() {
		console.log('rdk is ready...');
	}

也可以通过[事件](/doc/client/common/event/EventService.md)的方式：

	EventService.register('EventService', 'ready', function() {
		console.log('rdk is ready...');
	});

其中 `Utils` 是RDK提供的一个服务，在使用它之前，必须先将它注入到你的控制器中去。


