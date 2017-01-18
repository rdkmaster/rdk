define('main', ['angular', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.controls.ComboSelect',
        'rd.controls.BasicSelector'
    ]);

    myApp.controller('myCtrl', ['$scope', 'BasicSelector', '$timeout','EventService','EventTypes', function(scope, BasicSelector, $timeout,EventService,EventTypes) {
        scope.allItems = [{
            id: 0,
            label: "江苏省"
        }, {
            id: 1,
            label: "浙江省"
        }, {
            id: 2,
            label: "河南省"
        }, {
            id: 3,
            label: "湖北省"
        }];
        scope.highLight=[];
        scope.selected2string = function(selected, context, index) {
            return BasicSelector.selected2string(selected, 'label', '...');
        }
        EventService.register('comboID',EventTypes.CLEAR, function(scope,data){
            scope.highLight=[];
        });
        scope.frBln = true;

        $timeout(function() {
            scope.frBln = false;
        }, 5000);

    }]);
});
