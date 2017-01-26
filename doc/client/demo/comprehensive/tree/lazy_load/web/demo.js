(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'application', 'rd.controls.Tree'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope',main];
    function main(scope) {
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