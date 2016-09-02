<rdk_title>ScoreIndicator</rdk_title>


# 简介 #

`rdk_score_indicator` 主要用于提供得分分布的百分占比展示。
主要是通过提供给`rdk_score_indicator`控件的config参数（JSON对象）来指定要展示的信息（如占比值，占比柱状图的颜色等）。

这是一个简单的 `rdk_score_indicator` 例子：
<live_demo example="controls/scoreindicator/basic" width="600" height="400"></live_demo>


# 属性 #

## config ##
> 支持类型：JSON对象数组

`config` 是需要在占比图中展示的全部信息，其由格式固定的JSON对象组成的数组。

具体格式如下：


		[
			{
                label: '优秀',
                color: '#64D083',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face1.png',
                value: 28,
                mark: true
            }, {
                label: '良',
                color: '#6AA6C5',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face2.png',
                value: 20,
                mark: true
            }, {
                label: '中间内容',
                color: '#FC9B58',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face3.png',
                value: 16,
                mark: true
            }, {
                label: '差太多',
                color: '#EE6D66',
                emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face4.png',
                value: 4,
                mark: true
    		}
		];

- **label（必选）**得分区间对应的占比的说明
- **color（必选）**得分区间对应的占比柱的颜色
- **emotion(必选)**得分区间对应的图片 
- **value（必选）**得分区间的占比值
- mark（可选） 是否展示`emotion`属性中的图片，默认值为false

示例如下：
<live_demo example="controls/scoreindicator/scoreindicator_update" width="600" height="400"></live_demo>
#事件#
暂无

#样式#
暂无


