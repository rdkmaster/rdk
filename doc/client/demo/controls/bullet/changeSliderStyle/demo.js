(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Bullet'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope ) {
        scope.inputScales = [ 20, 40, 68, 89 ];

        scope.sliderStyles = [
                    {color:'red',label:'警告',position:'down'},
                    {color:'green',label:'轻微',position:'up'},
                    {color:'blue',label:'严重',position:'up'},
                    {color:'gray',label:'致命',position:'up'},
        ];

        scope.changeSliderStyle = function(){
            $scope.sliderStyles = [
                   {color:'blue',label:'严重',position:'up'},
                    {color:'gray',label:'致命',position:'up'},
                    {color:'red',label:'警告',position:'down'},
                    {color:'green',label:'轻微',position:'up'},              
        ];
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