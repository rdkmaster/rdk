
## 集合/数组/对象的常用功能集 ##

系统引入了underscore这个开源库，可以直接使用这个库的相应函数。

[查看underscore使用API](underscore_doc_v1_7_0.html)

## 文件操作 {#file_oper}

[查看文件操作API](service_file_api.html)

## 消息队列 ##

- [查看消息队列API -- JS](service_mq_js_api.html)
- [查看消息队列API -- JAVA](service_mq_java_api.html)
- [其他手册](ActiveMQ_menual.chm)

## API

### 日志 ###

RDK提供了一组记录日志的函数，它们有共同的定义：
	
	function log(msg1, msg2, msg3, ...)；

参数：

- `msg1`, `msg2`, ... 任意对象。可选。RDK会尝试将这些对象转为字符串写入日志中，目前完美支持Date，任意结构的json对象。对其他复杂对象支持不好，不支持Java对象。

一共有这些（日志级别由低到高）：

- `log()` / `debug()`：记录debug级别的日志
- `info()`：记录info级别的日志
- `warn()`：记录warn级别的日志
- `error()`：记录error级别的日志
- `fatal()`：记录fatal级别的日志
- `crit()`：记录一些关键日志，级别最高

日志生成在app目录下的 server/logs/log.txt 文件内。


### `kv() ` ###

定义：

	function kv(map, defaultValue);

参数：

- map 一个JS对象。必选。一般来说，是 `mapper()` 函数的返回值。
- defaultValue 一个整数/字符串/布尔。可选，默认值是key本身，即默认返回key值。

返回：可用于 `matrix()` 的列**转换函数**，这个转换函数的作用是返回某个值在入参 `map` 中的映射。

说明：常常用于对数据集中的某列做国际化，可以参考 `matrix()` 函数的例子。

示例：某个表中有一个字段用于表示“是否”这样的状态，存在库中，1代表“是”，0代表“否”，可以使用下面的代码得到一个转换函数：

	var tranformFunction = kv({1: "是", 0: "否"});

	var val = tranformFunction(0); // "否"
	var val = tranformFunction(1); // "是"
	var val = tranformFunction(2); // 2

如果期望在输入非1、0时得到“未知”，则可以使用下面代码

	var tranformFunction = kv({1: "是", 0: "否"}， "未知");
	var val = tranformFunction(2); // "未知"


### `mapper() ` ###

定义：

	function mapper(sql, key, value, keepResultSet);

参数：

- sql 一个SQL字符串或者结果集`java.sql.ResultSet`。必选。
- key 一个整数/字符串。必选。结果集中的字段名，或者字段序号（从1开始）。
- value 一个整数/字符串。必选。结果集中的字段名，或者字段序号（从1开始）。
- keepResultSet 一个布尔值。可选，默认值是false。
	- 为`false`（默认）： 在返回之前自动清理所占数据库连接和其他数据库资源。
	- 为`true`：结果集在函数返回后依然可用，但是它所占的数据库连接等不会释放，必须手工调用 `clear()` 函数释放。**如果没有特别的需要，请不要设置为true！！**
	- **<span style="color:red">设置为`true`又没有调用`clear()`函数清理，可能会导致RDK所有服务不可用！</span>**
	- 仅在第一个参数是`java.sql.ResultSet`的时候，此参数才有效。

返回：将结果集转为一个映射。

说明：这在需要生成一个国际化键值对的时候非常有用，数据库中保存的大多是对象的id，返回给前端之前，需要将id转为对应的描述字符串，`mapper()` 可以生成一个键值对保存下来备用。

		var sql = "select neid,name from dim_ne";
		var map = mapper(sql, 'neid', 'name');
		log(map);

打印出来的是网元id和网元名称的映射：

	{
		"11":"S11_1",
		"12":"S1MME_1",
		"13":"S1U_1_DPI",
		"21":"S11_1",
		"22":"SMME_1",
		"23":"S1U_1_DPI"
	}

也可以使用列的索引来指明key和value的字段，下面代码的效果和前面示例的效果一致：

		var sql = "select neid,name from dim_ne";
		var map = mapper(sql, 1, 2);
		log(map);

使用索引的作为key和value主要是用于sql不确定的场景。

### `matrix() ` ###

定义：

	function matrix(sql, mapIterator, keepResultSet);

参数：

- sql 一个SQL字符串或者结果集`java.sql.ResultSet`。必选。
- mapIterator 一个对象/函数。可选。这个参数用于 `matrix()` 函数转换过程中对指定列进行转换。
- keepResultSet 一个布尔值。可选，默认值是false。
	- 为`false`（默认）： 在返回之前自动清理所占数据库连接和其他数据库资源。
	- 为`true`：结果集在函数返回后依然可用，但是它所占的数据库连接等不会释放，必须手工调用 `clear()` 函数释放。**如果没有特别的需要，请不要设置为true！！**
	- **<span style="color:red">设置为`true`又没有调用`clear()`函数清理，可能会导致RDK所有服务不可用！</span>**
	- 仅在第一个参数是`java.sql.ResultSet`的时候，此参数才有效。

返回：将结果集转为一个RDK前后端通用数据结构，称之为数据矩阵（matrix）。

说明：这个函数是应用最常用的函数之一，`sql()` 返回的结果集是无法直接传给前端的，必须使用 `matrix() ` 转换之后才能传给前端。


#### 数据矩阵（matrix）的数据结构

`matrix() ` 返回的数据矩阵的结构如下，这是数据矩阵最基本的结构：

	{
		header: ['header1', 'header2', 'header3'],
		field: ['field1', 'field2', 'field3'],
		data: [
				['data11', 'data12', 'data13'],
				['data21', 'data22', 'data23'],
				...
				['data31', 'data32', 'data33']
			]
	}

header和field都是一维数组，data是一个二维数组。data的值对应着数据库表的数据，field是data中每一列对应的列头，header是field每个元素对应的国际化。

#### `mapIterator` 的使用

`mapIterator` 用于 `matrix()` 函数转换过程中对指定列进行转换，它是一个JSON对象，属性为需要转换的列的字段名，值为一个函数，结构如下：

	{
		fieldName: function(value, row, index) {...},
		fieldName1: function(value, row, index) {...},
		...
		fieldName2: function(value, row, index) {...},
	}

实际使用时，需要把fieldName换成实际的字段名。

`mapIterator` 属性值是函数，它描述了需要对fieldName所在列要做的映射逻辑，实现逻辑是把传入的value做一些处理（映射、计算等），然后将处理后的新值返回出来。

看一个实际例子：

	var mapIt = {
		neid: function(value, row, index) {
			var newValue = ...;
			return newValue;
		},
		kpi_succ_rate: function(value, row, index) {
			var newValue = ...;
			return newValue;
		}
	}

它会对matrix中的neid和kpi_succ_rate这2列做映射。

#### 使用 `mapIterator` 实现字段国际化

继续前面例子，我们从数据库中查询来的neid是网元的id，我们希望将它转成网元的描述，这样就可以直接显示在界面上了。为了达到这个目的，必须先将网元id与描述的对应关系给查询出来，这个可以参考 `mapper()` 函数的例子，代码如下：

		var neMap = mapper("select neid,name from dim_ne", 'neid', 'name');

接下来实现转换函数：

	var mapIt = {
		neid: function(neid, row, index) {
			var newValue = map[neid];
			return newValue;
		}
	}

非常简单，就是把neid到网元映射表中转成网元描述即可。实际上，RDK框架提供了一个更简单的方式，可以直接使用 `kv()` 函数：

	var mapIt = {
		neid: kv(neMap)
	}

`kv()` 函数会返回一个专门做国际化映射的迭代函数。


#### 使用 `mapIterator` 实现字段复杂计算

再举个需要进行运算的例子。

kpi_succ_rate这一列是某个KPI的值，但是在数据库中并没有直接保存它的值，而是保存了计算它的值所需的计数器，这个时候，我们应该把相关的计数器都查询出来，并写一个这样的迭代函数来计算它的值：

	var mapIt = {
		//注意这里row参数的类型是 java.sql.ResultSet
		kpi_succ_rate: function(value, row, index) {
			var successCounter = row.getObject("succ_counter");
			var allCounter = row.getObject("all_counter");
			var newValue = allCounter == 0 ? 0 : successCounter/allCounter;
			return newValue;
		}
	}

#### `matrix()` 例子的完整代码

到此这个服务就完成了，完整代码如下：

	(function() {
	
	return function(request) {
		//先把网元的映射管理准备好
		var sql = "select neid,name from dim_ne";
		var neMap = mapper(sql, 'neid', 'name');
			
		var mapIter = {
			//使用kv函数创建一个通用的国际化迭代函数
			neid: kv(neMap),

			//根据算法算出 kpi_succ_rate 的值。
			kpi_succ_rate: function(value, row, index) {
				var successCounter = row.getObject("succ_counter");
				var allCounter = row.getObject("all_counter");
				var newValue = allCounter == 0 ? 0 : successCounter/allCounter;
				return newValue;
			}
		}
		
		//查询出基础数据集
		var sql = 'select neid,"" as kpi_succ_rate,succ_counter,all_counter from aggr_xxxx where ...';
		var result = matrix(sql, mapIter);

		//列头部分需要应用自己给出
		result.header = ['网元', '呼叫成功率', '成功次数', '呼叫总次数'];

		return json(result);
	}

	})();

这个服务返回了类似下面这样的数据给前端：

	{
		header: ['网元', '呼叫成功率', '成功次数', '呼叫总次数'],
		field: ['neid', 'kpi_succ_rate', 'succ_counter','all_counter'],
		data: [
				['S1MME_1', '98.99', '9899', '10000'],
				['S1U_1_DPI', '97.44', '9744', '10000'],
				...
				['S11_1', '99.44', '9944', '10000']
			]
	}

### `sql() ` <span style="color:red">慎用</span>

定义：

	function sql(sql);

参数：

- sql 一个SQL字符串。必选。

返回：sql执行结果集（`java.sql.ResultSet`）。

说明：执行一个sql语句，并返回它的结果集。

**<span style="color:red">结果集使用完之后，务必调用`clear()`函数清理，否则可能会导致RDK所有服务不可用！</span>**


结果集是一个java数据类型，读取起来不方便，一般配合 `mapper()` 和 `matrix()` 这两个函数一起使用。

返回的结果集是一个java对象，不通过普通的js方式去访问，但是可以通过`java.sql.ResultSet`提供的方法去访问它，[详情参考这里](http://docs.oracle.com/javase/8/docs/api/java/sql/ResultSet.html)。下面给出一个常用的遍历结果集的代码片段：

	(function() {
	
	    return function(request, script) {
			//服务的第一行代码写在这里！

			//查询 dim_ne 表
			var rs = sql('select * from dim_ne;')

			//取出元数据
			var metaData = rs.getMetaData();
			//当前的列数
			var cc = metaData.getColumnCount();
	
			//这里的row依然是一个 ResultSet 对象
			//注意这里each函数会在完毕之后自动关闭rs
			each(rs, function (row, index) {
				log('-----------', index, '-----------')
				for(var i = 1; i <= cc; i++) {
					var str = metaData.getColumnLabel(i) + '=' + rs.getObject(i);
					log(str);
				}
			});

			clear(rs);
			return '';
	    }
	
	})();

该服务在日志中的打印如下：

	----------- 0 -----------
	neid=11
	netype=216
	typedesc=S11
	ver=0
	name=s11
	----------- 1 -----------
	neid=7
	netype=11
	typedesc=SGW
	ver=0
	name=sgw
	----------- 2 -----------
	neid=42
	netype=42
	typedesc=MME
	ver=0
	name=mme
	...

### `clear() ` ###

定义：

	function clear(resultSet);

参数：

- resultSet 是 `sql()` 函数的返回值。必选。

返回：无。

说明：`sql()` 函数的返回值是一个Java对象，`java.sql.ResultSet` 类型。在有特殊需要的时候，可以自行操作结果集，但是请务必在完成之后调用本函数清理掉所占的资源，包括

- 执行本次sql的**数据库连接**；
- 结果集所占的内存；

**<span style="color:red">结果集使用完之后，务必调用`clear()`函数清理，否则可能会导致RDK所有服务不可用！</span>**

请注意在`sql()`函数和`clear()`函数之间的代码要做好异常保护，以确保`clear()`可以被成功调用。

RDK提供了众多的处理结果集的函数，包括 `matrix()` / `mapper()` / `earch()` 等，都会自动清理结果集，无需再次清理。

### `require() ` ###

定义：

	function require(script);

参数：

- script 一个字符串。待加载的脚本url，可使用[路径宏](relative_path_rule.html)简化路径。

返回：对应脚本的运行结果。

说明：可以使用 `require()` 来引入其他的js文件。目标脚本被加载之后会立即运行该脚本，如果有返回值，则通过 `require()` 的返回值来引用。比如某服务有一个公共函数库mylib.js，代码为：

	(function() {
		return {
			hello: function(name) {
				log('hello ' + name);
			}
		}
	})();

则可以这样来引用它

	var lib = require('mylib.js');
	lib.hello('rdk');

这个函数有个别名：`load()`。但请尽量使用 `require()` 这个名字来调用，万一以后把js引擎改为nodejs，则代码可以不修改。

### `buffer()` ###

定义：

	function buffer(name, dataDescriptor, subject);

参数：

- name 一个字符串。必选。缓冲数据的名称。
- dataDescriptor 一个对象/函数。必选。需要缓冲的数据或者一个函数用于创建需要缓冲的数据。
- subject 一个字符串。变化主题，暂时未用到。

返回：`dataDescriptor` 是一个对象时，返回该对象。`dataDescriptor` 是一个函数时，返回该函数的返回值。

说明：用于缓存一些数据，当这些数据已经存在，则从缓存中取出并返回，如果不存在，则调用 `dataDescriptor`，并将其返回值的数据放到缓存中，并返回这些数据。

例子：

`matrix()` 函数中有一个完整的服务实现例子，该例子有个缺陷。网元id和网元名称的映射关系，在系统安装好了后，就几乎没有变化的可能，这些数据我们称为**静态数据**。静态数据我们只需要查询一次就够了，不需要每次都去数据库查询。VMax系统中有很多很多静态数据。该例子并没有考虑到这一点，每次前端的请求过来，都会去查询一次静态数据。

我们来改进这个缺陷，下面是代码：

	(function() {
	
	return function(request) {
		//先把网元的映射管理准备好
		var neMap = buffer('neMap', function () {
		        var sql = "select neid,name from dim_ne;";
		        return mapper(sql, 'neid', 'name');
		    });
	
		/** 其他的代码不变 **/
		...

		return json(result);
	}

	})();

RDK会尝试去读取名称为 neMap 的缓冲数据

- 如果有，则直接返回；
- 如果没有，则使用 `dataDescriptor` 来创建它，并加入缓冲区；

这样，自始至终，静态数据只会被初始化一次。

#### 线程安全性

当 `dataDescriptor` 是一个函数时，这个函数的执行是线程安全的，即一旦某个 `name` 的 `dataDescriptor` 在运行过程中，其他所有在尝试读取 `name` 的缓冲数据的任何服务的所有请求，都会阻塞等待此函数的返回后再继续执行。

当 `dataDescriptor` 是一个对象时，`buffer()` 只在缓冲区更新的过程是线程安全的，此对象的创建过程的线程安全性由应用自行保证，参考 `sync()` 函数。

#### 缓冲区的更新

RDK提供了 `getBuffer()` 和 `removeBuffer()` 这两个函数来处理缓冲区，都是线程安全的。

- `getBuffer()` 和 `buffer()` 作用类似，它只读缓冲区，读取失败时不创建任何缓冲数据
- `removeBuffer()` 用来删除一个缓冲数据。

`removeBuffer()` 的定义是

	function removeBuffer(name)

### `sync()` ###

定义：

	function sync(job, lockName);

参数：

- job 一个函数。必选。同步作业函数。
- lockName 一个字符串。可选，默认值是全局锁。RDK会使用lockName指明的锁来执行同步作业。

返回：`job` 的返回值。

说明：当一些数据存在不同请求同时处理的时候，需要用到这个函数。尽量的减小锁的粒度以提升性能，尽量避免使用全局锁。

### `json()` ###

定义：

	function json(data, indent);

参数：

- data 一个js对象。需要序列化的json对象。必选。
- indent 一个字符串。格式化输出时的缩进量。可选，默认值是一些空格。

返回：一个json字符串

说明：平时定位问题的时候，需要将对象打印出来，可以使用这个函数：

	var data = {key: "value", arr: [1, 2, 4]}
	json(data);

得到的结果是

	{
	  "key": "value",
	  "arr": [ 1, 2, 4 ]
	}

### `loadClass()` ###

定义：

	function loadClass(jarPath, className);

参数：

- jarPath 一个字符串。jar包所在路径，如果是一个jar文件，则只加载该文件，如果是一个目录，则加载该目录下所有的扩展名为jar的文件。可使用[路径宏](relative_path_rule.html)简化路径。
- className 一个字符串。class的全类名。

返回：Java的Class。

说明：应用需要使用到第三方jar包中的类时，可以使用这个函数把类反射出来到js中直接调用： 

    var myClass = loadClass("$base/lib", "com.zte.sql.optimizer.SqlOptimizer");
	var myInst = myClass.newInstance();
	var result = myInst.myMethod(...);

上述代码会把 app/example/server/lib（以example应用为例） 目录下的所有jar包都加载到虚拟机中，并实例出 `com.zte.sql.optimizer.SqlOptimizer` 这个类的一个实例。

注意：RDK虚拟机的JRE是1.8的，所以在JS中实例化并运行的Java代码，都是在JRE1.8下跑的

#### JS与Java互传参数的建议 ####

JS调用Java方法，原则是只传递基本类型，包括数字（long），字符串（String），不要传递复杂对象，JS也可以传递任意结构到Java，在Java中被映射成ScriptObjectMirror类型，请自行百度这个类的用法。

Java返回数据给JS，原则也是尽量只返回简单类型。当然也可以返回Java类型的对象给JS，在JS中可以调用这个类的所有public方法，比如下面的JS代码：

	var myInst = myClass.newInstance();
	//假设getHashMap返回一个 java.util.HashMap 对象
	var map = myInst.getHashMap();
	map.get("myKey"); //得到HashMap中myKey的值。
	map.size(); //得到HashMap的个数

我们都知道，JS是无类型语言，而Java是强类型语言，所以JS调用Java方法，传递的参数类型要非常注意，否则很容易在Java中找不到匹配的签名方法而导致调用失败。

例如在Java中定义了下面的方法

	public void myMethod(boolean flag) {
		//...
	}

使用下面的JS代码，尝试去调用 `myMethod()` 方法：

	var myInst = myClass.newInstance();
	//假设myMethod方法要求传递一个布尔型参数
	//这行代码报错
	var map = myInst.myMethod(true);
	
报错的原因是JS的true关键字传递到java中，变成一个long型1，因此虚拟机找不到匹配的签名方法。

这块的建议是：需要JS调用的Java方法，参数尽量定义成Object的，在Java代码去检查参数类型，以确保最大的兼容性。

### `i18n()` ###

定义：

	function i18n(key, param1, param2, ...);

参数：

- key 一个字符串或一个字符串数组。必选。国际化标签。
- paramN 一个字符串。可选。动态国际化标签的参数。

返回：对应的国际化文本或国际化文本数组。

说明：后端的国际化配置文件必须放在应用目录下的 `server/i18n.js` 文件。

示例：

	//静态国际化标签
	var label = i18n('hello'); // 你好 RDK
  
    //数组国际化
    var label = i18n(['hello','world']); // ['你好','世界'] 

	//动态国际化标签
	var label = i18n('select', 10); // 选中了 10 个对象


## 日期相关 ##

[单击这里](service_date_api.html)


## COMMON包相关 ##

[单击这里](common.html)


<div title="后端服务API" id="__hidden__">
<script src="/doc/tools/doc_js/misc.js"></script>
</div>