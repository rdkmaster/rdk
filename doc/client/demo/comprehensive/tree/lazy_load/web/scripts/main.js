//如果这个用例需要在md文档中运行，那就必须加上，否则不需要加。
window.$svr = '/doc/client/demo/comprehensive/tree/lazy_load/server';

define('main', ['application', 'rd.controls.Tree'], function(application) {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Tree']);
// 创建一个控制器
app.controller('myCtrl', ['$scope', 'DataSourceService', function(scope, DataSourceService) {
application.initDataSourceService(DataSourceService);
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/
    scope.setting = {
        async: {
            enable: true,
            type: 'get',
            url: function(treeId, node) {
                //由于这个demo的运行环境比较复杂导致这个url比实际开发时的url要复杂一些
                //实际开发时的url类似这样  /rdk/service/app/example/server/my_service?p={"param":$param}
                var url = '/rdk/service/app/common/relay?p={"param":{"script":"../doc/client/demo/comprehensive/tree/lazy_load/server/data.js","param":$param},"app":"common"}';
                var obj = { key: node.key, name: node.name };
                return encodeURI(url.replace('$param', JSON.stringify(obj)));
            },
            dataFilter: function(treeId, parentNode, responseData) {
                if (responseData.hasOwnProperty('result') && angular.isString(responseData.result)) {
                    //这看起来像是一个RDK服务返回的数据
                    //RDK的服务返回的数据结构统一为 { result: "xxx" }
                    //其中 xxx 部分是实际的应答json字符串，把这个字符串转为json对象就好了
                    return eval('(' + responseData.result + ')');
                } else {
                    //非RDK服务的应答数据，结构未知，直接返回
                    return responseData;
                }
            }
        }
    }
}

]);
});
