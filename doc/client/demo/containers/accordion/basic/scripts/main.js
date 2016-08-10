define('main', ['angular', 'rd.containers.Accordion', 'rd.controls.BasicSelector'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Accordion',
        'rd.controls.BasicSelector'
    ]);

    myApp.controller('myCtrl', ['$scope', function(scope) {
        scope.cityItems = [{
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
    }]);
});
