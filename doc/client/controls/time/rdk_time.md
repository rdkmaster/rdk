<rdk_title>Time</rdk_title>

# 简介 #

`rdk_time` 主要用于时间选择

所有属性都缺省时，默认展现当天，时间粒度为天。

	<rdk_time></rdk_time>

这是一个简单的 `rdk_time` 例子：

<live_demo example="controls/time/basic" width="900"></live_demo>

---
# 属性 #

## label <binding></binding> ##
> 支持类型：字符串

`label` 用于设置时间选择控件左侧的主题名称。默认为时间，**如果设置为汉字时需要使用单引号**
 如:

	<rdk_time label="'我的时间控件'"></rdk_time>


## range ##

缺省`range`时，只会生成一个时间选择控件。用于选择某个时间点。
然后结合`setting`属性的`value`可以设置这个时间点的默认值。

<live_demo example="controls/time/defaultValue" width="900"></live_demo>

加入range属性后，就会生成两个时间选择控件，用来选择某个时间段。
然后结合`setting`属性的`value`可以设置时间段的起止时间。

<live_demo example="controls/time/gap" width="900"></live_demo>

## setting ##
> 支持类型：json对象

`setting` 用于设置时间粒度。

页面中使用方法：

		<rdk_time range setting="showGranularity"></rdk_time>

控制器中使用方法：

	    $scope.showGranularity = {
	        value: ['2016-03-04 14:00','2016-03-04 16:00'],
			granularity: "hour",
			startDate:"2016-01-01",
	        endDate:"2016-05-09",
	        selectGranularity: true,
	        granularityItems: [{
	            label: "15分钟",
	            value: "quarter"
	        }, {
	            label: "小时",
	            value: "hour"
	        }, {
	            label: "天",
	            value: "date"
	        }, {
	            label: "月",
	            value: "month"
	        }]
	    }

具体说明：

### value ###
  
用于设置默认时间点或者时间段。缺省`range`时设置的是默认时间点，否则设置默认时间段。
具体可参考`range`属性中的两个例子。

注意：`value`中支持 `now` 代表当前时间。`now - 2y` 代表当前时间向前追溯两年。支持`y/m/w/d/h`五种追溯方式。

<live_demo example="controls/time/macroValue" width="900"></live_demo>

还可以用于通过js改变value的值，达到控制查询时间的目的！

<live_demo example="controls/time/updateValue" width="900"></live_demo>

### granularity ###
	
时间粒度。也表示`value`的精确度。取值范围是 `date/week/month/hour/quarter` 五个值。如果设置成`hour`，则`value`精确到小时。

<live_demo example="controls/time/granularitySet" width="900"></live_demo>

###weekStart ###
标志一周开始，默认为周日（0），可配置0（星期日）到6（星期六）
<live_demo example="controls/time/weekStart" width="900"></live_demo>

###gap ###
当时间控件设置为range后，granularityItems支持gap属性，用于表示前后两个时间的时间间隔，支持
inday/inweek/inmonth/inyear 和具体的 1d,2w,3m,4y。
<live_demo example="controls/time/gap" width="900"></live_demo>

### startDate / endDate ###

用于限制可选择的时间范围。不论是时间点还是时间段，用户都只能在这个时间范围内选取。

<live_demo example="controls/time/limitValue" width="900"></live_demo>
	
### selectGranularity ###

时间粒度选择器开关。设置成`true`时，需配合`granularityItems`使用。产生时间粒度选择下拉框。

### granularityItems ###

时间粒度选择下拉框内容。目前只支持上述设置。

### refresh_timeout ###

用于设置时间刷新的间隔。主要针对value、startDate或endDate设置为`now`或`now-2h`等需要不时刷新的场景，默认为0，不刷新。

<live_demo example="controls/time/refresh" width="900"></live_demo>

以下是时间控件的综合使用例子：

<live_demo example="controls/time/showGranularity" width="900"></live_demo>

## time_select ##

用于不绑定输入框,独立使用时间控件场景。

页面中使用方法：

		<rdk_time_select setting="setting"></rdk_time>

控制器中可配置的属性：

	    $scope.setting = {
	        value: 'now-2h', //当前选中的时间value,支持双向绑定
			granularity: "quarter",  //粒度，类型枚举，备选date/week/month/hour/quarter，默认值是date
			weekStart:"0",          //属性，周开始设置，类型0~6数字。默认值是0
			startDate:"2016-01-01", //可选的开始时间，类型字符串/Date对象
	        endDate:"now"  //可选的结束时间，类型字符串/Date对象
	    }

<live_demo example="controls/time/timeSelect" width="900"></live_demo>

# 支持国际化 #
<live_demo example="controls/time/i18n" width="900"></live_demo>



