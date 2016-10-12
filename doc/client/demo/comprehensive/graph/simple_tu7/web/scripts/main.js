define('main', ['application', 'rd.services.EventService','rd.controls.Graph','jquery'], function(application,EventService) {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Graph']);
// 创建一个控制器
app.controller('rdk_ctrl', ['$scope', 'DataSourceService','EventService', function(scope, DataSourceService, EventService) {
application.initDataSourceService(DataSourceService);
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
function setSize(){
	var containerHeight=16+26*7;//公式16+26*n  其中n为data数据对象中的header的个数(data.header.length)
	//var containerWidth=jQuery('#graph').parent().width()-108;//其中108 为左侧元素的宽度+margin值
	jQuery('#graph').css('height',containerHeight+"px");//根据数据的长度设置柱状图的自适应高度
	//jQuery('#graph').css('width',containerWidth+"px");
};
setSize();

    EventService.register('dsGraph', 'result', function(event, data) {
    	scope.titles=data.header;
    	var portData='全部';//初始化输出接口数据
    	scope.check_items=function($event){//勾选事件
    		var target=jQuery($event.target);
    		if(target[0].nodeName=="IMG"){
    			if(target.css('display')!="none"){
    				target.css('display','none');
    				portData=false;
    				alert(portData);
    				return portData;
    			}else{
    				target.css('display','block');
    				target.parent().parent().siblings().find('img').css('display','none');
    				portData=target.parent().siblings().html();
    				alert(portData);
    				return portData;
    			}
    		}else if(target[0].nodeName=="I"){
    			if(target.children().css('display')=="block"){
    				target.children().css('display','none');
    				portData=false;
    				alert(portData);
    				return portData;
    			}else{
    				target.children().css('display','block');
    				target.parent().siblings().find('img').css('display','none');
    				portData=target.siblings().html();
    				alert(portData);
    				return portData;
    			}
    		}
    	}
    });
}

]);
});
