(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Tree'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main($scope) {
        $(document).ready(function(){
            //你想让那个区域点击失去焦点，就在这个区域上注册click事件
            $('#testZtree').on("click", function() {
                var nodes = rdk.testZtree.tree.getSelectedNodes();
                if(nodes.length>0){
                    $scope.unselectFun(event, nodes)
                    rdk.testZtree.tree.cancelSelectedNode();
                }
            });
        });
        //这个是节点的click事件，节点的事件要阻止冒泡！
        $scope.clickFun=function(event, data){
            event.stopPropagation();
        }
        //这是用来在失去焦点后的，清空之前的选中信息。
        $scope.unselectFun=function(event, data){
            console.log(data[0].label);
        }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();