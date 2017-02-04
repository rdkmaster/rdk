# NotifyService #

**提示框服务** 用于动态弹出及关闭弹出服务，也可加载用户模板作为提示内容。

<font color=red>**注意**</font> 如果使用用户模板方式，用户需要自行编辑需要加载的模板及模板对应的控制器。

这是使用NotifyService的基础实例：
<live_demo example="common/notifyservice/basic" ></live_demo>
<font color=green>提示：</font> 可多次提示

*NotifyService* 提供了两个可调用的方法：

## notify ##

### 基本用法{#a}

        var moduleID = NotifyService.notify(message, option);

### 入参说明

1. message json对象，必选。是需要显示的内容。

		{
			title: '',			//提示框的标题
			message: ''			//提示框的内容，可以是字符串，可以是html字符串，也可以是用户模块url
		}

2. option json对象，可选。option的结构为：

		{
		    position: '',		//提示框显示的位置，缺省默认right，显示在页面的右上侧
			type: '',		    //message的格式，有 url/html/text 三种，缺省默认 text
			initData: ''        //初始化数据，参照 module 中的 initData
		}


### 出参说明

返回的是弹出模块的ID，后面用户可以用这个ID销毁弹出框


### 相关示例
1、入参 *option* 中 *type* 是 *html*时的示例如下：

<live_demo example="common/notifyservice/html" ></live_demo>

2、入参 *option* 中 *type* 是 *url*时的示例如下：

<live_demo example="common/notifyservice/url" ></live_demo>


## removeNotify ##

分两个场景：

1、如果是在模块外部需要关闭弹出框，直接使用 *notify()* 方法缓存的出参 *moduleID* 销毁即可。

	var mid = NotifyService.popup(...);

	....

	//取popup()返回的id
	NotifyService.removePopup(mid);

2、如果需要在模块内部关闭弹出框，使用 *scope.$moduleId* 即可。

    NotifyService.removePopup(scope.$moduleId);//模板控制器上这样获取moduleID

