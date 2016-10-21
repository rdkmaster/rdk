<rdk_title>Button</rdk_title>

# 简介 #
`rdk_button` 是自带多种功能的按钮。

功能都用相应的属性表示,根据其取不同的值而有同的效果。

这是一个简单的 `rdk_button` 例子：

<live_demo example="controls/button/basic" width="900"></live_demo>

---
# 属性 #

## label ##
> 支持类型：字符串

label 用于按钮文字说明 ，支持双绑。默认值""。

## icon ##
> 支持类型：字符串

icon 按钮图标,放在文字说明的前面,支持双绑，值为图标路径时显示图标，其值为false时不显示，默认值为false。

## toggle ##
> 支持类型：布尔型。

toggle表示按钮是否保持按下的状态。

为false时（默认值），表示不启用，此时按钮只有响应单击的功能，即是一个最普通的按钮。此状态下selected属性的值永远为false

为true时，表示启用按钮状态，此时按钮被单击之后，会出现第一种样式(默认样式)，再单击一下会出现第一种的状态。此时的selected属性的值true/false对应着第一种样式(默认样式)和第二种样式

## selected ##
> 支持类型：布尔型。

selected 按钮当前的是按下的状态还是正常状态，支持双绑。默认值false。

## enabled ##
> 支持类型：布尔型。

enabled 表示按钮当前是否可响应单击，默认值true，支持双绑

## tooltip ##
> 支持类型：字符串。

tooltip 表示按钮的tooltip，支持双绑。

## click ##
> 支持类型：函数

click 表示按钮单击之后的回调函数

