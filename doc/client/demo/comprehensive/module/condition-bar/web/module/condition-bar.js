//模板控制器需要把模板用到的依赖添加到依赖列表中，这样模块代码更加内聚，方便使用
define(['rd.controls.Time', 'rd.controls.BasicSelector', 'rd.controls.ComboSelect',
    'css!/doc/client/demo/comprehensive/module/condition-bar/web/module/css/style'],
function() {
    rdk.$injectDependency('rd.controls.Time', 'rd.controls.BasicSelector', 'rd.controls.ComboSelect');

    rdk.$app.controller('ConditionBarController', ['$scope', function(scope) {
        scope.timeSetting = {
            value: 'now-1d'
        }
        
        scope.provinces = [
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

        scope.selectedProvince = {label: "江苏省"};

        this.getTime = function() {
            return scope.timeSetting.value;
        }

        this.getSelectedProvince = function() {
            return scope.selectedProvince[0];
        }
    }]);
});
