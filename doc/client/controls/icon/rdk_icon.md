<rdk_icon></rdk_icon>

# 简介 #
`rdk_icon` 是带图标的描述文字。


这是一个简单的 `rdk_icon` 例子：

<live_demo example="controls/icon/basic" width="900"></live_demo>

---
# 属性 #

## icon ##
> 支持类型：字符串

`icon` 图标的class，支持font-awesome符号图标，例：fa fa-tag

`icon` 图片的src，例：./img/edit.png

传入图片src的例子：
<live_demo example="controls/icon/image" width="900"></live_demo>

`icon` 图片的base64码

传入图片src的例子：
<live_demo example="controls/icon/base64" width="900"></live_demo>

## label ##
> 支持类型：字符串

`label` 属性为图标后面的描述文本。

## click ##
单击 *icon* 后，如果定义了 *click* 函数，就会调用应用自定义的 *click* 方法。该属性可绕开事件机制。

 *click* 实例如下：
<live_demo example="controls/icon/demo4click" width="900"></live_demo>



