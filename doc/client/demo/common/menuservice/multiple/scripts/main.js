

define('main', ['rd.services.MenuService'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.MenuService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'MenuService', function(scope, Utils, $compile, MenuService) {

        var moduleID;
        scope.menuConfig = [
            {label: 'menu item 1', event: 'menu_item_1'},
            {label: 'menu item 2', event: 'menu_item_2'},
            {label: 'memu item 3', list: [
                {label: 'submenu item 1', event: 'sub_menu_item_1'},
                {label: 'submenu item 2', event: 'sub_menu_item_2'}
            ]}
        ];


        scope.load = function(event){

            moduleID = MenuService.addMenu(scope.menuConfig, 'mouse', event);
        }

        scope.close = function () {
            MenuService.destroyMenu(moduleID);
        }
    }]);
});
