(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table', 'rd.services.Alert','css!base/css/demo'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main($scope ) {
        $scope.setting = {
            "columnDefs" :[
               {
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

        $scope.gotoRowIndex=function(){
            rdk.myTable.scrollTo($scope.rowIndex);
        }

        $scope.idx = 3;
        $scope.change = function() {
            $scope.idx++;
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