# 简介 #

`rdk_table` 主要用于提供表格展示，主要

这是一个简单的 `rdk_table` 例子：
<live_demo example="controls/table/basic" width="900" height="200"></live_demo>

---
# 属性 #

## data <binding></binding>##
> 支持类型：对象或数据源id

`data` 是需要在表格中展示的全部信息，可以是某个`数据源`的id。

data对象中应该包含以下**必填属性**：

- field 	：表中的列头信息
- header：field的各个列头的国际化内容
- data:真实的数据

<live_demo example="controls/table/basic" width="900" height="200"></live_demo>

## setting ##
> 支持类型：JSON对象

此属性可以设置展现列表中的列的各种属性,包括样式、显隐性等。
可以通过列索引（从0开始索引）或者相应的`field`的值进行设置。

### 设置列样式 ###
具体设置格式如下：

       scope.setting = {
        	"columnDefs" :[
            	{
            		targets : 0,
            		class : "red"
            	},{
            		targets : "extn",
            		class : "green"
            	}
        	]
        }

其中的class为自定义的样式。详细示例如下：

<live_demo example="controls/table/columnclass" width="900" height="200"></live_demo>

### 设置列的显隐性 ###
具体设置格式如下：

        scope.setting = {
        	"columnDefs" :[
            	{
            		targets : 0,
            		visible : false
            	},{
            		targets : "extn",
            		visible : false
            	}
        	]
        }

详细示例如下：

<live_demo example="controls/table/columnvisible" width="900" height="200"></live_demo>

### 设置列的宽度 ###
具体设置格式如下：

        scope.setting = {
        	"columnDefs" :[
            	{
            		targets : 0,
            		width : 20%
            	},{
            		targets : "extn",
            		width : 40%
            	}
        	]
        }

详细示例如下：

<live_demo example="controls/table/columnwidth" width="900" height="200"></live_demo>

### 添加自定义列 ###
具体设置格式如下：

        scope.setting = {
        	"columnDefs" :[
            	{
            		title : "编辑列",
                    render : '<a ng-click="appScope.click(item)">点击</a>'
            	},{
                    title : "索引添加",
                    targets : 1,
                    override : false,
                    render : "渲染内容"
                }
        	]
        }

- targets标记只支持索引形式，不支持`field`字符串形式。

- override的属性为false表示新添加一列；为true将会覆盖target所对应的列。

- render为新添加列的信息，通过渲染的方式进行添加。

详细示例如下：

<live_demo example="controls/table/newcolumn" width="900" height="200"></live_demo>

### 设置水平滚动条 ###

具体设置格式如下：

        scope.setting = {
            scrollX : true
        }

详细示例如下：

<live_demo example="controls/table/scrollx" width="900" height="200"></live_demo>

## 自定义表头 ##

可以使用CSS中定义的table标记中的thead、tr、th等标记来修改表头内容。

例如：
<live_demo example="controls/table/customheader" width="900" height="200"></live_demo>

## page_size ##
>支持类型：字符串
此属性支持自定义分页功能，通过此属性可以定义列表每页要展现的行数。代码如下：

    <rdk-table page_size="1"></rdk-table>

<live_demo example="controls/table/localpaging" width="900" height="200"></live_demo>

## paging_type ##
>支持类型：字符串

此属性设置服务端的分页要求。
示例中绑定的数据源模拟的是从服务端反馈回来的数据，在反馈的信息中有以下分页要求，客户端接收到此数据后根据数据要求进行分页显示。
    
    "paging" :{"totalRecord":14,"currentPage":1,"pageSize":5}

- totalRecord : 返回的中的数据条数。
- currentPage : 当前显示第几页数据。
- pageSize : 每页显示的最大条数。 

例如：
<live_demo example="controls/table/serverpaging" width="900" height="200"></live_demo>


# 事件 #
暂无

#方法 #
暂无

# 样式 #

### [关键样式示例](/doc/controls/table/style_demo.html) ###

### 表的整体属性 ###

#### font-size ####
字体大小，默认值：14px

#### line-height ####
行高，默认值：28px

### 选择行的属性 ###

#### background-color ####
选择行的背景色， 默认值：#849DE9

### 鼠标移动到行上的属性 ###

#### background-color ####
鼠标移动到行上的背景色， 默认值：#F1F1F1

### 表头、表尾属性 ###

#### text-align ####
文字水平对齐，默认值center

#### padding ####
属性定义元素边框与元素内容之间的空间（单位：像素）。默认值：10px 6px,padding属性的默认填充顺序为从上开始的顺时针方向。

#### background-color ####
表头或表尾背景色,默认值: #325BDB

#### color #####
表头或表尾文字色,默认值: #FFFFFF

### 表体数据属性 ###

#### text-align ####
文字水平对齐，默认值: center

#### vertical-align ####
文字的垂直对齐，默认值: middle

#### padding ####
文字与边框间距，默认值: 8px 6px

## 渲染器 ##
表中的渲染其主要是进行整列数据的渲染，主要是通过table控件的`setting`属性进行设置的。详细信息可以参见本文档的`添加自定义列`的说明。

## 数据源绑定 ##
表格的数据可以通过数据源绑定的方式进行数据展示。
数据源绑定的说明请参照`BasicSelector控件`中的数据源绑定章节中的内容。以下为`rdk_table`的数据源绑定的示例：

<live_demo example="controls/table/datasource" width="900" height="200"></live_demo>


<div><script rdk-app="/doc/utils/doc_script" data-main="/libs/rdk/rdk" src="/libs/requirejs/require.js"></script></div>