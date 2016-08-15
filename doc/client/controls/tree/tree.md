
# 简介 #

`rdk_tree` 主要用于提供树形结构的展示。
`rdk_tree`的树形结构展示的内容及层级关系主要是通过提供给`rdk_tree`控件的数据源（JSON对象）的层级结构来指定的。

这是一个简单的 `rdk_tree` 例子：
<live_demo example="controls/tree/basic" width="900"></live_demo>

# 属性 #

##node##
>支持类型：JSON对象

`node`属性是`rdk_tree`控件的核心属性，因为每棵树都是由不同层级的`node`来组成的。

而每个`node`节点的结构也是固定的，具体格式如下：

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



#事件#


#样式#


<div>
<script data-main="/rdk/app/libs/rdk/rdk" src="/rdk/app/libs/requirejs/require.js"></script>
<script src="/doc/tools/doc_js/main.js"></script>
<script src="/doc/tools/doc_js/misc.js"></script>
</div>