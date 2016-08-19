define('main', ['rd.controls.SingleIndicator'], function(){
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.SingleIndicator']);
    // 创建一个控制器
    app.controller('rdk_ctrl', ['$scope',function(scope){
        //这个是文字描述，支持双向绑定
        scope.label = 'sss';
      

    }]);
});
