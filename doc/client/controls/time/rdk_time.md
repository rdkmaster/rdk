# 简介 #

`rdk_time` 主要用于时间选择

所有属性都缺省时，默认展现当天，时间粒度为天。

	<rdk_time></rdk_time>

这是一个简单的 `rdk_time` 例子：

<live_demo example="controls/time/basic" width="900"></live_demo>

---
# 属性 #

## label ##
> 支持类型：字符串

`label` 用于设置时间选择控件左侧的主题名称。

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

注意：`value`中支持 `now` 代表当前时间。`now - 2y` 代表当前时间向前追溯两年。支持`y/m/w/d/h`四种追溯方式。

<live_demo example="controls/time/macroValue" width="900"></live_demo>

### granularity ###
	
时间粒度。也表示`value`的精确度。取值范围是 `date/month/hour/quarter` 四个值。如果设置成`hour`，则`value`精确到小时。

<live_demo example="controls/time/granularitySet" width="900"></live_demo>

### startDate / endDate ###

用于限制可选择的时间范围。不论是时间点还是时间段，用户都只能在这个时间范围内选取。

<live_demo example="controls/time/limitValue" width="900"></live_demo>
	
### selectGranularity ###

时间粒度选择器开关。设置成`true`时，需配合`granularityItems`使用。产生时间粒度选择下拉框。

### granularityItems ###

时间粒度选择下拉框内容。目前只支持上述设置。


以下是时间控件的综合使用例子：

<live_demo example="controls/time/showGranularity" width="900"></live_demo>


<div>
<script data-main="/rdk/app/libs/rdk/rdk" src="/rdk/app/libs/requirejs/require.js"></script>
<script src="/doc/tools/doc_js/main.js"></script>
<script src="/doc/tools/doc_js/misc.js"></script>
</div>