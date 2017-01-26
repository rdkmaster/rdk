(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'angular', 'rd.containers.Accordion'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
            scope.buttonSource = [{
                icon: "/doc/client/demo/containers/accordion/img/refresh.png",
                label: "刷新",
                tooltips: "点击可进行图标变更",
                callback: function(obj, htmlID) {
                    if (scope.isNewIcon) {
                        scope.foldedIcon = "fa fa-arrow-circle-down";
                        scope.unfoldedIcon = "fa fa-arrow-circle-up";
                    } else {
                        scope.foldedIcon = "fa fa-angle-double-down";
                        scope.unfoldedIcon = "fa fa-angle-double-up";
                    }
                    scope.isNewIcon = !scope.isNewIcon;
                    console.log("obj的标签 :" + obj.label + ";\n" + "htmlID :" + htmlID + ";\n");
                    console.log("foldedIcon_new :" + scope.foldedIcon + ";\n" + "unfoldedIcon_new :" + scope.unfoldedIcon + ";\n");
                }
            }];

            scope.isNewIcon = true;
            scope.foldedIcon = "fa fa-angle-double-down";
            scope.unfoldedIcon = "fa fa-angle-double-up";

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