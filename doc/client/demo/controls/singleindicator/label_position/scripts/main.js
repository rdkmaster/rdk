define('main', ['rd.controls.SingleIndicator'], function(){
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.SingleIndicator']);
    // 创建一个控制器
    app.controller('rdk_ctrl', ['$scope',function(scope){
        //label_position文字的位置,备选left/right/top/bottom.
        scope.pos = 'left';

    }]);
});
