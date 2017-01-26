(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [ ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'DataSourceService', main];
    function main(scope, DataSourceService) {
        function onSuccess(url) {
            alert('文件上传成功，可通过这个url引用它\n' + url);
        }

        function onError() {
            alert('文件上传失败，最大尺寸20M！');
        }

        scope.upload = function () {
            var formData = new FormData();
            formData.append("file",$("#myfile")[0].files[0]);
            DataSourceService.upload(formData, onSuccess, onError);
        }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();