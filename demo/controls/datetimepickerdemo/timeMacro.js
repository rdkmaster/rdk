var vmaxtime_demo_app = angular.module('vmaxtime_demo_app', ['rd.services.Utils','rd.controls.Time', 'ui.codemirror']);
vmaxtime_demo_app.controller('ctrl', ['$scope', function(scope){

    scope.editorOptions = {
        lineNumbers: true,
        readOnly: '',
        lineWrapping: true,
        mode: 'javascript'
    };

    scope.timeOption1 = '<rdk-time value="timeMacroSet"></rdk-time>';


    scope.timeMacroSet = {
        value:"now",
        startDate:"last week",
        endDate:"next week",
        gr: "date"
    };

    scope.timeOption2 = '<rdk-time value="timeMacroCalculate"></rdk-time>';

    scope.timeMacroCalculate = {
        value:"now",
        startDate:"last week - 1",
        endDate:"next week + 1",
        gr: "date"
    };

    // scope.timeOption3 = '<rdk-time value="entireSet"></rdk-time>';

    // scope.entireSet = {
    //     value: "2015-01-07 07:00",
    //     startDate:"2015-01-01 07:00",
    //     endDate:"2015-03-09 07:00",
    //     selectGr: true,
    //     gr:"date",
    //     grItems:["hour", "date", "week", "month", "range"]
    // };

}]);