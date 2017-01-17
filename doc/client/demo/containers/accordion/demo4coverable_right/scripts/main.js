define('main',['angular', 'rd.containers.Accordion', 'rd.controls.BasicSelector'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Accordion',
        'rd.controls.BasicSelector'
    ]);

    myApp.controller('myCtrl', ['$scope', 'RDKConst', 'BasicSelector', 'EventService', 'EventTypes', '$timeout', function(scope, RDKConst, BasicSelector, EventService, EventTypes, $timeout) {
        scope.cityItems = [{
            id: 0,
            label: "江苏省"
        }, 
        {
            id: 1,
            label: "浙江省"
        }, 
        {
            id: 2,
            label: "河南省"
        }, 
        {
            id: 3,
            label: "湖北省"
        },{
            id: 4,
            label: "新疆省"
        }, 
        {
            id: 5,
            label: "江西省"
        }, 
        {
            id: 6,
            label: "河北省"
        }, 
        {
            id: 7,
            label: "湖南省"
        }];

        scope.localOpen_1 = false;
        scope.localOpen_2 = false;

        scope.minWidth_1 = 0;
        scope.minWidth_2 = 100;

        scope.close = function(){
            scope.localOpen_1 = false;
            scope.localOpen_2 = false;
        }

        scope.open = function(){
            scope.localOpen_1 = true;
            scope.localOpen_2 = true;
        }
    }]);
});
