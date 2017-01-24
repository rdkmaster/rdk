<rdk_numeric_input>Numeric_Input</rdk_numeric_input>

# 简介 #
`rdk_numeric_input` 是数值输入框

可支持上下按键改变数值，可支持点击向上、向下按钮增加或减少数值。

这是一个简单的 `rdk_numeric_input` 例子：

<live_demo example="controls/numericinput/basic" width="900"></live_demo>

---
# 属性 #

## min ##
> 支持类型：数值/字符串

`min` 用于设置输入框的可输入数值的最小值。

## max ##
> 支持类型：数值/字符串

`max` 用于设置输入框的可输入数值的最大值。

这是`min和max`的使用例子:

<live_demo example="controls/numericinput/minmax" width="900"></live_demo>

## step ##
> 支持类型：数值/字符串，默认值为1，支持小数点后10位以内的浮点数

`step` 用于设置输入框中。

这是`step`的使用例子:

<live_demo example="controls/numericinput/step" width="900"></live_demo>

## change ##
> 支持类型：函数

`change` 用于指定数值改变时的响应函数。

这是`change`的使用例子:

<live_demo example="controls/numericinput/change" width="900"></live_demo>



