define('main', ['rd.controls.Table'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', function($scope, EventService, EventTypes) {
        
        $scope.conditionProcessor = function(condition){
          var condition = {};
          condition.aaa = "bbb";
          return condition;
        }

        $scope.tableProcessor = function(baseCondition,additionalCondition){
          baseCondition.paging = additionalCondition.paging;
          return baseCondition;
        }

        EventService.register('table', EventTypes.CHECK, function(event, data){
            var selectedData = data.data;
        }); 

        $scope.clickHandler = function(){
           rdk.tableID.pageSize = 10;
        }
    }]);
});
