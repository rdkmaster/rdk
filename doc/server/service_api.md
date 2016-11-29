<rdk_title>后端服务API</rdk_title>


## 集合/数组/对象的常用功能集 ##

系统引入了underscore这个开源库，可以直接使用这个库的相应函数。

[查看underscore使用API](underscore_doc_v1_7_0.html)

## 文件操作 {#file_oper}

[查看文件操作API](service_file_api.md)

## 消息队列 ##

- [查看消息队列API -- JS](service_mq_js_api.md)
- [查看消息队列API -- JAVA](service_mq_java_api.md)
- [其他手册](ActiveMQ_menual.chm)

## API

### 日志 ###

RDK提供了一组记录日志的函数，它们有共同的定义：
	
	function log(msg1, msg2, msg3, ...);

参数：

- `msg1`, `msg2`, ... 任意对象。可选。RDK会尝试将这些对象转为字符串写入日志中，目前完美支持Date，任意结构的json对象。对其他复杂对象支持不好，不支持Java对象。

一共有这些（日志级别由低到高）：

- `log()` / `Log.debug()`：记录debug级别的日志
- `Log.info()`：记录info级别的日志
- `Log.warn()`：记录warn级别的日志
- `Log.error()`：记录error级别的日志
- `Log.fatal()`：记录fatal级别的日志
- `Log.crit()`：记录一些关键日志，级别最高

   RDK日志分为总的日志和应用日志，默认生成总的日志，日志路径为proc/log目录下

   **应用若要生成自己的日志文件需要配置proc/conf/log4j.propertites文件**。

该文件中已经配置好了总的日志，控制台日志以及example应用日志，用户只需要参照example日志进行配置即可。

简便可靠的做法是复制example配置部分，在此基础上进行修改。

示例：应用‘用户查询’位置为app/sqm/query_server/userQuery

要生成该应用的日志需要在log4j.propertites文件中添加配置：

    log4j.logger.sqm/query_server/userQuery=DEBUG,sqm/query_server/userQuery
    log4j.appender.sqm/query_server/userQuery=org.apache.log4j.RollingFileAppender
    log4j.appender.sqm/query_server/userQuery.File=./proc/logs/userQuery_log.txt
    log4j.appender.sqm/query_server/userQuery.Threshold=DEBUG
    log4j.appender.sqm/query_server/userQuery.Append=true
    log4j.appender.sqm/query_server/userQuery.MaxFileSize=10MB
    log4j.appender.sqm/query_server/userQuery.MaxBackupIndex=10
    log4j.appender.sqm/query_server/userQuery.layout=org.apache.log4j.PatternLayout
    log4j.appender.sqm/query_server/userQuery.layout.ConversionPattern=%d %p [%c] - %m%n
    log4j.additivity.sqm/query_server/userQuery=true


文件配置后无需重启rdk服务，30秒后自动生效。

### 操作日志 ###

rdk为应用提供可扩展的日志上报功能。

定义：

	function Log.operateLog(userOpInfo); 
	
参数：

- userOpInfo 一个js对象。必选。

返回：true/false。

说明：rdk将自动调用应用配置操作日志脚本，配置路径位于proc/conf/rdk.cfg，用户需配置extension.operateLog属性以告知rdk应用操作日志服务所在位置，应用可按自己的业务来实现日志上报，具体可参考Vmax日志上报的应用[日志模板](http://10.5.70.3/ZXVMAX/CODE/dev/ZXVMAX/vmax-app-cn/CODE/ZTECOMMON/ClientCode/rdk_server/app/common/vmaxOperateLog.js)。

示例：

用户想要调用Vmax操作日志服务，并按自己要求填写“descinfo”的详细信息。

1、放开proc/conf/rdk.cfg extension.operateLog属性配置（默认属性值为app/common/vmaxOperateLog.js）

2、下载[文件](http://10.5.70.3/ZXVMAX/CODE/dev/ZXVMAX/vmax-app-cn/CODE/ZTECOMMON/ClientCode/rdk_server/app/common/vmaxOperateLog.js，并将该文件放置于app/common)目录下

3、调用服务：

Log.operateLog({"descinfo":"查询表dim_ne"})

### `Mapper` ###

实际开发中，常常需要定义一个可根据给定的属性来从一个映射中获取其对应的值的处理函数，Mapper变量提供了简便的处理方法。

#### `Mapper.from_object()` ####

该函数可以构造一个基于js对象完成映射获取的处理函数。

定义：

	function from_object(jsObject, defaultValue);

参数：

- jsObject 一个JS对象。必选。
- defaultValue 一个整数/字符串/布尔。可选，默认值是key本身，即默认返回key值。

返回：一个**转换函数**，这个转换函数的作用是返回某个值在入参 `jsObject` 中的映射。

说明：常常用于对数据集中的某列做国际化。

示例：某个表中有一个字段用于表示“是否”这样的状态，存在库中，1代表“是”，0代表“否”，可以使用下面的代码得到一个转换函数：

	var tranformFunction = Mapper.from_object({1: "是", 0: "否"});

	var val = tranformFunction(0); // "否"
	var val = tranformFunction(1); // "是"
	var val = tranformFunction(2); // 2

如果期望在输入非1、0时得到“未知”，则可以使用下面代码

	var tranformFunction = Mapper.from_object({1: "是", 0: "否"}， "未知");
	var val = tranformFunction(2); // "未知"

#### `Mapper.from_sql()` ####

该函数可以构造一个基于sql查询数据库并完成映射获取的处理函数。

定义：

	function from_sql(sql, keyField, valueField, defaultValue);

参数：

- sql 一个用来查询数据库的sql串。必选。
- keyField 一个字符串，必选，对应构造映射键的列名。
- valueField 一个字符串，必选，对应构造映射值的列名。
- defaultValue 一个整数/字符串/布尔。可选，默认值是key本身，即默认返回key值。

返回：一个**转换函数**，这个转换函数的作用是返回某个值在根据前三个参数构造而成的jsObject中的映射。

示例：假设需要查询数据库，根据dim_ne表的neid,name列生成一组映射，并根据此映射来构造一个转换函数以便给定一个neid值时方便的得到其对应的name值：

	  var tranformFunction = Mapper.from_sql("select * from dim_ne;",'neid','name',"unknown");
      tranformFunction("30");//表dim_ne中neid=30对应的name值
      

#### `Mapper.from_datatable()` ####


该函数可以构造一个基于[DataTable](#dataTable)并完成映射获取的处理函数。

定义：

	function from_datatable(dataTable, keyField, valueField, defaultValue);

参数：

- dataTable 一个[DataTable](#dataTable)对象。必选。
- keyField 一个字符串，必选，对应构造映射键的列名。
- valueField 一个字符串，必选，对应构造映射值的列名。
- defaultValue 一个整数/字符串/布尔。可选，默认值是key本身，即默认返回key值。

返回：一个**转换函数**，这个转换函数的作用是返回某个值在根据前三个参数构造而成的jsObject中的映射。

示例：假设需要查询数据库，根据dim_ne表的neid,name列生成一组映射，并根据此映射来构造一个转换函数以便给定一个neid值时方便的得到其对应的name值：

      var dataTable=Data.fetch("select * from dim_ne;")
	  var tranformFunction = Mapper.from_datatable(dataTable,'neid','name',"unknown");
      tranformFunction("30");//表dim_ne中neid=30对应的name值


### `DataTable对象` {#dataTable}

DataTable构造函数生成一个矩阵对象，同时提供了在该对象上一系列方便的函数操作，同时这些操作本身仍返回该对象本身，因此可实现链式调用。

#### 数据矩阵（matrix）的数据结构

DataTable对象的数据矩阵的结构如下，这是数据矩阵最基本的结构：

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

#### `DataTable.transform()` ####

该函数提供了可以对DataTable数据列进行数据转换的简便处理方法。

定义：
  
     function transform(transObjectConf)

参数：

- transObjectConf：一个js对象，对象属性名为要转换的列名，属性值为对该列进行转换操作的函数，可支持对多列进行处理，只需要定义多个属性及其对应的映射即可。

返回：
   
  转换过后的DataTable对象

说明：
  **操作会修改原始对象的值，若希望保留原对象值，可先调用[clone()](#clone)方法**

例子：


	(function() {
		
		return function(request) {
		
			var mapIter = {
				//使用Mapper.from_sql函数创建一个通用的国际化迭代函数
				neid: Mapper.from_sql("select neid,name from dim_ne",'neid', 'name'),
	
				//根据自定义算法算出 kpi_succ_rate 的值。可根据第二个参数row获取辅助行数据数组，根据第三个参数field获取辅助字段数组。
				kpi_succ_rate: function(value,row,field) {
					...
				}
			}
			
			//查询出基础数据集
			var sql = 'select neid,"" as kpi_succ_rate,succ_counter,all_counter from aggr_xxxx where ...';
			var result = Data.fetch(sql).transform(mapIter);
			return result;
		}
	})();


这个服务返回了类似下面这样的数据给前端：

	{
		header: ['neid', 'kpi_succ_rate', 'succ_counter','all_counter'],
		field: ['neid', 'kpi_succ_rate', 'succ_counter','all_counter'],
		data: [
				['S1MME_1', '98.99', '9899', '10000'],
				['S1U_1_DPI', '97.44', '9744', '10000'],
				...
				['S11_1', '99.44', '9944', '10000']
			]
	}


#### `DataTable.select()` ####

该函数可以根据给定的列名对[DataTable](#dataTable)进行选取。

定义：
  
      function select(colNameArray)

参数：

- colNameArray：一个js数组，即要选取的列的field名称。

返回：
   
  筛选列过后的DataTable对象

说明：
 **操作会修改原始对象的值，若希望保留原对象值，可先调用[clone()](#clone)方法**

示例：
  
      var tabledata=Data.fetch("select neid,name from dim_ne",4000);
      //假设返回的数据结构为 {
      //                    header:['neid','name'],
      //                    field:['neid','name'],
      //                    data:[['30','test1'],['20','test2']]
      //                   }
      
       tabledata.select(['name']);
      // 则返回的数据结构为 {
      //                    header:['name'],
      //                    field:['name'],
      //                    data:[['test1'],['test2']]
      //                }


#### `DataTable.clone()`{#clone}  

定义：
  
      function clone()

参数：

- 无

返回：
   
  一个新的DataTable对象


### `Data对象` ###

该对象提供了一些和数据库操作有关的方法，比如增删改查功能。

#### `Data.setDataSourceSelector()`{#setDataSourceSelector} ####

多数据源场景，可使用该函数可用来设置你自定义的数据源选择器,默认使用gbase数据库作为rdk查询对象。

定义：
  
    function setDataSourceSelector(selector);

参数：

 - selector：一个自定义的函数闭包，该函数用来定义你选择数据源的业务逻辑。

返回：
 
 undefined



#### `Data.useDataSource()`{#useDataSource} ####

多数据源场景，该函数用来选择使用的数据源

定义：

    function useDataSource();

参数：无

返回：undefined


### `rdk多数据源使用示例` {#mulit-ds-example}###
第一步，在**proc\bin\lib**目录下放置应用所需数据库jdbc驱动包，rdk默认已经提供gbase和mysql的驱动包。

第二步，配置应用需要的数据源信息，包括数据库连接信息以及对应的连接池信息，配置文件位于 **proc/conf/datasource.cfg**，以下示例配置了mysql和hbase的数据库以及各自连接池信息

  	数据库连接配置：
    
      db{
           mysql{
			    #驱动(必选)
			   driver=com.mysql.jdbc.Driver
			   #jdbc url(必选)
			   url="jdbc:mysql://10.43.149.231:3306/dap_model?user=root&password=U_tywg_2013&useUnicode=true&characterEncoding=UTF8"
			   #引用连接池(必选)
			   poolRef=pool.default  //对应以下连接配置，连接池按default配置项进行配置
		   }
		 
		   hbase{
			    #驱动(必选)
			   driver=***   
			   #jdbc url(必选)
			   url="jdbc:***" 
			   #引用连接池(必选)，连接池定义见上节pool
			   poolRef=pool.hbasePool
		  }
	    }

   	连接池配置：

		pool{
		    #默认连接池配置(保留)
		    default{
		        #获取连接最大等待时长（ms）
		        maxWait=6000
		        #设置数据库初始化时，创建的连接个数
		        initialSize=10
		        #最大活跃连接数
		        maxTotal=128
		        #设置最小空闲连接数
		        minIdle=10
		        #设置最大空闲连接数
		        maxIdle=50
		        #设置空闲连接多长时间后释放(单位ms)
		        minEvictableIdleTimeMillis=15000
		        #自动回收泄露连接时长(单位s)
		        removeAbandonedTimeout=300
		        #设置在获取连接的时候检查有效性, 默认true
		        testOnBorrow=true
		    }
		    hbasePool{
		        #获取连接最大等待时长（ms）
		        maxWait=6000
		        #设置数据库初始化时，创建的连接个数
		        initialSize=1
		        #最大活跃连接数
		        maxTotal=20
		        #设置最小空闲连接数
		        minIdle=1
		        #设置最大空闲连接数
		        maxIdle=5
		        #设置空闲连接多长时间后释放(单位ms)
		        minEvictableIdleTimeMillis=15000
		        #自动回收泄露连接时长(单位s)
		        removeAbandonedTimeout=300
		        #设置在获取连接的时候检查有效性, 默认true
		        testOnBorrow=true
		    }
		
		}

第三步，在应用[init.js](#init)文件调用[Data.setDataSourceSelector](#setDataSourceSelector)方法设置数据源选择器。以下示例描述的是，当使用[Data.useDataSource()](#useDataSource)选择“mysql”时则返回db.mysql即第二步中配置的mysql数据库，选择“hbase”时则
返回db.hbase即第二步中配置的hbase数据库，其他情况则选择rdk的默认使用数据库gbase

		(function () {
		    function selectDataSource(params){
		        var database = params[0]   //注意，param为函数argument数组
		        switch (database){
		            case "mysql":
		                return "db.mysql"
		            case "hbase":
		                return "db.hbase"
		            default:
		                return "db.default"
		        }
		    }
		
		    function _init_() {
		        Data.setDataSourceSelector(selectDataSource);
					....
		    }
		    return {
		        init: _init_
		    }
		})();

第四步，重启rdk_server，**注意：增加新的数据库驱动及对应配置，以及init.js内容发生变更，需要重启rdk\_server才能生效**

第五步，使用[Data.useDataSource()](#useDataSource)选择当前使用的数据源。
     
   		Data.useDataSource("mysql");					
        log(Data.fetch("SELECT * FROM dim_ne",5000)); //查询mysql数据库
        Data.useDataSource("hbase");                   
        log(Data.fetch("SELECT * FROM dim_ne",5000)); //查询hbase数据库


   		
#### `Data.fetch()` ####

该函数提供了简便的可查询数据库数据的方法。

定义：

    function fetch(sql,maxLine);

说明：执行数据库查询功能。

参数：

- sql: 一个SQL字符串，必选。

- maxLine:查询数据返回的最大记录数，数值型，可选，默认为4000。

返回：

 [DataTable对象](#dataTable)



#### `Data.fetch_first_cell()` ####

该函数返回查询数据的第一行第一列。

定义：

    function fetch_first_cell(sql);

参数：

- sql: 一个SQL字符串，必选。

返回：
 
  数据的第一行第一列，字符串类型


#### `Data.batch_fetch()` ####

该函数提供了并发查询数据库的功能。

定义：

    function batch_fetch(sqlArray, maxLine,timeout);

说明：并发执行多个sql的查询并返回结果，超时后抛出超时异常。

参数：

- sqlArray: 一个SQL字符串数组，必选。

- maxLine：返回的最大记录数，可选，默认为4000。

- timeout ：批量查询超时时间，单位秒，必选。


返回：
 
  [DataTable对象](#dataTable)数组

示例：

    Data.batch_fetch(['select * from dim_ne;','select * from dim_comm_city'],4000,10);


#### `Data.executeUpdate()` ####

该函数提供了可并发完成数据库增删改功能。

定义：

    function executeUpdate(sql);

说明：执行数据库增删改功能

参数：

 - sql:一个sql字符串或者一个sql字符串数组，必选。其中对sql数组的执行时并发的。


返回：
 
   参数为一个sql字符串时，函数返回该sql执行返回的受影响记录数对应的字符串；
   参数为sql数组时，函数返回该sql数组分别执行返回的受影响记录数对应的字符串数组。
 

### `require() ` ###

定义：

	function require(script);

参数：

- script 一个字符串。待加载的脚本url，可使用[路径宏](relative_path_rule.md)简化路径。

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

### `Cache` ###

该对象提供了一些缓存相关的方法。

#### `Cache.put()` ####

定义：

    function put(k, v);

说明：将数据保存至该应用缓存中。

参数：

- k: 字符串，缓冲数据的名称。

- v: 任意对象，缓冲数据。


返回：
 
  同v,即应用的缓冲数据


#### `Cache.get()` ####

定义：

    function get(k);

说明：从应用的缓存中取回数据

参数：

 - k: 字符串，缓冲数据的名称。


返回：
 
   应用的对应k名称的缓冲数据，没有的话返回null



#### `Cache.del()` ####

定义：

    function del(k);

说明：删除应用缓存中的对应k的数据

参数：

 - k: 字符串，缓冲数据的名称。


返回：
 
   undefined

#### `Cache.global_put()` （已过时，请使用[Cache.global.put()](#Cache_global_put)）####

定义：

    function global_put(k,v);

说明：缓存rdk所有应用共享的数据

参数：

 - k: 字符串，缓冲数据的名称。

 - v: 任意对象，缓冲数据。



返回：
 
   同v,即缓冲数据


#### `Cache.global_get()` （已过时，请使用[Cache.global.get()](#Cache_global_get)）####

定义：

    function global_get(k);

说明：返回rdk所有应用共享的缓存数据

参数：

 - k: 字符串，缓冲数据的名称。


返回：
 
   对应k名称的共享缓冲数据，没有的话返回null



#### `Cache.global_del()`（已过时，请使用[Cache.global.del()](#Cache_global_del)）####

定义：

    function global_del(k);

说明：删除rdk所有应用共享的名为k的缓存数据

参数：

 - k: 字符串，缓冲数据的名称。


返回：
 
   undefined
   
#### `Cache.global.put()`{#Cache_global_put} ####

定义：

    function put(k,v);

说明：缓存rdk所有应用共享的数据

参数：

 - k: 字符串，缓冲数据的名称。

 - v: 任意对象，缓冲数据。



返回：
 
   同v,即缓冲数据

   
###rdk提供了一组可以操作基于rdk的所有应用共享内存操作###

#### `Cache.global.get()`{#Cache_global_get}####

定义：

    function get(k);

说明：返回rdk所有应用共享的缓存数据

参数：

 - k: 字符串，缓冲数据的名称。


返回：
 
   对应k名称的共享缓冲数据，没有的话返回null



#### `Cache.global.del()`{#Cache_global_del}####

定义：

    function del(k);

说明：删除rdk所有应用共享的名为k的缓存数据

参数：

 - k: 字符串，缓冲数据的名称。


返回：
 
   undefined

###rdk提供了一组带生命时长的缓存操作###

#### `Cache.aging.put()` ####

定义：

    function put(k, v, ttl);

说明：缓存k,v映射数据于老化内存中，同时设置该数据的生命时长

参数：

 - k: 字符串，缓冲数据的名称。

 - v: 任意对象，缓冲数据。
 
 - ttl: 可选，数据生命时长，单位秒，默认为24小时。



返回：
 
   同v,即缓冲数据


#### `Cache.aging.get()`####

定义：

    function get(k);

说明：返回老化内存中key对应的值

参数：

 - k: 字符串，缓冲数据的名称。


返回：
 
   对应k名称的共享缓冲数据，没有的话返回null



#### `Cache.aging.del()`####

定义：

    function del(k);

说明：删除老化内存中key对应的记录

参数：

 - k: 字符串，缓冲数据的名称。


返回：
 
   undefined

### `rdk自动加载应用初始化脚本`{#init} ###

rdk_server在服务启动时会自动加载应用的初始化脚本。
应用需要在其**server**目录下放置名为**init.js**的文件即可，
比如应用可以将其缓存数据的操作放置在这个文件中，这样可以避免应用因为缓存数据较大，执行比较耗时而导致rest请求超时。

完整示例：
应用example需要使用缓存功能，那么就可以在example/server目录下的init.js中编写以下代码：

			(function () {
			    function _init_() {
					try{
						Cache.put("ne_data",Mapper.from_sql("select neid,name from dim_ne",'neid','name',4000))
					}catch(error){
						log("cache ne_data error"+error)
					}
			    }
			    return {
			        init: _init_
			    }
			})();

这样在example服务my_service.js中可以这样写来使用该缓存：

           Cache.get("ne_data")(11) //Cache.get("ne_data")返回的是一个转换函数闭包，对其进行调用即可获取neid=11对应的name值

**注意，若init.js文件发生修改，请一定要重启rdk_server才会生效。**
### `JVM.load_class()` ###

定义：

	function loadClass(jarPath, className);

参数：

- jarPath 一个字符串。jar包所在路径，如果是一个jar文件，则只加载该文件，如果是一个目录，则加载该目录下所有的扩展名为jar的文件。可使用[路径宏](relative_path_rule.md)简化路径。
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

说明：**后端的国际化配置文件必须放在应用目录下的 `server/i18n.js` 文件**。

示例：

	//静态国际化标签
	var label = i18n('hello'); // 你好 RDK
  
    //数组国际化
    var label = i18n(['hello','world']); // ['你好','世界'] 

	//动态国际化标签
	var label = i18n('select', 10); // 选中了 10 个对象


### `getRequestContextHeader()` ###
定义：

	function getRequestContextHeader();

参数：

无

返回：对应的当前请求对应http请求头对应的js对象。

### `getHostName()` ###
定义：

	function getHostName();

参数：

无

返回：获取服务主机名。

## 日期相关 ##

[单击这里](service_date_api.md)


## COMMON包相关 ##

[单击这里](common.md)