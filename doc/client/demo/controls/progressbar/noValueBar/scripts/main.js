define('main', ['rd.controls.ProgressBar'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.ProgressBar']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'ProgressbarFactory',function(scope,ProgressbarFactory) {
        scope.progressbar = ProgressbarFactory.createInstance();

        scope.start = function(){
            scope.progressbar.start();
        }

        scope.stop = function(){
            scope.progressbar.complete();
        }
    }]);
});
