(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Map'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','EventService', main];
    function main(scope,EventService) {
        scope.mapUrl = 'mapinfo/china.json';

        EventService.register('gis', 'click', function(event, data) {
            scope.name = data.name;
            var id = data.rawData.properties.id;
            if (id.length == 2) {
                scope.mapUrl = 'mapinfo/geometryProvince/' + id + '.json';
            } else if (id.length == 4) {
                scope.mapUrl = 'mapinfo/geometryCouties/' + id + '00.json';
            }
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