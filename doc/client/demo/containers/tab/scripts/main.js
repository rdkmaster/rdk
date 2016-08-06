//angular ui load new 
define('main', [
    'rd.containers.Tab'
], function() {
    //TODO　RDK 创建APP,依赖传递参数
    var app = angular.module("rdk_app", [
        'rd.containers.Tab'
    ]);

	app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', function (scope, EventService, EventTypes) {
        scope.price = '￥200';

        setTimeout(function() {
        	EventService.broadcast('tab1', EventTypes.TAB_SELECT, 2);
        }, 200);
    
        scope.tabChangeHandler = function(tabNode, tabNum){
        	console.log("您点击的是第" + tabNum + "个Tab！");
        };

        scope.beforeActivate = function(event, ui) {  
                alert("选项卡即将激活");  
            };

        scope.EJB = 'ejb11'
	}])

    app.controller('xxx', ['$scope', function(scope) {
            // scope.EJB = 'ejb'

    }]);
    
})







