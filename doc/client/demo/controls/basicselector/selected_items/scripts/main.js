define('main', ['rd.controls.BasicSelector'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.BasicSelector']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function(scope) {
            /******************************************************
                 将应用的代码逻辑添加在这个匿名函数内部
            ******************************************************/
            scope.allItems = [
                { label: "江苏省" }, { label: "浙江省" },
                { label: "广东省" }, { label: "广西省" },
                { label: "河北省" }, { label: "河南省" },
                { label: "湖北省" }, { label: "湖南省" },
                { label: "新疆省" }, { label: "四川省" },
            ];

            scope.selectedItems = [
                { label: "广西省" }, { label: "湖南省" },
                { label: "河北省" },
            ];

            //得益于双向绑定机制，我们在这里直接访问
            //scope.selectedItems就可以得到用户选中的对象了
            scope.selectorChanged = function() {
                var res = '';
                angular.forEach(scope.selectedItems, function(item, key) {
                    res += item.label + ' ';
                });
                alert('选中了 "' + res + '"');
            }

            //得益于双向绑定机制，我们在这里修改 scope.selectedItems
            //就可以让rdk_selector选中想要的对象了
            scope.randomSelect = function() {
                scope.selectedItems = [];
                var c = _random(1, scope.allItems.length);
                for (var i = 0; i < c; i++) {
                    var r = _random(0, scope.allItems.length - 1);
                    scope.selectedItems.push(scope.allItems[r]);
                }
            }

            function _random(min, max) {
                var r = parseInt(Math.random() * 1000000);
                return r % (max - min + 1) + min;
            }
        }

    ]);
});
