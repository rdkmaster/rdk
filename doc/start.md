# 文档&演示环境搭建 #

## 开始 ##
[开始探索RDK](http://localhost:8080)

在开始之前，你可能需要：

## 启动服务 ##
请运行当前目录下的 `start_http_server.bat` 和 `start_rest_server.bat` 这两个脚本。

**注**：`doc` 目录和 `demo` 目录下都有这两个脚本，只需要启动任意一个目录下的脚本即可，无需重复启动。

在控制台中，看到下面的打印表示服务正常启动：

	connect.limit() will be removed in connect 3.0
	Express server listening on port 8080

和

	connect.limit() will be removed in connect 3.0
	connect.multipart() will be removed in connect 3.0
	visit https://github.com/senchalabs/connect/wiki/Connect-3.0 for alternatives
	connect.limit() will be removed in connect 3.0
	Express server listening on port 9090
	
其中：

- 8080端口为demo服务的http服务端口
- 9090端口为demo服务的模拟rest服务端口


如果出错，请继续往下看：

### 常见错误1 ###

	'node' 不是内部或外部命令，也不是可运行的程序
	或批处理文件。
	请按任意键继续. . .

**原因**：说明当前电脑没有安装nodejs

**解决**：下载nodejs并正确安装，[https://nodejs.org](https://nodejs.org)


### 常见错误2 ###

	connect.limit() will be removed in connect 3.0
	events.js:141
	      throw er; // Unhandled 'error' event
	      ^
	
	Error: listen EADDRINUSE 0.0.0.0:8080
	    at Object.exports._errnoException (util.js:870:11)
	    at exports._exceptionWithHostPort (util.js:893:20)
	    at Server._listen2 (net.js:1237:14)
	    at listen (net.js:1273:10)
	    at Server.listen (net.js:1369:5)
	    at Object.<anonymous> (developing\demo\nodejs\serv\server.js:55:24)
	    at Module._compile (module.js:410:26)
	    at Object.Module._extensions..js (module.js:417:10)
	    at Module.load (module.js:344:32)
	    at Function.Module._load (module.js:301:12)

**原因**：8080/9090端口被占用

**解决**：

- 确认rdk的demo服务是不是已经在运行。
- 释放8080/9090端口再试。
- 有nodejs/express配置经验的同学，可自行修改demo服务的端口。


	

