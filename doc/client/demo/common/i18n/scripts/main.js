define('main', ['i18n'],
function(i18n) {
// 创建一个RDK的应用
var app = angular.module("rdk_app", []);

// 创建一个控制器
app.controller('rdk_ctrl', ['$scope',
function(scope) {
      i18n.$init(scope);
      scope.time = new Date();

      //js中获取时间
      var curTime = i18n.time.st(scope.time);
      console.log(curTime);
}]);


});

