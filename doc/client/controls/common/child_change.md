<rdk_title>child_change</rdk_title>

#childChange说明#

>支持类型：函数

此属性为通用属性

子级控件和父级控件之间的交互通道，子控件发生变化后可以通知其父级节点。
此属性具有冒泡属性，除了使用“RDKConst.STOP_PROPAGATIOIN”来停止冒泡，否则此变化会一直冒泡到根节点。

代码示例：

    scope.selected2string = function(selected, context, index) 
    {
       return Selector.selected2string(selected, 'label', '...');
    }
    <rdk_selector child_change="selected2string"></rdk_selector>

	

