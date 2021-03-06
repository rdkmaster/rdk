<rdk_title>第2步 使用第一个RDK控件 - RDK应用开发最佳实践</rdk_title>

## 目标与收获

本小节将在 `my_first_app` 应用中添加一个时如间控件，通过本小结的学习，你将了解到

- 如何添加一个时间控件及其所有依赖
- 如何查询时间控件的手册，以了解如何使用时间控件


## 修改

BA告诉我们，这个功能需要有一个可以选择开始时间和结束时间的查询条件，并且可以调整不同的时间粒度。

### 页面添加控件

编辑 `app/my_first_app/web/index.html` 文件，把body节点修改为：

~~~
<body ng-controller='RootController' class="rdk-loading">
    <rdk_time ></rdk_time>
</body>
~~~
页面其他部分保持不变。`<rdk_time></rdk_time>` 就是RDK提供的时间控件，在注入时间控件的依赖之前，浏览器是不可能认识这样的标签的。

> 实践：
> 
> - 现在你可以试一下在浏览器中打开这个应用，看到的应该是一片空白，原因是浏览器还不认识rdk_time标签
> - 在chrome上按下`Ctrl+Shift+I`检查页面内容，会发现body中的rdk_time标签保持不变，没有被解析
> 
> 注意：<br>
> 在页面中使用时间控件，这个写法 `rdk_time` 和这个写法 `rdk-time` 的效果是一样的。RDK建议全部统一使用其中的一种写法

### 依赖注入 {#dep-inject}

我们接下来要让浏览器能够认识这个控件。

编辑 `app/my_first_app/web/scripts/main.js`，

将

	var downloadDependency = [
        // 所有路径中的 base 都会被替换成本页面html文件所在路径
        // 注意：所有的url都不能加 .js 扩展名
        'base/template/sample_module',

        // 带有 alias 属性的条目，可以通过 ctx.alias 的方式来访问到
        { url: 'base/scripts/utils', alias: 'utils' },
        { url: 'base/scripts/i18n',  alias: 'i18n'  },

        // css类型的文件需要加 css! 的前缀，注意url上不能加 .css 扩展名
        'css!base/css/style',

        // 这类 rd. 开头的条目是RDK预定义好的控件url别名
        'rd.controls.Module'
    ];

修改为

	var downloadDependency = [
        // 所有路径中的 base 都会被替换成本页面html文件所在路径
        // 注意：所有的url都不能加 .js 扩展名
        

        // 带有 alias 属性的条目，可以通过 ctx.alias 的方式来访问到
        { url: 'base/scripts/utils', alias: 'utils' },
        { url: 'base/scripts/i18n',  alias: 'i18n'  },

        // css类型的文件需要加 css! 的前缀，注意url上不能加 .css 扩展名
        'css!base/css/style',

        // 这类 rd. 开头的条目是RDK预定义好的控件url别名
        'rd.controls.Time'
    ];


这一处修改，是在数组中，增加了一个 `rd.controls.Time`，这就可以让浏览器能够认识rdk_time标签了。

保存之后，在浏览器中打开下面的url

	http://localhost:8080/rdk/app/my_first_app/web/index.html

正常的话，在页面的左上角应该可以看到时间控件已经显示出来了，看来浏览器的确已经可以认识rdk_time标签了。

> 实践：<br>
> 在chrome上按下`Ctrl+Shift+I`检查页面内容，会发现body中的rdk_time标签已经不见了，一个div标签替换了它的位置。你可以继续探索这个div的内容。


### 配置时间控件

虽然时间控件已经显示出来，但是我们希望能够选择时间粒度，而且我们希望能够选择一个时间范围。接下来我们就来解决这些问题。

RDK的每个控件都有文档说明各个配置项的使用，时间控件也不例外，在浏览器中打开下面页面

	http://localhost:8080/doc/client

在左侧控件树上单击Time节点，打开时间控件的手册。找到 [`granularityItems`](/doc/client/controls/time/rdk_time.md#granularityItems) 和 [`range`](/doc/client/controls/time/rdk_time.md#range) 这2个属性，这就是我们想要的功能。

通过仔细阅读这2个属性的说明，我们知道，在控件的html节点上添加一个range属性可以使得时间控件能够选择一个时间段，而添加一个setting属性则可以配置可选的粒度。

我们根据控件的手册，把index.html中，时间控件的代码修改为：

	<rdk_time range setting="timeSetting"></rdk_time>

并在main.js文件，加上timeSetting的定义：

~~~
scope.timeSetting = {
    selectGranularity: true,
    granularity: "hour",
    granularityItems: [{
        label: "15分钟",
        value: "quarter"
    }, {
        label: "小时",
        value: "hour"
    }, {
        label: "天",
        value: "date"
    }, {
        label: "月",
        value: "month"
    }]
}
~~~

保存后刷新页面，这个时候我们应该就得到了一个我们想要的时间控件了：带有时间粒度选择，并且可以选择时间段。

> 实践<br>
> 此时时间控件的两个时间选择框刚好相差一天的时间，我们通过一些简单的配置可以随意控制时段的开始时间和结束时间。试一下在 `scope.timeSetting` 中加入这个代码 `value: ['now-2h', 'now']`，此时代码看起是这样的：
>
	scope.timeSetting  = {
		value: ['now-2h', 'now'],
		selectGranularity: true,
		granularity: "hour",
		granularityItems: [
			//省略。。。
		]
	}
> 刷新一下页面看看，开始时间框是当前时间前两个小时了。访问这里可以得到[关于vaule的更多描述](/doc/client/controls/time/rdk_time.md#value)。

### 样式调整
我们可能需要更改时间控件的时间粒度背景，清空style.css文件中的样式，并添加样式`body{margin:8px}.btn-group .btn{background:#fff;}`

## 小结
本小节用了非常大的篇幅介绍了时间控件的使用过程，目的不仅仅是为了介绍时间控件，这个过程实际上是通用的，RDK的所有控件的使用过程和时间控件是一样的：

1. 在页面上合适位置加入控件的标签
2. 在main.js中注入相应控件的依赖，如果你发现控件不显示出来，那很可能就是忘记注入它的依赖了
3. 对控件进行配置，一般就是查询该控件的手册，在手册中获得你需要信息

## 跳转
[上一步](02_first_rdk_app.md)、[下一步](04_finish_condition_bar.md)

## 源码
[03_use_first_control.zip](03_use_first_control.zip) 下载后解压到 `rdk/app/my_first_app` 目录下即可。

