(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [ ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'DataSourceService', main];
    function main(scope, DataSourceService) {
        function onSuccess(url) {
            alert('数据上传成功，可通过这个url引用它\n' + url);
        }

        function onError() {
            alert('数据上传失败，最大尺寸20M！');
        }

        scope.upload = function () {
            DataSourceService.upload(scope.data, onSuccess, onError);
        }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();