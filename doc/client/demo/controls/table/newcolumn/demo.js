(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Table'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main($scope) {
        $scope.setting = {
            "columnDefs" :[
                {
                    title : "编辑列",
                    render : '<a ng-click="appScope.click(item)">点击</a>'
                },{
                    title : "索引添加",
                    targets : 1,
                    override : false,
                    render : "渲染内容"
                },{
                    title : "索引添加2",
                    targets : 2,
                    override : false,
                    render : "渲染内容2"
                },{
                    targets:"position",
                    render:function(item){
                        if(item.position == "Accountant")
                            return "<p style='color:red'>"+item.position+"</p>";
                        else 
                            return item.position;
                    }
                }
            ]
        }

        $scope.click = function(item){
            alert("新添加的具有点击功能的列！");
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