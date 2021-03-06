(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.core'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'DataSourceService', main];
    function main(scope, DS) {
        function toString(citys) {
            var result = '';
            angular.forEach(citys, function(city, key) {
                result += 'name=' + city.name + ', code=' + city.areaCode + '; ';
            });
            return result;
        }

        scope.syncQuery = function() {
            var citys = DS.syncQuery('mock/city_list.json');
            scope.cityList = toString(citys);
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