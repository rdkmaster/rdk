define('main', ['application','rd.services.EventService', 'rd.controls.ScoreIndicator','rd.services.Utils'], function(application, EventService,Utils) {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.ScoreIndicator','rd.services.Utils']);
// 创建一个控制器
app.controller('myCtrl', ['$scope', '$timeout','DataSourceService', 'EventService','Utils',  function(scope, $timeout,DataSourceService, EventService,Utils) {
	application.initDataSourceService(DataSourceService);
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
	EventService.register('my_ds', 'result', function(event, data) {
		scope.isMark = false;
		scope.config = [{
		    label: '优',
		    color: '#55ca8c',
		    emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face1.png',
		    value: data.data[0],
		    mark: false
		}, {
		    label: '良',
		    color: '#54acd5',
		    emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face2.png',
		    value: data.data[1],
		    mark: true
		}, {
		    label: '中',
		    color: '#f99660',
		    emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face3.png',
		    value: data.data[2],
		    mark: false
		}, {
		    label: '差',
		    color: '#ec6d6d',
		    emotion: '/doc/client/demo/controls/scoreindicator/faceImage/face4.png',
		    value: data.data[3],
		    mark: false
		}];
	});
}
]);
});
