define('main', ['angular', 'jquery', 'rd.containers.Tab', 'rd.controls.BasicSelector', 'rd.controls.ProgressBar'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Tab',
        'rd.controls.BasicSelector',
        'rd.controls.ProgressBar'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Utils', '$compile', function(scope, EventService, EventTypes, Utils, $compile) {

        /*单独模板相关变量另外给*/
        var initData = {title: 'my title', showCloseButton: false, awesomeData: [{label: "江苏省"}, {label: "浙江省"}]};
        scope.clickHandler = function(){
            rdk.tabID.addTab('./scripts/template/tab.html', 'tabController', initData);
        }

        scope.closeHandler = function(event, data){
            var closeTabIndex = data.tabIndex;
        } 

        scope.allItems = [{label: "江苏省"}, {label: "浙江省"}, {label: "河南省"}, {label: "湖北省"}];

        EventService.register('tabID', EventTypes.CLOSE, function(event, data){
            rdk.tabID.destroyTab(data.tabIndex);
            // rdk.tabID.closeTab(data.tabIndex);
        }); 

    }]);


    myApp.controller('tabController', ['$scope', 'EventService', 'EventTypes', function(scope, EventService, EventTypes) {
        /*所有rdk_tab相关的需要私有的变量*/


    }])
});
