(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main($scope) {
        $scope.setting = {
            "columnDefs" :[
                {
                    title : "编辑列",
                    render : "<a style='cursor:pointer' ng-click='appScope.click(item,$parent.$index,$index)'>点击</a>"
                },{
                    title : "索引添加",
                    targets : 1,
                    override : false,
                    render : "渲染内容"
                },{
                    title : "索引添加2",
                    targets : 2,
                    override : false,
                    render : "渲染内容2"
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

        $scope.click = function(item,rowNum , colnum){
            debugger;
            console.log(item,rowNum , colnum);
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