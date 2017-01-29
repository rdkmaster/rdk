(function() {
    //这是本控制器的ID，非常重要，不要和已有的控制器重名
    var controllerName = 'HabitEditorController';

    //参考 main.js 中同名变量的说明
    var imports = [
        'rd.controls.BasicSelector',
    ];
    var extraModules = [ ];

    var controllerDefination = ['$scope', 'EventService', 'BasicSelector', main];
    function main(scope, EventService, BasicSelector) {
        scope.allItems = [
            { id: 0, label: "网球" },
            { id: 1, label: "乒乓" },
            { id: 2, label: "排球" },
            { id: 3, label: "篮球" },
            { id: 4, label: "冰球" },
            { id: 5, label: "垒球" },
            { id: 6, label: "棒球" },
            { id: 7, label: "游泳" },
            { id: 8, label: "体操" },
            { id: 9, label: "射击" }
        ];

        scope.closeHandler = function() {
            //scope.selected是弹出窗口的时候， 由initData传递进来的
            var data = BasicSelector.selected2string(scope.selected, 'label', ', ');
            EventService.broadcast(scope.$moduleId, 'edit', data);
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