(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Scroller'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope) {
        scope.images=[{src:'/doc/client/demo/controls/scroller/timer/img/img1.png',title:'Pic 1'},
                      {src:'/doc/client/demo/controls/scroller/timer/img/img2.jpg',title:'Pic 2'},
                      {src:'/doc/client/demo/controls/scroller/timer/img/img3.jpg',title:'Pic 3'},
                      {src:'/doc/client/demo/controls/scroller/timer/img/img4.png',title:'Pic 4'},
                      {src:'/doc/client/demo/controls/scroller/timer/img/img5.png',title:'Pic 5'}];
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