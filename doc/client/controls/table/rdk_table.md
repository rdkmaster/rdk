
# 简介 #

`rdk_table` 主要用于提供表格展示。

这是一个简单的 `rdk_table` 例子：
<live_demo example="controls/table/basic"></live_demo>

---
# 属性 #

## data <binding></binding>##
> 支持类型：对象或数据源id

`data` 是需要在表格中展示的全部信息，可以是某个`数据源`的id。

data对象中应该包含以下**必填属性**：

- field 	：表中的列头信息
- header：field的各个列头的国际化内容
- data:真实的数据

<live_demo example="controls/table/basic"></live_demo>

## ds ##
> 支持类型：对象或数据源id

数据源绑定的变量即直接从数据源获取的反馈信息。一般和`data`属性相同，但`data`属性的信息可以根据`ds`和相关的业务逻辑将数据进行新的处理。

`ds`属性一般和`ds-url`属性一起使用来获取图形显示的数据信息。

## ds-url ##
> 支持类型：字符串

此属性用于设置数据服务的引用路径，一般和`ds`属性一起使用。具体可查看[`数据源`](/doc/client/common/datasource/DataSourceService.md)的使用

    <rdk_table ds="ds_table" ds_url="mock.json" ds_query_if="ready">
    </rdk_table>

<live_demo example="controls/table/datasource" width="900"></live_demo>

## 无数据情况显示 ##
如下示例：

<live_demo example="controls/table/demo4NoData" width="900"></live_demo>


## selected_index <binding></binding>##
> 支持类型：整型数据

`selected_index` 用于手工设置表格的默认选中行。暂定索引从0计数。例如：

		<rdk_table id="id_table" ds="ds_table" 
			ds-url="/demo/controls/table/mockdata/table_paging" 
			ds_query_if="ready" selected_index="2"></rdk_table>

这里表示表格初始化完成后，默认选中第三行。

详细示例如下：
<live_demo example="controls/table/selected_index"></live_demo>


## setting <binding></binding>##
> 支持类型：JSON对象

此属性可以设置展现列表中的列的各种属性，包括样式、显隐性等。
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

<live_demo example="controls/table/columnclass"></live_demo>

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

<live_demo example="controls/table/columnvisible"></live_demo>

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

<live_demo example="controls/table/columnwidth"></live_demo>

### 添加自定义列 {#add-column} ###
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
                },{
                    title : "索引添加2",
                    targets : 2,
                    override : false,
                    render : "渲染内容2"
                },{
                    targets:"position",
                    render:function(item){
                        if(item.position == "Accountant")
                            return "<p style='color:red'>"+item.position+"</p>";
                        else 
                            return item.position;
                    }
                }
        	]
        }

- targets标记支持索引形式，和`field`字符串形式。

- override的属性为false表示新添加一列；为true将会覆盖target所对应的列。

- render为新添加列的信息，通过渲染的方式进行添加。

详细示例如下：

<live_demo example="controls/table/newcolumn"></live_demo>

### 添加自定义表头 ###

通过`setting`中的`columnDefs` 的 `title`属性控制。title支持类型：字符串/函数
为字符串时，直接显示在表头
为函数时，要求函数返回一个新标题的html字符串，函数定义为 `function(data, target);`

具体设置格式如下：

        scope.setting = {
        	"columnDefs" :[
                {
                    title : function(data, target) {
                        $scope.data=data.data;
                        return '<span>'+data.header[target]+'</span>\
                                <select ng-change="titleExtraSelecteHandler(titleExtraSelected)"\
                                        ng-model="titleExtraSelected"\
                                        ng-options="item[2] as item[2]  for item in data">\
                                    <option value="">-- choose an item --</option>\
                                </select>'
                    },
                    targets : 1
                }
        	]
        }

- targets标记支持列的索引形式，从0开始。

函数参数说明：

- data表格的数据对象，包含的属性有field(表中的列头信息)，header(field的各个列头的国际化内容)，data(真实的数据)
- targets列的索引。

详细示例如下：
<live_demo example="controls/table/customheader"></live_demo>

### 添加多级表头 ###

通过`setting`中的`additionalHeader` 属性控制。

具体设置格式如下：

        scope.setting = {
            additionalHeader: '<tr class="test1"><th colspan=4>多级表头列1</th><th colspan=3>多级表头列2</th></tr>' +
                              '<tr class="test2"><th colspan=1>复选框</th><th colspan=2>身份信息</th><th colspan=4>基本信息</th></tr>'
        }

详细示例如下：
<live_demo example="controls/table/additionalHeader"></live_demo>
>删除自带表头：如果自定义了多级表头，可以通过属性设置删除表格自带的表头

具体设置格式如下：

        scope.setting = {
            noHeader:true,
        }

### 设置水平滚动条 ###

具体设置格式如下：

        scope.setting = {
            scrollX : true
        }

详细示例如下：

<live_demo example="controls/table/scrollx"></live_demo>

### 设置排序参数 ###
RDK2.0表格支持服务端和客户端排序两种方式。

- `sortable`可设置表格是否支持排序功能。缺省时，默认不支持表格排序。
- 然后根据页面是否设置`paging-type`确定表格是服务端排序还是客户端排序。
- 如果用户自定义了`sort`方法，表格就按照用户自定义方法排序。
- 没有定义`sort`，就按照`sortas`排序。`sortas`支持`int`/`float`/`date`/`string`四种类型。
- 如果`sort`和`sortas`都没定义，就按照`string`排序。

具体定义格式如下：

	        scope.setting = {
	            "columnDefs" :[
	                {
	                    targets : 0,	//第一列按string排序
	                    sortas: "string",
	                    sortable: true
	                },{
	                    targets : "extn",   //extn列按自定义sort方法排序
	                    sortable: true,
	                    sort: function(a, b){
	                        if(parseInt(a, 10) < parseInt(b, 10)){
	                            return -1;
	                        }
	                        else {
	                            return 1;
	                        }
	                    }
	                },{
	                    targets : 3,		//第四列按date排序
	                    sortas: "date",
	                    sortable: true
	                }
	
	            ]
	        }

客户端排序详细示例如下：

<live_demo example="controls/table/columnsortable"></live_demo>

服务端排序详细示例如下：

<live_demo example="controls/table/column-server-sort"></live_demo>

### 设置列单元格的可编辑性 ###

通过`setting`中的`editable`控制。`editable` 缺省时默认为`false`，表示列单元格不支持编辑。

`editable` 设置成 `true` 时，有两种情况：

 - 一种是同时设置了 `editorRenderer`。这是用户自定义的支持编辑的单元格。
 - 一种是缺省 `editorRenderer`。这种情况下单击单元格，则出现可编辑的输入框。

(1) 自定义 `editorRenderer` 时的具体格式如下：

	        $scope.setting = {
	            "columnDefs" :[
	                {
	                    targets : 0,
	                    editable : true,
	                    editorRenderer: 
							'<a ng-click="appScope.clickHandler(item, $parent.$index, $index)">
								{{data.data[$parent.$index][$index]}}
							</a>'
	                },
	                {
	                    targets : 2,
	                    editable : true,
	                    editorRenderer: 
							'<a ng-click="appScope.click(item, $parent.$index, $index)">
								{{data.data[$parent.$index][$index]}}
							</a>'
	                }
	
	            ]
	        }

详细示例如下：

<live_demo example="controls/table/popupEditor" height="400"></live_demo>

(2) 缺省 `editorRenderer` 时的具体格式如下：

	        $scope.setting = {
	            "columnDefs" :[
	                {
	                    targets : 0,
	                    editable : true
	                }	
	            ]
	        }

详细示例如下：

<live_demo example="controls/table/columneditable"></live_demo>

### 设置单元格的合并 ###
通过`setting`中的`columnDefs` 的 `group`控制。`group` 缺省时默认为`false`，表示列不是合并列。
`group` 可设置成 true 或者设置成一回调函数。函数的定义为

> function(rowspans，filedName，filterData，target)

其中 rowspans 是控件自动计算出的该列的合并单元的rowspan数量。
比如说表格的数据如下所示，
    
    
    Field: f1 f2 f3  f4      
    Data:  a  b  c   d 
		   a  b  c   e
		   a  b  e   e
		   a  d  e   f
		   b  f  f   f
		   b  f  d   h 
   

      $scope.setting = {
    		"columnDefs" :[
    		{
    			targets : 0,
    			group :（rowspans,fieldName,filterData，targets）
    		},{
    			targets : "f2",
    			group : true
    		},{
    			targets : "f3",
    			group : true
    		}
    		]
       }  

此时的回调函数的rowspans的值为 [4,0,0,0,2,0].

fieldName 为 f1

filterData 为 表格的数据

targets 为 0 

另外当配合Edit功能一起使用时，Edit完毕之后会将受影响的表格数据的原始行列信息广播出去，数据结构如下
    
	{
    'oldValue': scope.data.data[row][column],
    'newValue': $(inputTarget).val(),
    'rowIndex': row,
    'columnIndex': column,
    'cells': cells
    }
其中oldValue 为 改变之前的值

newValue 为 改变之后的值

rowIndex 为 改变的行

columnIndex 为改变的列

cells 为 改变的行列信息的数组信息

**目前情况下当Edit功能和Group功能一起使用时，rowIndex和columnIndex的值均不正确，该两个属性为了兼容以前版本存在，请使用cells去操作**
    
详细举例如下
<live_demo example="controls/table/rowSpan"></live_demo>

### 设置行选中 ###
通过`setting`中的`selectable` 属性控制。`selectable` 缺省时默认为`true`，表示表格行可以被选中，选择和悬浮状态有高亮效果。
`selectable` 可设置成 false 表格的行不可被选中。

### 动态列实现宽表 ###
如果表格的列特别多，一下子全部显示出来，会导致页面卡顿，这个时候可以通过动态列的方式来模拟宽表，请看这个demo，这个表格一共有200列

<live_demo example="controls/table/dynamic-column"></live_demo>


## 复选框列 add_check_box ##
>支持类型：布尔型

此属性支持自定义复选框的功能，通过此属性可以定义列表每列前添加一个复选框，点击可以得到选中的列信息。代码如下：

    <rdk_table add_check_box='true'></rdk_table>

详细示例如下：
<live_demo example="controls/table/demo4AddCheckBox"></live_demo>

## 复选框列 check_box_title ##
>支持类型：字符串

`add_check_box`属性为`true`时可设置此属性给表头增加`title`

详细示例如下：
<live_demo example="controls/table/demo4AddCheckBox2"></live_demo>

## 自动添加行编号 ##
可以通过列渲染的方式实现行号自动自动添加功能。

详细示例如下：
<live_demo example="controls/table/columnIDRenderer"></live_demo>

## page_size ##
>支持类型：字符串
此属性支持自定义分页功能，通过此属性可以定义列表每页要展现的行数。代码如下：

    <rdk_table page_size="1"></rdk_table>

<live_demo example="controls/table/localpaging"></live_demo>

## paging_type ##
> 支持类型：local/server-auto/server

- local: 本地分页。包括分页、排序、搜索操作，全部都在浏览器本地进行。当服务端返回的数据很多的时候，浏览器会卡顿。
- server-auto: 服务端分页。包括分页、排序、搜索操作，全部都在服务端进行。适合处理大数量的情形。此模式对Rest服务的实现没有任何约束。
- server: 已废弃，使用server-auto代替。

例如：
<live_demo example="controls/table/serverpaging"></live_demo>

服务端分页大数量测试

<live_demo example="controls/table/big-data"></live_demo>

## search ##
>支持类型：布尔型

`search` 设置成 `true` 时，表示表格支持过滤。缺省时默认为 `false`，不支持过滤。

`paging-type`设置成`server`时，表示后端过滤。缺省时表示前端过滤。

### 前端过滤 ###
		<rdk_table data="data" search='true'></rdk_table>

`search`前端过滤示例：
<live_demo example="controls/table/search"></live_demo>

### 后端过滤 ###

		<rdk_table data="data" search='true' paging-type="server"></rdk_table>

后端过滤时，如果搜索框内有输入内容，就会出现搜索字段的下拉框，方便用户指定关键字的检索字段。

`search`后端过滤示例：
<live_demo example="controls/table/server_search"></live_demo>

## search_prompt <binding></binding>##
支持类型：字符串

<live_demo example="controls/table/searchPrompt"></live_demo>

## searchable ##
>支持类型：布尔型

`searchable` 功能同 `search`。保留`search`属性是为了向下兼容。

`searchable`前端过滤示例：
<live_demo example="controls/table/searchable"></live_demo>

## resize ##
>支持类型：字符串

`resize` 定义此属性表格单元格的宽度可以进行拖动调整，单元格宽度调整的模式，可以设置如下3种模式。

1. BasicResizer：相邻表格单元格宽度百分比调整，表格总体宽度不变。
2. FixedResizer：表格第一列宽度自动。调整其它列只影响第一列的宽度，表格总体宽度不变。
3. OverflowResizer：宽度调整只影响拖动的列，其它列宽度总是不变,表格可以扩展出它的容器，添加滚动条。

>OverflowResizer模式下表格出现滚动条是浏览器自带的，已经被禁止，滚动条需要使用`custom-scroll`属性。

`resize=BasicResizer`示例：
<live_demo example="controls/table/resizeBasic"></live_demo>

`resize=FixedResizer`示例：
<live_demo example="controls/table/resizeFixed"></live_demo>

`resize=OverflowResizer`示例：
<live_demo example="controls/table/resizeOverflow"></live_demo>

## search_pattern ##
>支持类型：正则表达式

`search`设置成`true`时，支持搜索过滤。在这基础上设置`searchPattern`，可以对输入的关键字进行校验。校验通过后才能进行过滤。

详细示例如下:
<live_demo example="controls/table/search_pattern"></live_demo>

## search_position ##
>支持类型：字符串

`search_position` 表示搜索框的位置，有两个值，bottom和top，bottom表示为搜索框在表格左下角，top表示为搜索框在表格右上角;

## search_width ##
>支持类型：字符串

`search_width` 表示搜索框的宽度，如"200px",一定要加单位。

## show_export ##
>支持类型：布尔型

`show_export`值为false时，表示不显示导出按钮，其为默认值;
`show_export`值为true时，表示显示导出按钮;

## custom_scroll ##
>支持类型：字符串

通过设置`custom_scroll`属性的值给表格增加RDK的滚动条。`custom_scroll`="rdk-scroll"

>同上面通用功能提到的滚动条rdk-scroll的用法区别：

用法一：

    <rdk-table rdk-scroll></rdk-table>

用法二：

    <rdk-table custom_scroll="rdk-scroll"></rdk-table>

用法一是在rdk-table的根节点创建滚动条，滚动区域的固定宽高样式可以直接设置在此节点或者父节点；
用法二是在rdk-table控件的内部table标签父节点上创建滚动条，滚动区域的固定宽高样式需要设置在内部节点,
此用法同用法一相比的优点是，滚动时不会再连同rdk-table里的搜索框和分页条一条滚动

    .rdk-table-module .wrapper{
        height: xxxx;
        width:xxxx;
    }

详细示例如下:
<live_demo example="controls/table/customScroll"></live_demo>

## export_label ##
>支持类型：字符串

`export_label`表示在导出按钮的内容，其默认值为""。

导出按钮和搜索框的详细示例如下:
<live_demo example="controls/table/search_export_position"></live_demo>


## page_number ##
>支持类型：number

表格分页样式目前支持3种：

- `page_number = "0"` 时，分页栏展现成 `上一页 1/8 下一页`格式。
- `page_number = "-1"` 时，分页栏展现成 `<< < 1/8 > >>`格式，并且可以手动输入页数进行跳转
- `page_number` 设置成非零正整数时，分页栏展示阿拉伯数字的分页。例如 `上一页 4 5 6 7 下一页`。


缺省 `page_number` 时，默认为 `0`，采用第一种分页样式展示。

缺省 `page_number` 或者 `page_number = "0"` 时的详细示例如下：
<live_demo example="controls/table/demo4PageNumber0"></live_demo>

`page_number = "-1"` 时的详细示例如下：
<live_demo example="controls/table/demo4PageNumber1"></live_demo>

`page_number` 非零正整数时的详细示例如下：
<live_demo example="controls/table/demo4PageNumber"></live_demo>

## floatable_header ##
>支持类型：布尔型

 - `true`时滚动条下拉会复制表头。缺省时默认为`true`。
 - `false`时滚动条下拉不会再出现表头。

实例如下：
<live_demo example="controls/table/demo4FloatableHeader"></live_demo>

## change/select/export/check/double_click ##

- 编辑单元格后，如果定义了`change`函数，就会调用应用自定义的`change`方法。该属性可绕开事件机制。
- 单击表格某行后，如果定义了`select`函数，就会调用应用自定义的`select`方法。该属性可绕开事件机制。
- 单击导出按钮后，如果定义了`export`函数，就会调用应用自定义的`export`方法。该属性可绕开事件机制。
- 双击表格某行后，如果定义了`double_click`函数，就会调用应用自定义的`double_click`方法。该属性可绕开事件机制。
- `add_check_box = true`时，首列出现复选框，勾选某个复选框后，如果定义了`check`函数，就会调用应用自定义的`check`方法。该属性可绕开事件机制。

# 事件 #

如果设置了`id`，即可广播/监听以下事件。

## HIGHLIGHT ##

在监听表格完成事件`RESULT`后，通过`HIGHLIGHT`事件方式，手工设置选中表格的某一行。

		EventService.broadcast('ds_table', EventTypes.RESULT, 
			function(event, data){
        		EventService.broadcast('id_table', EventTypes.HIGHLIGHT, 3);
        });

注意：必须在`RESULT`事件后设置，否则表格数据还没渲染好。`RESULT`事件用数据源`ds`监听。`HIGHLIGHT`事件用`id`监听。

## SELECT ##

监听该事件，用户选中某一行后，可以拿到被选中行的数据。

		EventService.register('id_table', EventTypes.SELECT,
			function(event, data){//处理被选中的数据
        		console.log(data);
        })

## EXPORT ##

监听该事件，用户点击导出按钮时，可以发出一个事件。

		EventService.register('id_table', EventTypes.EXPORT,
			function(){
        		console.log('导出事件');
        })

## DOUBLE_CLICK ##

表格行数据双击事件，用户监听该事件，可以处理该双击行数据。

		EventService.register('id_table', EventTypes.DOUBLE_CLICK, 
			function(event, data){//处理被选中的数据
        		console.log(data);
        })
拿到的行数据结构如下：

		{
		  "data": {
		    "name": "Garrett Winters1",
		    "position": "Accountant",
		    "salary": "$170,750",
		    "start_date": "2011/07/25",
		    "office": "Tokyo",
		    "extn": "8422",
		    "$$hashKey": "object:11"
		  },
		  "index": 6
		}

## CHANGE ##

表格单元格编辑过后发出的事件，用户监听该事件，可以处理编辑后的数据。

		EventService.register('id_table', EventTypes.CHANGE, 
			function(event, data){//处理被编辑的数据
        		console.log(data);
        })
拿到的行数据结构如下：

		{
          'oldValue': scope.data.data[row][column], //改变之前的值
          'newValue': $(inputTarget).val(),//改变之后的值
          'rowIndex': row,//改变的行索引
          'columnIndex': column,//改变的列索引
          'cells': cells//改变的行列信息的数组信息
         }
**目前情况下当Edit功能和Group功能一起使用时，rowIndex和columnIndex的值均不正确，该两个属性为了兼容以前版本存在，请使用cells去操作**

# 方法 #
### setCurrentPage ###

`setCurrentPage`方法有一个参数,表示显示那页，参数为0时，显示第一页，调用如下：

    rdk.tableID.setCurrentPage(number)

### resetCurrentPage ###

重置显示页面，也就是显示第一次页，调用如下：

    rdk.tableID.resetCurrentPage()

### getTablePageNumber ###

获取当前翻页的类型，调用如下：

    rdk.tableID.getTablePageNumber()

### setPageSize ###

`setPageSize`方法有一个参数表示定义列表每页要展现的行数，调用如下：

    rdk.tableID.setPageSize(number)

### setChecked ###

`setChecked`方法表示设置有复选框的功能时，那些行被勾选，有一个参数，表标被勾先这行的内容，调用如下：

    rdk.tableID.setChecked(item)

### setGlobalSearch ###

`setGlobalSearch`方法有一个参数，表示要过滤的内容，调用如下：

    rdk.tableID.setGlobalSearch(searchVal)

### getSearchInfo ###

获得过滤的内容，调用如下：

    rdk.tableID.getSearchInfo()

以上方法综合示例如下：

<live_demo example="controls/table/methods"></live_demo>

### scrollTo ###

移动到指定行，并且被选中高亮，调用如下：

    rdk.tableID.scrollTo(index)

参数说明: index数据行索引，从0计数。

以上方法综合示例如下：

<live_demo example="controls/table/scrollTo"></live_demo>

# 样式 #

### 表的整体属性 ###

#### font-size ####
字体大小，默认值：14px

#### line-height ####
行高，默认值：28px

### 选择行的属性 ###

#### background-color {#bgc1}
选择行的背景色， 默认值：#849DE9

### 鼠标移动到行上的属性 ###

#### background-color {#bgc2}
鼠标移动到行上的背景色， 默认值：#F1F1F1

### 表头、表尾属性 ###

#### text-align {#text-align1}
文字水平对齐，默认值center

#### padding ####
属性定义元素边框与元素内容之间的空间（单位：像素）。默认值：10px 6px，padding属性的默认填充顺序为从上开始的顺时针方向。

#### background-color {#bgc3}
表头或表尾背景色，默认值: #325BDB

#### color #####
表头或表尾文字色，默认值: #FFFFFF

### 表体数据属性 ###

#### text-align {#text-align2}
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

## 国际化 ##
具体使用可以查看[`国际化`](/doc/client/common/i18n/i18n.md)文档，示例如下：

<live_demo example="controls/table/demo4i18n"></live_demo>




