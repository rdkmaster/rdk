define('main', ['rd.controls.Editor'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Editor']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
      scope.myText = 'Hello, rdk!';
    }

  ]);
});
