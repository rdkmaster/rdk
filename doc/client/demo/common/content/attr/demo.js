(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [ 
        'css!base/demo',
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', '$timeout', 'EventService', main];
    function main(scope, $timeout ,EventService) {
        var btn = document.getElementById('btn');
        btn.onclick = function(){
            var a = document.getElementById('a');
            a.href = 'www.baidu.com';
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