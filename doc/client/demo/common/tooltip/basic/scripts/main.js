define('main', ['rd.attributes.Tooltip'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.attributes.Tooltip']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope',  function (scope) {
        /************************ panel demo test data start ************************/
        scope.content = '<span>prompt text</span>'
    }]);

});

