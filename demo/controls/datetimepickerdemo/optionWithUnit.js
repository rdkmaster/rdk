var vmaxtime_demo_app = angular.module('vmaxtime_demo_app', ['rd.services.Utils','rd.controls.Time', 'ui.codemirror']);
vmaxtime_demo_app.controller('ctrl', ['$scope', function(scope){

    scope.editorOptions = {
        lineNumbers: true,
        readOnly: '',
        lineWrapping: true,
        mode: 'javascript'
    };

    scope.timeOption1 = '<rdk-time value="defaultValue"></rdk-time>';


    scope.showUnitSelect = {
        selectGr: true,
    };

    scope.timeOption2 = '<rdk-time value="unitSelectSetting"></rdk-time>';

    scope.unitSelectSetting = {
        selectGr: true,
        grItems:[
            {label: "天", value: "date"},
            {label: "周", value: "week"},
            {label: "月", value: "month"}
        ],
        gr:"date"
    };

    scope.timeOption3 = '<rdk-time range value="entireSet"></rdk-time>';

    scope.entireSet = {
        value: ["2015-01-07", "2015-01-09"],
        startDate:"2015-01-01 07:00",
        endDate:"2015-03-09 07:00",
        selectGr: true,
        gr:"date",
        grItems:[
            {label: "分钟", value: "minute"},
            {label: "刻钟", value: "quarter"},
            {label: "小时", value: "hour"},
            {label: "天", value: "date"},
            {label: "周", value: "week"},
            {label: "月", value: "month"}]
    };

}]);