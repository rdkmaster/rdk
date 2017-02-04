# MenuService #

**菜单服务** 用于动态弹出及关闭菜单的服务，支持页面边界自动调整位置


这是使用MenuService的基础实例：
<live_demo example="common/menuservice/basic" ></live_demo>
<font color=green>提示：</font> 可多次提示

*MenuService* 提供了两个可调用的方法：

## addMenu ##

### 基本用法{#a}

        var moduleID = MenuService.addMenu(scope.menuConfig, position);

### 入参说明

1. menuConfig json对象，必选。是菜单的结构，可支持二级菜单。


<font color=red>**注意**</font> menuConfig参数必须定义到您的controller中

		[
			{label: 'menu item 1', event: 'menu_item_1'},
			{label: 'menu item 2', event: 'menu_item_2'},
			{label: 'memu item 3', event: 'menu_item_3'},
		]
		二级菜单的格式：
		[
			{label: 'menu item 1', event: 'menu_item_1'},
			{label: 'menu item 2', event: 'menu_item_2'},
			{label: 'memu item 3', list: [
				{label: 'submenu item 1', event: 'sub_menu_item_1'},
				{label: 'submenu item 2', event: 'sub_menu_item_2'}
			]},
		]
2. position 字符串/json对象,提示框显示的位置，支持在鼠标点击的位置显示，支持指定绝对位置，支持指定dom或domid

	- 绝对位置时，格式：
		  var position = {
				x: 200,
				y: 90
		  };

	- mouse，格式：'mouse'
	<font color=red>**注意**</font> 如果使用mouse指定菜单位置，用户需要在打开参数的函数中传入$event参数，否则无法打开菜单。

	- 指定为任意dom， 格式：
		var position = {
			relateTo: 'target',
			hoffset: 0,
			voffset: 0
		};


### 出参说明

返回的是菜单ID，后面用户可以用这个ID销毁菜单，方便用户自定义菜单销毁的流程

### 相关示例
1、入参 *position*  是绝对位置时的示例如下：

<live_demo example="common/menuservice/basic" ></live_demo>

2、入参 *position*  是 *mouse*时的示例如下：

<live_demo example="common/menuservice/mouse" ></live_demo>

3、入参 *position*  指定为 *domid*时的示例如下：

<live_demo example="common/menuservice/dom" ></live_demo>

4、menuConfig是二级菜单的示例如下：

<live_demo example="common/menuservice/multiple" ></live_demo>

## destroyMenu ##

分两个场景：

1、如果是在模块外部需要关闭弹出框，直接使用 *addMenu()* 方法缓存的出参 *moduleID* 销毁即可。

	var mid = MenuService.addMenu(...);

	....

	//取popup()返回的id
	MenuService.destroyMenu(mid);

2、如果需要在模块内部关闭弹出框，使用 *scope.$moduleId* 即可。

    MenuService.destroyMenu(scope.$moduleId);//模板控制器上这样获取moduleID


## 样式覆盖 ##

弹出菜单和二级菜单的宽度默认为 *150px*。支持用户自定义菜单宽度，编写 *css* 文件覆盖原来样式。

弹出菜单的根节点 *id* 内置值为 *menuID*，用户可通过下述方法进行 *css* 覆盖。

		//一级菜单样式覆盖
		#menuID{
			width: 200px !important;
		}
		//二级菜单样式覆盖
		#menuID ul.rdk_sub_menu{
			width: 200px !important;
		}


## SELECT ##

 *MenuService* 菜单支持 *SELECT* 回调。单击菜单某一选项，会触发 *moduleID* 的 *EventTypes.SELECT* 事件。用户只需要在主函数中注册监听该事件即可。

        var moduleID;
		scope.load = function(event){
            moduleID = MenuService.addMenu(scope.menuConfig, 'mouse', event);//缓存moduleID
            EventService.register(moduleID, EventTypes.SELECT, function(event, data){//注册监听
                alert(data);//回调函数
            });
        }

*SELECT* 回调及样式覆盖实例：
	
<live_demo example="common/menuservice/demo4select" ></live_demo>