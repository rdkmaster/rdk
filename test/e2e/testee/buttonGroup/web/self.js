define('main', ['rd.containers.ButtonGroup'], function() {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.containers.ButtonGroup']);
// 创建一个控制器
app.controller('myCtrl', ['$scope',  function(scope) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/

	scope.p1=function(){
		alert("1");
	}
	scope.p2=function(){
		alert("2")
	}
	scope.p3=function(){
		alert("3")
	}
	scope.p4=function(){
		alert("4")
	}
	scope.p5=function(){
		alert("5")
	}
	scope.p6=function(){
		alert("6")
	}
	scope.p7=function(){
		alert("7")
	}
    scope.f1=function(){
		alert("1")
	}
	scope.f2=function(){
		alert("2")
	}
	scope.f3=function(){
		alert("3")
	}
	scope.f4=function(){
		alert("4")
	}
	scope.f5=function(){
		alert("5")
	}
	scope.f6=function(){
		alert("6")
	}
	scope.f7=function(){
		alert("7")
	}
}
]);
});
