define('main', ['rd.attributes.Tooltip'], function () {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.attributes.Tooltip']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope',function (scope) {
        /************************ panel demo test data start ************************/
        scope.content = '<h1>hello, h1!</h1> \
            <h2> hello, h2</h2>\
            <h3> hello, h3</h3>'
    }]);

});

