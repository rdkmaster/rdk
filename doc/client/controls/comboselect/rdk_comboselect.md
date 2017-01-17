<rdk_title>ComboSelect组合框</rdk_title>

# 简介 #

`rdk_combo_select` 控件为复合控件，其为一个包含下拉选择项的控件，用户可从中选择单个值或多个值。下拉列表可以支持任何形式的节点。一般来说是一个或者多个div / rdk控件的组合。

这是一个简单的 `rdk_combo_select` 例子：
<live_demo example="controls/comboselect/basic" width="605"></live_demo>

---
# 属性 #

## caption <binding></binding>##
>支持类型：字符串

此为rdk_combo_select的标题，在实际使用中一般展现的是选择项的信息。默认值：标题。代码如下：

    <rdk_combo_select caption="已选项:"></rdk_combo_select>

## open <binding></binding>##
>支持类型：布尔型

`open` 缺省时默认值为`false`，表示当前下拉选择项为折叠状态。

`open` 设置成 `true` 时，表示当前下拉选择项为展开状态。

## open_policy <binding></binding>##
>支持类型：字符串

`open_policy` 缺省时默认值为`click`，表示当前下拉选择项以点击方式打开。

`open_policy` 设置成 `hover` 时，表示当前下拉选择项可支持鼠标滑入方式打开。

## frozen <binding></binding>##
>支持类型：布尔型

`frozen` 设置成 `true` 时，表示控件被冻结，不响应单击操作，内容面板保持当前的关闭或打开状态。

`frozen` 设置成 `false` 时，表示控件支持单击打开或关闭内容面板的操作。缺省时，默认`frozen`为`false`。

详细示例：
<live_demo example="controls/comboselect/frozen" width="605"></live_demo>

## clear <binding></binding>##
>支持类型：布尔型

`clear` 缺省时默认值为`false`，不会显示全删按钮

`clear` 设置成 `true` 时，表示显示栏有内容时，全删按钮会出显，点击会删除其全部内容。
>## id ##
>支持类型：字符串

唯一标识此控件的属性。在控件的事件处理中，此属性为事件发出者，此字段大小写敏感。详见`事件机制`中事件发出者的说明。
代码如下：

    <rdk_combo_select id="cbs_Basic"></rdk_combo_select>

## child_change ##
>支持类型：函数

此属性用于将 rdk_selector 选中的对象转为一个字符串。
此属性为通用属性，请参见[`childChange`](/doc/client/controls/common/child_change.md)中的说明

<live_demo example="controls/comboselect/comboselect_childchange"  width="605"></live_demo>

# 事件 #

## CHANGE ##
监听到 `CHANGE` 事件后，控件的显示栏里会呈现对应的字符串。

<live_demo example="controls/comboselect/demo4change"  width="605"></live_demo>


#方法 #

暂无

# 样式 #

### [关键样式示例](/doc/client/demo/controls/comboselect/comboselect_style) ###

### rdk-combo-select-module ###

#### height ####
控件高度，默认值：200px

#### width {#width1}
控件宽度，默认值400px

#### position {#position1}
定位属性， 默认值：relative

### combo-caption ###

#### width {#width2}
控件宽度，默认值20%。

### combo-content-transclude ###

#### width {#width3}
选择信息控件宽度，默认值75%。

####position {#position2}
定位属性,默认值: absolute

#### margin-left ####
选项信息控件左面的空间即左外边距。默认属性:21%

#### z-index #####
设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。默认值： 9999，即总是在最上层

#### background-color ####
参见上文中的相关属性解释，默认值: white

### combo-content-theme ###

#### cursor####
使用的光标样式，默认值: pointer!important

**默认情况下class的优先级小于id，此处使用!important强制提升其优先级即强制重定义,此样式只在IE7及以上版本生效**

#### display ####
控件展示的属性，默认值: inline-block。


## 渲染器 ##

参见`BasicSelector控件`中相应的渲染器的说明。

## 数据源绑定 ##

参见`BasicSelector控件`中相应的数据源绑定的说明。



