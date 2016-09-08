<rdk_title>弹出功能</rdk_title>

# 简介 #

在某些场景下，用户需要在进行某些操作后弹出对话框。`rdk_modal` 作为属性名称添加到某个块级元素后，该块级元素就会成为对话框元素。该属性需要初始化成 `hide`。

	  <div id="topModal" rdk_modal="hide"></div>

对话框共有四种表现方式：

- 模态框：`modal` 时是模态框。在关闭模态对话框之前，程序不能进行其他操作。
- 非模态框：`none_modal` 时是非模态框。非模态框状态下，程序仍然能够进行其他操作。
- 固定到文档流：`fixed` 时按文档流顺序排放对话框。
- 隐藏：`hide` 时隐藏对话框。


这是一个简单的 `rdk_modal` 例子：
<live_demo example="common/modal/basic" width="900" height="400"></live_demo>


---
# 属性 #

rdk可以通过事件的方式来实现对话框的模态/非模态/固定到文档流/隐藏这四种操作。

		EventService.broadcast(arg1, arg2, arg3);

- 第一个参数`arg1`，填写发出事件的对话框 `id`。
- 第二个参数`arg2`用来设置对话框状态，有四种取值`modal`/`none_modal`/`fixed`/`hide`。
- 第三个参数`arg3`用来设置对话框弹出位置。可以是坐标，也可以按约定的`offset`方式给值。

## 设置对话框状态 ##

第二个参数的不同取值对应四个不同的对话框状态。

### 模态框 ###

		EventService.broadcast('topModal', 'modal', {x:100, y:100});

表示`id`为`topModal`的对话框以模态框的方式弹出，坐标位置(100, 100)。

模态框详细示例如下：
<live_demo example="common/modal/demo4modal" width="900" height="400"></live_demo>

### 非模态框 ###

		EventService.broadcast('topModal', 'none_modal', {x:100, y:100});

表示`id`为`topModal`的对话框以非模态框的方式弹出，坐标位置(100, 100)。

非模态框详细示例如下：
<live_demo example="common/modal/demo4none_modal" width="900" height="400"></live_demo>

### 固定到文档流 ###

		EventService.broadcast('topModal', 'fixed');

表示`id`为`topModal`的对话框按文档流顺序排放。此时坐标设置是无效的。

固定到文档流详细示例如下：
<live_demo example="common/modal/demo4fixed" width="900" height="400"></live_demo>

### 隐藏对话框 ###

		EventService.broadcast('topModal', 'hide');
表示`id`为`topModal`的对话框需要隐藏。

隐藏对话框详细示例如下：
<live_demo example="common/modal/demo4hide" width="900" height="400"></live_demo>

## 设置对话框位置 ##
第三个参数用于设置对话框的弹出位置。只有对模态框和非模态框的状态，设置该参数才有意义。

### x & y ###
以模态框为例，事件的第三个参数`arg3`可以设置成坐标对象。

		var position = {x:100, y:200};
		EventService.broadcast('topModal', 'modal', position);

表示模态框`topModal`弹出坐标位置为(100, 200)。

### dom & offSet ###
以模态框为例，事件的第三个参数`arg3`也可以设置成如下对象。

		var position = {dom:arg11,offSet:arg22};
		EventService.broadcast('topModal', 'modal', position);

- `arg11`用于设置基准dom节点。
- `arg22`用于设置对话框相对基准dom的显示位置。取值一共有五个: `center`/`leftTop`/`leftBottom`/`rightTop`/`rightBottom`。

#### center ####

		pos = {dom:document.getElementById("id_p"),offSet:"center"};
    	EventService.broadcast(id, madal, pos);

详细示例如下：
<live_demo example="common/modal/offSet_center" width="900" height="400"></live_demo>

#### leftTop ####

		pos = {dom:document.getElementById("id_p"),offSet:"leftTop"};
    	EventService.broadcast(id, madal, pos);

详细示例如下：
<live_demo example="common/modal/offSet_leftTop" width="900" height="400"></live_demo>

#### leftBottom ####

		pos = {dom:document.getElementById("id_p"),offSet:"leftBottom"};
    	EventService.broadcast(id, madal, pos);

详细示例如下：
<live_demo example="common/modal/offSet_leftBottom" width="900" height="400"></live_demo>

#### rightTop ####

		pos = {dom:document.getElementById("id_p"),offSet:"rightTop"};
    	EventService.broadcast(id, madal, pos);

详细示例如下：
<live_demo example="common/modal/offSet_rightTop" width="900" height="400"></live_demo>

#### rightBottom ####

		pos = {dom:document.getElementById("id_p"),offSet:"rightBottom"};
    	EventService.broadcast(id, madal, pos);

详细示例如下：
<live_demo example="common/modal/offSet_rightBottom" width="900" height="400"></live_demo>


