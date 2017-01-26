(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'application', 'rd.containers.Tab', 'rd.controls.SingleIndicator'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main(scope,EventService,EventTypes ) {
        scope.datas = [
                { "label": "终端", "value": 10, "icon": "fa fa-mobile fa-4x", "point_to": "bottom" },
                { "label": "无线", "value": 10, "icon": "fa fa-wifi fa-3x", "point_to": "right" }
            ];
            //no code here
            EventService.register("tabid", EventTypes.CHANGE, function(event, data) {
                var selectedIndex = data;
                for (var i = 0; i < scope.datas.length; i++) {
                    if (i == selectedIndex) {
                        scope.datas[i].point_to = "bottom";
                    } else {
                        scope.datas[i].point_to = "right";
                    }
                };
            });
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