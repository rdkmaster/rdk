# 双向数据绑定 #
双向数据绑定，也称为双向绑定或者简称绑定。它是AngularJS提供的一个非常有意义的功能，它能够极大地减少编码量，以及完全隔离对UI的操作，它是应用MVVM思想来开发web应用的基础。

几乎所有RDK的控件都有使用双向绑定运作的属性，因此了解一些双向绑定的知识对更好的使用RDK的控件会有很大的帮助。

## 双向绑定与数据类型 ##
双向绑定与js数据类型之间没有必然联系，一个应用双向绑定运作的属性可以是一个复杂的json对象，也可以是一个简单的数值、字符串。

比如 `rdk_selector` 控件的 `data` 属性和 `least` 属性，都应用了双向绑定，`data` 是一个复杂对象，而 `least` 则是一个简单数值。

	<!-- HTML代码 -->
	<rdk_selector data="allData" least="least">
	</rdk_selector>

	//JS代码
	scope.allData = [{label:"item1"},{label:"item2"}]; // 复杂对象
	scope.least   = 1; //简单数值

应用双向绑定的属性也支持直接以json字符串的形式来定义属性值，比如下面代码段运行的效果和前面例子是一样的

	<rdk_selector data="[{label:'item1'},{label:'item2'}]" least="1">
	</rdk_selector>

**注**：以json字符串形式定义双向绑定的属性值提供给控件，在控件内部改变了该值之后，应用无法获得变更后的新值，同时应用也无法再主动改变它的值了。因此以json字符串形式定义双向绑定的属性值的方式，仅适用于只需要初始化一次，然后再不会改变或者不关心其变化的场景。

## 何为双向 ##
所谓双向：

- 一端是应用的模型数据，即应用的 `scope` 上对应的属性。
- 一端是控件的内部，可以笼统的理解为UI。这一点和纯AngularJS语义下的双向绑定是有细微的区别的。

## 如何使用 ##
非常简单，直接修改 `scope` 上对应的属性即可自动更新UI，比如前面例子， `allData` 新增了一个item3，则只需要下面的代码即可：

	//JS代码
	scope.allData.push({label: "item3"});

控件会非常快的感知到值发生了变化，进而马上更新UI。

同样的，当控件内部修改了 `allData` 的值，则新的值会自动更新到 `scope.allData` 上，即**无论何时，应用读取的 `scope.allData` 的值永远和界面上是一致的**。 

## 注意事项 ##

以json字符串形式定义双向绑定的属性值，**值是字符串的时候，需要使用单引号将值包围起来，看上去是这样的**

	<!-- HTML代码 -->
	<rdk_graph graph_template="'my/templates/xxx.js'"></rdk_graph>

注意到 `'my/templates/xxx.js'` 使用了双引号包围了起来。如果忘了单引号包围起来，则在浏览器的控制台上会报类似下面的错误：

	Error: [$compile:nonassign] Expression 'my/templates/xxx.js' used with directive 'rdkGraph' is non-assignable!
		http://errors.angularjs.org/1.3.9-local+sha.a3c3bf3/$compile/nonassign?p0=my%2Ftemplates%2Fxxx.js&p1=rdkSelector
	    at angular.js:63
	    at parentSet (angular.js:7654)
	    at parentValueWatch (angular.js:7667)
	    at Object.regularInterceptedExpression (angular.js:12833)
	    at Scope.$digest (angular.js:14217)
	    at Scope.$apply (angular.js:14488)
	    at bootstrapApply (angular.js:1449)
	    at Object.invoke (angular.js:4182)
	    at doBootstrap (angular.js:1447)
	    at Object.bootstrap (angular.js:1467)

这样做的原因其实非常简单，就像我们调用 `eval()` 一样，下面的代码必然报错：

	//JS代码
	eval(my/templates/xxx.js);

而改为下面的代码则正常，并且 `eval()` 返回了一个字符串

	//JS代码
	eval('my/templates/xxx.js');

尽管这样的代码看上去有点奇怪，但是实际上非常好理解

	graph_template="'my/templates/xxx.js'"


<rdk_title>双向数据绑定</rdk_title>
