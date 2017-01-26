(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table', 'rd.services.Alert'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes','Alert',main];
    function main($scope,EventService,EventTypes,Alert) {
        $scope.checkable = {};

        $scope.setting = {
            "columnDefs": [{
                    targets: 0,
                    override : false,
                    render: '<input type="checkbox" ng-model="appScope.checkable[item.$index]"></input>'
                }, {
                    targets: 2,
                    editable: true,
                    editorRenderer: '<a style="cursor:pointer" ng-click="appScope.click(item)">{{item.salary}}</a>'
                }

            ]
        }

        EventService.register('table', EventTypes.PAGING_DATA_CHANGE, function(event, data) {
            for (var i = 0; i < data.length; i++) {
                $scope.checkable[data[i].$index] = false;
            };
        });

        $scope.click = function(item) {
            //弹出选择栏，重填value
            Alert.scope = $scope;
            Alert.confirm("自定义editorRenderer，弹出演示", "提示框");
        }

        $scope.select_all = function() {
            for (key in $scope.checkable){
                $scope.checkable[key] = $scope.selectAll;
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