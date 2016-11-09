define('main', ['application', 'rd.controls.Graph','rd.services.EventService'], function(application) {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Graph','rd.services.EventService']);
// 创建一个控制器
app.controller('rdk_ctrl', ['$scope', 'DataSourceService','EventService','Utils', function($scope, DataSourceService,EventService,Utils) {
application.initDataSourceService(DataSourceService);
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
	$scope.showNumber=0;
	EventService.register('pie', 'click', function(event,data){
		$scope.showNumber=data.dataIndex;
		var pie_class= "div.pie" +(data.dataIndex+1);
		if(data.name=="其它问题"){
			$('#line').css("display","inline-block")
		}else{$('#line').css("display","none")}
	});
	$("#line ul>li").click(function(e){
        if($(this).index()==0){
            return;
        }
        $(this).index()
        $(this).children().css("background","rgba(0,0,0,0.5)").parent().siblings().children().css("background","#fff")
    })
    Utils.onReady(function() {
    console.log("++++++++++++++++++++++++++++",rdk.pie.chart);
	})
    EventService.register('EventService', 'ready', function() {
    		console.log(rdk.pie.option)
	});
   
	// EventService.register('line', 'legendselectchanged', function(event,data){
	// 	console.log(data);
	// 	if(data.name=='联盟广告'){
	// 		$("#pie_child>div.pie4").css({
	// 			"display":"block"
	// 		}).siblings().css({
	// 			"display":"none"
	// 		})
	// 	}else if(data.name=='视频广告'){
	// 			$("#pie_child>div.pie7").css({
	// 		"display":"block"
	// 		}).siblings().css({
	// 			"display":"none"
	// 		})
	// 	}else if(data.name=='xxxx广告'){
	// 			$("#pie_child>div.pie8").css({
	// 		"display":"block"
	// 		}).siblings().css({
	// 			"display":"none"
	// 		})
	// 	}

	// })
}

]);
});
