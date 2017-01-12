(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        
    'rd.services.DataSourceService', 'rd.services.EventService',
    'rd.services.Utils', 'rd.attributes.ds',

    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {
        scope.toString = function(citys) {
            var result = '';
            angular.forEach(citys, function(city, key){
                result += 'name=' + city.name + ', code=' + city.areaCode + '\n';
            });
            return result;
        }

        scope.showMessage = function(msg) {
            alert(msg);
        }

        scope.query = function() {
            // 通过数据源id得到数据源的实例
            var ds = DataSourceService.get('ds_city');

            // 调用数据源的query/add/update/delete函数来触发相应的动作
            var conditioin = {};
            ds.query(conditioin);
        }

        scope.queryByEvent = function() {
            //事件方式触发数据源
            var conditioin = {};
            EventService.broadcast('ds_city', 'start_query', conditioin);
        }


        //下面代码执行的结果和 ds_result_handler 一样
        // EventService.register('ds_city', 'result', function(event, data) {
        //     scope.showMessage(data);
        // });
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