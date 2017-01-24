(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Map', 'rd.attributes.modal'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService', main];
    function main(scope, EventService) {
        EventService.register('gis', 'click', function(event, data) {
                scope.name = data.name;
            });

            EventService.register('gis', 'mapselected', function(event, data) {
                scope.name = data.name;
                scope.setmodal('gisModal', 'none_modal', { x: data.event.event.zrX, y: data.event.event.zrY });
            });

            scope.setmodal = function(id, modal, position) {
                EventService.broadcast(id, modal, position);
            }

            scope.selectCity = function() {
                EventService.broadcast('gis', "mapSelect", { name: '长春市' });
            };

            scope.unSelectCity = function() {
                EventService.broadcast('gis', "mapUnSelect", { name: '长春市' });
            };
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();