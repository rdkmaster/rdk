<rdk_title>Panel</rdk_title>

# 简介 #

`rdk_panel` 提供了一种用于组织控件的分组机制，在页面内为其他控件提供了一个容器，可以将多个控件放入一个Panel容器中，作为一个单元进行控制，如隐藏或显示等；用户可以定制Panel的宽度、高度，高度自适应，且支持文本超出宽度后自动换行；用户也可以设置容器的标题和图标（暂只支持Font Awesome),且在用户点击关闭图标后，容器会广播“预关闭”事件，用户可以实施其他工作，如弹出提示框等，再确定关闭。

这是一个简单的 `rdk_panel` 例子：
<live_demo example="containers/panel/basic" width="405"></live_demo>

---
# 属性 #

## title <binding></binding>##
> 支持类型：字符串

此属性设置panel控件的标题,默认值为“标题”。**如果数值为汉字时需要使用单引号**，如：

      <rdk_panel title="City"></rdk_panel>
	  <rdk_panel title="'城市'"></rdk_panel>  

## icon ##
> 支持类型：FontAwesome格式的图标

此属性可以设置标题的图标，此图标为FontAwesome格式的。

      <rdk_panel icon="fa fa-cubes"></rdk_panel> 

## show_title ##
> 支持类型：字符串

此属性定义了初始时容器是否显示标题，默认不显示，如果需要设置为true。

      <rdk_panel show_title="true"></rdk_panel>

## show_close ##
> 支持类型：字符串

此属性定义了初始时容器是否显示关闭图标，默认不显示，如果需要设置为true。

      <rdk_panel show_close="true"></rdk_panel>


示例如下：
<live_demo example="containers/panel/panel_title" width="405"></live_demo>

## height和width##
>支持类型：字符串

这两个属性设置了容器的宽度和高度，如果不设置，默认宽度为200px，高度自适应；设置高度后，
如果超出范围会自动出现滚动条；同时支持文本超出宽度后自动换行。

     <rdk_panel width="300px" height="300px"></rdk_panel>

示例如下：
<live_demo example="containers/panel/panel_style" width="405"></live_demo>

## id ##
>支持类型：字符串

事件发出者，此字段大小写敏感。详见`事件机制`中事件发出者的说明。



# 事件 #
事件是RDK实现交互的主要手段之一，强大但易用。[了解更多](/doc/client/common/event/EventService.md)。控件会广播“BEFORE_CLOSE”事件，同时注册监听“CLOSE”事件，这样用户在点击关闭图标后，可以执行一些其他操作。

示例如下：
<live_demo example="containers/panel/panel_close" width="405"></live_demo>

#方法 #
暂无

# 样式 #

### 模块整体样式 ###

#### width ####
控件宽度，默认值200px

#### float ####
浮动，默认值left

#### border ####
边框样式 默认值：1px solid #A5A6AA

#### position ####
定位 默认值：relative

#### display ####
显示 默认值：inline-block

#### border ####
边框样式 默认值：1px solid #A5A6AA

#### border-radius ####
向元素添加圆角边框样式，默认值：4px

### 内容面板属性 ###

#### overflow-y:auto ####
属性定义文本超出后自动换行

#### width ####
宽度 默认值：100%

#### font-weight ####
字体笔画粗细，默认值：bold

#### font-size ####
字体大小，默认值：medium

#### cursor####
使用的光标样式，默认值: pointer

