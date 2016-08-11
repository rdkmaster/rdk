define('main', ['angular', 'rd.containers.Accordion'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Accordion'
    ]);

    myApp.controller('myCtrl', ['$scope', function(scope) {
        scope.buttonSource = [{
            icon: "/doc/client/demo/containers/accordion/img/edit.png",
            label: "编辑",
            tooltips: "点击可进行编辑",
            callback: function(obj, htmlID) {
                alert("点击了编辑按钮！");
            }
        }, {
            icon: "/doc/client/demo/containers/accordion/img/delete.png",
            label: "删除",
            tooltips: "点击将删除内容",
            callback: function(obj) {
                alert("点击了删除按钮！");
            }
        }, {
            callback: function(obj) {
                alert("这你都可以看到！");
            }
        }];

        scope.foldedIcon = "fa fa-angle-double-down";
        scope.unfoldedIcon = "fa fa-angle-double-up";

    }]);
});
