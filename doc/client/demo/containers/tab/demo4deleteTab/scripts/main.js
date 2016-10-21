define('main', ['angular', 'jquery', 'rd.containers.Tab', 'rd.controls.BasicSelector', 'rd.controls.ProgressBar'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Tab',
        'rd.controls.BasicSelector',
        'rd.controls.ProgressBar'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Utils', '$compile', function(scope, EventService, EventTypes, Utils, $compile) {
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

            EventService.register('tabID', EventTypes.CLOSE, function(event, data){
                var result = confirm('是否关闭Tab页');
                if(result){
                    rdk.tabID.destroyTab(data.tabIndex);
                    // rdk.tabID.closeTab(data.tabIndex);
                }
            });
        }
    ]);
});
