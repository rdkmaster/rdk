(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes', main];
    function main($scope,EventService,EventTypes ) {
        EventService.register('table', EventTypes.CHECK, function(event, data){
            var selectedData = data.data;
        });      

        $scope.clickHandler = function(){
           rdk.tableID.pageSize = 3;
        } 

        $scope.selectHandler = function(){
            var arr = [
                          {
                            "name": "Tiger Nixon",
                            "position": "System Architect",
                            "salary": "$320,800",
                            "start_date": "2011/04/25",
                            "office": "Edinburgh",
                            "extn": "5421",
                          },
                          {
                            "name": "Garrett Winters",
                            "position": "Accountant",
                            "salary": "$170,750",
                            "start_date": "2011/07/25",
                            "office": "Tokyo",
                            "extn": "8422",
                          }
                        ]
            rdk.tableID.setChecked(arr);
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