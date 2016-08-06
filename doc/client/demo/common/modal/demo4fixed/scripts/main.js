define('main', ['rd.attributes.modal'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.attributes.modal','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService',function($scope,EventService) {
        $scope.setmodal = function(id, modal, position) {
            EventService.broadcast(id, modal, position);
        }
    }]);
});
