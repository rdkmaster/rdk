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
app.controller('rdk_ctrl', ['$scope', function(scope) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
    scope.toString = function(citys) {
        var result = '';
        angular.forEach(citys, function(city, key) {
            result += 'name=' + city.name + ', code=' + city.areaCode + '; ';
        });
        return result;
    }
}

]);
});
