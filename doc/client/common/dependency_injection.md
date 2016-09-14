<rdk_title>依赖注入相关知识</rdk_title>


本文包括两部分的依赖说明：

- requirejs
	- rdk使用requirejs来作为依赖管理工具，因此rdk的应用在开发的时候，如果需要增加自己的文件，或者引入其他第三方库，则最好采用本文描述的方式。
- AngularJS的
	- 本文还简要的描述了AngularJS的依赖注入在rdk中是如何使用的，特别是如何与requirejs配合。


本文一切均以[example应用](/rdk/app/example/web/index.html)为例说明，所以在开始之前，最好能够阅读一下它的源码。

## requirejs相关

### 可被管理的文件种类

- js文件
- css文件
- rest服务

### 如何新增一个被管理文件 {#new-dep}

分两步：
#### 增加依赖别名（可选）{#dep-name}
打开[example应用](/rdk/app/example/web/index.html)的index.html，在文档头中有下面的代码
~~~
<script type="text/javascript">
    require.config({
        paths: {
            //这里引用了rdk应用的公共助手文件，不要改动
            "application": '/rdk_server/app/modules/rdk_app_helpers',
            //这里引用了当前应用自身的助手文件，路径需要根据实际情况修改
            "utils": '/rdk_server/app/example/web/scripts/utils',
            //页面的国际化文件配置信息
            "i18n": '/rdk_server/app/example/web/scripts/i18n',
        }
    });
</script>
~~~
这段代码是在对requirejs进行配置，`paths` 属性的key部分就是依赖的别名，而value部分就是依赖的路径。

注意：

1. 依赖的路径是**不带文件的扩展名**的！这个很重要！
2. 依赖的路径最好使用绝对路径。
> 拓展：依赖的相对路径是这个目录：`/rdk_server/app/libs/rdk`

这里一共定义了3个依赖了，如果你想增加一个依赖，则依葫芦画瓢，添加一行类似的代码即可。例如我们加上：

~~~
"sichuan_map": '/rdk_server/app/portal/web/pages/scripts/maps/sichuan_map'
~~~

这一步不是必须的，它只是可以让注入依赖的代码简洁一些而已。

下面看看如何使用这个依赖。

#### 依赖注入

打开[example应用](/rdk/app/example/web/index.html)的main.js文件，如果你把所有的匿名函数都叠起来，你会发现整个应用的代码看起来是这样的
~~~
define('main', ['application', 'utils', 'i18n', 'blockUI'],
	function(application, utils, i18n) {
		...
	}
);
~~~
如你所见，这里只调用了一个define()函数而已。define()函数接收3个参数

<a name="define-args"></a>
1. 永远是 `main` 这个字符串
2. 一个数组。这里存放的就是当前这应用所依赖的所有文件了
3. 一个函数。所有依赖都被成功下载之后这个函数会被调用，这就是rdk应用的启动过程。

我们只要把我们所需的依赖添加到第2个参数这个数组中即可。代码改为：
~~~
define('main', ['application', 'utils', 'i18n', 'blockUI', 'sichuan_map'],
	function(application, utils, i18n) {
		...
	}
);
~~~

> 扩展：如果你未[定义依赖别名](#dep-name)，那么代码看起来是这样的
>
	define('main', ['application', 'utils', 'i18n', 'blockUI',
					'/rdk_server/app/portal/web/pages/scripts/maps/sichuan_map'],
		function(application, utils, i18n) {
			...
		}
	);
>
> 这这样的代码看起来很乱不是吗？
> 
> 注意这里依然**没有使用文件的扩展名**。


### 使用依赖文件的数据
[前面小节](#new-dep)介绍了最简单的增加依赖方法，这里稍微深入一下，讨论一下这个场景：

如果我们不仅需要增加依赖，我们还需要使用这依赖返回的数据。

[前面](#define-args)提到define()函数有3个参数，我们仔细观察一下第3个参数：
~~~
function(application, utils, i18n) {
	...
}
~~~
这个函数有若干个形参，分别是
~~~
application, utils, i18n
~~~

再看看define()函数的第2个参数：
~~~
['application', 'utils', 'i18n', 'blockUI']
~~~
可以发现前3个数据名字和顺序都一致！requirejs不仅会下载依赖的文件，还可以把这些依赖返回的值传递给最后的那个函数。

所以，如果你需要使用到依赖的文件返回的数据，则只要安排你的依赖的顺序和最后回调函数的参数顺序一致即可。

> 提示：
> 
> 把关心返回值的依赖排在前面，不关心返回值的依赖排在后面是一个很好的开发习惯

### 依赖的依赖
虽然这个话题越来越深入，但这已经是最复杂的情况了。

define()函数的第2个参数是一个依赖列表：
~~~
['application', 'utils', 'i18n', 'blockUI']
~~~
它的作用是说明当前应用依赖的所有文件，这些文件是同时被下载的，那就是说：

**排列靠前的依赖不一定会先下载完！！**

设想一下这个场景：你依赖的某个文件的执行必须保证另一个文件已经存在，那怎么办？

其实非常简单就可以解决，我们继续[前面小节](#new-dep)添加 `sichuan_map` 依赖的例子来说明如何做到。

如果你用过echart地图，你会很清楚，各地市的地图包在下载后，必须使用 `echarts` 对象注册一下才能用。

具体到在我们这个例子中，我们必须确保 `echarts` 对象先于 `sichuan_map` 这个依赖被创建。rdk已经[事先定义](#predef-dep)好了一个 `echarts3` 这依赖的别名，它会创建 `echarts` 对象。

我们可以分开下载各个依赖，代码改为：
~~~
define('main', ['application', 'utils', 'i18n', 'echarts3', 'blockUI'],
	function(application, utils, i18n, echarts) {
		define(['sichuan_map'], function(application, utils, i18n, echarts) {
			//此时可以放心的使用 echarts 的各个函数了
			echarts.registerMap(...);
			
			//example应用的其他代码写在这里
		});
	}
);
~~~
原理非常简单，就是把一批同时下载的依赖分开成多批下载即可。


> 扩展：
> 
> 为了让代码更容易维护，你可以把最里边的匿名函数挪到外头来，代码重构一下：
>
	define('main', ['application', 'utils', 'i18n', 'echarts3', 'blockUI'],
		function(application, utils, i18n, echarts) {
			define(['sichuan_map'], start);
		}
	);
	>
	function start(application, utils, i18n, echarts) {
		//此时可以放心的使用 echarts 的各个函数了
		echarts.registerMap(...);			
		//example应用的其他代码写在这里
	}
>
> 代码这样看起来就清晰多了，不是吗？

<font color=red>有一点需要特别注意：</font>鉴于jquery和angular这两个库非常常用，因此rdk已经强制他们预先下载了，所以应用的代码可以放心的使用这2个库提供的功能。



### rdk预定义的依赖 {#predef-dep}
[这里](/rdk/app/libs/rdk/mainconfig.js)罗列了rdk预定义的所有依赖。


### CSS类型和Rest服务类型
CSS类型的依赖和Rest服务类型的依赖，使用起来和JS类型的依赖几乎一样，只是稍微有一些区别。

#### 依赖一个CSS类型文件
依赖别名的定义部分和[js依赖别名定义方法](#dep-name)完全一致。

例如我们需要增加一个自己的css文件，那别名定义部分代码为：
~~~
<script type="text/javascript">
    require.config({
        paths: {
            ...
            "mycss": '/rdk_server/app/example/web/scripts/mycss',
        }
    });
</script>
~~~

使用依赖的地方有些许差别：
~~~
define('main', [ ... , 'css!mycss'],
	function( ... ) {
		...
	}
);
~~~

在依赖别名前面多了一个 `css!`，这个是为了区分类型用的。

#### 依赖一个Rest服务
比如我们有一个my_citys服务，想在应用渲染之前就获取到它的数据。依赖别名的定义部分和[js依赖别名定义方法](#dep-name)完全一致，增加一行：
~~~
"my_citys": '/rdk/service/app/example/server/my_citys'
~~~

使用依赖的地方需要用 `rest!` 作为前缀：
~~~
define('main', [ ... , 'rest!my_citys'],
	function( ... ) {
		...
	}
);
~~~

这样使用rest服务类型的依赖不是一个好实践，它会导致页面打开变慢。

## AngularJS相关 {#angular}

### `angular.module()`

这个函数会涉及到依赖注入，它的第二个参数是一个数组，作用是列出当前模块依赖的其他所有模块，将其他模块的名称字符串填写在数组中即可。

一个典型的RDK应用总会包含类似下面的代码：
~~~
var app = angular.module("rdk_app", ['rd.core', 'blockUI', 'rd.controls.Time']);
~~~

说明当前应用必须依赖 `'rd.core', 'blockUI', 'rd.controls.Time'` 这些模块才能正常运行。

### `app.controller()` {#ctrl}

这个函数也涉及到依赖注入，它和 `angular.module()` 的注入方法基本上一样，但是稍微复杂一些。

一个典型的RDK应用总会包含类似下面的代码：
~~~
app.controller('rdk_ctrl',
[       '$scope', 'DataSourceService', 'blockUI', 'EventService',
function($scope,   DataSourceService,   blockUI,   EventService) {
	// 应用的所有逻辑都在这里 ...
}]);
~~~
第二个参数是一个数组，并且数组最后一个元素是一个函数，前面都是字符串。注意到函数的入参名字和数组的元素字符串值一致！这是AngularJS实现依赖注入的一种方式，RDK推荐使用这个方式。

这段代码说明应用的逻辑有可能会使用到这些功能：`'$scope', 'DataSourceService', 'blockUI', 'EventService'`。这个列表中一般是各种AngularJS服务，可能是RDK实现的，可能是第三方实现的，可能是AngularJS内置的，也可能是应用自己开发的。

除了各种服务可以出现在这个列表中，还有其他很多各种类型的功能，都可以出现在列表中。感兴趣的同学可以仔细阅读这偏文章：<http://docs.ngnice.com/guide/di>


