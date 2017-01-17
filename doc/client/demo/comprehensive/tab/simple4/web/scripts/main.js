define('main', ['rd.controls.Table','rd.controls.Button'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core','rd.controls.Button']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {

         $scope.setting = {
            "columnDefs" :[
                {
                    title : "详单",
                    render : '<i class="iconfont iconfont-tab"></i>'
                },
                {
                    title : "得分趋势",
                    render : '<i class="iconfont iconfont-line"></i>'
                }
            ]
        }
    }]);
});
