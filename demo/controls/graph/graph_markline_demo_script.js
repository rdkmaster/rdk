var app = angular.module("myApp", ['rdk']);
app.controller('ctrl', ['$scope', 'DataSourceService', 'EventService',
    function(scope, DSService, EventService) {
        scope.tplPath = './line_by_row.txt'
        EventService.broadcast('ds', "start_query", {});


}]);
