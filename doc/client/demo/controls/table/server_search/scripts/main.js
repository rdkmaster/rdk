define('main', ['rd.controls.Table'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {
        
        $scope.conditionProcessor = function(condition){
          var condition = {};
          condition.aaa = "bbb";
          return condition;
        }

        $scope.tableProcessor = function(baseCondition,additionalCondition){
          baseCondition.paging = additionalCondition.paging;
          return baseCondition;
        }
    }]);
});
