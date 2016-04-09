var app = angular.module("myApp", ['rdk']);
app.controller('ctrl', ['$scope', 'DataSourceService', 'EventService',
    function(scope, DSService, EventService) {
        scope.tplPath = '../template/pie_by_row.txt'
        EventService.broadcast('ds_pie_1', "start_query", {});

        scope.change = function() {
            console.log('aaaaaaaaaaaaaaa')
            scope.tplPath = '../template/line_by_row.txt';
            var ds = DSService.get('ds_pie_1');
            ds.url = '/demo/line_1';
            EventService.broadcast('ds_pie_1', "start_query", {});
        }

}]);
