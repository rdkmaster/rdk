<rdk_editor></rdk_editor>

# 简介 #
`rdk_editor` 是在线编辑器。


这是一个简单的 `rdk_editor` 例子：

<live_demo example="controls/editor/basic" width="900"></live_demo>

---
# 属性 #

## text ##
> 编辑器中的文本，可双向绑定自定义的数据源

## editable ##
> 支持类型：布尔型，true/false，默认为`true`，

`editable` 属性指定编辑器是否可编辑，`true`为可编辑，`false`为只读。

`editable`使用例子:
<live_demo example="controls/editor/editable" width="900"></live_demo>

## foldable ##
> 支持类型：布尔型，true/false，默认为`false`

`foldable` 属性指定编辑器中的文本是否支持折叠，点击行号右侧的三角形可进行折叠，`true`为可折叠，`false`为不可折叠。

`foldable`使用例子:
<live_demo example="controls/editor/foldable" width="900"></live_demo>

## selectable ##
> 支持类型：布尔型，true/false，默认为`false`

`selectable` 属性指定编辑器中的文本是否增加选中效果，选中行为浅蓝色背景，默认为`false`，`true`为可显示选中效果，`false`为不显示。

`selectable`使用例子:
<live_demo example="controls/editor/selectable" width="900"></live_demo>


## type ##
> 支持类型：字符串，默认为`text`

`type` 属性指定编辑器中的文本类型，默认为`text`，还支持`Javascript`，`html`，`xml`, 不区分大小写。

`type`使用例子:
<live_demo example="controls/editor/type" width="900"></live_demo>




