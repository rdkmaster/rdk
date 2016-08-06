define('main', ['angular', 'rd.containers.Accordion'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Accordion'
    ]);

    myApp.controller('myCtrl', ['$scope', 'EventService', 'EventTypes',
        function(scope, EventService, EventTypes) {
            scope.buttonSource = [{
                icon: "images/edit.png",
                label: "编辑",
                tooltips: "点击可进行编辑",
                callback: function(obj, htmlID) {
                    scope.isEditable = !scope.isEditable;
                    alert("编辑状态：" + scope.isEditable);
                }
            }];

            scope.isEditable = false;
            scope.foldedIcon = "fa fa-angle-double-down";
            scope.unfoldedIcon = "fa fa-angle-double-up";

        }
    ]);
});
