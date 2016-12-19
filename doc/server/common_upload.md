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

示例：

使用html表单元素和ajax jQery实现一个简单的文件或者页面內存数据上传客户端		

在html中插入一个form用于选择文件：

    <form id="uploadFile" enctype="multipart/form-data">             
        <fieldset>
            <label for="myfile">
                <input type="file" id="myfile" name="myfile">
            </label>
            <input type="submit" value="上传">  
        </fieldset>
    </form> 

在js中编写form的submit回调：

    $('#uploadFile').submit(function(){
        var formData = new FormData();
        formData.append("file",$("#myfile")[0].files[0]);    //也可以上传内存数据 formData.append("file","前端内存数据");   
        $.ajax({  
            url:"/rdk/service/common/upload",    
            type: 'POST',  
            data: formData,
            contentType: false,  
            processData: false,
            success:function(url) {
                //上传成功之后，rdk会将该文件的url返回给页面
                console.log(url);
            }
        });
        //阻止页面刷新
        return false;
    });
