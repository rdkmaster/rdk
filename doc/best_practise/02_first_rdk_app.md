<rdk_title>第1步 编写第一个应用 - RDK应用开发最佳实践</rdk_title>

## 目标与收获

本小节描述了如何利用[example应用](/rdk/app/example/web/index.html)来开始一个RDK应用的开发，通过本小节的学习，你将学会如何以最快的速度开始一个应用的开发。


## 认识一下example应用

[example应用](/rdk/app/example/web/index.html)是RDK提供的一个最简化的应用，它虽然只有十几行代码，但是它涵盖了开发一个应用的大多数知识。

RDK推出新的功能后，会第一时间更新[example应用](/rdk/app/example/web/index.html)，因此每次开发新应用都以[example应用](/rdk/app/example/web/index.html)为模板是一个非常好的实践。

[example应用](/rdk/app/example/web/index.html)包含下面几个文件夹

- web：应用所有前端代码存放的位置
- server：应用所有后端代码存放的位置

这也是任何应用应有的目录结构。

## 第一个应用

假设我们期望创建一个 `app/my_first_app` 的应用。

### 拷贝

在 `rdk/app` 目录下，创建一个目录，名称为 `my_first_app`，将 `rdk/app/example` 目录下的所有文件和文件夹都拷贝到 `rdk/app/my_first_app` 目录下。

### 搞定！

打开浏览器，输入

	http://localhost:8080/rdk/app/my_first_app/web/index.html

一切正常的话，页面就能正常打开了。

虽然它看起来和 [example应用](/rdk/app/example/web/index.html) 基本上是一样的，但是这已经是你构建出来的第一个应用了。

> 注意<br>
> 如果你没有按照[第1步 搭建开发环境](01_dev_env.md)介绍的方法搭建开发环境，则输入的url中的ip和端口必须按照实际修改。


## 小结

我们创建了第一个应用。

## 跳转
[上一步](01_dev_env.md)、[下一步](03_use_first_control.md)

## 源码
[02_first_rdk_app.zip](02_first_rdk_app.zip) 下载后解压到 `rdk/app/my_first_app` 目录下即可。

