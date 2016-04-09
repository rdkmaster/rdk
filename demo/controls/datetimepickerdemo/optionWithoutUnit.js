var vmaxtime_demo_app = angular.module('vmaxtime_demo_app', ['rd.services.Utils','rd.controls.Time', 'ui.codemirror']);
vmaxtime_demo_app.controller('ctrl', ['$scope', function(scope){

    scope.editorOptions = {
        lineNumbers: true,
        readOnly: '',
        lineWrapping: true,
        mode: 'javascript'
    };

    scope.timeOption1 = '<rdk-time value="defaultValue"></rdk-time>';


    scope.defaultValue = {
        value: "2015-01-01 07:00",
    };

    scope.timeOption2 = '<rdk-time value="setLimitValue"></rdk-time>';

    scope.setLimitValue = {
        value: "2015-01-07 07:00",
        startDate:"2015-01-01 07:00",
        endDate:"2015-01-09 07:00"
    };

    scope.timeOption3 = '<rdk-time value="unitSet"></rdk-time>';

    scope.unitSet = {
        value: "2015-01-07 07:00",
        startDate:"2015-01-01 07:00",
        endDate:"2015-03-09 07:00",
        gr:"week" //hour day week month range
    };

    scope.timeOption4 = '<rdk-time range value="rangeSet"></rdk-time>';

    scope.rangeSet = {
        value: ["2015-01-07 07:00", "2015-01-17 07:00"],
        startDate:"2015-01-01 07:00",
        endDate:"2015-03-09 07:00",
        gr: "week"
    };    

}]);