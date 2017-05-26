
# 简介 #

`rdk_tabselect` 主要用于提供一些具有逻辑关系或层级关系的备选项给用户选择的场景，它支持

- 单选
- 多选
- 至少选中若干个项目searchable

`rdk_tabselect`控件为一个组合控件，它是由ComboSelect，TabSelector,Selector控件组合的，这三个控件具有层级关系。

这是一个简单的 `rdk_tabselect` 例子：
<live_demo example="controls/tabselect/basic" width="485"></live_demo>

---
# 属性 #

## data <binding></binding>##
> 支持类型：数组 或者 数据源id

`data` 是待选的全集，可以是 `scope` 的某个属性，也可以是某个`数据源`的id。

在实际应用时，`data` 的值很有可能是固定不变的，在这个情况下，可以直接将data的值以json字符串的形式写在html节点上：
    
	<rdk_selector
		data="[
			{"label": "江苏省","value": "1"}, 
			{"label": "南京市","value": "11"}, 
			{"label": "雨花区","value": "111"}, 
			{"label": "银杏山庄","value": "1112"}
		]">
	</rdk_selector>

这样做使得代码高度内聚，便于日后维护。但是如果 `data` 的值有很多对象，则不建议这样做。

## track&#x5f;item&#x5f;by ##
> 支持类型：字符串

这个写法
	
	track_item_by="value" 

表示按value的值比较对象是否相等。**必须使用具备唯一性的属性，否则会出现误判对象相等的后果**。判定一个对象相等需要用到多个属性时，请使用英文逗号隔开各个属性。例如

	track_item_by="id, value"

未提供 `track_item_by` 属性时，默认使用 "id" 作为 `track_item_by` 的值

## node_field ##
> 支持类型：字符串

指明 `data` 的每个成员节点对象的层级关系的依据，通过此属性在界面上可以逐级展示其子目录的信息。比如：

	<rdk_selector node_field='dim' data="{
			"classes": [{"label": "省"}, {"label": "市"}, {"label": "小区组"}, 	{"label": "小区"}],
            "dim": [{
                "label": "江苏省",
                "value": "1",
                "longitude": "144",
                "latitude": "144",
                "dim": [{
                    "label": "南京市",
                    "value": "11",
                    "longitude": "144",
                    "latitude": "144",
                    "dim": [{
                        "label": "雨花区",
                        "value": "111",
                        "longitude": "1144",
                        "latitude": "1144",
                        "dim": [{
                            "label": "银杏山庄",
                            "value": "1112",
                            "longitude": "11144",
                            "latitude": "11144"
                        }]
                    }]
                }]
            }]}">
	</rdk_selector>

未提供 `node_field` 属性时，默认使用 "node" 作为 `node_field` 的值

## label_field <binding></binding>##
> 支持类型：字符串

指明 `data` 的每个成员对象用于显示在界面上的属性名。比如：

	<rdk_selector label_field="name" data="[
			{"name": "江苏省","value": "1"}, 
			{"name": "南京市","value": "11"}, 
			{"name": "雨花区","value": "111"}, 
			{"name": "银杏山庄","value": "1112"}
		]">
	</rdk_selector>

未提供 `label_field` 属性时，默认使用 "label" 作为 `label_field` 的值

## searchable <binding></binding>##
>支持类型：字符串

反馈是否已经查找到相关信息。代码实例：

    <rdk_tab_select searchable='false'></rdk_tab_select>

## selectedItems <binding></binding>##
> 支持类型：数组 或者 数据源id

`selected_items` 是选中的集合，可以是 `scope` 的对象，也可以是某个`数据源`的id。`rdk_tabselect` 的任何修改都会直接反馈到对应的变量上。

以上各属性如下示例：

<live_demo example="controls/tabselect/selected_items"  width="485"></live_demo>

注意，`selected_items` 可以参考 `data` 的做法，把值以json字符串的形式写在html中，但是这样做会导致无法使用上面例子中的双向绑定功能。

## child_change ##

此属性为通用属性，请参见[`childChange`](/doc/client/controls/common/child_change.md)中的说明

# 事件 #

此控件没有独立的事件，它的事件都是继承于其各组合控件的事件。详细信息请参见`ComboSelect`,`TabSelector`,`BasicSelector`控件中关于事件的说明。

#方法 #

暂无

# 样式 #

此控件没有独立的样式，它的样式都是继承于其各组合控件的样式。详细信息请参见`ComboSelect`,`TabSelector`,`BasicSelector`控件中关于样式的说明。


