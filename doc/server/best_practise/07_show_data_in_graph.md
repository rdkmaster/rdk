## 目标与收获

本小节将让 `my_first_app` 可以将查询得到的数据以图形方式显示。通过本小节的学习，你将了解到

- 如何使用图形呈现数据
- 如何在图形中实现交互


## 修改
- 在表格上方添加一个柱状图


### 添加图形
修改页面代码，在表格的上方，加入下面的代码：
~~~
<rdk_graph ds="dsWebAnalysis" ds_url="$svr/webAnalysis"
	graph_define="scripts/graphDefine.js"></rdk_graph>
~~~
这里引入了一个新的控件rdk_graph，注意要使用[第三步的方法](03_use_first_control.html#dep-inject)注入图形的依赖。

在scripts目录中，创建一个graphDefine.js文件，它用于描述一个图形，代码如下：
~~~
define([], function() {

return function(data, context, GraphService, attributes) {

return {
    title : { text: '网页分析', subtext: '纯属虚构' },
    tooltip : { trigger: 'axis' },
    legend: { data: ['网页响应成功率', '网页下载速率'] },
    xAxis : [{
            type : 'category', boundaryGap : true,
            data : GraphService.column(data.data, 0)
	}],
    yAxis : [
        {
            type : 'value', name: '网页响应成功率', position: 'left',
            axisLabel: { formatter: '{value}%' }
        },
        {
            type : 'value', name: '网页下载速率', position: 'right',
            axisLabel: { formatter: '{value} bps' }
        }
    ],
    series : [
        {
            name: '网页响应成功率', yAxisIndex: 0,
            data: GraphService.column(data.data, 2), type:'line'
        },
        {
            name: '网页下载速率', yAxisIndex: 1,
            data: GraphService.column(data.data, 3), type:'bar'
        },
    ]
};

}});
~~~

RDK的Graph控件使用的是echart作为基础库，echart官网提供了非常多的echart图形的配置实例，平时多多浏览[这个网页](http://echarts.baidu.com/examples.html)。

> **提示**：
> 
> `rdk_graph` 和 `rdk_table` 这2个标签都有ds和ds_url属性，并且他们的值是一样的。ds属性会创建一个数据源，url为ds_url属性的值。
> 
> 两个节点配置了相同的ds属性的值，是否意味着会创建两个重复的数据源呢？答案是不会的，只有第一个ds才有效，第二个ds会被RDK无视。
> 
> 因此建议将rdk_table节点ds_url属性删除，以免造成不必要的麻烦。
>
> **注意**：
> 
> 当条件框中多选城市的时，图形展示的数据并没有实际意义，这里仅仅是为了介绍图形的使用方法而已，不用过于在意业务上是否有意义。

### 优化页面
前一步完成之后，在查询按钮还没单击之前，图形就显示出来了，我们希望一开始图形和表格都是隐藏起来的，单击了查询按钮之后才显示出来。

编辑页面代码，找到 `rdk_graph` 和 `rdk_table` 这2个标签，都添加属性：`ng-show="showResult"`

编辑js代码，给scope添加一个属性showResult：`scope.showResult = false;`，再编辑scope上的search函数，在最后添加一行代码：`scope.showResult = true;`

这样我们的目的就达到了。

> 扩展：<br>
> 这里我们由用到了另一个AngularJS的执行，ng-show，[查看这里](http://docs.ngnice.com/api/ng/directive/ngShow)可以了解它的作用和用法。

### 数据复用

`rdk_graph` 和 `rdk_table` 这2个标签都有ds属性，并且有相同的值，这就意味着表格和图形使用了同一份数据。

### 实现图形交互
图形的交互，可以通过事件来完成。RDK提供了一套简单但强大的事件机制，[单击这里](/rdk_client/doc/common/event)了解详情。

先注入EventService的依赖，编辑js代码，找到下面这行代码：
~~~
app.controller('rdk_ctrl', ['$scope', 'DataSourceService', 'blockUI',
~~~
改为：
~~~
app.controller('rdk_ctrl', ['$scope', 'DataSourceService', 'blockUI', 'EventService',
function(scope, DSService, blockUI, EventService)
	...
~~~

这样就实现了EventService的注入了。[这个小节](/rdk_client/doc/common/dependency_injection.html#ctrl)详细描述了与controller相关的依赖注入的知识，感兴趣的同学可以仔细阅读。

编辑页面代码，在rdk_graph节点上加入一个id属性：`id="myGraph"`。

编辑js代码，在应用代码的最开始加入下面代码：
~~~
EventService.register('myGraph', 'click', function(event, item) {
	alert(item.seriesName + ' = ' + item.value);
});
~~~
注意到`register()`的第一个参数是一个dom节点的id属性值。

这样我们就可以在图形被单击之后，弹出一个对话框来了。

> 扩展<br>
> 图形除了click事件以外，还会发出很多其他事件，简单列举如下
> 
> - click
> - dblclick
> - mousedown
> - mouseup
> - mouseover
> - mouseout
> - globalout
> - legendselectchanged
> - legendselected
> - legendunselected
> - datazoom
> - datarangeselected
> - timelinechanged
> - timelineplaychanged
> - restore
> - dataviewchanged
> - magictypechanged
> - pieselectchanged
> - pieselected
> - pieunselected
> - mapselectchanged
> - mapselected
> - mapunselected
> 
> 这些事件的详细信息，可以[查看这页面](http://echarts.baidu.com/api.html#events)




## 小结
我们在页面上增加了一个柱状图和折线图，并给图形做了一个简单的交互过程。

你可以下载完成此步骤之后的[源码](07_show_data_in_graph.zip)，解压到 `app/my_first_app` 下，[单击这里](/rdk_server/app/my_first_app/web/index.html)就可以打开它了。


<div title="第7步 将查询得到的数据以图形方式呈现 - RDK应用开发最佳实践" id="__hidden__">
<script src="/doc/tools/doc_js/misc.js"></script>
</div>