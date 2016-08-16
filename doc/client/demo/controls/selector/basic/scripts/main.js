define('main', ['rd.controls.Selector'], function() {
    var app = angular.module("rdk_app", ['rd.controls.Selector']);
    app.controller('myCtrl', ['$scope', function(scope) {

        scope.groupData = {
            "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
            "title2": [{ id: 2, label: "广东省" }, { id: 3, label: "广西省" }, 
            		   { id: 4, label: "河北省" }, { id: 5, label: "河南省" }]
        };

        scope.groupSelectedItems = {
            "title1": [{ id: 0, label: "江苏省" }, { id: 1, label: "浙江省" }],
            "title2": [{ id: 2, label: "广东省" }]
        };
    }]);
});
