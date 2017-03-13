<rdk_title>ListSelector</rdk_title>

# 简介 #

`rdk_list_selector` 主要用于模拟select标签,统一各浏览器对select标签表现不同的样式风格,

这是一个简单的 `rdk_list_selector` 例子：
<live_demo example="controls/listselector/basic" width="900"></live_demo>

---
# 属性 #

## data <binding></binding>##
> 支持类型：数组 或者 数据源id

`data` 是待选的全集，可以是 `scope` 的某个属性，也可以是某个`数据源`的id。

在实际应用时，`data` 的值很有可能是固定不变的，在这个情况下，可以直接将data的值以json字符串的形式写在html节点上：
    
	<rdk_list_selector
		data="['red','blue','yellow' ...]">
	</rdk_list_selector>

## selected_items <binding></binding>##
> 支持类型：数组 或者 数据源id

`selected_items` 是选中的集合，存储rdk_list_selector选择的数据。

## label_field ##
> 支持类型：字符串

指明 `data` 的每个成员对象用于显示在界面上的属性名。

## caption ##
> 支持类型：字符串

指明 下拉框的标题。

## defaultOption ##
> 支持类型：字符串

指明 下拉框除Date数据之外的默认可选项。

## size ##
> 支持类型：整数

指明 下拉框显示选择项的数量，超过此数量会出现滚动条。

## icon ##
> 支持类型：字符串

指明 下拉框的字体图标，默认为空心三角形。如果为icon="false"则不显示icon。

这是一个综合的 `rdk_list_selector` 例子：
<live_demo example="controls/listselector/setting" width="900"></live_demo>

# 事件 #

如果设置了`id`，即可广播/监听以下事件。

## CHANGE ##
监听到 `CHANGE` 事件后，点击下拉框选择项时会广播此事件，监听该事件，可以处理选择后的数据。

<live_demo example="controls/listselector/change" width="900"></live_demo>