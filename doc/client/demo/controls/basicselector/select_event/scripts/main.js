define('main', ['rd.controls.BasicSelector'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.BasicSelector']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Utils', 'BasicSelector',
        function(scope, EventService, EventTypes, Utils, BasicSelector) {
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/
            scope.allItems = [{
                label: "江苏省"
            }, {
                label: "浙江省"
            }, {
                label: "广东省"
            }, {
                label: "广西省"
            }, {
                label: "河北省"
            }, {
                label: "河南省"
            }, {
                label: "湖北省"
            }, {
                label: "湖南省"
            }, {
                label: "新疆省"
            }, {
                label: "四川省"
            }];

            scope.selectedItems = [{
                label: "广西省"
            }, {
                label: "湖南省"
            }, {
                label: "河北省"
            }];


            EventService.register('id_selector', EventTypes.CHANGE, function(event, data) {
                console.log('accept inner_change');
            });

            scope.selectAll = function() {
                EventService.broadcast('id_selector', EventTypes.SELECT, "all");
            }

            scope.clearSelected = function() {
                EventService.broadcast('id_selector', EventTypes.SELECT);
            }

            scope.getSelected = function() {
                var res = '';
                res = BasicSelector.selected2string(scope.selectedItems, 'label', ';');
                alert('选中了 "' + res + '"');
            }

        }

    ]);
});
