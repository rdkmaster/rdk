
# 简介 #
`rdk_button` 是自带多种功能的按钮。

功能都用相应的属性表示,根据其取不同的值而有同的效果。

这是一个简单的 `rdk_button` 例子：

<live_demo example="controls/button/basic" width="900"></live_demo>

---
# 属性 #

## label ##
> 支持类型：字符串。

`label` 用于按钮文字说明 ，支持双绑。默认值""。

<live_demo example="controls/button/label" width="900"></live_demo>

## icon ##
> 支持类型：字符串。

icon 按钮图标,放在文字说明的前面,支持双绑，值为图标路径时显示图标，其值为false时不显示，默认值为false。icon同时也支持符号。

<live_demo example="controls/button/icon" width="900"></live_demo>

## toggle <binding></binding>  ##
> 支持类型：布尔型。

`toggle`表示按钮是否保持按下的状态。

为false时（默认值），表示不启用，此时按钮只有响应单击的功能，即是一个最普通的按钮。此状态下selected属性的值永远为false。

为true时，表示启用按钮状态，此时按钮被单击之后，会出现第一种样式(默认样式)，再单击一下会出现第一种的状态。此时的selected属性的值true/false对应着第一种样式(默认样式)和第二种样式。

<live_demo example="controls/button/toggle" width="900"></live_demo>

## selected <binding></binding> ##
> 支持类型：布尔型。

`selected` 按钮当前的是按下的状态还是正常状态，支持双绑。默认值false。

<live_demo example="controls/button/selected" width="900"></live_demo>

## enabled <binding></binding> ##
> 支持类型：布尔型。

`enabled` 表示按钮当前是否可响应单击，默认值true，支持双绑。

<live_demo example="controls/button/enabled" width="900"></live_demo>

## tooltip ##
> 支持类型：字符串。

`tooltip` 表示按钮的提示信息，支持双绑。

<live_demo example="controls/button/tooltip" width="900"></live_demo>

## click ##
> 支持类型：函数。

`click` 表示按钮单击之后的回调函数。

<live_demo example="controls/button/click" width="900"></live_demo>

## type ##
> 支持类型：字符串。

`type` 表示按钮的不用样式，目前只有7种样式，分别为 normal,danger,guidance,white,default,warning,caution默认值为normal。

<live_demo example="controls/button/type" width="900"></live_demo>

## reset-type ##
> 支持类型：字符串。

`reset-type` 为`true`时表示按钮类型在动态变化后，按钮再点击后会还原初始`type`,缺省时为`false`。

详细示例参考如下`setType`示例说明。

# 方法 #

## setType(type) ##

方法名：`setType` 用于动态设置按钮类型，改变按钮颜色

参数：`type` 需要设置的类型值，参数为空时还原按钮初始类型。

详细示例如下：
<live_demo example="controls/button/setType" width="900"></live_demo>
