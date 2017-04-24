(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.containers.Panel', 'rd.controls.Table','rd.attributes.Scroll', 'css!base/css/panel','css!rd.styles.IconFonts'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.panelStatus=true;
        scope.clkShowPanel=function(){
            scope.panelStatus=!scope.panelStatus;
        }
        scope.settingPanel = { //表格设置列宽度和样式类
            "columnDefs" :[
                {
                    targets : 0,
                    width : "14%"
                },{
                    targets : 1,
                    width : "16%",
                    class : "text-align"
                },{
                    targets : 2,
                    width : "20%",
                    class : "text-align"
                },{
                    targets : 3,
                    width : "16%"
                },{
                    targets : 4,
                    width: "19%"
                },{
                    targets : 5,
                    width : "15%",
                    class : "col-detail"
                }
            ]
        };
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