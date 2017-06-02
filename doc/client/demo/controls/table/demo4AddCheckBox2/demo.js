(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table', 'rd.services.Alert'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main($scope,EventService, EventTypes) {
        $scope.setting = {
            "columnDefs" :[
                {
                    title : "方式2",
                    targets : 0,
                    render : function(item){
                        if(item.checked){
                            return '<input type="checkbox" checked="checked" ng-click="appScope.addCheck(item)"></a>';
                        }else{
                            return '<input type="checkbox" ng-click="appScope.addCheck(item)"></a>';
                        }
                    }
                }
            ]
        }
        $scope.addCheck = function(rowItem){
            console.log(rowItem);
        };
        //获取checked数据
        EventService.register('myTable', EventTypes.CHECK, function(event, data){
            var selectedData = data.data;
            console.log(selectedData);
        });

        $scope.dsDataPro = function(data){
            var result = data;
            result.checked=[];
            angular.forEach(data.data,function(item,index){
                item[0]==1 ? result.checked[index] = true :false;
            });
            return result;
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