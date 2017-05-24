
# 简介 #

滑动门效果可以用于图形展示，或者图片展示，代码简单，非常易用。

---


**<font color=red>注意</font>**

i标签在环境中是可以用rdk的图标，或者fontAwesome,或者bootstrap图标的。这里不支持我就直接用一个字母代替了。


每一个div里都可以替换成任何内容，包括rdk控件。



	        <div>1</div>



详细示例：
<live_demo example="common/animation/sliding_door" width="900" height="400"></live_demo>


## 代码优化 ##
现实项目中每一个item可能是动态生成的，我们可以用angular的ng-report，通过js控制其有多少个。比如这样
html代码：
		

		<div ng-repeat="item in graphs"></div>


js代码：

		var scope.graphs = [];
		scope.graphs.push({ bar:"bar"});            