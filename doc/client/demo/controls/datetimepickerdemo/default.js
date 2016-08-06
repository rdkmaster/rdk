var vmaxtime_demo_app = angular.module('vmaxtime_demo_app', ['rd.services.Utils','rd.controls.Time', 'ui.codemirror']);
vmaxtime_demo_app.controller('ctrl', ['$scope', function(scope){

    scope.editorOptions = {
        lineNumbers: true,
        readOnly: '',
        lineWrapping: true,
        mode: 'javascript'
    };

    scope.tableOption = '<rdk-time></rdk-time>';

}]);