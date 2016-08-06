define('main', ['angular', 'rd.containers.Accordion'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Accordion'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes',
        function(scope, EventService, EventTypes) {
            scope.buttonSource = [{
                icon: "images/refresh.png",
                label: "刷新",
                tooltips: "点击可进行图标变更",
                callback: function(obj, htmlID) {
                    if (scope.isNewIcon) {
                        scope.foldedIcon = "fa fa-arrow-circle-down";
                        scope.unfoldedIcon = "fa fa-arrow-circle-up";
                    } else {
                        scope.foldedIcon = "fa fa-angle-double-down";
                        scope.unfoldedIcon = "fa fa-angle-double-up";
                    }
                    scope.isNewIcon = !scope.isNewIcon;
                    console.log("obj的标签 :" + obj.label + ";\n" + "htmlID :" + htmlID + ";\n");
                    console.log("foldedIcon_new :" + scope.foldedIcon + ";\n" + "unfoldedIcon_new :" + scope.unfoldedIcon + ";\n");
                }
            }];

            scope.isNewIcon = true;
            scope.foldedIcon = "fa fa-angle-double-down";
            scope.unfoldedIcon = "fa fa-angle-double-up";

        }
    ]);
});
