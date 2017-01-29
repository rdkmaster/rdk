(function() {
    //这是本控制器的ID，非常重要，不要和已有的控制器重名
    var controllerName = 'NameEditorController';

    //参考 main.js 中同名变量的说明
    var imports = [
        'rd.controls.BasicSelector',
    ];
    var extraModules = [ ];

    var controllerDefination = ['$scope', 'EventService', main];
    function main(scope, EventService) {
        scope.allItems = [
            { id: 0, label: "angelababy" },
            { id: 1, label: "selina" },
            { id: 2, label: "hebbe" },
            { id: 3, label: "jolin" },
            { id: 4, label: "sara" },
            { id: 5, label: "joana" },
            { id: 6, label: "brown" },
            { id: 7, label: "bush" },
            { id: 8, label: "nikoson" },
            { id: 9, label: "mike" }
        ];

        scope.change = function() {
            EventService.broadcast(scope.$moduleId, 'edit', scope.selected[0]);
        }
    }

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