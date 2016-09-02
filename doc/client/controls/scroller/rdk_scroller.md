<rdk_title>Scroller翻页</rdk_title>

# 简介 #
`rdk_scroller` 是可以自定义内容的轮播器。翻页策略支持timeout和manual的组合，分别是超时自动翻页、鼠标单击翻页，默认同时支持。当设置了超时自动翻页后，支持自定义超时时间。此外，也可以自定义轮播同时显示的页数。


# 属性 #

## data ##
> 支持类型：对象

`data` 是用户自定义的对象名，可以使用item双绑具体的值，如：

	<rdk_scroller data="images" >
	   <img ng-src="{{item.src}}"/>
	   <span> {{item.title}} </span>
	</rdk_scroller>

这是一个简单的 `rdk_scroller` 例子：

<live_demo example="controls/scroller/basic" width="900"></live_demo>

---

## page_num ##
> 支持类型：整型

`page_num` 属性可以让用户自定义轮播显示的页数。默认为1,示例如下：

<live_demo example="controls/scroller/page_num" width="900"></live_demo>

---

## loop ##
>支持类型：布尔型

`loop`属性可以让用户配置是否一直循环下去，默认为true；如何设置为false，则轮播到最后一页后，箭头会灰化，不允许继续往下。

## scroll_policy ##
> 支持类型：字符串

`scroll_policy`只支持三种：'manual'--单击翻页；'timer'--超时翻页；默认同时支持单击翻页和超时翻页。设置为manual时，示例如下：

<live_demo example="controls/scroller/manual" width="900"></live_demo>

---
## timeout ##
> 支持类型：整型

`timeout`属性可以让用户设置超时时间，以毫秒为单位，默认为5000ms。结合`scroll_policy`设置为timer或者默认全支持使用，示例如下：

<live_demo example="controls/scroller/timer" width="900"></live_demo>

---

#样式修改#
##箭头的透明度##
在style中，设置class为left-arrow和right-arrow的样式，opacity设置透明度，top设置箭头的相对高度，默认透明度0.5：

	<style type="text/css">
	  .left_arrow  {
	   opacity: 0.9;
	   top:200px;
	  }
	  .right_arrow {
	   opacity: 0.9;
	   top:200px;
	  }
	</style>


这是一个设置箭头样式的 `rdk_scroller` 例子：

<live_demo example="controls/scroller/style" width="900"></live_demo>

---

`rdk_scroller`也支持内嵌其他rdk控件，这里以图像结合`rdk_graph`为例,设置显示页数为3，如下所示：

<live_demo example="controls/scroller/con_graph" width="900"></live_demo>

---

