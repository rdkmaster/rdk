define('main', ['rd.controls.Icon'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Icon']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
    	scope.clickHandler = function(event){
    		alert('click');
    	}
    }

  ]);
});
