define('main', ['rd.controls.Table'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope','EventService', 'EventTypes', '$timeout', function($scope, EventService, EventTypes, $timeout) {
            EventService.register('id_table', EventTypes.SELECT, function(event, data){//处理被选中的数据
                console.log(data);
            })

            $scope.idx = 3;
            $timeout(function(){
                $scope.idx = 5;
            }, 3000);
    }]);
});