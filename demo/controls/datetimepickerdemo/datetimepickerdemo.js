var vmaxtime_demo_app = angular.module('vmaxtime_demo_app', ['rd.services.Utils','rd.controls.Time']);
vmaxtime_demo_app.controller('ctrl', ['$scope', function(scope){
      scope.inputValueHour = {
        selectGr: true,
        grItems: ['hour', 'date', 'week', 'month','range'],
        gr: 'hour',
        value: "2015-01-01 07:00",
      };

     scope.inputValueRange = {
        selectGr: true,
        grItems: ['hour', 'date', 'week', 'month', 'range'],
        gr: 'range',
        // value: '2015-01-01 09:10',
        startDate:"this month - 2",
        endDate:"this month - 1"
      };


}]);