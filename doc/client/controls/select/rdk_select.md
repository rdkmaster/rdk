<rdk_title>select</rdk_title>

# 简介 #

为了统一各浏览器对select标签表现不同的样式风格,使用select标签时需要增加selectpicker属性

# 属性 #

## selectpicker ##
> 支持类型：数字

`selectpicker` 属性必须增加在select标签上，属性值可有可无，selectpicker="5",属性值等于下拉可选项的数量：

这是一个简单的 `selectpicker` 例子：

<live_demo example="controls/select/basic" width="900"></live_demo>


# 方法 #

## refreshSelect ##

通过调用`refreshSelect`方法，更新下拉框选择值。

		rdk.xxxId.refreshSelect();

这是一个简单的 `refreshSelect` 例子：

<live_demo example="controls/select/change" width="900"></live_demo>