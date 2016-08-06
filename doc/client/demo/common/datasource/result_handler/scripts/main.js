define('main', [
    'rd.services.DataSourceService', 'rd.services.EventService',
    'rd.services.Utils', 'rd.attributes.ds',
], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", [
    'rd.services.DataSourceService', 'rd.services.EventService',
    'rd.services.Utils', 'rd.attributes.ds',
]);
// 创建一个控制器
app.controller('rdk_ctrl', ['$scope', 'DataSourceService', 'EventService',
function(scope, DataSourceService, EventService) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
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

]);
});
