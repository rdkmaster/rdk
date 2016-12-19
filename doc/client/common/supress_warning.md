##RDK中的属性事件回调
###背景
RDK的很多控件都会对外发事件，而这些事件大多数都有对应的属性，使用事件属性可以非常方便的给一个事件添加回调，但是这个方式与angular的ng-click等有细微的不同，比如:<br/>
rdk_button的click事件写法：`<rdk_button click="clickHandler"></rdk_button>`  
angular的ng-click写法:`<rdk_button ng-click="clickHandler()"></rdk_button>`<br />   
注意到的区别就是angular的写法是在后面多了圆括号，而rdk的则没有。这个细微的差别会让应用开发者很难区分开。关键是，rdk的事件回调如果加上圆括号，也没有报错，但是会造成功能不正常。之所以不报错，可以根据下方代码理解：<br />
当<code>click="clickHandler()"</code>时候，在js中返回一个函数，即：<br />
<pre><code>function clickHandler(){
  return function {
    //code
  }
}
</code></pre><br />

###解决
在rdk的Utils服务中新增对控件属性的检测和提示的函数，该函数会在编译阶段执行，若没有按照rdk的方式使用，则在控制台出现warning警告。<br />
###抑制警告
考虑到实际的App场景中存在无法避免地使用带有参数的情况，我们也提供了一种抑制手段，具体使用方法是在RDK控件属性上增加一个<code>supress_warning</code>属性，无需赋值<br />  
`<rdk_button click="clickHandler(arg1,arg2)" supress_warning></rdk_button>`
