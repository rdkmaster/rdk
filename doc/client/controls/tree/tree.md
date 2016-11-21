<rdk_title>Tree</rdk_title>


# 简介 #

`rdk_tree` 主要用于提供树形结构的展示。
`rdk_tree`的树形结构展示的内容及层级关系主要是通过提供给`rdk_tree`控件的数据源（JSON对象）的层级结构来指定的。

这是一个简单的 `rdk_tree` 例子：
<live_demo example="controls/tree/basic" width="900"></live_demo>

# 属性 #

## data <binding></binding>##
> 支持类型：对象或数据源id

`data` 是需要在树形中展示的全部信息，可以是某个`数据源`的id。

而每个节点的结构也是固定的，具体格式如下：

    [{
            node: [{
                key: "specialtopic",
                label: "专题",
                open: true,
                icon: "/rdk/app/libs/ztree/css/zTreeStyle/img/diy/8.png",
            }, {
                node: [],
                key: "specialtopic",
                label: "总览",
            }],
            key: "e2e",
            label: "端到端定界定位",
            open: true,
            icon: "/rdk/app/libs/ztree/css/zTreeStyle/img/diy/1_open.png",
        }, {
            node: [{
                key: "monitoring",
                label: "监控",
                open: true,
                icon: "/rdk/app/libs/ztree/css/zTreeStyle/img/diy/8.png",
            }, {
                node: [],
                key: "reasonconfig",
                label: "原因配置",
                icon: "/rdk/app/libs/ztree/css/zTreeStyle/img/diy/8.png",
            }],
            key: "realtimeMonitor",
            label: "实时监控",
            icon: "/rdk/app/libs/ztree/css/zTreeStyle/img/diy/1_open.png",
    }]

- **key（必选）当前节点的唯一标识**
- label（可选）当前节点的显示标签内容，如没有设置此属性，默认值为"undefined"
- open(可选) 当前节点及子节点是否展开，如果没有设置此属性，默认值为false
- icon（可选）当前节点展示的图标
- url（可选） 当前节点选中后跳转的页面路径
- font（可选） 当前节点的字体属性

##node_field##
> 支持类型：字符串

指明树形控件的每个节点在 `data` 中的对应关系，一般和`label_field`属性一同使用。比如：

    <rdk_tree ds="ds_tree" node_field="module" label_field="label" 
	ds_url="/doc/client/demo/controls/tree/mockdata/tree_data" ds_query_if="ready"></rdk_tree>
示例如下：
<live_demo example="controls/tree/datasource" width="900"></live_demo>

## label_field ##
> 支持类型：字符串

指明 `data` 的每个成员对象用于显示在界面上的属性名，默认值是 "label"。比如：

    <rdk_tree ds="ds_tree" node_field="module" label_field="label" 
	ds_url="/doc/client/demo/controls/tree/mockdata/tree_data" ds_query_if="ready"></rdk_tree>

示例如下：
<live_demo example="controls/tree/datasource" width="900"></live_demo>

##editable##
> 支持类型：Boolen值

此属性配置树形节点是否可以编辑，默认值为false。

当`editable`属性为true时，可以对节点进行如下操作：

- 修改选中节点的名称
- 删除选中的节点（此删除并不会真正的删除数据源的对应节点）

    <rdk_tree editable=true></rdk_tree>
示例如下：

<live_demo example="controls/tree/editable" width="900"></live_demo>


##draggable##
> 支持类型：Boolen值

此属性配置树形节点是否可以拖拽，必须配合draggable属性一起使用，当属性为true时可以拖拽，

	<rdk_tree editable=true draggable=true></rdk_tree>

示例如下：
<live_demo example="controls/tree/draggable" width="900"></live_demo>

##checkable##
> 支持类型：Boolen值

此属性配置,可以在节点前面生成勾选框。一级可以进行勾选操作！

    <rdk_tree checkable='true'></rdk_tree>
示例如下：
<live_demo example="controls/tree/checkable" width="900"></live_demo>

##setting##
> 支持类型：对象

此属性配置,可以实现懒加载。
html代码如下：

    <rdk_tree setting="setting"></rdk_tree>

setting里可以设置async属性根据需求设置数据地址等一些列参数，详细可见如下示例：

	
<live_demo example="comprehensive/tree/lazy_load/web" width="900"></live_demo>

##click##
此属性配置，可以直接为rdk_tree，添加click事件函数
html代码如下：

    <rdk_tree click="clickFun"></rdk_tree>

##double_click##
此属性配置，可以直接为rdk_tree，添加onDblClick事件函数
html代码如下：

    <rdk_tree double_click="doubleclickFun"></rdk_tree>

##collapse##
此属性配置，可以直接为rdk_tree，添加before_collapse事件函数
html代码如下：

    <rdk_tree collapse="collapseFun"></rdk_tree>

##expand##
此属性配置，可以直接为rdk_tree，添加before_expand事件函数
html代码如下：

    <rdk_tree expand="expandFun"></rdk_tree>

##rename##
此属性配置，可以直接为rdk_tree，添加before_rename事件函数
html代码如下：

    <rdk_tree rename="renameFun"></rdk_tree>

##remove##
此属性配置，可以直接为rdk_tree，添加before_remove事件函数
html代码如下：

    <rdk_tree remove="removeFun"></rdk_tree>

##editname##
此属性配置，可以直接为rdk_tree，添加before_editname事件函数
html代码如下：

    <rdk_tree editname="editnameFun"></rdk_tree>

##check##
此属性配置，可以直接为rdk_tree，添加check事件函数
html代码如下：

    <rdk_tree check="checkFun"></rdk_tree>

#事件#

##CLICK##

事件类型：EventTypes.CLICK，监 onclick 事件，即双击被选中树的某个节点，也可以在rdk_tree标签里，直接定义click函数。
<live_demo example="controls/tree/event_click" width="900"></live_demo>

##DOUBLE_CLICK##

事件类型：EventTypes.DOUBLE_CLICK，监听 onDblClick 事件，即单击被选中树的某个节点，也可以在rdk_tree标签里，直接定义double_click函数。
示例如下：
<live_demo example="controls/tree/event_doubleclick" width="900"></live_demo>

##BEFORE_COLLAPSE##

事件类型：EventTypes.BEFORE_COLLAPSE，监听到外层的 before_collapse 事件，即关闭被选中树的某个节点，也可以在rdk_tree标签里，直接定义collapse函数。
示例如下：

<live_demo example="controls/tree/event_beforeCollapse" width="900"></live_demo>

##BEFORE_EXPAND##

事件类型：EventTypes.BEFORE_EXPAND，监听到外层的 before_expand 事件，即打开被选中树的某个节点，也可以在rdk_tree标签里，直接定义expand函数。
示例如下：
<live_demo example="controls/tree/event_beforeExpand" width="900"></live_demo>

##BEFORE_RENAME##

事件类型：EventTypes.BEFORE_RENAME，监听到外层的 before_rename 事件，即修改被选中树的某个节点，也可以在rdk_tree标签里，直接定义rename函数。
示例如下：
<live_demo example="controls/tree/event_beforeRename" width="900"></live_demo>

##BEFORE_REMOVE##

事件类型：EventTypes.BEFORE_REMOVE，监听到外层的 before_remove 事件，即删除被选中树的某个节点，也可以在rdk_tree标签里，直接定义remove函数。
示例如下：
<live_demo example="controls/tree/event_beforeRemove" width="900"></live_demo>

##BEFORE_EDITNAME##

事件类型：EventTypes.BEFORE_EDITNAME，监听 before_editName 事件，即是否编辑被选中树的某个节点，也可以在rdk_tree标签里，直接定义editname函数。
示例如下：
<live_demo example="controls/tree/event_beforeEditName" width="900"></live_demo>

##CHECK##

事件类型：EventTypes.CHECK，监听 ON_CHECK 事件，即设置可勾选属性后，勾选tree节点后，可以得到勾选的节点。
示例如下：
<live_demo example="controls/tree/event_check" width="900"></live_demo>
#样式#
暂无

#更多事件请参考#
##通过如下方式我们可以得到zTreeObj，可以直接调用zTree方法##

<live_demo example="controls/tree/tree_method" width="900"></live_demo>

###利用zTree方法的综合案例：

此案例,选择某个节点后鼠标点击树控件外侧时 选择失效恢复最初没有选择状态。

示例如下：
<live_demo example="controls/tree/unselect_on_blur" width="900"></live_demo>


ztree  API
[http://http://www.treejs.cn/v3/api.php](http://http://www.treejs.cn/v3/api.php)


