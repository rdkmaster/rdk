define('main', ['rd.controls.ProgressBar'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.ProgressBar']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
        scope.random = function() {
            var value = Math.floor(Math.random() * 100 + 1);
            var type;

            if (value < 25) {
                type = 'success';
            } else if (value < 50) {
                type = 'info';
            } else if (value < 75) {
                type = 'warning';
            } else {
                type = 'danger';
            }

            scope.dynamic = value;
            scope.type = type;
        };

        scope.random();
    }]);
});
