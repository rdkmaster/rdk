define('main', ['rd.controls.NumericInput'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.NumericInput']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
      scope.myValue = 12.3;
    }

  ]);
});
