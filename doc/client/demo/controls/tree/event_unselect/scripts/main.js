define('main', ['rd.controls.Tree'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Tree','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', function($scope, EventService, EventTypes) {
    	// 也可以通过事件
    	// EventService.register('testZtree', EventTypes.UNSELECT, function(event, data){
    	// 	console.log(data)
    	// });

    	$scope.unselectFun=function(event, data){
    		console.log(data);
    	}
    }]);
});
