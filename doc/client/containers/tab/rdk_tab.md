<rdk_title>Tab页</rdk_title>

# 简介 #

`rdk_tab` 控件是一个导航容器控件，`rdk_tab` 容器可以包含 `tab` 容器用于在其子容器间导航。
`rdk_tab`容器包含一组子容器，其中一次只能显示一个子容器。
`rdk_tab`容器中每个子容器均带有相应的选项卡，每个选项卡可以具有自己的标签和文本。
用户单击选项卡时，相应的子容器将显示为`rdk_tab`容器的选定子容器。

`rdk_tab`容器可以填充：

- 标准的HTML文本信息
- 表格、图片等格式，同时支持双向绑定
- 其它的rdk控件
- 其它的rdk容器

这是一个简单的 `rdk_tab` 例子：
<live_demo example="containers/tab/basic" width="800"></live_demo>

---
# 属性 #

## selected_tab <binding></binding>##
> 支持类型：字符串

此属性设置初始展现的选项卡。代码如下：

    <rdk-tab selected_tab="2"></rdk-tab>

## toggleCondition ##
>支持类型：字符串

此属性设置了激活选项卡的方式，默认值为click。
如果需要鼠标移动到选项卡上即激活选项卡，则此属性需要设置为“mouseover”。代码如下：

    <rdk-tab toggle_condition="mouseover"></rdk-tab>

## heightStyle ##
> 支持类型：字符串

此属性设置选项卡的高度，默认值为content。
此属性支持的选项为：

- auto ： 选项卡高度将被设置成最高的那个选项卡的高度
- content ： 每个选项卡将以自身内容为高度
- fill ： 扩展到基于选项卡的父容器的可用高度

代码如下：

    <rdk-tab height_style="auto"></rdk-tab>

## collapsible ##
>支持类型：字符串

此属性设置选项卡的折叠属性，默认值为false即不可折叠。代码如下：

    <rdk-tab collapsible="true"></rdk-tab>

<live_demo example="containers/tab/tab_collapsible" width="800"></live_demo>

## draggable ##
>支持类型：字符串

此属性设置选项卡是否支持拖拽功能，默认值：true即支持选项卡的拖拽。

    <rdk-tab draggable="false"></rdk-tab>

<live_demo example="containers/tab/tab_draggable" width="800"></live_demo>

## moveStep ##
>支持类型：字符串

此属性设置tab页签左右移动的个数。

    <rdk-tab move-step="4"></rdk-tab>

<live_demo example="containers/tab/tab_move" width="800"></live_demo>

## id ##
>支持类型：字符串

事件发出者，此字段大小写敏感。详见`事件机制`中事件发出者的说明。

## show_items ##
>支持类型：数组

缺省该属性时，默认显示所有标签。

自定义该属性时，显示对应序号的tab页。

<live_demo example="containers/tab/tab_show_items" width="800"></live_demo>

## show_close_button ##
tab的`div`模板带有该属性时，该`div`对应的tab页面会出现关闭按钮。使用方法如下：

		    <rdk_tab id='tabID'>
		        <div title="{{rdkSelector}}" show_close_button='true'>
		            <rdk_basic_selector selected_items="selectedItems" data="cityItems">
					</rdk_basic_selector>
		        </div>
		    </rdk_tab>

注意：demo请参照`addTab`。

## close/change/add ##

- 单击关闭按钮后，如果定义了`close`函数，就会调用应用自定义的`close`方法。该属性可绕开事件机制。
- 动态新增`tab`页后，如果定义了`add`函数，就会调用应用自定义的`add`方法。该属性可绕开事件机制。
- 切换`tab`页后，如果定义了`change`函数，就会调用应用自定义的`change`方法。该属性可绕开事件机制。

使用方法如下：


	 		<rdk_tab id='tabID' close="closeHandler" add="addHandler"  change="changeHandler"></rdk_tab>
	
	        scope.closeHandler = function(event, data){
	            var closeTabIndex = data.tabIndex;
	            rdk.tabID.destroyTab(closeTabIndex);
	            // rdk.tabID.closeTab(closeTabIndex);
	        }
	
	        scope.changeHandler = function(event, data){
	            var currentSelectedIndex = data;
	            alert('切换到第' + (currentSelectedIndex+1) + '个tab页');
	        } 
	
	        scope.addHandler = function(event, data){
	            alert('成功新增tab页');
	        } 

实例如下：
<live_demo example="containers/tab/demo4eventHandler" width="800"></live_demo>


# 事件 #

## TAB_SELECT ##
>事件类型：EventTypes.TAB_SELECT

通过广播此事件来跳转要显示的选项卡。
此事件接收3个参数：

- 事件的类型 : EventTypes.TAB_SELECT
- id号 : 当前rdk-tab控件的id
- 要显示的选项卡索引号

## CHANGE ##
>事件类型：EventTypes.CHANGE

选择的Tab页变化后，控件主动发出事件告知外部目前选择的是Index为什么的Tab页，Index从0开始

<live_demo example="containers/tab/tab_event" width="800"></live_demo>

## CLOSE ##
>事件类型：EventTypes.CLOSE

选择标签页上的`×`关闭按钮后，如果定义了tab的`id`，就会从内部抛出一个`CLOSE`事件。

应用监听该事件并结合下面的`desTroyTab`或者`closeTab`方法进行相应的处理。


#方法 #

## addTab ##

使用方法：`rdk.id.addTab(source, tabController, initData)`，以下是各参数的释义：

- `rdk.id`中的`id`对应的就是页面里`rdk_tab`控件的`id`值。
- `source`提供新增tab页的具体信息。支持`url`和`html`代码片段两种方式。
- `tabController`用户自定义的`controller`，创建的`scope`是`appScope`的子集。
- `initData`用户自定义的模板变量，是`tabController`上的变量。

**注意** 参数`tabController`和`initData`可缺省。

- 两个参数都不缺省时，模板中的数据优先从`initData`中读取，`tabController`次之，都没读取到，则从`appScope`上读取。
- 同时缺省`tabController`和`initData`时，模板中的数据绑定直接从最外层的`appScope`读取。
- 只缺省`initData`时，模板中的数据绑定优先从`tabController`上取，取不到再从父层`appScope`上读取。

`addTab`用于动态新增Tab页。使用方法如下：

		rdk.tabID.addTab('./scripts/template/tab.html', 'tabController', initData);
或者
		
		rdk.tabID.addTab(
			"<div title='new tab'><span>新增模板内容</span></div>", 
			'tabController', 
			initData);

`addTab`简单实例如下：

<live_demo example="containers/tab/demo4addTab_simple" width="800"></live_demo>

`addTab`较复杂实例如下：

<live_demo example="containers/tab/demo4addTab_complex" width="800"></live_demo>


## destroyTab ##
当监听到`CLOSE`事件后，用户可以选择销毁对应的tab页面。

`rdk.id.destroyTab(index)`中各参数的释义：

- `rdk.id`中的`id`对应的就是页面里`rdk_tab`控件的`id`值。
- `index`表示第几个`tab`页，从`0`开始计数。

`destroyTab`用于销毁tab页面。直接将第`index`个tab页从dom树上清理掉。使用方法如下：

    EventService.register('tabID', EventTypes.CLOSE, function(event, data){
        var result = confirm('是否关闭Tab页');
        if(result){
            rdk.tabID.destroyTab(data.tabIndex);
        }
    });

demo举例如下：

<live_demo example="containers/tab/demo4deletetab" width="800"></live_demo>


## closeTab ##
当监听到`CLOSE`事件后，用户可以选择**隐藏**对应的tab页面，隐藏掉的tab页仍然占着位置，只是UI上看不到而已。

- `rdk.id`中的`id`对应的就是页面里`rdk_tab`控件的`id`值。
- `index`表示第几个`tab`页，从`0`开始计数。

`closeTab`用于隐藏tab页面。直接将第`index`个tab页从dom树上隐藏掉。使用方法如下：

    EventService.register('tabID', EventTypes.CLOSE, function(event, data){
        var result = confirm('是否关闭Tab页');
        if(result){
            rdk.tabID.closeTab(data.tabIndex);
        }
    });

## showTab ##
对于被close的Tab页，可以调用此方法将其再次显示出来。注意，被destroy的tab页无法恢复。

- `rdk.id`中的`id`对应的就是页面里`rdk_tab`控件的`id`值。
- `index`表示第几个`tab`页，从`0`开始计数。

使用方法如下：

    rdk.tabID.showTab(tabIndex);

## getTabs ##
获得当前所有的tab页信息

使用方法如下：

    var tabs = rdk.tabId.getTabs();
    console.log(tabs);

## activeTab ##
激活某个tab页，参数如下

- index 待激活的tab索引值

使用方法如下：

    rdk.tabId.activeTab(0);


# 样式 #

暂无

## 渲染器 ##

Tab 的 title还支持动态渲染,以title_renderer标签去标志
<live_demo example="containers/tab/titleRender" width="800"></live_demo>

## 数据源绑定 ##

暂无


