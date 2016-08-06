# 简介 #

`rdk_accordion` 控件是一个导航容器控件，此导航容器具有一组子容器，但一次只能显示其中一个。它创建和管理导航器按钮，您可以使用这些按钮在子项之间导航。每个子容器都有一个相关的导航器按钮，但是所有导航器按钮都属于`rdk_accordion`容器，并不属于子项。当用户单击导航器按钮时，就会显示相关的子容器。到另一个子项的过渡过程将使用动画效果，这样用户就可以清楚地看到一个子项消失和另一个子项的出现。 

这是一个简单的 `rdk_accordion` 例子：
<live_demo example="containers/accordion/basic" width="405"></live_demo>

---
# 属性 #

## caption <binding></binding>##
> 支持类型：字符串

此属性设置accordion控件的标题,默认值为“标题”。**如果数值为汉字时需要使用单引号**，如：
      <rdk_accordion caption="theme"></rdk_accordion>
	  <rdk_accordion caption="'城市'"></rdk_accordion>  

## open <binding></binding>##
> 支持类型：字符串

此属性定义了初始的子容器是否处于展现状态。默认为不展现。
如果需要在初始时就展现子容器，则需要将此属性设置为true。
    
    <rdk_accordion open="true"></rdk_accordion>

## buttons <binding></binding>##
> 支持类型：JSON对象

可以在导航区域添加自定义的按钮，此按钮可以通过渲染的方式添加相关的属性。代码如下：

        scope.buttonSource = [{
            icon: "images/delete.png",
            label: "删除",
            tooltips: "点击将删除内容",
            callback: function(obj) {
                alert("点击了删除按钮！");
            }
        }];

- icon ： 按钮的图标，可选项
- label ： 按钮的标签，可选项
- tooltips ： 按钮的功能提示，可选项
- callback ： 点击按钮的回调函数，**必选项**

示例如下：
<live_demo example="containers/accordion/accordion_buttons" width="405"></live_demo>

## foldedIcon 和 unfoldedIcon <binding></binding>##
>支持类型：FontAwesome格式的图标

这两个属性设置了折叠按钮的图标，此图标为FontAwesome格式的。

使用此控件已经引用了此格式的图标样式，因此无需再次引用否则需要依赖注入`'css!rd.styles.FontAwesome'`
foldedIcon默认值"fa fa-angle-double-down"
unfoldedIcon默认值"fa fa-angle-double-up"

示例如下：
<live_demo example="containers/accordion/accordion_foldedIcon" width="405"></live_demo>

## frozen <binding></binding>##
>支持类型：字符串

此属性设置是否冻结当前展现，默认值为false即不冻结。
如果需要冻结当前展现需要将此属性设置成true。
代码如下：

    <rdk_accordion frozen="true"></rdk_accordion>

示例如下：
<live_demo example="containers/accordion/accordion_frozen" width="405"></live_demo>

## editable <binding></binding>##
> 支持类型：字符串

此属性设置`caption`是否支持编辑功能，默认值为false。比如：

    <rdk_accordion editable="true"></rdk_accordion>

示例如下：
<live_demo example="containers/accordion/accordion_editable" width="405"></live_demo>

## id ##
>支持类型：字符串

事件发出者，此字段大小写敏感。详见`事件机制`中事件发出者的说明。



# 事件 #
事件是RDK实现交互的主要手段之一，强大但易用。[了解更多](/doc/common/event)。

## child_change ##

此属性为通用属性，请参见[`childChange`](/doc/controls/common/child_change.html)中的说明

#方法 #
暂无

# 样式 #

### [关键样式示例](/demo/containers/accordion/accordion_style) ###

### 模块整体样式 ###

#### width ####
控件宽度，默认值400px

#### max-height ####
控件最大高度，默认值：800px

### 导航按钮（框）属性 ###

#### padding ####
属性定义元素边框与元素内容之间的空间（单位：像素）。默认值：5px（即属性元素与上边框的间隔为5px）,padding属性的默认填充顺序为从上开始的顺时针方向。

#### width ####
宽度 默认值：100%

#### background-color ####
背景色 默认值：#E3E3E3

#### position ####
定位 默认值：absolute

#### border ####
边框样式 默认值：1px solid #CDCDCD

#### border-radius ####
向元素添加圆角边框样式，默认值：4px

#### font-weight ####
字体笔画粗细，默认值：bold

#### font-size ####
字体大小，默认值：medium

#### cursor####
使用的光标样式，默认值: pointer

### 文本属性 ###

#### width ####
宽度 默认值: 100%

#### border ####
参见上文中的相关属性解释，默认值: 1px solid #CDCDCD

#### border-radius ####
参见上文中的相关属性解释，默认值: 4px

#### padding ####
参见上文中的相关属性解释，默认值: 3px

## 渲染器 ##

详细说明参见`BasicSelector`控件中相关章节。

### [渲染器示例](/doc/containers/accordion/render_demo.html) ###

## 数据源绑定 ##

详细说明请参见`BasicSelector`控件中相关章节。



<div>
<script data-main="/rdk/app/libs/rdk/rdk" src="/rdk/app/libs/requirejs/require.js"></script>
<script src="/doc/tools/doc_js/main.js"></script>
<script src="/doc/tools/doc_js/misc.js"></script>
</div>