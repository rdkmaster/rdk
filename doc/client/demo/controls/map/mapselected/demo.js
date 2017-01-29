(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Map', 'rd.services.PopupService'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', 'PopupService', main];
    function main(scope, EventService, PopupService) {
        EventService.register('gis', 'click', function(event, data) {
            popup(data.name, data.event.event.zrX, data.event.event.zrY);
        });

        EventService.register('gis', 'mapselected', function(event, data) {
            popup(data.name, data.event.event.zrX, data.event.event.zrY);
        });

        function popup(name, x, y) {
            PopupService.popup('\
                <div caption="弹出在选中地图附近">\
                    <strong>{{name}}</strong><br>\
                    <button ng-click="close()">close</button>\
                </div>', {name: name},
                {x: x, y: y, controller: 'DialogController'});
        }

        scope.selectCity = function() {
            EventService.broadcast('gis', "mapSelect", { name: '长春市' });
        };

        scope.unSelectCity = function() {
            EventService.broadcast('gis', "mapUnSelect", { name: '长春市' });
        };
    }

    rdk.$ngModule.controller('DialogController', ['$scope', 'PopupService', function(scope, PopupService) {
        scope.name = '选中了 ' + scope.name;
        scope.close = function() {
            PopupService.removePopup(scope.$moduleId);
        }
    }]);

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