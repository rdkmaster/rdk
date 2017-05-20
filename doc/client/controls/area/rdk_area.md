<rdk-area-select></rdk-area-select>

# 简介 #

`rdk-area-select` 主要用于地区选择，或其它具有层次结构的数据选择（目前只支持三级层次结构数据）


这是一个简单的 `rdk-area-select` 例子：
<live_demo example="controls/area/basic" width="600"></live_demo>

---
# 属性 #
## ds_province ##
> 支持类型：字符串

`ds_province` 用于设置层次数据项的第一级数据，比如省

 如设置:ds_province="dsProvince" dsProvince属性值为某个数据源的id

## ds_city ##
> 支持类型：字符串

`ds_city` 用于设置层次数据项的第二级数据，比如市

 如设置:ds_city="dsCity" dsCity属性值为某个数据源的id

## ds_area ##
 > 支持类型：字符串

 `ds_area` 用于设置层次数据项的第三级数据，比如区

  如设置:ds_area="dsArea" dsArea属性值为某个数据源的id


## area-data <binding></binding> ##

> 返回数据类型：object

`area-data` 此属性设置一个绑定在scope上的对象用于接收地区选择控件返回的结果和设置默认地区

格式如下（具体字段属性名以数据库中对应的地区表为准）：

       scope.areaData = {
        	"province" :{proId:1,name:"广东省",……},
        	"city" :{cityId:2,name:"深圳市"……},
        	"area" :{areaId:3,name:"南山区"……}
        }

设置默认地区详细示例如下：
<live_demo example="controls/area/default" width="600"></live_demo>

## granularity ##
> 支持类型：字符串

`granularity` 用于设置地区选择粒度。取值范围是 common/province/city 3个值，缺省时默认值为common，表示进行省市区三级选择

详细示例如下：
<live_demo example="controls/area/granularity" width="600"></live_demo>

## multiple_select <binding></binding> ##
>支持类型：字符串

判断是否支持多选。为true则支持多选，为false则不支持。默认值为false

    <rdk_area multiple_select="true"></rdk_basic_selector>

<live_demo example="controls/area/multiple" width="405"></live_demo>

## multiple_area <binding></binding> ##
>支持类型：字符串

multiple_select设置为true多选时可以设置此属性，为true则可以跨省市选择区域。默认值为false

    <rdk_area multiple_select="true" multiple_area="true"></rdk_basic_selector>

<live_demo example="controls/area/multipleAreaSelf" width="405"></live_demo>

## province-label ##

配置第一级选择项页签名称,缺省时默认值为"省"。

## city-label ##

配置第二级选择项页签名称,缺省时默认值为"市"。

## area-label ##

配置第三级选择项页签名称,缺省时默认值为"区"。

## freeze-province ##

在地区粒度属性granularity配置为city时，可用于冻结默认省不可更改。

## showAll ##

默认在选择项里显示：全省，全市（特殊标签项）缺省时默认值为true,显示全省，全市选择项


详细示例如下：
<live_demo example="controls/area/setting" width="600"></live_demo>

## show-all-province ##

在`showAll` 设置为`false` 时可以设置此属性，表示在选择项里显示：全省（特殊标签项）


## show-all-city ##

在`showAll` 设置为`false` 时可以设置此属性，表示在选择项里显示：全市（特殊标签项）


详细示例如下：
<live_demo example="controls/area/showAll" width="600"></live_demo>

## default-selected ##

在没有配置`area-data`属性时，可以使用此属性快捷设置数据源记录中第一个数据为默认地区

    default-selected="the-one"

详细示例如下：
<live_demo example="controls/area/theOnedefault" width="600"></live_demo>

# 事件 #

如果设置了id，即可广播/监听以下事件。

## change ##

`change` 用于执行地区选择后的回调函数。

详细示例如下：
<live_demo example="controls/area/callback" width="600"></live_demo>

# 方法 #

## updateAreaData(data) ##

方法名：`updateAreaData` 用于执行其他操作更改地区数据
参数：`data` 需要更新的地区数据

详细示例如下：
<live_demo example="controls/area/update" width="600"></live_demo>





