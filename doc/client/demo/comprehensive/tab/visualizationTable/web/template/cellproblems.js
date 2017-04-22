/**
 * Created by 6176000041 on 2017/4/5.
 */
(function() {
    //这是本控制器的ID，非常重要，不要和已有的控制器重名
    var controllerName = 'mCellProblemsCtrl';

    //参考 main.js 中同名变量的说明
    var imports = [
        'rd.controls.Table'
    ];
    var extraModules = [ ];

    var controllerDefination = ['$scope', main];
    function main(scope) {
        console.log(scope)
        scope.setting = {
            "columnDefs": [
                {
                    targets: 5,
                    title: "得分趋势",
                    render: '<i class="iconfont iconfont-e8c8"></i>'
                }
            ]
        }
        //只有定义在this上的属性才能发布给外部。
    }
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