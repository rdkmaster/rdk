define('main', ['angular', 'rd.containers.Tab', 'rd.controls.BasicSelector','rd.controls.Progressbar'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Tab',
        'rd.controls.BasicSelector',
        'rd.controls.Progressbar'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'BasicSelector',
        function(scope, EventService, EventTypes, BasicSelector) {
            scope.cityItems = [{
                label: "江苏省"
            }, {
                label: "浙江省"
            }, {
                label: "河南省"
            }, {
                label: "湖北省"
            }];

            scope.selectedItems = [{
                label: "江苏省"
            }];

            scope.rdkSelector = "Selector控件";
        }
    ]);
});
