# 事件机制 #
在RDK中，组件与组件间的交互，组件与应用间的交互，都是通过事件来实现的，事件是整个网页动态化的纽带。事件虽然很重要，但是却非常易用。

## 重要概念 ##
### 事件发出者 ###
在RDK中，下面3个称谓含义一致：

- `事件发出者`
- `dispatcher`
- `event dispatcher`

在RDK中，`事件发出者`是一个任意`字符串`，大小写敏感。换句话，任意的字符串都可以成为RDK的`事件发出者`。在实际开发中，常见的`事件发出者`有：

- DOM节点的id；
- 数据源id；

### 事件类型 ###
在RDK中，`事件类型`是一个任意`字符串`。比如 "click"，"query_result" 等。`事件类型`大小写敏感。

### 事件数据 ###
`事件数据`是事件发生时，`事件发出者`附加的额外信息，可以是一个任意结构的json对象、简单值。

### 事件处理器 ###
一个函数。当事件发生时，RDK会调用这个函数。以下是一个事件处理器的定义

	function eventHandler(event, data) {
		//...
	}
它接收两个参数：

- `event` 事件实例
- `data` 事件数据


## 使用事件 ##
### 监听 {#register}
要成功处理一个事件，必须先`监听`该事件。使用下面的代码可以监听一个事件：

	EventService.register('main_reason_graph', 'click', myHandler);

注意，需要将`EventService`的[依赖注入](http://docs.ngnice.com/tutorial/step_05)到你的控制器中。`register` 函数接收3个参数：

- `事件发出者`，一个字符串，详见前文的说明。
- `事件类型`，一个字符串，详见前文的说明。
- `事件处理器`，一个函数，详见前文的说明。

### 派发 ###
使用下面代码可以派发一个事件

	EventService.broadcast('main_reason_graph', 'click', data);

`broadcast` 函数接收3个参数：

- `事件发出者`，一个字符串，详见前文的说明。
- `事件类型`，一个字符串，详见前文的说明。
- `事件数据`，一个json对象，详见前文的说明。

### onEvents处理多事件 ###
在实际应用中，场景通常会比较复杂，需要多个事件都发生了之后，才能执行某个回调函数。使用 `onEvents()` 可以轻松处理这样的场景。

	var eventInfos = [
		{dispatcher: 'dispatcher1', type: 'event_type1'},
		{dispatcher: 'dispatcher2', type: 'event_type2'},
		{dispatcher: 'dispatcher3', type: 'event_type3'},
	];
	//当 eventInfos 中所有事件都发生至少一次之后，callback才会被调用
	EventService.onEvents(eventInfos, callback);

### 检查事件是否已注册 ###

	//未加回调函数时，只要该事件发出者上有至少一个该事件类型，则返回true，否则返回false
	EventService.hasEvent('simple_mode', 'some_event');

	//提供了回调函数时，必须该事件发出者上有一个该事件类型，
	//并且回调函数与提供的回调函数是同一个(===)，则返回true，否则返回false
	EventService.hasEvent('simple_mode', 'some_event', callback);

### 删除事件回调 ###

	//未加回调函数时，则删除该事件发出者上所有该事件类型的回调
	EventService.remove('simple_mode', 'some_event');
	
	//使用了回调函数时，则只删除该事件发出者上该事件类型下，与提供的函数相同(===)的回调
	EventService.remove('simple_mode', 'some_event', callback);


## 综合例子 ##
<live_demo example="common/event/" width="800"></live_demo>


<div>
<script data-main="/rdk/app/libs/rdk/rdk" src="/rdk/app/libs/requirejs/require.js"></script>
<script src="/doc/tools/doc_js/main.js"></script>
<script src="/doc/tools/doc_js/misc.js"></script>
</div>