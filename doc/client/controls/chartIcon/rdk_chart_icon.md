<rdk_title>chart icon</rdk_title>

# 简介 #
一个简洁，轻量级chart图标控件,可用于简单的chart图表显示，表格控件结合使用等。

详情请看官方文档说明：[http://benpickles.github.io/peity/](http://benpickles.github.io/peity/)

# 属性 #

## data ##
> 支持类型：对象或数据源id

`data` 是chart图标显示的数据。

## chart-type ##
> 支持类型：字符串

`chart-type` 图标类型；包含的可选值有（pie，donut，line，bar）：

这是一个简单的 `chart-type` 例子：

<live_demo example="controls/chartIcon/basic" width="900"></live_demo>

## chart-option ##
> 支持类型：对象

`chart-option` 配置chart属性。

这是一个简单的 `scroll_options` 例子：

<live_demo example="controls/chartIcon/option" width="900"></live_demo>


## ChartIconConfigProvider ##
> rdk-chart-icon服务配置对象

`ChartIconConfigProvider` 在应用配置模块中可以注入此服务，服务提供了一个setOptions方法为整个应用配置默认的rdk-chart-icon属性。

RDK对于rdk-chart-icon控件的默认配置如下：

    var $$options = {
        pie:{delimiter: null, fill: ["#19B293", "#D6D6D6"], height: null, radius: 8, width: null},
        donut:{delimiter: null, fill: ["#ff9900", "#fff4dd", "#ffd592"], height: null, innerRadius: null, radius: 8, width: null},
        line:{delimiter: ",", fill: "#c6d9fd", height: 16, max: null, min: 0, stroke: "#4d89f9", strokeWidth: 1, width: 32},
        bar: {delimiter: ",", fill: ["#4d89f9"], height: 16, max: null, min: 0, padding: 0.1, width: 32}
    }

这是一个简单的 `ScrollConfigProvider` 例子：

<live_demo example="controls/chartIcon/provider" width="900"></live_demo>


## 结合table应用 ##

这是一个表格中使用rdk-chart-icon例子：

<live_demo example="controls/chartIcon/combined" width="900"></live_demo>