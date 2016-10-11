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

## granularity ##
> 支持类型：字符串

`granularity` 用于设置地区选择粒度。取值范围是 common/province/city 3个值，缺省时默认值为common，表示进行省市区三级选择

详细示例如下：
<live_demo example="controls/area/granularity" width="600"></live_demo>

## setting ##
> 支持类型：json对象

`result-type` 用于设置地区选择控件返回的结果类型。

页面中使用方法：

		<rdk-area-select area-data="test" granularity="city" setting="setting"></rdk-area-select>

控制器中使用方法：

        $scope.setting={
            defaultData:{
                "province" :{name:"四川",code:510000,……},
                "city" :{name:"成都",code:510100,……},
                "area" :{name:"金牛区",code:510106,……}
            },
            disabled:true
        };

具体说明：

### defaultData ###

用于设置默认地区。

### disabled ###

在地区粒度属性granularity配置为city时，可用于锁定默认省不可更改。

详细示例如下：
<live_demo example="controls/area/setting" width="600"></live_demo>

# 事件 #

## callback ##

`callback` 用于执行地区选择后的回调函数。

这是一个设置回调函数的 `rdk-area-select` 例子：
<live_demo example="controls/area/callback" width="600"></live_demo>







