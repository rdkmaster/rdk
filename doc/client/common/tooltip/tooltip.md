rdk_tooltip 属性

给任意标签增加rdk_tooltip属性，当用户点击该标签时，将在该标签的上方显示指定内容的提示框；当用户点击其它位置时，提示框消失

# tooltip属性的基本用法 #
<ANY_TAG rdk_tooltip="prompt text" ></ANY_TAG>

这是基本实例：
<live_demo example="common/tooltip/basic" width="900"></live_demo>

# 属性 #
## rdk_tooltip ##
> 支持类型：字符串

`rdk_tooltip` tooltip的提示内容，支持富文本

传入富文本的例子：
<live_demo example="common/tooltip/html" width="900"></live_demo>

## rdk_tooltip_placement ##
> 支持类型：字符串

`rdk_tooltip_placement` 设置tooltip所在位置，默认位置为`top`

`rdk_tooltip_placement` 可支持'top-left'，'top'，'top-right'，'right-top'，'right'，'right-bottom'，'bottom-right'，'bottom'，'bottom-left'，'left-bottom'，'left'和'left-top'，总共12个方向

这是placement的例子：
<live_demo example="common/tooltip/placement" width="900"></live_demo>


## rdk_tooltip_trigger ##
> 支持类型：字符串

`rdk_tooltip_trigger` tooltip的触发方式，默认是focus

 - `focus` 触发方式为`focus`时，即标签得到焦点时显示提示框，失去焦点时隐藏提示框
 - `hover` 触发方式为`hover`时，即鼠标移动到标签上时显示提示框，鼠标移出标签区域时隐藏提示框
 - `click` 触发方式为`click`时，即点击标签上时显示提示框，再次点击标签时隐藏提示框

这是trigger的例子：
<live_demo example="common/tooltip/trigger" width="900"></live_demo>
