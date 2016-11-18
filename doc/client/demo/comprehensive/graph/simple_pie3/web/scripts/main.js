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
		$scope.clickNumber=null;
		if(data.name=="其它问题"){
			$scope.clickNumber=0;
			$scope.showNumber=null;
			$('#line').css("display","inline-block")
		}else{$('#line').css("display","none")}
	});
	$scope.clickNumber=null;
	$scope.numClick=function($event){
		$scope.clickNumber=$event.target.getAttribute('data');
		console.log( $event.target)
	}
	 EventService.register('pie', 'graph_update', function(event,data){
	 	var option=data.option;
	 	EventService.register('pie', 'click', function(event,data){
	 		if(data.data.selected=false){
	 			option.series.selectedMode="";
	 		}
	 	});
	 });
}

]);
});
