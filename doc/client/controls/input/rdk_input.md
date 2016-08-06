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


<div>
<script data-main="/rdk/app/libs/rdk/rdk" src="/rdk/app/libs/requirejs/require.js"></script>
<script src="/doc/tools/doc_js/main.js"></script>
<script src="/doc/tools/doc_js/misc.js"></script>
</div>