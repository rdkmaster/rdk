<rdk_title>SingleIndicator</rdk_title>

# 简介 #

`rdk_single_indicator` 主要用于提供单值，它支持

- top/left/bottom/right四个方向
- 用户自定义图标和单位

这是一个简单的 `rdk_single_indicator` 例子：
<live_demo example="controls/singleindicator/basic" width="405"></live_demo>

---
# 属性 #

## value <binding></binding>##
> 支持类型：数值

`value` 是当前的值，可以在html节点上设值一个双向绑定的值：
    
	<rdk_single_indicator
		value="value">
	</rdk_single_indicator>

这样做使得代码高度内聚，便于日后维护。然后可以在js里给它赋值：

	scope.value = '10';


## formatter ##
> 支持类型：字符串

指明 `value` 的每个成员对象用于显示在界面上的单位，默认值是 "%"。可以直接在html里面设置例如：

	<rdk_single_indicator formatter="%"></rdk_single_indicator>



## label <binding></binding>##
> 支持类型：字符串

`label` 是文字描述可以接收后端返回信息通过js赋值，例如：
<live_demo example="controls/singleindicator/label"  width="405"></live_demo>

## label_position ##
>支持类型：left/right/top/bottom

`label_position` 是文字的位置，可以在html里直接赋值。
比如：
	
	<rdk_single_indicator label_position="left" >
	</rdk_single_indicator>



未提供 `label_position` 属性时，默认使用 `right` 作为 `label_position` 的值
例如：
<live_demo example="controls/singleindicator/label_position"  width="405" height="200"></live_demo>

## icon  ##
>支持类型：font awesome 图标

图标的样式，直接在html里设置这个属性就可以。

    icon = "fa fa-mobile fa-4x"

同样的可以利用 fa-1x,fa-2x,fa-3x,fa-4x来改变图标的大小。
例如：
<live_demo example="controls/singleindicator/icon"  width="405"></live_demo>

## point_to <binding></binding>##
>支持类型：left/right/top/bottom/null

小箭头的指向，可以在html里面设置一个变量，默认是null。比如：

	<rdk_single_indicator point_to="pointTo" >
	</rdk_single_indicator>
在js里面动态设置方向，比如：

	scope.pointTo = "left"

例如：
<live_demo example="controls/singleindicator/point_to"  width="405"></live_demo>




# 样式 #

### [关键样式示例](/demo/controls/basicselector/select_style) ###

#### color ####
图标的颜色，默认值：#fff

### background-color ###
图标背景色，默认值：#FF7DB5

###label ###
文字描述可以自由设置样式

#### value ####
当前值可以自由设置样式


