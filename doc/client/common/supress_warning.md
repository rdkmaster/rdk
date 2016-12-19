## RDK中的属性事件回调
### 背景
RDK的很多控件都会对外发事件，而这些事件大多数都有对应的属性，使用事件属性可以非常方便的给一个事件添加回调，但是这个方式与angular的ng-click等有细微的不同，比如：

- rdk_button的click事件写法：`<rdk_button click="clickHandler"></rdk_button>`  
- angular的ng-click写法:`<rdk_button ng-click="clickHandler()"></rdk_button>`

注意到的区别就是angular的写法是在后面多了圆括号，而rdk的则没有。

- 不带圆括号的表示直接将`clickHandler`这个函数当做事件属性的回调函数。
- 带圆括号的表示执行`clickHandler()`这个函数，然后认为其返回一个函数作为事件属性的回调函数。

### 抑制警告
考虑到App切实可能有需要使用带圆括号的方式返回事件属性的回调的情形，我们提供了一种抑制这个告警的手段，具体使用方法是在RDK控件属性上增加一个 `supress_warning` 属性：

    <rdk_button click="clickHandler(arg1,arg2)" supress_warning></rdk_button>
