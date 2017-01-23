(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope',main];
    function main(scope) {
scope.btnStatus = true;//按钮初始状态标志
                scope.changeTabsStatus =function(){
                    scope.btnStatus=!scope.btnStatus;
                    //折叠收缩content的显示，TODO:控制器中不应该进行DOM操作。。
                    if(!scope.btnStatus){
                        $(".tab_wrap").find(".content").addClass("content-hiddan");
                        //setTimeout(function(){
                        //    $(".tab_wrap").find(".rdk-tab-content").hide();
                        //},1000);
                    }else{
                        $(".tab_wrap").find(".content").removeClass("content-hiddan");
                        //setTimeout(function(){
                        //    $(".tab_wrap").find(".rdk-tab-content").show();
                        //},1000);
                    }
                };
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