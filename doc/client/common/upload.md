
## 服务
rdk 提供了可支持客户端文件上传的服务
    /rdk/service/common/upload

注意，**该服务为post请求**。

说明：默认上传文件大小限制为20M，可根据需要在`proc/conf/akka`中配置：

    spray.can.server {
		  parsing {
		        max-content-length = 20m        //上传文件大小设置
		  }
	}

## 使用

使用DataSourceService的`upload()`可以实现文件上传，或者内存值上传，此方法的定义为

    function(data, onSuccess, onError);

参数：

- data：需要上传的数据，可以是FormData，或者字符串。
- onSuccess：上传成功时的回调函数。
- onError：上传失败时的回调函数。

## 上传文件例子
这是一个简单的上传文件的例子：
<live_demo example="common/upload/basic" width="405"></live_demo>

## 上传字符串例子
这是一个简单的上传字符串的例子：
<live_demo example="common/upload/str" width="405"></live_demo>  


    
