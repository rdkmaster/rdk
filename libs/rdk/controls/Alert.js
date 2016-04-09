define(['angular'], function() {
    var dsModule = angular.module('rd.controls.Alert', []);
    dsModule.controller('rdkAlert', ['$scope', function($scope) {
            $scope.alertFunc = function(fn) {
                (fn)();
            };
            $scope.closeFrame = function() {
                $('.alertFrame').css('display', 'none');
            };
        }])
        .directive('rdkAlert', function() {
            return {
                restrict: 'E',
                scope: {
                    icon: '@icon',
                    buttons: '=',
                    content: '@content'
                },
                replace: true,
                controller: 'rdkAlert',
                template: '<div class="alertFrame" style="height: 173px;width: 340px;margin: 20px 0 0 20px;border: 1px solid grey;border-radius: 5px;z-index:-1000">' +
                    '<div style="background-color: #ACC5E0;height: 20px;">' +
                    '<span style="position: absolute;vertical-align: middle;margin-left: 5px;">Save</span>' +
                    '<button id="alertFrame" style="float:right;margin: 0px;border:0px;height: 19px;width: 50px;" ng-click="closeFrame()">×</button>' +
                    '</div>' +
                    '<div style="position:relative;background-color: #FFFFFF;height: 100px;">' +
                    '<img src="{{icon}}" style="float: left;height: 50px;width: 60px;margin: 20px 5px 0px 20px;" alt="" />' +
                    '<span style="position:absolute;margin-top: 20px">{{content}}</span>' +
                    '</div>' +
                    '<div style="background-color: #F0F0F0;height: 50px;">' +
                    '<button style="float: right;height: 25px;width: 16%;margin-top: 17px;margin-right: 10px;border-radius: 3px;" ng-repeat="item in buttons track by $index" ng-click="alertFunc(item.click)">{{item.label}}</button>' +
                    '</div>' +
                    '</div>'
            };
        });
});
