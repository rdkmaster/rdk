RDK提供了一组宏来描述应用目录，包括：

- `$web`：对应应用的web目录，以example应用为例，该目录为 app/example/web；
- `$svr`：对应应用的server目录，以example应用为例，该目录为 app/example/server；
- `$base` ：对应应用的根目录，以example应用为例，该目录为 app/example；


支持路径宏的功能包括：

### `require()` 函数

示例：
	
	require('$svr/mylib.js')
	//等价于（以example应用为例）
	require('app/example/server/mylib.js')

### `file.save()` 函数

示例1：
	
	file.save('$web/mydata.csv', 'my data')
	//等价于（以example应用为例）
	file.save('app/example/web/mydata.csv', 'my data')

示例2：
	
	file.save('$base/data/mydata.csv', 'my data')
	//等价于（以example应用为例）
	file.save('app/example/data/mydata.csv', 'my data')


### `file.saveAsCSV()` 函数

参考 `file.save()` 函数

### 前端页面中使用到的rest服务的url

示例：

	<p ds_url="$svr/my_service" ds_query_if="ready"" ds="msgFromSvr"></p>
	<!-- 等价于（以example应用为例） -->
	<p ds_url="app/example/server/my_service" ds_query_if="ready"" ds="msgFromSvr"></p>



<div title="路径宏" id="__hidden__">
<script src="/doc/tools/doc_js/misc.js"></script>
</div>