define('main', ['rd.controls.Switch'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Switch']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
      scope.myValue = false;
      scope.changeHandler = function (event, data) {
        console.info(data);
      }
    }

  ]);
});
