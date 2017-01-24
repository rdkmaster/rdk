(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Table', 'rd.services.Alert'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main($scope) {
        $scope.setting = {
            "columnDefs" :[
                {
                    title : function(data, target) { //自定义表头设置
                        return '<span>自定义带select的列</span>\
                                <select ng-change="titleExtraSelecteHandler(titleExtraSelected)"\
                                        ng-model="titleExtraSelected"\
                                        ng-options="optionItem.label as optionItem.label for optionItem in titleOptions">\
                                    <option value="">-- choose an item --</option>\
                                </select>'
                    },
                    targets : 1
                },
                {
                    title : function(data, target) {
                        $scope.data=data.data;
                        return '<span>'+data.header[target]+'</span>\
                                <select ng-change="titleExtraSelecteHandler(titleExtraSelected)"\
                                        ng-model="titleExtraSelected"\
                                        ng-options="item[2] as item[2]  for item in data">\
                                    <option value="">-- choose an item --</option>\
                                </select>'
                    },
                    targets : 2
                }
            ],
            //多级表头设置
            additionalHeader: '<tr class="test1"><th colspan=4>合并列1</th><th colspan=3>合并列2</th></tr>' +
                                  '<tr class="test2"><th colspan=1>复选框</th><th colspan=2>身份信息</th><th colspan=4>基本信息</th></tr>'
        };
        //titleOptions的数据结构根据自身业务逻辑来定
        $scope.titleOptions = [
            {label: 'item1', id: 1}, {label: 'item2', id: 2},
            {label: 'item3', id: 3}, {label: 'item4', id: 4}
        ];
        //变化后的处理逻辑
        $scope.titleExtraSelecteHandler = function(selected) {
            alert("你选择了"+selected);
        }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();