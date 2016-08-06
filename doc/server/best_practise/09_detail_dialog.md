## 目标与收获

本小节将优化 `my_first_app` 详情对话框的内容，你将了解到

- 如何使用RDK的弹出框功能
- 如何使用RDK的对话框功能


## 使用弹出框
- 在点击详情列的界面显示一个模态弹出框

### 添加面板容器
修改页面代码，在表格的下方，加入下面的代码：
~~~
   <rdk_panel 
       id="panel"  
       icon="fa fa-cubes" 
       width="500px" 
       height="600px" 
       show_title='true' 
       show_close="true" 
       title="'上网分析详情'" 
       rdk_modal='hide' 
       style="background-color:rgb(214, 220, 221) " >
   </rdk_panel>
~~~
这里引入了两个新的控件rdk_panel和rdk_modal，注意要使用[第三步的方法](03_use_first_control.html#dep-inject)注入控件的依赖。
其中rdk_panel是一个容器，可以把多个控件放入其中，作为一个单元进行控制，具体使用参考[Panel文档](/rdk_client/doc/containers/panel/index.html)；rdk_modal作为属性名称添加到rdk_panel后，该控件就会有弹出效果了，该属性需要初始化成hide，具体使用参考[对话框&摸态框](/rdk_client/doc/common/modal/index.html)。

### 添加gis地图
- 在弹出框中显示gis地图

rdk_panel是一个多控件的容器，为了满足上述要求，这里我们把地图控件放里面；修改页面代码，添加如下:
~~~
   <rdk_panel 
       ......
       <rdk_map 
          id="gis"  
          ds="colorMap"  
          ds-url="data/colorMap.json"  
          query_if="ready" 
          map_define="scripts/map.js" 
          map="'data/jiangsu.json'" 
          width="450" 
          height="400">
       </rdk_map>
   </rdk_panel>
~~~
这里我们又引入了一个新的控件rdk_map，一定记得要使用[第三步的方法](03_use_first_control.html#dep-inject)注入控件的依赖。
rdk_map主要用于Echart版本的地图展现，目前仅支持json文件格式。具体使用参考[Map文档](/rdk_client/doc/controls/map/index.html)。


## 使用对话框
- 在关闭弹出框时，希望弹出一个对话框，提示用户是否确认关闭。

在rdk_panel控件上点击close图标后，默认会直接关闭；如果希望在点击close图标后，做一些其他操作，如这里的弹出一个对话框，可以在页面代码中，添加如下:
~~~
   <rdk_panel 
       ...... 
       hide_on_close="false" 
       before_close="handle_beforeclose()"
       ......>
   </rdk_panel>
~~~

然后在main.js中添加"handle_beforeclose函数"的处理：
~~~
  scope.handle_beforeclose=function(){
		Alert.scope = scope;
		Alert.confirm('是否确定关闭窗口？', '确认提示', ButtonTypes.YES+ButtonTypes.NO+ButtonTypes.CANCEL, callbackHandler,true);
        function callbackHandler(val){
	        if(val == ButtonTypes.YES){
	               
	        	EventService.broadcast('panel', 'hide'); 
	                
	        }     
        }
        	    
	}
~~~
这里我们使用了RDK封装的Alert服务，用于弹出提示信息的对话框，可能包含消息、标题、按钮（“确定”、“取消”、“是”和“否”的任意组合）和图标。
具体使用参考[Alert文档](/rdk_client/doc/common/alert/index.html)。


## 小结
在点击详情后，我们使用了一个弹出框，显示Gis地图，并在关闭该弹出框时，弹出一个对话框与用户交互，确认是否关闭。

你可以下载完成此步骤之后的[源码](09_detail_dialog.zip)，解压到 `app/my_first_app` 下，[单击这里](/rdk_server/app/my_first_app/web/index.html)就可以打开它了。


<div title="第8步 优化详情对话框 - RDK应用开发最佳实践" id="__hidden__">
<script src="../utils/misc.js"></script>
</div>