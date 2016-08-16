define('main', ['rd.controls.Map'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Map']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', function(scope, EventService) {
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/
            scope.mapUrl = '/doc/client/demo/controls/map/drill/data/china.json';

            EventService.register('gis', 'click', function(event, data) {
                scope.name = data.name;
                var id = data.rawData.properties.id;
                if (id.length == 2) {
                    scope.mapUrl = '/doc/client/demo/controls/map/drill/data/geometryProvince/' + id + '.json';
                } else if (id.length == 4) {
                    scope.mapUrl = '/doc/client/demo/controls/map/drill/data/geometryCouties/' + id + '00.json';
                }
            });
        }

    ]);
});
