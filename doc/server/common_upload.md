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

 1、使用html表单元素和ajax jQery实现一个简单的文件上传客户端

			<!DOCTYPE html>
			<html>
			<head>
			    <title>upload</title>
			    <meta charset = "utf-8">
			    <script src="jquery-1.11.3.min.js"></script>
				 <script>
				        $(document).ready(function ()  {
									$('#submitbtn').click(function (){	
										$('#fileinput_form').submit(function(){
											var formData=new FormData();
									        formData.append("file",$("#myfile")[0].files[0]);
											$.ajax({  
											      url:"http://127.0.0.1:5812/rdk/service/common/upload",    
												  type: 'POST',  
												  data: formData,           
												  async: false,  
												  cache: false,  
												  contentType: false,  
												  processData: false,
												  success:function(res) {
												  	},
												  failure:function(res) {
												  	}
											 })	
											 return false;          //阻止页面刷新
										})
									})

								})
				 </script>
			</head>
			<body >
			     <form id= "fileinput_form" enctype="multipart/form-data">             
						<fieldset>
							<label for="myfile" class="a-upload">
								<input type="file"  id="myfile" name="myfile" class="filecss">
							</label>            
							<button id= "submitbtn" style="width:60px;height:40px;" label="test">上传</button>
						</fieldset>
			    </form>       
			</body>
			</html>

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
        formData.append("file",$("#myfile")[0].files[0]);
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


2、使用html表单元素和ajax jQery实现前端内存数据上传客户端

            <!DOCTYPE html>
            <html>
            <head>
                <title>upload</title>
                <meta charset = "utf-8">
                <script src="jquery-1.11.3.min.js"></script>
                 <script>
                        $(document).ready(function ()  {
                                    $('#submitbtn').click(function (){  
                                        $('#fileinput_form').submit(function(){
                                            var formData=new FormData();
                                            formData.append("file","自定义内存数据");   //使用append方法添加内存数据
                                            $.ajax({  
                                                  url:"http://127.0.0.1:5812/rdk/service/common/upload",    
                                                  type: 'POST',  
                                                  data: formData,           
                                                  async: false,  
                                                  cache: false,  
                                                  contentType: false,  
                                                  processData: false,
                                                  success:function(res) {
                                                    },
                                                  failure:function(res) {
                                                    }
                                             }) 
                                             return false;    
                                        })
                                    })

                                })
                 </script>
            </head>
            <body >
                 <form id= "fileinput_form" enctype="multipart/form-data">             
                            <button id= "submitbtn" style="width:60px;height:40px;" label="test">上传</button>
                </form>       
            </body>
            </html>


在html中插入一个form用于控制上传数据类型为`multipart/form-data`：

            <form id= "fileinput_form" enctype="multipart/form-data">             
                    <button id= "submitbtn" style="width:60px;height:40px;" label="test">上传</button>
            </form> 

在js中编写form的submit回调：

             $('#uploadFile').submit(function(){
                var formData = new FormData();
                formData.append("file","自定义内存数据");
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