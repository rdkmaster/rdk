<rdk_title>Editor</rdk_title>

# 简介 #
`rdk_editor` 是一个多行编辑器控件，它具有可编辑，可读，代码可折叠的功能。

这是一个简单的 `rdk_editor` 例子：

<live_demo example="controls/editor/basic" width="900"></live_demo>

---
# 属性 #

## value ##
> 支持类型：字符串。

value 编辑器中显示的代码文本 ，支持双绑。必选，默认值为 ""。

## mode ##
> 支持类型：字符串。

mode 编辑器支持的语言类型，取值为 JavaScript/HTML/CSS/Text。默认值为 Text。

## ds <binding></binding>  ##
> 支持类型：字符串。

ds 表示数据源绑定的变量，一般和ds-url一起使用。

## ds_url <binding></binding> ##
> 支持类型：字符串。

ds_url 将指向地址的代码当做 rdk_editor 控件的文本显示。

<live_demo example="controls/editor/with-ds" width="900"></live_demo>