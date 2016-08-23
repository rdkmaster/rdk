# 简介 #

`rdk_tab` 控件是一个导航容器控件，`rdk_tab` 容器可以包含 `tab` 容器用于在其子容器间导航。
`rdk_tab`容器包含一组子容器，其中一次只能显示一个子容器。
`rdk_tab`容器中每个子容器均带有相应的选项卡，每个选项卡可以具有自己的标签和文本。
用户单击选项卡时，相应的子容器将显示为`rdk_tab`容器的选定子容器。

`rdk_tab`容器可以填充：

- 标准的HTML文本信息
- 表格、图片等格式，同时支持双向绑定
- 其它的rdk控件
- 其它的rdk容器

这是一个简单的 `rdk_tab` 例子：
<live_demo example="containers/tab/basic" width="800"></live_demo>

---
# 属性 #

## selected_tab <binding></binding>##
> 支持类型：字符串

此属性设置初始展现的选项卡。代码如下：

    <rdk-tab selected_tab="2"></rdk-tab>

## toggleCondition ##
>支持类型：字符串

此属性设置了激活选项卡的方式，默认值为click。
如果需要鼠标移动到选项卡上即激活选项卡，则此属性需要设置为“mouseover”。代码如下：

    <rdk-tab toggle_condition="mouseover"></rdk-tab>

## heightStyle ##
> 支持类型：字符串

此属性设置选项卡的高度，默认值为content。
此属性支持的选项为：

- auto ： 选项卡高度将被设置成最高的那个选项卡的高度
- content ： 每个选项卡将以自身内容为高度
- fill ： 扩展到基于选项卡的父容器的可用高度

代码如下：

    <rdk-tab height_style="auto"></rdk-tab>

## collapsible ##
>支持类型：字符串

此属性设置选项卡的折叠属性，默认值为false即不可折叠。代码如下：

    <rdk-tab collapsible="true"></rdk-tab>

<live_demo example="containers/tab/tab_collapsible" width="800"></live_demo>

## draggable ##
>支持类型：字符串

此属性设置选项卡是否支持拖拽功能，默认值：true即支持选项卡的拖拽。

    <rdk-tab draggable="false"></rdk-tab>

<live_demo example="containers/tab/tab_draggable" width="800"></live_demo>

## id ##
>支持类型：字符串

事件发出者，此字段大小写敏感。详见`事件机制`中事件发出者的说明。

## show_items ##
>支持类型：数组

缺省该属性时，默认显示所有标签。

自定义该属性时，显示对应序号的tab页。

<live_demo example="containers/tab/tab_show_items" width="800"></live_demo>


# 事件 #

## TAB_SELECT ##
>事件类型：EventTypes.TAB_SELECT

通过广播此事件来跳转要显示的选项卡。
此事件接收3个参数：

- 事件的类型 : EventTypes.TAB_SELECT
- id号 : 当前rdk-tab控件的id
- 要显示的选项卡索引号

## CHANGE ##
>事件类型：EventTypes.CHANGE

选择的Tab页变化后，控件主动发出事件告知外部目前选择的是Index为什么的Tab页，Index从0开始

<live_demo example="containers/tab/tab_event" width="800"></live_demo>
#方法 #
暂无

# 样式 #

暂无

## 渲染器 ##

暂无

## 数据源绑定 ##

暂无



<div>
<script data-main="/rdk/app/libs/rdk/rdk" src="/rdk/app/libs/requirejs/require.js"></script>
<script src="/doc/tools/doc_js/main.js"></script>
<script src="/doc/tools/doc_js/misc.js"></script>
</div>