# RDK应用模板 #
这是RDK应用工程的模板，每个RDK应用都拷贝这个模板到自己的目录下，然后继续开发。

## 目录结构简介 ##
目录结构如下

	app/
		scripts/
			main.js
		build.bat
		build.js
		favicon.ico
		index.html


### scripts文件夹 ###
该目录下放置应用开发的所有脚本，其中 *main.js* 文件是应用的主入口文件，内容如下：

	define(['app.helpers', 'rd.controls.Selector'], function(appHelpers) {
	// 创建一个RDK的应用
	var app = angular.module("rdk_app", ['rd.controls.Selector']);
	// 创建一个控制器
	app.controller('rdk_ctrl', ['$scope', 'DataSourceService',
	function(scope, DSService) {
	DSService.defaultAjaxConfigProcessor = appHelpers.defaultAjaxConfigProcessor;
	/******************************************************
	    应用的代码逻辑添加在下方
	******************************************************/
	    //在这里写下你的第一行代码
	}]);
	});

该格式是*requirejs*的写法，`define` 定义了一个模块，需要两个参数：

- 第一个参数为应用需要用到的RDK的控件名称，比如这里的是 `rd.controls.Selector`；
- 第二个参数为一个函数；

这个函数做了两件事情

- 第一行代码创建了一个名为 `rdk_app` RDK应用，`rdk_app` 不需要修改。需要将用到的RDK的控件名称填写在第二个参数中，控件名和 `define` 的第一个参数一致。
- 第二行代码创建了一个控制器，其中第二个参数是一个函数，RDK应用的所有逻辑都编写在这个函数中。

### index.html ###
该文件为应用的主页面文件，整个 head 节点唯一需要修改的地方，是script节点的 `rdk-app` 的值，`/rdk_server/app/` 这部分不需要修改，`example/web/scripts/main` 这部分根据应用 main.js 文件所在位置填写。**注意，不能带上 ".js" 后缀**！！！

应用将页面的内容添加 body 节点的内部，body的 `ng-controller` 属性值不能修改。

### build.bat文件 ###
该文件是RDK框架提供的压缩工具文件，如果index.html中的`rdk-app`未修改，即使用默认值

	../../scripts/main

则直接运行build.bat即可。应用目录下即会生成main.min.js和main.min.css文件。

如果修改为其他值，比如说

	../../../scripts/app

则需要将 `../../../scripts/app` 作为参数提供给编译脚本。可以在cmd状态下执行下面指令

	build.bat ../../../scripts/app


