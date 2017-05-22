(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.containers.Panel', 'rd.controls.Table','rd.attributes.Scroll', 'css!base/css/panel','css!rd.styles.IconFonts'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {

        scope.setting = { //表格设置列宽度和样式类
            "columnDefs" :[

            ]
        };

        scope.allData= {data: [], field: [], header: []};
        var obj;
        for (var i = 0; i < 5; i++) {
            scope.allData.data.push([]);
            for (var j = 0; j < 30; j++) {
                scope.allData.data[i].push('data: ' + i + ', ' + j);
                scope.allData.field[j] = 'filed' + j;
                scope.allData.header[j] = 'header' + j;
                obj={};
                obj.targets=j;
                obj.sortable=true;
                scope.setting.columnDefs.push(obj);
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