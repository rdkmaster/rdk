(function() {
    var controllerName = 'SampleModuleController';
    var downloadDependency = [ ];
    var requiredComponents = [ ];
    var ctx = {};

    var controllerDefination = ['$scope', main];
    function main(scope) {
        console.log('SampleModule controller is running..........');
        //只有定义在this上的属性才能发布给外部。
        scope.someData = 'some data defined in the SampleModule controller...';
        scope.myData = 'sample inter load module manually...';

        this.destroy = function() {
            alert('ready to destroy the dialog...');
        }
    }

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