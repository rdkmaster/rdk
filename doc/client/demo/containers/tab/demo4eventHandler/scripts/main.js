define('main', ['angular', 'jquery', 'rd.containers.Tab', 'rd.controls.BasicSelector', 'rd.controls.ProgressBar'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Tab',
        'rd.controls.BasicSelector',
        'rd.controls.ProgressBar'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Utils', '$compile', function(scope, EventService, EventTypes, Utils, $compile) {

        scope.allItems = [{label: "江苏省"}, {label: "浙江省"}, {label: "河南省"}, {label: "湖北省"}];

        var initData = {title: 'my title', showCloseButton: true, awesomeData: [{label: "江苏省"}, {label: "浙江省"}]};
        scope.clickHandler = function(){
            rdk.tabID.addTab('./scripts/template/tab.html', 'tabController', initData);
        }

        scope.closeHandler = function(event, data){
            var closeTabIndex = data.tabIndex;
            rdk.tabID.destroyTab(closeTabIndex);
            // rdk.tabID.closeTab(closeTabIndex);
        }

        scope.changeHandler = function(event, data){
            var currentSelectedIndex = data;
            alert('切换到第' + (currentSelectedIndex+1) + '个tab页');
        } 

        scope.addHandler = function(event, data){
            alert('成功新增tab页');
        } 

    }]);


    myApp.controller('tabController', ['$scope', 'EventService', 'EventTypes', function(scope, EventService, EventTypes) {

    }])
});
