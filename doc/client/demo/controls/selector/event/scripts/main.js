define('main', ['rd.controls.Selector'], function() {
    var app = angular.module("rdk_app", ['rd.controls.Selector']);
    app.controller('myCtrl', ['$scope', '$timeout', 'EventService', 'EventTypes', function(scope, $timeout, EventService, EventTypes) {

        scope.allItems = [
            { id: 0, label: "江苏省" },
            { id: 1, label: "浙江省" },
            { id: 2, label: "广东省" },

            { id: 3, label: "广西省" },
            { id: 4, label: "河北省" },

            { id: 5, label: "河南省" },
            { id: 6, label: "湖北省" },
            { id: 7, label: "湖南省" },
            { id: 8, label: "新疆省" },
            { id: 9, label: "四川省" }
        ];

        scope.groupByFun = function(item) {
            if (item.id < 3) {
                return 'theme1';
            } else if (item.id < 5) {
                return 'theme2';
            } else {
                return 'theme3';
            }
        }

        scope.dimSelectedItems = [
            { id: 1, label: "浙江省" },
            { id: 3, label: "广西省" },
            { id: 5, label: "河南省" }
        ]; //根据同一个groupBy

        $timeout(function() {
            EventService.broadcast("selectorID", EventTypes.SELECT, [{ id: 7, label: "湖南省" }, { id: 8, label: "新疆省" }, { id: 9, label: "四川省" }]);
        }, 3000); //直接给需要被选中的数据集

        $timeout(function() {
            EventService.broadcast("selectorID", EventTypes.CLOSE);
        }, 5000);

        EventService.register("selectorID", EventTypes.CHANGE, function(event, data) {
            console.log(data);
        });
    }]);
});
