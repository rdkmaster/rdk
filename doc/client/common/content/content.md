<rdk_title>Alert</rdk_title>

# 简介 #

content是一个常用而强大的css属性，本篇具体介绍一些它的用法，以及简单的使用场景，很短的的代码，就能实现很神奇的功能。

---


**<font color=red>注意</font>**

content不能单独使用，必须配合伪元素'before'或者'after';具体如下图：



	        .box:before{
				content: '这是基础的用法！';
			}


### 1.基础的用法
代码如下：

		.box:before{
			content: '这是基础的用法！';
		}
content结合'before'或者'after'可以使元素多出2个子元素，before对应的是父元素的第一个子元素，after对应的是父元素的最后一个子元素，且这样的子元素都是行内元素，可以改变其属性，正常的使用css样式。

详细示例：
<live_demo example="common/content/basic" width="900" height="400"></live_demo>


### 2.清除浮动
这个上一章有详细讲解，这里就不多做描述。具体体现在下面这个类里。
		

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

### 3.attr（）方法
此方法非常神奇，可以获取元素的属性值，并且当属性值发生改变的时候，它会动态改变，类似于angular的双向绑定，具体代码如下

           a:before{
				content: '这是rdk的链接:' attr(href);
			}
详细示例：
<live_demo example="common/content/attr" width="900" height="400"></live_demo>


### 4.和css计数器结合使用
这个就厉害了支持的属性非常多，多用于目录的创建。


		ul{
			counter-reset: counter;
		}
		li{
			counter-increment: counter;
		}
		li:before{
			content: counters(counter,'.',cjk-ideographic) ' ';
		}

详细示例：
<live_demo example="common/content/counter" width="900" height="400"></live_demo>


### 5.进阶篇（跟rdk结合使用）
我们在一个项目中常常有这样的情况，使用rdk控件，html结构固定，后端传过来的数据也是固定的，比如这样：

<live_demo example="controls/table/basic" width="900" height="400"></live_demo>

如果现在有一个需求，要在第一列加一个名次，比如'第一名'这时候就可以通过content和计数器结合解决

		.box tbody{
			counter-reset: section;
		}
		.box tbody>tr{
			counter-increment: section;
		}
		.box tbody>tr>td:first-child:before{
			content:'第' counter(section) '名  :  ';
		}
		.box tbody>tr>td:first-child>div{
			display: inline-block;
		}

详细示例：
<live_demo example="common/content/advanced" width="900" height="400"></live_demo>

### 6.布局
因为content和:before伪元素结合相当于给父元素添加一个子元素，我们就可以利用这个子元素在不改变html结构的同事，做到一些对布局方面的改变，比如这里就是利用content做到让大小不固定的图片在父元素中水平垂直居中。代码如下：

		.box{
			width: 100px;
			height: 100px;
			background-color: #ccc;
			text-align: center;
			font-size: 0;
		}
		.box:before{
			content: 'content';
			display: inline-block;
			overflow: hidden;
			width: 0;
			height: 100%;
			vertical-align: middle;
		}
		img{
			vertical-align: middle;
		}

详细示例：
<live_demo example="common/content/layout" width="900" height="400"></live_demo>