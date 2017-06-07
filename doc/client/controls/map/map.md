
# 简介 #

`rdk_map` 主要用于Echart版本的地图展现


这是一个简单的 `rdk_map` 例子：

<live_demo example="controls/map/basic" width="900"></live_demo>

---
# 属性 #

## id ##
> 支持类型：字符串

`id` 用于唯一标识一个图形，主要用于事件交互。

## map_define ##
`map_define` 用于指定生成图形的模板文件Url

## width ##

`width` 用于指定图形的宽度。
## height ##

`height` 用于指定图形的高度。

## data ##

`data` 用于生成图形显示的其他数据。

## map ##
`map` 用于指定地图资源文件地址,目前仅支持json文件格式，该类文件可从echart官网下载[http://echarts.baidu.com/download-map.html](http://echarts.baidu.com/download-map.html)。

# 事件 #

## 接收的事件 ##

### UPDATE_GRAPH ###
接收的事件，用于外部数据变化后，发事件通知地图更新。
<live_demo example="controls/map/visualMap" width="900"></live_demo>

### mapSelect/mapUnSelect ###
接收的事件，用于外部选择或者取消地图的某块区域
<live_demo example="controls/map/mapselected" width="900"></live_demo>

## 发出的事件 ##
1. click
1. dblclick
1. mousedown
1. mouseup
1. mouseover
1. mouseout
1. globalout
1. legendselectchanged
1. legendselected
1. legendunselected
1. datazoom
1. datarangeselected
1. timelinechanged
1. timelineplaychanged
1. restore
1. dataviewchanged
1. magictypechanged
1. pieselectchanged
1. pieselected
1. pieunselected
1. mapselectchanged
1. mapselected
1. mapunselected

# 具体使用场景 #

## 地图点击 ##
<live_demo example="controls/map/event" width="900"></live_demo>

## 切换地域 ##
<live_demo example="controls/map/changemap" width="900"></live_demo>

## 外部选择某块区域 ##
<live_demo example="controls/map/mapselected" width="900"></live_demo>

## 不同地域渲染成不同颜色块并加上气泡 ##
<live_demo example="controls/map/visualMap" width="900"></live_demo>

## 地域钻取 ##
<live_demo example="controls/map/drill" width="900"></live_demo>
		


