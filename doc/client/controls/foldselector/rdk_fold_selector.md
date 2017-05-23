<rdk_title>FoldSelector</rdk_title>

# 简介 #

`rdk_fold_selector` 内部封装了 `rdk_accordion` 和 `rdk_basic_selector`， 拥有 `rdk_accordion` 和 `rdk_basic_selector` 的所有属性。

这是一个简单的 `rdk_fold_selector` 例子：
<live_demo example="controls/foldselector/basic" width="405"></live_demo>

---
# 属性 #

## data <binding></binding>##
> 支持类型： 对象数组

`data` 数据全集。要求以`json`对象数组的方式给出。赋值方式一般有两种：

- `html` 节点内部给出

- `scope`上定义数据全集。例如：

		scope.allItems = [
	        { id: 0, label: "江苏省" },
	        { id: 1, label: "浙江省" },
	        { id: 2, label: "广东省" },
	        { id: 3, label: "广西省" },
	        { id: 4, label: "河北省" }
    	];

`data` 支持双向绑定。当数据全集发生变化时，界面也会实时更新。例如：
<live_demo example="controls/foldselector/data"  width="405"></live_demo>

## selected_items <binding></binding>##
> 支持类型：对象数组

`selected_items` 是选中的数据集。和 `data` 相同，要求以`json`对象数组的方式给出。赋值方式一般有两种：
- `html` 节点内部给出
- `scope`上定义选中的数据集。例如：

    	scope.selectedItems = [
	        {id: 1, label: "浙江省"},
	        {id: 3, label: "广西省"},
	        {id: 5, label: "河南省"}
    	];

`selected_items` 支持双向绑定。当选中的数据集发生变化时，界面也会实时更新。例如：
<live_demo example="controls/foldselector/selected_items"  width="405"></live_demo>

## id ##
>支持类型：字符串

事件发出者，此字段大小写敏感。详见`事件机制`中事件发出者的说明。id事件控制demo如下：
<live_demo example="controls/foldselector/id"  width="405"></live_demo>

## change ##
> 支持类型：函数

用户交互后触发，支持用户自定义。参数是 `event` 和 `data`，`data` 是发生变化的group当前被选中的对象数组。参见如下demo：
<live_demo example="controls/foldselector/change"  width="405"></live_demo>

## error ##
>支持类型：函数

通过回调方式控件会返回相关异常信息，可以通过控件反馈的具体的错误码来自定义错误信息。代码如下：

     <rdk_fold_selector error="raiseErrorAct"></rdk_fold_selector>

<live_demo example="controls/foldselector/error"  width="405"></live_demo>


## child_change ##

此属性为通用属性，请参见[`childChange`](/doc/client/controls/common/child_change.md)中的说明

## 其他属性 ##
`rdk_fold_selector` 还拥有 `rdk_accordion` 的 `folded_icon`/`unfolded_icon`,`frozen`,`open` 等属性，也拥有 `rdk_basic_selector` 的 `searchable`,`multiple_select`等属性，具体参见 `rdk_accordion` 和 `rdk_basic_selector` 的控件说明文档。

下面是同时设置了多个属性的综合demo：
<live_demo example="controls/foldselector/complex"  width="405"></live_demo>


# 事件 #
事件是RDK实现交互的主要手段之一，强大且易用。[了解更多](/doc/client/common/event/EventService.md)。

## OPEN ##
>事件类型：EventTypes.OPEN
同 `rdk_accordion` 的 `OPEN` 事件，监听到外层的 `OPEN` 事件，即展开所有折叠容器。 

## CLOSE ##
>事件类型：EventTypes.CLOSE
同 `rdk_accordion` 的 `CLOSE` 事件，监听到外层的 `CLOSE` 事件，即关闭所有折叠容器。

## SELECT ##
>事件类型：EventTypes.SELECT
同 `rdk_basic_selector` 的 `SELECT` 事件，监听到外层的 `SELECT` 事件，即更新所有被选中元素。

## CHANGE ##
>事件类型：EventTypes.CHANGE
同 `rdk_basic_selector` 的 `CHANGE` 事件，监听捕获 `rdk_basic_selector` 控件内部修改后的最新的数据信息。关于监听事件请参见`事件机制`中的`监听`部分

示例如下：

<live_demo example="controls/foldselector/event"  width="405"></live_demo>

