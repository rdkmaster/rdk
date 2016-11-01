<rdk_title>scroll 滚动条</rdk_title>

# 简介 #
由于不同浏览器对滚动条的样式解析存在差异，为统一样式风格,增加整体美观程度,
在需要出现滚动条的元素上增加rdk_scroll属性就可以实现滚动条效果。


# 属性 #
## rdk_scroll ##
> 支持类型：字符串

`rdk_scroll` 给元素增加滚动条效果,为了防止浏览器出现默认滚动条需要设置overflow为hidden,不可将滚动条父元素overflow设为scroll；


这是一个简单的 `rdk_scroll` 例子：


<live_demo example="common/scroll/basic" width="900"></live_demo>

# 样式类说明 #

#### ps-container ####
滚动条容器样式，不需要更改。

#### ps-scrollbar-y-rail ####
y轴滚动条轨道

#### ps-scrollbar-y ####
y轴滚动条

#### ps-scrollbar-x-rail ####
x轴滚动条轨道

#### ps-scrollbar-x ####
x轴滚动条

