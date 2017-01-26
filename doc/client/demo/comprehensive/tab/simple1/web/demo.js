(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.services.EventService', 'rd.services.Utils','rd.containers.Tab'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', main];
    function main(scope,EventService ) {
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/
            EventService.register('my_ds', 'result', function(event,data) {           
                var user_data=data.data;
                for(var i=0;i<user_data.length;i++){
                    for(var j=0;j<user_data[i].length;j++){
                        var param='value'+(i+1)+j;
                        scope[param]=user_data[i][j];
                    }
                }
            }) 
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