(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.services.MenuService'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'MenuService', main];
    function main(scope, MenuService) {
        var menuConfig = [
            {label: 'menu item 1', event: 'menu_item_1'},
            {label: 'menu item 2', event: 'menu_item_2'},
            {label: 'menu item 3', event: 'menu_item_3'},
        ];

        var moduleID;

        scope.load = function(event){
            var position = 'mouse';
            moduleID = MenuService.addMenu(menuConfig, position, event);
        }

        scope.close = function () {
            MenuService.destroyMenu(moduleID);
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