
# 简介 #

在网页布局中我们常常会用到float属性，本文主要介绍几种清除浮动的方法，以及各个方法之间的优缺点。

---


**<font color=red>注意</font>**
html代码结构：

		<div class="box" id="box">
			<div class="child">float</div>
		</div>

这是一个通用的样式，后面所有的例子。只会改变每种方法所需要的css样式。



			.box{
				border:20px solid red;
			}
	        .child{
				width: 100px;
				height: 100px;
				float: left;
				background-color: blue;
			}
			

#### 方案一
Bootstrap御用方案".clearfix"
就是定义一个类名为".clearfix"，内容如下：

		.clearfix { 
		  *zoom: 1; 
		} 
		.clearfix:before, 
		
		.clearfix:after { 
		  display: table; 
		  line-height: 0; 
		  content: ""; 
		} 
		.clearfix:after { 
		  clear: both; 
		} 
然后我们只需要在被浮动元素的父元素加上这个类就可以了。

		<div class="box clearfix" id="box">
			<div class="child">float</div>
		</div>

此方法为“万金油”，只需在css文件开头写下，整个项目都可以用，兼容性好，除了代码略长，没有缺点，建议使用。

详细示例：
<live_demo example="common/clear/clearfix" width="900" height="400"></live_demo>

#### 方案二
以毒攻毒法：让浮动元素的父元素也浮动。就可以清除子元素浮动。
	
	.box{
		float: left;
		border:20px solid red;
	}


此方法在父元素也浮动的时候，无需做任何处理，建议使用。	

详细示例：
<live_demo example="common/clear/float" width="900" height="400"></live_demo>

#### 方案三
给父元素加上"position: absolute;"
	
	.box{
		position: absolute;
		border:20px solid red;
	}


此方法在父元素绝对定位的时候，无需做任何处理，建议使用。			

详细示例：
<live_demo example="common/clear/position" width="900" height="400"></live_demo>

#### 方案四
改变父元素的display属性为"inline-block":
	
	.box{
		display: inline-block;
		border:20px solid red;
	}


此方法在父元素为行内块状元素的时候，无需做任何处理，建议使用。		

详细示例：
<live_demo example="common/clear/inline-block" width="900" height="400"></live_demo>

#### 方案五
overflow家族

1.overflow:auto
	
	.box{
		overflow:auto;
		border:20px solid red;
	}


此方法简单方便，但是要注意子元素的尺寸不能大于父元素，不然会出现滚动条。		

详细示例：
<live_demo example="common/clear/overflow_auto" width="900" height="400"></live_demo>  

2.overflow:hidden
	
	.box{
		overflow:hidden;
		border:20px solid red;
	}


此方法简单方便，但是有很多情况下我们需要子元素超出父元素的时候用不了，比如下拉菜单。		

详细示例：
<live_demo example="common/clear/overflow_hidden" width="900" height="400"></live_demo>   

3.overflow:scroll
	
	.box{
		overflow:scroll;
		border:20px solid red;
	}


此方法简单方便，但是会出现滚动条，如果在需要滚动条的地方，不用做任何处理，建议使用，否则不建议。	

详细示例：
<live_demo example="common/clear/overflow_scroll" width="900" height="400"></live_demo>         