(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table', 'rd.services.Alert'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'Alert', main];
    function main($scope,Alert ) {
        $scope.setting = {
            "columnDefs" :[
                {
                    title : "编辑列",
                    render : '<a ng-click="appScope.click(item)" href="javascript:void(0)">点击</a>'
                },{
                    title : "编号",
                    targets : 0,
                    override : false,
                    render : function(rowData){
                        $scope.idNum =  rowData.$index +1;
                        return $scope.idNum;
                    }
                }
            ]
        }

        $scope.click = function(item) {
            //弹出选择栏，重填value
            Alert.scope = $scope;
            Alert.confirm("自定义editorRenderer，弹出演示", "提示框");
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