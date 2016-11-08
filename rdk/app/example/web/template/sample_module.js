
(function(application) {
    //控制器名，非常重要，不要和已有的控制器重名
    var controllerName = 'SampleModuleController';

    //参考 main.js 中同名变量的说明
    var downloadDependency = [
        { url: 'base/scripts/utils', alias: 'utils' },
        'rd.controls.Button',
    ];
    var requiredComponents = [ ];
    var ctx = {};

    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {
        console.log('SampleModule controller is running..........');

        //只有定义在this上的方法才能发布给外部。
        this.hello = function(msg) {
            alert(scope.i18n.hello.st(msg));
        }
        //只有定义在this上的属性才能发布给外部。
        this.publicData = 'this is some public data defined in the SampleModule controller';

        //定义在scope上的属性才可以被html模板访问
        scope.someData = 'some data defined in the SampleModule controller...';

        //定义在scope上的函数才可以被html模板访问
        scope.openExample = function() {
            window.open('/doc/client/demo/controls/module/complex_load/index.html','_blank');
        }
    }

    //==========================================================================
    //                   从这里开始的代码请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})(application);