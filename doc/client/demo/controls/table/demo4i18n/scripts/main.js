define('main', ['application', 'i18n', 'rd.controls.Table'], function(application, i18n) {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
    	i18n.$init(scope);

    	console.log(i18n.table_prev);
        
    }]);
});
