<rdk-area-select></rdk-area-select>

# 简介 #

`rdk-area-select` 主要用于地区选择


这是一个简单的 `rdk-area-select` 例子：
<live_demo example="controls/area/basic" width="600"></live_demo>

---
# 属性 #

## area-data <binding></binding> ##

> 返回数据类型：object或string

`area-data` 此属性设置一个绑定在scope上的对象用于接收地区选择控件返回的结果。默认为object

返回的object格式如下（具体字段属性名以数据库中对应的地区表为准）：

       scope.areaData = {
        	"province" :{proId:1,name:"广东省",……},
        	"city" :{cityId:2,name:"深圳市"……},
        	"area" :{areaId:3,name:"南山区"……}
        }



## result-type ##
> 支持类型：字符串

`result-type` 用于设置地区选择控件返回的结果类型。

 如设置:result-type="string" 则area-data属性返回的结果数据为字符串类型（"XXX省/XXX市/XXX区"）

# 事件 #

## callback ##

`callback` 用于执行地区选择后的回调函数。

这是一个设置回调函数的 `rdk-area-select` 例子：
<live_demo example="controls/area/callback" width="600"></live_demo>







