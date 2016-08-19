define('main', ['rd.controls.SingleIndicator'], function(){
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.SingleIndicator']);
    // 创建一个控制器
    app.controller('rdk_ctrl', ['$scope',function(scope){
       	//point_to是当前指向,支持双向绑定，备选left/right/top/bottom
       	scope.pointTo = "right";
       	scope.leftTob = function(){
          scope.pointTo = "left"
        }
        scope.rightTob = function(){
          scope.pointTo = "right"
        }
        scope.topTob = function(){
          scope.pointTo = "top"
        }
        scope.bottomTob = function(){
          scope.pointTo = "bottom"
        }
        scope.nullTob = function(){
       		scope.pointTo = "null"
       	}
      	

    }]);
});
