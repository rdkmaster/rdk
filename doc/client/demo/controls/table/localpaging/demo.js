(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table','rd.controls.ListSelector','css!base/css/demo'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main($scope,EventService,EventTypes ) {

        $scope.changeSize = function(){
            if($scope.selected[0]==""){
                rdk.tableID.setPageSize(5);
            }else{
                rdk.tableID.setPageSize($scope.selected[0]);
            }
        }

        $scope.selectData=[5,10,20,40,80,100,200];
        $scope.selected=[];
        $scope.selected[0]=$scope.selectData[0];

        EventService.register('mySelect', EventTypes.CHANGE, function(event, data) {//处理被选中的数据
            debugger;
            rdk.tableID.setPageSize(data);
        })

        //测试数据
        $scope.allData= {data: [], field: [], header: []};
        for (var i = 0; i < 500; i++) {
            $scope.allData.data.push([]);
            for (var j = 0; j < 100; j++) {
                $scope.allData.data[i].push('data' + i  + j);
                $scope.allData.field[j] = 'filed' + j;
                $scope.allData.header[j] = 'head' + j;
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