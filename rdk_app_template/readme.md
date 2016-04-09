# RDK应用模板 #
这是RDK应用工程的模板，建议RDK应用利用这个模板的文件结构开始开发，并将此目录设置为web root目录。

## 目录结构简介 ##
目录结构如下

	web_root/
		libs/
			** RDK发布版本相关文件 **
		scripts/
			main.js
		build.bat
		build.js
		favicon.ico
		index.html

### libs文件夹 ###
该目录下应该放置RDK发布版本中，*libs* 文件夹中的所有文件

### scripts文件夹 ###
该目录下放置应用开发的所有脚本。请注意默认情况下，脚本名称为 *main.js*。内容如：

    define(['rd.controls.Selector'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Selector']);
    // 创建一个控制器
    app.controller('rdk_ctrl', ['$scope', function(scope) {
    /******************************************************
     应用将的代码逻辑添加在这个匿名函数内部
    ******************************************************/
	    scope.allItems = [
		    { id: 0, label: "江苏省" },
		    { id: 1, label: "浙江省" },
		    { id: 2, label: "广东省" },
		    { id: 3, label: "广西省" },
		    { id: 4, label: "河北省" },
		    { id: 5, label: "河南省" },
		    { id: 6, label: "湖北省" },
		    { id: 7, label: "湖南省" },
		    { id: 8, label: "新疆省" },
		    { id: 9, label: "四川省" },
	    ];
		    
	    scope.selectedItems = [
		    { id: 3, label: "广西省" },
		    { id: 7, label: "湖南省" },
		    { id: 4, label: "河北省" },
	    ];

	}]);
	});

该格式是*requirejs*的写法，*define* 定义一个模块，需要两个参数，第一个参数为应用需要用到的RDK的控件名称，比如这里的是 `rd.controls.Selector`，第二个参数为一个函数，只有两行代码：

- 第一行代码创建了一个RDK应用，需要将用到的RDK的控件名称填写在第二个参数中。
- 第二行代码创建了一个控制器，其中第二个参数是一个函数，RDK应用的所有逻辑都编写在这个函数的实现中。

### index.html ###
该文件为应用的主页面文件：
    
	<!DOCTYPE html>
	<html>
	
	<head>
	    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
	    <title>RDK应用模板工程</title>
	
	
	    <!--
	      script节点描述了rdk启动相关参数。其中，
	          src是requirejs的位置，必选
	          data-main是rdk主文件的位置，必选
	          rdk-app是应用的入口文件位置，可选。默认值是 ../../scripts/main
	    -->
	
	    <!-- 应用在开发、调试阶段，请使用下面这个节点，RDK会使用编译前的代码，方便定位问题 -->
	    <script data-main="/libs/rdk/rdk" src="/libs/requirejs/require.js"></script>
	
	
	    <!-- 应用正式运行的时候，请使用下面这个节点，RDK会使用编译后的代码，代码体积小，下载快 -->
	    <!--
	    <script data-main="main.min.js" src="/libs/requirejs/require.js"></script>
	    <link rel="stylesheet" type="text/css" href="main.min.css">
	    -->
	</head>
	
	<body ng-controller='rdk_ctrl'>
	    <rdk_selector selected_items="selectedItems" data="allItems" track_item_by="id"></rdk_selector>
	</body>
	
	</html>

其中 script节点的rdk-app属性用来告知rdk框架用户的主文件位置，该参数应该是相对于 `/libs/rdk/rdk` 的目录。**请注意** `../../scripts/main` 不要写成 `../../scripts/main.js`

### build.bat文件 ###
该文件是RDK框架提供的压缩工具文件，如果index.html中的`rdk-app`未修改，即使用默认值

	../../scripts/main

则直接运行build.bat即可。应用目录下即会生成main.min.js和main.min.css文件。

如果修改为其他值，比如说

	../../../scripts/app

则需要将 `../../../scripts/app` 作为参数提供给编译脚本。可以在cmd状态下执行下面指令

	build.bat ../../../scripts/app


