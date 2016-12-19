<rdk_title>RDK文件上传服务</rdk_title>

rdk 提供了可支持客户端文件上传的服务

## 服务url

    /rdk/service/common/upload

注意，**该服务为post请求**。文件需要以`multipart/form-data` 格式上传

说明：默认上传文件大小限制为10M，超时时间设置为10分钟，可根据需要在`proc/conf/akka`中配置：

    spray.can.server {
		  export-timeout = 10min                 //超时时间
		  parsing {
		        max-content-length = 10m        //上传文件大小设置
		  }
	}

示例1：使用rdk数据源方式

使用DataSourceService.js里面的firmData方法，此方法接收2个参数，第一个url地址，第二个数据源（可以是字符串或者是文件）；		

在html中插入input用于选择文件：

            <input type="file" id="myfile">

这是一个简单的上传文件的例子：
<live_demo example="/common/upload/basic" width="405"></live_demo>

或者用于上传字符串：             

            <input type="text" id="myfile" >

这是一个简单的上传字符串的例子：
<live_demo example="/common/upload/str" width="405"></live_demo>  

在js中编写回调：

    DataSourceService.firmData(url, data);

示例2：使用input元素和jquery ajax方式

在html中插入input用于选择文件：

            <input type="file"  id="myfile" name="myfile" class="filecss">
 
在js中编写回调：

            var formData=new FormData();
            formData.append("file",$("#myfile")[0].files[0]);   //或者上传内存数据formData.append("file","内存数据");
            $.ajax({  
                  url:"/rdk/service/common/upload",    
                  type: 'POST',  
                  data: formData,            
                  cache: false,  
                  contentType: false,  
                  processData: false,
                  success:function(res) {
                        alert(res)
                    },
                  failure:function(res) {
                    }
             }) ;   


    
