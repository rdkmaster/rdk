### rdk_server rest请求说明

rdk提供了可支持get,put,delete,put四种动作rest服务。

#### get 请求
url格式：

        	http://ip:port/rdk/service/js服务脚本相对路径?app=应用名&param=json对象字符串

- js服务脚本相对路径：即需要请求的js服务脚本路径，该路径与服务脚本相对app目录所在路径一致。比如，以请求example应用server目录下my_service.js服务为例，完整的请求路径为：`http://ip:port/rdk/service/app/server/my_service`。

- app：应用名，该参数用于rdk区分各个应用，比如在记录应用日志时会以该属性值来标识具体应用。

- param：应用js脚本需要获取的前端带过来的请求参数，可以多个，所有参数均会被封装于服务脚本的request参数中。

返回：即被请求的服务脚本对应的返回值。

示例：

请求本机rdk服务上的example/my_service服务，并将参数传给该脚本：

   			http://localhost:5812/rdk/service/app/example/server/my_service?param1={"a":"A"}&param2=aaa&param3='bbb'&app=example (需要进行url编码)

这样在my_service服务中即可以request对象获取该参数值。

my_service服务:

			(function() {
			
			    return function(request, script) {
					//直接将前端传递过来的参数打印到日志中。
					log(request);   // {"param1":{"a":"A"},"param2":"aaa","param3":"'bbb'","app":"example"}
					log(request.param1.a); // "A"
					log(request.param2); // "aaa"
					log(script); // "app/example/server/my_service.js"
					return request;
			    }
			
			})();

#### post/put/delete 请求
url格式：

        	 http://ip:port/rdk/service/js服务脚本相对路径

- js服务脚本相对路径：即需要请求的js服务脚本路径，该路径与服务脚本相对app目录所在路径一致。比如，以请求example应用server目录下my_service.js服务为例，完整的请求路径为：`http://ip:port/rdk/service/app/server/my_service`。

请求消息体为json格式，参数有：

- app：应用名，该参数用于rdk区分各个应用，比如在记录应用日志时会以该属性值来标识具体应用。

- param：应用js脚本需要获取的前端带过来的请求参数，是一个json串。

返回：**json对象，{"result":被请求的服务脚本对应的返回值}**。

示例：

请求本机rdk服务上的example/my_service服务，并将参数{"a":"A"}传给该脚本：

   			http://localhost:5812/rdk/service/app/example/server/my_service

请求消息体json格式为：

   			{"param"：{"a":"A"},"app":"example"}

这样在my_service服务中即可以request对象获取该参数值。

my_service服务:

			(function() {
			
			    function _post(request, script) {
					//直接将前端传递过来的参数打印到日志中。
					log(request);   // {"a":"A"}
					log(request.a); // "A"
					return request;
			    }

			    return {
			    	post : _post
			    }
			
			})();

前端收到的返回值为 `{"result":{"a":"A"}}`	
