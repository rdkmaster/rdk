
# 简介 #
由于不同浏览器对滚动条的样式解析存在差异，为统一样式风格,增加整体美观程度,
在需要出现滚动条的元素上增加rdk_scroll属性就可以实现滚动条效果。

滚动条是基于第三方插件perfect-scrollbar实现的，此插件的使用要求：

*   必须有一个内容元素
*   容器必须拥有一个'position'的CSS样式定义
*   滚动条的position必须是'absolute'
*   scrollbar-x必须拥有一个'bottom'的样式定义，scrollbar-y必须有一个'right'的样式定义

# 属性 #
## rdk_scroll ##
> 支持类型：字符串

`rdk_scroll` 给元素增加滚动条效果,为了防止浏览器出现默认滚动条需要设置overflow为hidden,不可将滚动条父元素overflow设为scroll；


这是一个简单的 `rdk_scroll` 例子：


<live_demo example="common/scroll/basic" width="900"></live_demo>

## scroll_options ##
> 支持类型：字符串对象

`scroll_options` 配置滚动条的属性；


支持可选参数的部分配置如下：

详情请看官方文档说明：[https://github.com/noraesae/perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar)

    options={
        handlers：'click-rail' //用来处理滚动元素的程序列表['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch']
        wheelSpeed:1 //默认为1，鼠标滚轮移动滚动条的速度
        minScrollbarLength:null //滚动条最小长度
        maxScrollbarLength:null //滚动条最大长度
        theme:"xxx" //以样式名ps-theme-xxx增加到滚动条容器上，可定制滚动条主题样式
    }

这是一个简单的 `scroll_options` 例子：

<live_demo example="common/scroll/options" width="900"></live_demo>

## ScrollConfigProvider ##
> 滚动条服务配置对象

`ScrollConfigProvider` 在应用配置模块中可以注入此服务，服务提供了一个setOptions方法为整个应用配置统一风格的滚动条效果。

这是一个简单的 `ScrollConfigProvider` 例子：

<live_demo example="common/scroll/provider" width="900"></live_demo>


# 事件 #
ps-scroll-y

Y轴方向滚动时触发。

ps-scroll-x

x轴方向滚动时触发。

ps-y-reach-start

滚动到Y轴始端触发

ps-y-reach-end

滚动到Y轴末端触发

使用代码如下：

    document.addEventListener('ps-scroll-x', function () {
      // ...
    })
    or with jQuery

    $(document).on('ps-scroll-x', function () {
      // ...
    })


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

