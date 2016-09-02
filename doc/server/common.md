##公共配置信息查询服务
服务URI：common/server/dim

参数： key,conditions=[{"key":"",values:[]],其中key为必选条件

使用方法：例如，

-  需要提供关于city的配置信息服务

配置common文件夹下conf/dim_conf.js
  
      (function() {
    	return {
    			"city" : "select city_id,city_name from dim_comm_city"
     	}
       })();
 
前端访问 common/server/dim?key=city 返回值为

     { 
     	"key":"city",
     	"result":[
    			{ 
      			"city_id":0,
      			"city_name":"unknown"
     			}
       		]
     }


-  同时需要配置ci的配置信息服务
在common文件夹下conf/dim.conf.js里面加上

    "ci" : "select ci,ciname from dim_ci where city in ( #city# )"

前端访问 common/server/dim?key=ci&conditions=[{"key":"city","value":[0]}]} 


##Util工具类

使用方式： 
  
>  var commonLib = require("app/common/server/util/util.js");
>  
>  commonLib.methodName(params);

### padLeft
定义：
   
	function padLeft(str, length);
参数：
  
- str: 原始字符串
- length : 最终形成的字符串的位数

返回：按照位数将原始字符串左边以0补齐。   

说明：无

### transIP
定义：
   
	function transIP(str);
参数：
  
- str: 原始字符串,IP的十六进制格式，如0A0B0C0D

返回：十六进制格式转换为点分制 如   10.11.12.13

说明：无


### transRate
定义：
   
	function transRate(value, fixed);
参数：
  
- value: 字符串
- fiexed: 保留几位小数

返回：保留几位小数后的字符串，例如transRate(10.11111,2)，最后返回10.11

说明：无

##TableUtil工具类

使用方式： 
  
>  var tableLib = require('app/common/server/util/tableUtil.js');
>  
>  tableLib.methodName(params);

### generateTableNames
定义：
   
	function generateTableNames(baseTableName, beginTime, endTime, granularity);
参数：
  
- baseTableName: 核心网侧的基础表名,如aggr_volte_abnormal_handover
- beginTime: 开始时间
- endTime:结束时间
- granularity：粒度， "3"、"4"、"5"、"6"，3和4均表示按周分表，5表示按月分表，6表示按年分表

返回：数据库中存在的以baseTableName为基础列表，并以granularity为分表，存储的数据在beginTime和endTime之间的并且在数据库中存在的表名数组。

说明：无

###generateUnionSQL
定义：
   
	function generateUnionSQL(baseSql, tableNames);
参数：
  
- baseSql: 基础SQL
- tableNames: 表名数组

返回：将基础SQL中的#tableName#以tableNames数组中的具体值替代，并拼接 union all 之后返回。

说明：比如说 generateUnionSQL("select * from #tableName#",["base_table_1","base_table_2"])，则返回 select * from base_table_1 union all select * from base_table_2

###existTable
定义：
   
	function existTable(tableName);
参数：
  
- tableName: 表名

返回：判断gbase库中是否存在该表，存在则返回true,不存在则返回false

说明：无

###generatePagingSQL
定义：
   
	function generatePagingSQL(baseSql, pageSize, pageNum);
参数：
  
- baseSql:  基础SQL
- pageSize:分页大小
- pageNum: 第几页

返回：按照基础SQL和分页大小以及第几页的分页SQL语句

说明：无

###generatePagingSQLCount
定义：
   
	function generatePagingSQLCount(baseSql);
参数：
  
- baseSql:  基础SQL

返回：返回求基础SQL所得记录数的条数的SQL

说明：无

###generatePagingObject

定义：
   
	function generatePagingObject(totalRecord,currentPage,pageSize);
参数：
  
- totalRecord:  总记录数
- currentPage:  现在的页数
- pageSize: 单页条数

返回：返回对象 {totalRecord: , currentPage: ,pageSize: , totalPageNum:}

说明：无


##DateUtil工具类

###getFirstDateOfWeek

定义：
   
	function getFirstDateOfWeek(date);
参数：
  
- date:  时间

返回：返回一周的第一天

说明：无

###getFirstDate

定义：
   
	function getFirstDate(interval, date);
参数：
  
- interval:  粒度，week ,month,year
- date : 时间

返回：返回 interval 粒度的第一天

说明：无

###getNumOfYear

定义：
   
	function getNumOfYear(interval, date);
参数：
  
- interval:  粒度，week ,month
- date : 时间

返回：返回 该日期为一年内的第多少周或者多少月

说明：无

###getWeekOfYear

定义：
   
	function getWeekOfYear(date);
参数：
  
- date : 时间

返回：返回 该日期为一年内的第多少周

说明：无

###dateDiff

定义：
   
	function dateDiff(interval, date1, date2);
参数：
  
- interval : 粒度 year，month，d(天)，week（周）,h（小时）,n（分钟）,s（秒）,l（毫秒）
- date1 : 开始时间
- date2 : 结束时间

返回：返回 开始时间和结束日期之间所相差的粒度

说明：无

###dateAdd

定义：
   
	function dateAdd(date, strInterval, Number);
参数：
  
- date : 时间
- strInterval : s（second）秒、n分钟、h小时、d天、w(week)周、q季度、m（month)月，y（year)年
- Number : 个数，正负数均可

返回：返回 时间增加Number个粒度的时间

说明：无



<rdk_title>后端SQL相关通用功能</rdk_title>