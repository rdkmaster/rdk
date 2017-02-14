(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Editor'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.code = '\
<html>\n\
    <head>\n\
        <link rel="stylesheet" href="mystyle.css">\n\
        <script src="myscript.js"></script>\n\
    </head>\n\
    <type>\n\
    .body {\n\
        font-size: 14px;\n\
    }\n\
    </type>\n\
    <script>\n\
        function func(a, b, c) {\n\
            alert(a, b, c);\n\
       }\n\
    </script>\n\
</html>';
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