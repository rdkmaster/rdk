define('main', ['application','rd.attributes.Scroll'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.attributes.Scroll']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope', 'DataSourceService', function (scope,DataSourceService) {
        /************************ panel demo test data start ************************/


        function onSuccess(url) {
            alert('数据上传成功，可通过这个url引用它\n' + url);
        }

        function onError() {
            alert('数据上传失败，最大尺寸20M！');
        }

        scope.upload = function () {
            DataSourceService.upload(scope.data, onSuccess, onError);
        }

    }]);

});

