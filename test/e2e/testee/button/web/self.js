define('main', ['rd.controls.Button'], function() {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Button']);
// 创建一个控制器
app.controller('myCtrl', ['$scope',  function(scope) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/

scope.callBakFlag=0;
    scope.clickHandler = function() {
    	scope.callBakFlag=1;
    };
scope.tog=true;
	scope.clickTog= function(){
		scope.tog=false;
		scope.callBakFlag=0;
	}
}
]);
});
