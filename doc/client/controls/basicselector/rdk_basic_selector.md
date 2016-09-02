<rdk_title>BasicSelector</rdk_title>

# 简介 #

`rdk_basic_selector` 主要用于提供一些备选项给用户选择的场景，它支持

- 单选
- 多选
- 至少选中若干个项目searchable
- 用户自定义选择项

这是一个简单的 `rdk_basic_selector` 例子：
<live_demo example="controls/basicselector/basic" width="405"></live_demo>

---
# 属性 #

## data <binding></binding>##
> 支持类型：数组 或者 数据源id

`data` 是待选的全集，可以是 `scope` 的某个属性，也可以是某个`数据源`的id。

在实际应用时，`data` 的值很有可能是固定不变的，在这个情况下，可以直接将data的值以json字符串的形式写在html节点上：
    
	<rdk_basic_selector
		data="[{ id: 0, label: '江苏省' },
			   { id: 1, label: '浙江省' }, ...]">
	</rdk_basic_selector>

这样做使得代码高度内聚，便于日后维护。但是如果 `data` 的值有很多对象，则不建议这样做。


## selected_items <binding></binding>##
> 支持类型：数组 或者 数据源id

`selected_items` 是选中的集合，可以是 `scope` 的对象，也可以是某个`数据源`的id。`rdk_basic_selector` 的任何修改都会直接反馈到对应的变量上，例如：
<live_demo example="controls/basicselector/selected_items"  width="405"></live_demo>

注意，`selected_items` 可以参考 `data` 的做法，把值以json字符串的形式写在html中，但是这样做会导致无法使用上面例子中的双向绑定功能。

## track&#x5f;item&#x5f;by ##
> 支持类型：字符串

这个写法
	
	track_item_by="id" 

表示按id的值比较对象是否相等。**必须使用具备唯一性的属性，否则会出现误判对象相等的后果**。判定一个对象相等需要用到多个属性时，请使用英文逗号隔开各个属性。例如

	track_item_by="id, key"

未提供 `track_item_by` 属性时，默认使用 `label_field` 作为 `track_item_by` 的值

## id ##
>支持类型：字符串

事件发出者，此字段大小写敏感。详见`事件机制`中事件发出者的说明。

## label_field ##
> 支持类型：字符串

指明 `data` 的每个成员对象用于显示在界面上的属性名，默认值是 "label"。比如：

	<rdk_basic_selector label_field="name"
			data="[{ id: 0, name: '江苏省' },
				   { id: 1, name: '浙江省' }, ...]">
	</rdk_basic_selector>

## multiple_select <binding></binding> ##
>支持类型：字符串

判断是否支持多选。为true则支持多选，为false则不支持。默认值为true

    <rdk_basic_selector multiple_select="false"></rdk_basic_selector>

<live_demo example="controls/basicselector/multiple_select" width="405"></live_demo>

## searchable <binding></binding>##
>支持类型：字符串

判断成员对象是否搜索到，默认值为false。

    <rdk_basic_selector searchable="false"></rdk_basic_selector>

## least <binding></binding>##
>支持类型：数字

选择项数量的最小值。

    <rdk_basic_selector least="1"></rdk_basic_selector>

<live_demo example="controls/basicselector/select_least"  width="405"></live_demo>

## editable <binding></binding>##
>支持类型：字符串

是否支持编辑功能，默认为true,示例如下

    <rdk_basic_selector editable="true"></rdk_basic_selector>

<live_demo example="controls/basicselector/editable" width="405"></live_demo>

## restrict ##
>支持类型：正则表达式 或者 函数

当`editable`设置为`true`时，控件中`+`号可见。用户可以新增数据。
`restrict`属性是可新增数据的限制条件。支持正则和函数两种限制方式。

1、正则表达式

正则表达式支持直接页面上定义

		<rdk_basic_selector data="cityData" restrict="^[1-9]\d{0,2}$">

也支持在scope上定义变量的方式，需要注意转义

		<rdk_basic_selector data="cityData" restrict="{{resHandler}}"></rdk_basic_selector>

		scope.resHandler = '^[1-9]\\d{0,2}$';


支持正则表达式的例子：
<live_demo example="controls/basicselector/restrict_reg" width="405"></live_demo>


2、自定义函数

支持自定义函数的例子：
<live_demo example="controls/basicselector/restrict_fun" width="405"></live_demo>

## max_length ##
>支持类型：正整数

当`editable`设置为`true`时，控件中`+`号可见。用户可以新增数据。
`max_length`属性用于限制可输入数据的字符长度。

<live_demo example="controls/basicselector/maxlength" width="405"></live_demo>


## change ##
> 支持类型：函数

当选择的信息发生变化时触发。通过与`selected_items`属性进行双向绑定，在界面上实时显示用户已选择的信息。比如：

     <rdk_basic_selector selected_items="selectedItems" data="allItems" change="selectorChanged">
	 </rdk_basic_selector>

<live_demo example="controls/basicselector/selected_items" width="405"></live_demo>

## error ##
>支持类型：函数

通过回调方式控件会返回相关异常信息，可以通过控件反馈的具体的错误码来自定义错误信息。代码如下：

     <rdk_basic_selector error="raiseErrorAct"></rdk_basic_selector>

<live_demo example="controls/basicselector/select_error" width="405"></live_demo>


## child_change ##

此属性为通用属性，请参见[`childChange`](/doc/client/controls/common/child_change.md)中的说明

# 事件 #
事件是RDK实现交互的主要手段之一，强大但易用。[了解更多](/doc/client/common/event)。

## SELECT ##
>事件类型：EventTypes.SELECT

当在界面上进行点选操作时广播此事件。关于广播事件请参见`事件机制`中的`派发`部分


## CHANGE ##
>事件类型：EventTypes.CHANGE

通过监听此事件，可以捕获`selector`控件内部修改后的最新的数据信息。关于监听事件请参见`事件机制`中的`监听`部分

## CREATE ##
>事件类型：EventTypes.CREATE

用户单击`+`号按钮，按钮变成输入框状态后，用户可以自定义新增项目。项目新增成功与否会抛`CREATE`事件。`CREATE`事件的意义在于，应用可以在捕捉`CREATE`事件后，做自己的特殊处理，譬如弹出提示框等。

`restrict`可以校验用户新增内容，故常配合`restrict`使用。如果用户设置了`id`，根据校验是否通过，就会发送`CREATE`事件。

 - 用户校验成功，回车后发送 `CREATE` 的 `true`。
 - 用户校验失败，发送 `CREATE` 的 `false`。

`CREATE`事件详细示例：
<live_demo example="controls/basicselector/create_event" width="405"></live_demo>


## 事件的综合实例 ##

<live_demo example="controls/basicselector/select_event" width="405"></live_demo>

#方法 #

## selected2string ##

Selector控件提供一个将所有选择项转化为相互连接的字符串函数。
函数原型：

    selected2string = function(selected, labelField, separator)
	{
		... 代码实现
	}

它接收三个参数：

`selected`选择项列表

`labelField`选择项标签

`separator`选择项字符串连接的分隔符

代码示例：

    scope.selected2string = function(selected, context, index)
    {
        return Selector.selected2string(selected, 'label', ';');
    }

**注意：使用此方法需要依赖注入Selector，即使是rdk-selector控件本身也需要注入此依赖！**


# 样式 #

### [关键样式示例](/doc/client/demo/controls/basicselector/select_style) ###

### border ###
边框样式，默认值：1px solid #a5a6aa

### border-radius ###
向元素添加圆角边框样式，默认值：4px

### background-color ###
背景色，默认值：#FFFFFF

### position ###
定位 默认值：absolute

### max-height ###
控件最大高度，默认值：800px

### width ###
控件宽度，默认值400px

### padding ###
属性定义元素边框与元素内容之间的空间（单位：像素）。默认值：10px（即属性元素与上边框的间隔为10px）,padding属性的默认填充顺序为从上开始的顺时针方向。

### original-item ###

####list-style ####
设置所有的列表属性,默认值: none

#### float #####
元素的水平方向浮动，意味着元素只能左右移动而不能上下移动。默认值： left

#### margin ####
定义元素周围的空间即外边距。默认属性:0px 10px 7px 0

#### border ####
参见上文中的相关属性解释，默认值: 2px solid #A5A6AA

#### padding ####
参见上文中的相关属性解释，默认值: 3px

#### border-radius ####
参见上文中的相关属性解释，默认值: 4px

#### cursor####
使用的光标样式，默认值: pointer

### selected-item ###
属性值同original-item，只border属性的默认值变为2px solid #00AAFF

### selector-editor ###
属性值同original-item

#### width ####
参见上文中的相关属性解释，默认值: 100px

#### border-radius ####
参见上文中的相关属性解释，默认值: 4px

## 渲染器 ##

渲染器可以理解为数据的表现方式，具体地说，是指显示每一条数据时采用的形式。我们只需要把数据按照一定的格式组织好，然后赋予给组件即可。 

自定义渲染器采用嵌入式，即直接写在组件的标签中来实现自定义数据展现的形式。

**注意由于渲染器的scope是独立的，所以需要使用appScope的方式来获取距离当前渲染器最近的控制器的作用域。**

### 渲染器示例 ###

<live_demo example="controls/basicselector/select_renderer" width="810" height="800"></live_demo>

## 数据源绑定 ##

可以通过URI或URL来绑定数据源。
数据源的绑定分为三个部分：

- 创建数据源，**此部分关键为设置绑定的数据源ID，此ID为唯一的**
- 发送事件，发送事件可以使用broadcast方式；也可以使用已经封装好的函数(如query)(推荐)
- 监听事件并获取事件返回的结果

**注意 当使用JSON格式的数据源时，JSON的格式必须正确，否则无法正确返回数据源的内容.**


