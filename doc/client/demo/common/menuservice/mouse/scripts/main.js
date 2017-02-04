

define('main', ['rd.services.MenuService'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.MenuService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'MenuService', function(scope, Utils, $compile, MenuService) {

        scope.menuConfig = [
            {label: 'menu item 1', event: 'menu_item_1'},
            {label: 'menu item 2', event: 'menu_item_2'},
            {label: 'menu item 3', event: 'menu_item_3'},
        ];

        var moduleID;

        scope.load = function(event){
            var position = 'mouse';
            moduleID = MenuService.addMenu(scope.menuConfig, position, event);
        }

        scope.close = function () {
            MenuService.destroyMenu(moduleID);
        }
    }]);
});
