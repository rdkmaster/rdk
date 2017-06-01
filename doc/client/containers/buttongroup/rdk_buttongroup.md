
# 简介 #

`rdk_buttongroup` 提供了一种用于组织按钮的工具栏，是一种显示位图式按钮行的控制条，用于映射自定义的菜单项或者响应不同事件。

这是一个简单的 `rdk_buttongroup` 例子：
<live_demo example="containers/buttongroup/basic" width="405"></live_demo>

---

# 分组 #
`rdk_buttongroup`支持对控件进行分组，通过分隔符`rdk_separator`指令实现，如：

	<rdk_button_group style="margin-right:20px">
			<button><i class="fa fa-cc-mastercard"></i></button>
			<button><i class="fa fa-area-chart"></i></button>
			<rdk_separator> </rdk_separator>
			<button><i class="fa fa-plug"></i></button>
	</rdk_button_group>

完整示例如下：
<live_demo example="containers/buttongroup/setgroups" width="405"></live_demo>





