define('main', ['rd.controls.Switch'], function() {

  // 创建一个RDK的应用
  var app = angular.module("rdk_app", ['rd.controls.Switch']);
  // 创建一个控制器
  app.controller('myCtrl', ['$scope', function(scope) {
    scope.myValue = 0;
    scope.description = ''
    scope.handleChanged = function (event, data) {
      alert('hangleChange:' + data);
    }
  }
  ]);
});
