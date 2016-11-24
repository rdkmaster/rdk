# PopupService #

**弹出框服务** 用于动态加载模块，并提供弹出及关闭弹出服务。

<font color=red>**注意**</font> 用户需要自行编辑需要加载的模板及模板对应的控制器。


*PopupService* 提供了两个可调用的方法：

## popup ##

### 基本用法

		var sampleUrl = '/doc/client/demo/common/popupservice/demo4loadModule/template/sample_module.html';
        var initData = {myData: 'load module manually...'};
		var moduleStatus = false;
		var effect = 'explode';
		var dialogID = 'dialog_id'
        var moduleID = PopupService.popup(sampleUrl, initData, moduleStatus, effect, dialogID);

### 入参说明

1. sampleUrl 字符串，必选。是需要动态加载的模板路径
2. initData json对象，可选。是模板的初始化数据，可以被模板内部定义的同名变量覆盖
3. moduleStatus 缺省时默认为 true 代表模态弹出，设置成false时代表弹出框非模态
4. effect 弹出框特效，缺省时默认为'scale'。支持设置的特效属性有：blind,clip,drop,explode,fold,puff,slide,scale,size,pulsate 
5. dialogID 弹出框id，缺省时弹出框没有id属性。设置该属性可以用于样式覆盖。

### 出参说明

返回的是弹出模块的ID，后面用户可以用这个ID销毁弹出框

## removePopup ##

分两个场景：

1、如果是在模块外部需要关闭弹出框，直接使用 *popup()* 方法缓存的出参 *moduleID* 销毁即可。

	var mid = PopupService.popup(...);

	....

	//取popup()返回的id
	PopupService.removePopup(mid);

2、如果需要在模块内部关闭弹出框，使用 *scope.$moduleId* 即可。

    PopupService.removePopup(scope.$moduleId);//模板控制器上这样获取moduleID



*PopupService* 示例如下：
<live_demo example="common/popupservice/demo4loadModule" width="900" height="400"></live_demo>

## Style ##

### 弹出框样式

要覆盖弹出框原有样式，可以利用 *popup()* 中的第五个入参 *dialogID* 。在用户自定义 *css* 文件时，通过覆盖样式文件 *rdk-PopupService-style.css* 中的各样样式，以实现用户的样式定制。

#### 基本用法

	var moduleID = PopupService.popup(sampleUrl, initData, false, 'explode', 'dialogID');

	...以下是css文件中的样式定义...

	#dialogID{
		border: 5px solid green;
	}
	
	#dialogID .rdk-popupservice-titlebar{
		background-color: red;
	}
	
	#dialogID .rdk-popupservice-content{
		background-color: blue;
	}

### 标题和图标

弹出框的标题和图标，读取的是用户自定义的模板的 *caption* 及 *icon* 属性。缺省时为空。

<font color=red>**注意**</font> *icon* 目前只支持 *font-awesome* 标准图标。譬如 
`<i class="fa fa-windows">`

#### 基本用法

	<div controller="SampleModuleController" class='sampleClass' caption='弹出框标题' icon='<i class="fa fa-windows"></i>'>
	    ...
	</div>



*PopupService* 样式覆盖示例如下：
<live_demo example="common/popupservice/demo4css" width="900" height="400"></live_demo>