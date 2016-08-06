define('main', ['rd.controls.BasicSelector'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.BasicSelector']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Utils','BasicSelector',
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


            EventService.register('id_selector', EventTypes.CREATE, function(event, data) {
                if(data){
                    alert("新增成功！");
                }
            });

        }

    ]);
});
