<rdk_title>RDK文件上传服务</rdk_title>

rdk 提供了可支持客户端文件上传的服务

## 服务url

    http://ip:port/rdk/service/common/upload

注意，**该服务为post请求**。文件需要以`multipart/form-data` 格式上传

说明：默认上传文件大小限制为200M，超时时间设置为10分钟，可根据需要在`proc/conf/akka`中配置：

	    spray.can.server {
			  export-timeout = 10min                 //超时时间
			  parsing {
			        max-content-length = 200m        //上传文件大小设置
			  }
		}