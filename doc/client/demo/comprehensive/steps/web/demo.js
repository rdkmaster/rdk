(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Steps','rd.controls.Button','css!base/css/demo'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.avtiveStepIndex=0;
        scope.steps=[
            {title:"Select campaign"},
            {title:"Create an ad group"},
            {title:"Create an ad"},
            {title:"Finish over"}
        ]
        scope.nextStepHandler = function(event,data) {
            if(scope.avtiveStepIndex>=scope.steps.length){
                return
            }
            scope.avtiveStepIndex++;
        };
        scope.preStepHandler = function(event,data) {
            scope.avtiveStepIndex--;
        };
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