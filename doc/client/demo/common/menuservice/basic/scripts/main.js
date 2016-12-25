

define('main', ['rd.services.MenuService'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.MenuService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'MenuService', function(scope, Utils, $compile, MenuService) {

        var moduleID;
        scope.menuConfig = [
            {label: 'menu item 1', event: 'menu_item_1'},
            {label: 'menu item 2', event: 'menu_item_2'},
            {label: 'menu item 3', event: 'menu_item_3'},
        ];

        scope.position = {
            x: -30,
            y: 90
        };
        scope.load = function(event){

            moduleID = MenuService.addMenu(scope.menuConfig, scope.position, event);
        }

        scope.close = function () {
            MenuService.destroyMenu(moduleID);
        }
        /*scope.destroyHandler = function(){
            rdk[moduleID].child.destroy();
            MenuService.removeMenu(moduleID);
        }*/
    }]);
});
