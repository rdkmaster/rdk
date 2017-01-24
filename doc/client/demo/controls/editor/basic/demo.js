(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Editor'
    ];
    var requiredComponents = [ ], ctx = {};
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
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();