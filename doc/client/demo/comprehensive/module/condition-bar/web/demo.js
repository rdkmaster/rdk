(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Module', 'base/module/condition-bar'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.getTime = function() {
            alert(rdk.conBar.child.getTime());
            console.log(rdk.conBar.child)
        }
        scope.getSelectedProvince = function() {
            var prov = rdk.conBar.child.getSelectedProvince();
            if(prov){
            alert('label=' + prov.label + ', id=' + prov.id);
            }else{
                alert('label=' + "null" + ', id=' + "null");
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