define('main', ['rd.controls.BasicSelector'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.BasicSelector']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes',
        function(scope, EventService, EventTypes) {
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/
            scope.initialValue = function() {
                scope.img_selected = 'fa fa-pencil fa-fw';
                scope.img_base = "demo/controls/basicselector/select_renderer/images/";
                scope.img_value = scope.img_base + "edit.png";

                scope.allItems = [{
                    label: "江苏省"
                }, {
                    label: "浙江省"
                }, {
                    label: "广东省"
                }, {
                    label: "广西省"
                }];

                scope.imgRes = [{
                    label: "编辑",
                    value: "fa fa-pencil fa-fw"
                }, {
                    label: "删除",
                    value: "fa fa-trash-o fa-fw"
                }, {
                    label: "加载",
                    value: "fa fa-spinner"
                }];

            }

            EventService.register('id_selector', EventTypes.CHANGE, function(event, data) {
                console.log('accept inner_change');
            });

            //设置渲染器函数
            scope.selfImageByRender = function() {
                alert('选择的图片：' + scope.img_value);
            }

            scope.imgChanged = function() {
                if (scope.img_selected == "fa fa-pencil fa-fw")
                    scope.img_value = scope.img_base + "edit.png";
                else if (scope.img_selected == "fa fa-trash-o fa-fw")
                    scope.img_value = scope.img_base + "delete.png";
                else
                    scope.img_value = scope.img_base + "loding.gif";
                // alert('选择的图片：' + scope.img_value);
            }
        }
    ]);

    app.directive('render', function() {
        return {
            restrict: 'E',
            template: '<item_render>\
                <span>{{appScope.img_selected}}</span>\
                <i ng-attr-class="{{appScope.img_selected}}" ng-click="appScope.selfImageByRender()"></i>\
                </item_render>\
            ',
            replace:true
        };
    });
});
