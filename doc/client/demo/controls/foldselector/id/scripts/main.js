define('main', ['rd.controls.FoldSelector'], function() {
    var app = angular.module('rdk_app', ['rd.controls.FoldSelector']);
    app.controller('foldSelectorCtrl', ['$scope', 'EventService', 'EventTypes', function(scope, EventService, EventTypes) {
        scope.data = [
            { id: 0, label: "江苏省" },
            { id: 1, label: "浙江省" },
            { id: 2, label: "广东省" },
            { id: 3, label: "广西省" },
            { id: 4, label: "河北省" },
            { id: 5, label: "河南省" },
            { id: 6, label: "湖北省" },
            { id: 7, label: "湖南省" },
            { id: 8, label: "新疆省" },
            { id: 9, label: "四川省" },
        ];

        scope.selectedItems = [
            { id: 3, label: "广西省" },
            { id: 7, label: "湖南省" },
            { id: 4, label: "河北省" },
        ];

        scope.changeHandler = function(event, data) {
            console.log('call changeHandler');
        }

        EventService.broadcast("foldSelectorID", EventTypes.OPEN);

    }])

});
