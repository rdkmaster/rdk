<rdk_title>第8步 优化详情对话框 - RDK应用开发最佳实践</rdk_title>

## 目标与收获

本小节将优化 `my_first_app` 详情对话框的内容，你将了解到

- 如何使用RDK的弹出框功能


## 使用弹出框服务
- 在点击详情列的界面显示一个模态弹出框

### 添加弹出框模块
修改main.js中详情点击函数的代码，如下：

~~~
  var moduleID;
  scope.click = function(item) { 
      var sampleHtml = '<div caption="上网分析详情" 
      icon="<i class=\'fa fa-windows\'></i>" style="margin:6px; padding:6px">\
      </div>';
      var initData = {};
      var myOption = {
          modal: true,
          effect: 'explode',
          id:'my_dialog'
      }
      moduleID = PopupService.popup(sampleHtml,initData,myOption);
  };
~~~

这里使用了PopupService服务和模块化Module，注意要使用[第三步的方法](03_use_first_control.md#dep-inject)注入控件的依赖`'rd.services.PopupService'`,`'rd.controls.Module'`。

**注意：**控制器里也需要注入依赖：
~~~
var controllerDefination = ['$scope', 'DataSourceService', 'EventService','PopupService', main];
    function main(scope, DataSourceService, EventService,PopupService) {
    ...
}
~~~

其中关于模块化，具体使用参考[Module控件](/doc/client/controls/module/module.md)；PopupService弹出框服务 用于动态加载模块，并提供弹出及关闭弹出服务。具体请参考[PopupService服务](/doc/client/common/popupservice/PopupService.md)

### 添加gis地图
- 在弹出框中显示gis地图

这里我们把地图控件放弹出框里面；修改main.js中详情点击函数的代码，添加如下:

~~~
  var moduleID;
  scope.click = function(item) { 
      var sampleHtml = '<div caption="上网分析详情" 
      icon="<i class=\'fa fa-windows\'></i>" style="margin:6px; padding:6px">\
          <rdk_map id="my_gis" query_if="ready" 
          map_define="/doc/client/demo/controls/map/basic/scripts/graph_define/map.js" 
          map="\'/doc/client/demo/controls/map/basic/data/jilin.json\'" \
          width="380" \
          height="300"> \
         </rdk_map> \
          <button ng-click="destroyHandler()">确认</button> \
      </div>';
      var initData = {};
      var myOption = {
          modal: true,
          effect: 'explode',
          id:'my_dialog'
      }
      moduleID = PopupService.popup(sampleHtml,initData,myOption);
  };
~~~

这里我们又引入了一个新的控件rdk_map，一定记得要使用[第三步的方法](03_use_first_control.md#dep-inject)注入控件的依赖`'rd.controls.Map'`。
rdk_map主要用于Echart版本的地图展现，目前仅支持json文件格式。具体使用参考[Map文档](/doc/client/controls/map/map.md)。

- 关闭弹出框

在main.js中添加如下代码:

~~~
scope.destroyHandler=function(){
  PopupService.removePopup(moduleID);
};
~~~

###样式修改

注意到myOption中有个id属性，要覆盖弹出框原有样式，可以利用 popup() 中 第三个入参 option 的 id 。在用户自定义 css 文件时，通过覆盖样式文件 rdk-PopupService-style.css 中的各样样式，以实现用户的样式定制。这里需要自定义样式`#my_dialog{width:400px!important;}`

## 小结
在点击详情后，我们使用了一个弹出框，显示Gis地图，点击确定时，关闭弹出框。

## 跳转
[上一步](08_i18n.md)

## 源码
[09_detail_dialog.zip](09_detail_dialog.zip) 下载后解压到 `rdk/app/my_first_app` 目录下即可。