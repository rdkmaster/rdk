# PopupService #

**弹出框服务** 用于动态加载模块，并提供弹出及关闭弹出服务。

<font color=red>**注意**</font> 用户需要自行编辑需要加载的模板及模板对应的控制器。


*PopupService* 提供了两个可调用的方法：

## popup ##

### 基本用法{#a}

        var moduleID = PopupService.popup(module, initData, option);

### 入参说明

1. module 字符串，必选。是需要动态加载的模板路径，或者html片段字符串。
2. initData json对象，可选。是模板的初始化数据，可以被模板内部定义的同名变量覆盖
3. option json对象，可选。option的结构为：

		{
		    id: '', 			//对话框id，只用于样式覆盖，可选
		    modal: true, 		//是否模态，缺省时默认为true
		    controller: '', 	//模块的控制器
		    showTitle: true, 	//是否显示标题，缺省时默认为true
		    effect: '',			//特效，缺省时默认为scale，可选为 blind,clip,drop,explode,fold,puff,slide,scale,size,pulsate
		
		    //绝对位置
		    x: 12,				//x,y 属性优先级最高，出现x,y则无视其他位置属性
		    y: 12,
			//相对位置
		    left: 12,			//left优先级大于right
		    right: 12,
		    top: 12,			//top优先级大于bottom
		    bottom: 12
		}


### 出参说明

返回的是弹出模块的ID，后面用户可以用这个ID销毁弹出框


### 相关示例
1、入参 *module* 是 *url* 时的示例如下： 

<live_demo example="common/popupservice/demo4ModuleUrl" width="900" height="400"></live_demo>

2、入参 *module* 是 *html片段* 时的示例如下： 

<live_demo example="common/popupservice/demo4ModuleFraction" width="900" height="400"></live_demo>

3、入参 *option* 中传入 *controller* 时的示例如下： 

<live_demo example="common/popupservice/demo4OptionController" width="900" height="400"></live_demo>

4、入参 *option* 中传入 *位置配置参数* 时的示例如下： 

<live_demo example="common/popupservice/demo4OptionPosition" width="900" height="400"></live_demo>


## removePopup ##

分两个场景：

1、如果是在模块外部需要关闭弹出框，直接使用 *popup()* 方法缓存的出参 *moduleID* 销毁即可。

	var mid = PopupService.popup(...);

	....

	//取popup()返回的id
	PopupService.removePopup(mid);

2、如果需要在模块内部关闭弹出框，使用 *scope.$moduleId* 即可。

    PopupService.removePopup(scope.$moduleId);//模板控制器上这样获取moduleID

## Style ##

### 弹出框样式

要覆盖弹出框原有样式，可以利用 *popup()* 中 第三个入参 *option* 的 *id* 。在用户自定义 *css* 文件时，通过覆盖样式文件 *rdk-PopupService-style.css* 中的各样样式，以实现用户的样式定制。

#### 基本用法{#b}

		var sampleUrl = '/doc/client/demo/common/popupservice/demo4css/template/sample_module.html';
		var initData = {myData: 'load module manually...'};
		var myOption = {
		    modal: false,
		    effect: 'explode',
		    id: 'dialogID'
		}
		var moduleID = PopupService.popup(sampleUrl, initData, myOption);
		
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
`fa fa-windows`

#### 基本用法{#c}

	<div controller="SampleModuleController" class='sampleClass' caption='弹出框标题' icon='fa fa-windows'>
	    ...
	</div>



*PopupService* 样式覆盖示例如下：
<live_demo example="common/popupservice/demo4css" width="900" height="400"></live_demo>


## 访问弹出模块内部方法/属性 ##

### 基本用法{#d}

1、模板控制器上的方法

			this.destroy = function(){
	            alert('ready to destroy the dialog...');
	        }

2、主控制器上的调用

			var moduleID = PopupService.popup(sampleUrl, initData, myOption);
			rdk[moduleID].child.destroy();
	


- *moduleID* 返回的是弹出框的模块ID

- *rdk[moduleID].child* 返回的是模板控制器实例，可以访问定义在模板控制器的方法。


*child* 使用示例如下：
<live_demo example="common/popupservice/demo4child" width="900" height="400"></live_demo>