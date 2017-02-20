<rdk_title>TimeSelect</rdk_title>

# 简介 #

`rdk_time_select` 用于没有输入框,独立使用时间控件场景。

所有属性都缺省时，默认展现当天，时间粒度为天。

	<rdk_time_select></rdk_time_select>

这是一个简单的 `rdk_time_select` 例子：

<live_demo example="controls/timeSelect/basic" width="900"></live_demo>

---
# 属性 #

## setting ##
> 支持类型：json对象

`setting` 用于设置时间控件配置项。

页面中使用方法：

		<rdk_time_select setting="setting"></rdk_time>

可配置的属性：

	    $scope.setting = {
            value: 'now-2h', //当前选中的时间value,支持双向绑定
            granularity: "quarter",  //粒度，类型枚举，备选date/week/month/hour/quarter，默认值是date
            weekStart:"0",          //属性，周开始设置，类型0~6数字。默认值是0
            startDate:"2016-01-01", //可选的开始时间，类型字符串/Date对象
            endDate:"now"  //可选的结束时间，类型字符串/Date对象
	    }

<live_demo example="controls/timeSelect/setting" width="900"></live_demo>


## refresh_timeout ##

用于设置时间刷新的间隔。主要针对value、startDate或endDate设置为`now`或`now-2h`等需要不时刷新的场景，默认为0，不刷新。

<live_demo example="controls/timeSelect/refresh" width="900"></live_demo>


