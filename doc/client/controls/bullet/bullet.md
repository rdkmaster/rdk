<rdk_title>Bullet子弹图</rdk_title>

# 简介 #

`rdk_bullet` 主要用于多值进度渲染场景


这是一个简单的 `rdk_bullet` 例子：

<live_demo example="controls/bullet/basic" width="900"></live_demo>

---
# 属性 #

## id ##
>支持类型：字符串

事件发出者，此字段大小写敏感。详见`事件机制`中事件发出者的说明。

## sliders <binding></binding> ##
`sliders` 用于指定滑块对应的值，如[10,20,50,87]

<live_demo example="controls/bullet/changeSliderValue" width="900"></live_demo>
## sliderStyles  <binding></binding>##

`sliderStyles` 用于滑块的样式，如
   > [
>                     {color:'red',label:'警告',position:'down'},
>                     {color:'green',label:'轻微',position:'up'},
>                     {color:'blue',label:'严重',position:'up'},
>                     {color:'gray',label:'致命',position:'up'}
>                 ]

其中 position 的值为 down,up,left,right,当滑块是横向的时候，应使用down或者up，
当滑块是纵向的时候应使用left或者right,关于滑块是横纵向，参见[direction](#direction)

<live_demo example="controls/bullet/changeSliderStyle" width="900"></live_demo>


## direction ##

`direction` 用于控件的方向，默认为horizontal（横向），支持的值为horizontal，vertical。
<live_demo example="controls/bullet/vertical" width="900"></live_demo>

## minValue <binding></binding>##

`minValue` 用于指定进度的最小值，默认为0。

## maxValue <binding></binding>##

`maxValue` 用于指定进度的最大值，默认为100。

## step <binding></binding>##

`step` 用于指定滑动的步长。
<live_demo example="controls/bullet/changeStepSize" width="900"></live_demo>

## editable <binding></binding>##

`editable` 用于指定能不能拖动。

## show_legend <binding></binding>##

`show_legend` 用于指定显不显示图例。




# 事件 #

## EventTypes.CHANGE ##
滑块拖动后，会向外发事件，发的内容为 sliders的值
		

