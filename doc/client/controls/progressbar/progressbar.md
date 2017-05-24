
# 简介 #

`rdk_progressbar` 主要用于进度渲染

这是一个简单的 `rdk_progressbar` 例子：

<live_demo example="controls/progressbar/basic" width="900"></live_demo>

---
# 属性 #

## value <binding></binding>##
>支持类型：数字

目前的进度值

## max <binding></binding>##
>支持类型：数字

进度的最大值

<live_demo example="controls/progressbar/max" width="900"></live_demo>

## type  <binding></binding>##
>支持类型：字符串

bootstrap的样式类型，'success', 'info', 'warning', 'danger' 可以应用bootstrap的默认样式。
当然，你也可以自定义自己的样式类型，那就要配置相应的css 如 .progress-bar-main  此时配置的type就是main

<live_demo example="controls/progressbar/randomValue" width="900"></live_demo>

## animate ##

是否值产生变化的时候有动画效果



# 其他典型场景 #

## 自定义显示的内容 ##

<live_demo example="controls/progressbar/customContent" width="900"></live_demo>


## 无值只需要显示进度条直到事情完成
<live_demo example="controls/progressbar/noValueBar" width="900"></live_demo>

##跟表格结合使用
<live_demo example="controls/progressbar/withTable" width="900"></live_demo>



