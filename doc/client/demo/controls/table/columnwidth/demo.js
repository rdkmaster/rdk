(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.setting = {
            "columnDefs" :[
                {
                    targets : 0,
                    width : "20%"
                },{
                    targets : 1,
                    width : "10%"
                },{
                    targets : "extn",
                    width : "40%"
                },{
                    title : "编辑列",
                    render : "<a style='cursor:pointer' ng-click='appScope.click(item)'>点击</a>"
                },{
                    targets : 3,
                    visible : false
                },{
                    targets : 4,
                    visible : false
                },{
                    targets:"position",
                    render:function(item){
                        if(item.position == "Accountant")
                            return "<p style='color:red'>"+item.position+"</p>";
                        else
                            return item.position;
                    }
                }
            ]
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