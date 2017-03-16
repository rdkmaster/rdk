<rdk_title>Input</rdk_title>

# 简介 #
`rdk_input` 是带删除功能的输入框。

输入框内容非空时，删除按钮可见。单击删除按钮，可以清空输入框内容。

这是一个简单的 `rdk_input` 例子：

<live_demo example="controls/input/basic" width="900"></live_demo>

---
# 属性 #

## ng-model ##
> 支持类型：变量名

`ng-model` 用于实现 `rdk_input` 和变量的双向绑定。

## placeholder ##
> 支持类型：字符串

`placeholder` 属性提供可描述输入字段预期值的提示信息。该提示会在输入字段为空时显示，并会在字段获得焦点时消失。

## readonly ##
> 支持类型：布尔型

`readonly`取值`true`时，内容只读，不允许修改。取值`false`时，输入框内容支持修改。

这是`readonly`使用例子:

<live_demo example="controls/input/readonly" width="900"></live_demo>

## icon ##
支持右侧图标自定义。目前只支持 *Font Awesome Icons*。
缺省 *icon* 属性时，右侧默认为 关闭 按钮。作用是清空 *input* 输入框内容。

## click ##
单击输入框右侧图标后，如果定义了 *click* 函数，就会调用应用自定义的 *click* 方法。该属性可绕开事件机制。

这是 *click* 使用例子:

<live_demo example="controls/input/demo4click" width="900"></live_demo>

# 事件 #

如果设置了`id`，即可广播/监听以下事件。

## blur ##
输入框失去焦点后触发。

这是 *blur* 使用例子:

<live_demo example="controls/input/basic" width="900"></live_demo>