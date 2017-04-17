<rdk_title>Alert</rdk_title>

# 简介 #

在网页布局中我们常常会用到流动布局，本文主要介绍一种非常省心的公式化的流动布局。

---


**<font color=red>注意</font>**
html代码结构：

		<div class="box">
			<div class="list">我是一个框</div>
		</div>

一个父元素，里面一个子元素，现在展示css代码：



			.box{ 
				text-align:justify;
				font-size: 0;
			}
			.box:after{
				content:"";
				display:inline-block; 
				width:100%; 
				height:0; 
				overflow:hidden;
			}
			.list{ 
				width: 200px;
				display:inline-block; 
				font-size: 12px;
			}

这段代码的意思就是父元素设置两端对齐，子元素定宽。然后我们改变子元素的个数就可以得到各种各样的布局。		

#### 常用的注册布局
注册页面大家一定不陌生，正常的情况下都是左边是“姓名，电话，注册码什么的”，右边是一个input框，比如这样：

	<div class="box">
		<span class="list">姓名：</span>
		<input class="list" type="text">
	</div>
一般情况下，姓名我们要求右对齐在左边，input框我们要求左对齐在右边
这时候如果用浮动，或者别的方式实现需要很多代码，可能还要改变dome结构。现在我们用两端对齐法看看效果：


同样的我们可以用这个公式做任意的两列布局

详细示例：
<live_demo example="common/justify/basic" width="900" height="400"></live_demo>

#### 注册布局示例二
注册布局一般肯定不止一个，如果是一列的我们直接复制上面的代码就可以实现：

详细示例：
<live_demo example="common/justify/one_column" width="900" height="400"></live_demo>

#### 注册布局示例三
现在需求升级，我们要求一行有两个注册框
	
			

详细示例：
<live_demo example="common/justify/two_column" width="900" height="400"></live_demo>

#### 普通列表布局
有这样一种场景就是一排列表，比如bootstrap官网下面的所有优秀网站示例图标，在宽屏下一排3个，中屏一排2个，小屏一排1个；套用我们的代码模板一样可以做到。
	

详细示例：
<live_demo example="common/justify/Columns" width="900" height="400"></live_demo>

