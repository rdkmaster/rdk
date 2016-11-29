define('main', ['angular', 'jquery', 'rd.containers.Tab', 'rd.controls.BasicSelector', 'rd.controls.ProgressBar', 'rd.controls.Table'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Tab',
        'rd.controls.BasicSelector',
        'rd.controls.ProgressBar', 
        'rd.controls.Table'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Utils', '$compile', function(scope, EventService, EventTypes, Utils, $compile) {

        /*单独模板相关变量另外给*/
        var initData = {title: 'my title', showCloseButton: true};
        scope.clickHandler = function(){
            rdk.tabID.addTab('./scripts/template/tab.html', 'tabController', initData);
        }

        scope.closeHandler = function(event, data){
            var closeTabIndex = data.tabIndex;
        }

        EventService.register('tabID', EventTypes.CLOSE, function(event, data){
            rdk.tabID.destroyTab(data.tabIndex);
            // rdk.tabID.closeTab(data.tabIndex);
        }); 

    }]);


    myApp.controller('tabController', ['$scope', 'EventService', 'EventTypes', function(scope, EventService, EventTypes) {
        /*所有rdk_tab相关的需要私有的变量*/
         scope.setting = {
                "columnDefs" :[
                    {
                        targets : 0,
                        class : "red"
                    },{
                        targets : "extn",
                        class : "green"
                    }
                ]
            }
    }])
});
