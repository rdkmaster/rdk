

define('main', ['rd.services.MenuService'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.MenuService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'MenuService', 'EventService', 'EventTypes', function(scope, Utils, $compile, MenuService, EventService, EventTypes) {

        require(['css!/doc/client/demo/common/menuservice/demo4select/scripts/css/main']);

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
            EventService.register(moduleID, EventTypes.SELECT, function(event, data){
                alert(data);
            });
        }

        scope.close = function () {
            MenuService.destroyMenu(moduleID);
        }
    }]);
});
