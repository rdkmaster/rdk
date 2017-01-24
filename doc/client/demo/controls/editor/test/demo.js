(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Editor', 'rd.containers.Tab'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope ) {
scope.code = 'var aa;'

        scope.codes = [
            {
                mode: 'html',
                file: 'index.html',
                code: '<html>\naaaaaaaaaaa\n</html>'
            },
            {
                mode: 'javascript',
                file: 'scripts/main.js',
                code: 'var a = 123;'
            },
        ]

        scope.onChange = function(event, tabIndex) {
            if (tabIndex != scope.codes.length) {
                return;
            }
            var evaluator = document.getElementById('ifrm').contentDocument;
            evaluator.open();
            evaluator.write(scope.codes[0].code);
            evaluator.close();
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