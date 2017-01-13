(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        
    'rd.services.DataSourceService', 'rd.services.EventService',
    'rd.services.Utils', 'rd.attributes.ds',

    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.toString = function(citys) {
            var result = '';
            angular.forEach(citys, function(city, key) {
                result += 'name=' + city.name + ', code=' + city.areaCode + '; ';
            });
            return result;
        }
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