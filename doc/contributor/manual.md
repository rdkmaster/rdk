<rdk_title>RDK贡献者手册</rdk_title>



## 搭建基于windows的开发环境 <font color=red>推荐</font> {#make-dev-env}

按照本小节介绍的方法，可以打造一个基于windows平台的RDK的web和rest服务的开发&调试环境！

安装Git客户端及配置Git环境，[参考这里](http://wiki.zte.com.cn/pages/viewpage.action?pageId=20197085)。假设你本地的目录是 `d:\rdkProject\`，运行你的`git-bash.exe`，`cd /d/rdkProject`，执行`git clone git@gitlab.zte.com.cn:10045812/rdk.git`，将rdk克隆到你本地。
编辑 `d:\rdkProject\rdk\rdk\proc\conf\rdk.cfg`，修改数据ip即可：

	#连接的数据库ip，原本有可能是注释掉的，要删掉开头的#字符，并修改为实际值
	database.gbase.hostList=10.43.149.74

确定当前电脑已经安装了nodejs，如果没有烦请[下载nodejs](http://10.9.233.35:8080/tools/node-v5.10.1-x86.msi)并正确安装。最后，运行 `d:\rdkProject\rdk\start.exe` 就可以启动RDK的开发环境了。

先无视控制台报的异常信息,打开浏览器，输入 `http://localhost:8080/rdk/app/example/web/index.html`，页面能打开表示一切正常。

到此，你就可以开发RDK控件或者基于RDK开发应用了。

如果你对RDK后端感兴趣，[参考这里](/doc/#server/how_to_debug_service.md)。



