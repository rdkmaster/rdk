var app = angular.module('gisApp', ['rdk']);

app.controller('ctrl', ['$scope', 'EventService','$timeout',
    function($scope, EventService,$timeout) {
        EventService.init($scope);
        $scope.option = {
                "userName": "lingyun",
                "pageName": "lowspeed",
                "systemType": "E2E",
                "valueCategory": "lowspeedday",
                "defalutCellGridsStatu": "cell",
                "gridsData":{
                     "kpi":'LowSpeed',
                     "gridSize":"50",
                     "uniqueID":'GridRender',
                     "areaCode":"460",
                     "reloadFlag":false,
                     "otherKPI":''
                }
            }

            $scope.cellhandler = function(event, data) {
                console.log(event);
                console.log(data)
            }

            $scope.gridhandler = function(event, data) {
                console.log(event);
                console.log(data)
            }

            $scope.renderValue= function(event,data){
                EventService.broadcast('gis', "render_cell_by_value", "/home/data/E2E_LowSpeed_CellRender_10.43.153.15_2015-09-15.csv");
            }


            $scope.statusChanged = function(event,data){
                if(data == "grids"){
                   EventService.broadcast('gis', "load_grid", "/home/data/E2E_LowSpeed_GridRender_2015-09-15.csv"); 
                }
                if(data == "cell"){
                    EventService.broadcast('gis', "load_cell", "/home/data/E2E_LowSpeed_ProJ_CellRender_10.43.153.15_2015-09-15.csv");                    
                }
            }
            $timeout(
                function() {
                    EventService.broadcast('gis', "load_cell", "/home/data/E2E_LowSpeed_ProJ_CellRender_10.43.153.15_2015-09-15.csv");
                },
                2000
            );
    }
]);

