
# 简介 #
`rdk_switch` 是在线编辑器。


这是一个简单的 `rdk_switch` 例子：

<live_demo example="controls/switch/basic" width="900"></live_demo>

---
# 属性 #

## checked ##
> 支持类型：布尔型，true/false，默认为`false`

`checked` 开关的状态值，`true`为打开状态，`false`为关闭状态

## on_label ##
> 支持类型：字符串，默认为`on`，

`on_label` 属性指定开关状态为打开时的显示文本，例：开。

`on_label`使用例子:
<live_demo example="controls/switch/label" width="900"></live_demo>

## change ##
> 支持类型：函数

`change` 指定当开关状态发生改变时的处理函数。

`change`使用例子:
<live_demo example="controls/switch/change" width="900"></live_demo>

## enabled ##
> 支持类型：布尔型，true/false，默认为`true`

`enabled` 指定开关的使能，`true`为可以操作开关，`false`为不可操作，仅显示当前状态。

`enabled`使用例子:
<live_demo example="controls/switch/enabled" width="900"></live_demo>

