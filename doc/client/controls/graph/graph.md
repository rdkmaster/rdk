
# 简介 #

`rdk_graph` 主要用于提供图形展示。
rdk的图形控件主要是封装了echart3的内容，因此只要符合echart3的图形模板，都可以通过rdk_graph控件来展示。
控件展示的关键步骤：

- 设置图形的模板文件
- 在rdk_graph控件中添加对图形模板的引用
- 在rdk_graph控件中添加数据源

这是一个简单的 `rdk_graph` 例子：
<live_demo example="controls/graph/basic" width="900"></live_demo>

# 属性 #

##graph_define##
> 支持类型：字符串

此属性用于rdk_graph控件获取图形模板文件的路径的设定。

    <rdk_graph graph_define="/doc/client/demo/controls/graph/basic/scripts/graph_define/simple_line.js">
    </rdk_graph>

以上示例中的`simple_line.js`就是对应的图形显示的模板文件。
此属性中的模板文件一般和`data`属性一起使用，其中`data`属性是向图形模板文件中传入对应的入参信息。

## data <binding></binding>##
> 支持类型：对象或数据源id

`data` 是需要在图形中展示的全部信息，可以是某个`数据源`的id。

data对象中应该包含以下**必填属性**：

- field 	：表中的列头信息
- header：field的各个列头的国际化内容
- data:真实的数据
其详细信息可以参见`rdk_table`控件的对应属性。

##ds##
> 支持类型：对象或数据源id

数据源绑定的变量即直接从数据源获取的反馈信息。一般和`data`属性相同，但`data`属性的信息可以根据`ds`和相关的业务逻辑将数据进行新的处理。

`ds`属性一般和`ds-url`属性一起使用来获取图形显示的数据信息。

##ds-url##
> 支持类型：字符串

此属性用于设置数据服务的引用路径，一般和`ds`属性一起使用。

    <rdk_graph ds="ds_graph" ds-url="/doc/client/demo/controls/graph/mockdata/graph_data"></rdk_graph>

<live_demo example="controls/graph/ds" width="900"></live_demo>

#事件#
`rdk_graph`控件支持echart3中的所有常用的事件。

## 常用事件 ##
1. click
1. dblclick
1. mousedown
1. mouseup
1. mouseover
1. mouseout
1. globalout
1. legendselectchanged
1. legendselected
1. legendunselected
1. datazoom
1. datarangeselected
1. timelinechanged
1. timelineplaychanged
1. restore
1. dataviewchanged
1. magictypechanged
1. pieselectchanged
1. pieselected
1. pieunselected
1. mapselectchanged
1. mapselected
1. mapunselected

#样式#
`rdk_graph`的样式主要是通过主题文件来设置的。主题文件中设置了所有图形的样式。

##默认主题##
如果`rdk_graph`控件不手动设置主题文件，则`rdk_graph`控件会使用控件库中的默认样式。
图形控件的默认的样式会使用rdk控件库中的`chart_theme.js`文件中的样式（app\libs\rdk\controls\assets\chart_theme.js）

##自定义主题##
`rdk_graph`也提供了自定义主题的使用接口。`rdk_graph`控件可以通过使用`setTheme`函数来引用和使用自己的主题样式文件。
只需要在对应`main.js`文件中添加如下代码即可实现：

    app.config(['RdkGraphProvider', function(RdkGraphProvider) {
    	RdkGraphProvider.setTheme("/doc/client/demo/controls/graph/theme/scripts/theme/theme.js");
	}]);

<live_demo example="controls/graph/theme" width="900"></live_demo>

#GraphService服务#

Graph控件提供了一些常见的对数据进行操作的服务，可在使用Graph模板文件的时候用到

如

~~~
define([], function() {

return function(data, context, GraphService, attributes) {  
	return {
	   
    series : [
         {
            name: "hello",
            yAxisIndex: 0,
            type:'bar',
            data: GraphService.column(data.data,1), 
        }
    ]
};
}});

~~~
##column##
定义：
	function column(matrix, idx);

参数：

- matrix 二维数组。
- idx 数组，表示第几列。

返回：返回二维数组的 idx 列组成的一维数组

##row##
定义：
	function row(matrix, idx);

参数：

- matrix 二维数组。
- idx 数组，表示第几行。

返回：返回二维数组的 idx 行组成的一维数组

##distinct##
定义：
	function distinct(array);

参数：

- array 一维数组。

返回：将该一维数组重复的部分去除后返回。

##classify##
定义：
	function classify(data, column);

参数：

- data 二维数组。
- column 一维数组，按照哪些值去进行分组

返回：按照column的值按列对data对进行分组。

说明：
~~~
如果data值为[[南京,74],[南京,65],[盐城,74],[盐城,80]]
调用 classify（data,[南京，盐城，南京])之后返回
  {
    "南京":[[南京, 74],[南京, 65]],
    "盐城":[[盐城,74],[盐城, 80]]
  }
~~~

