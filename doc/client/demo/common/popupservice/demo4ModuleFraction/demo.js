(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.controls.Module', 'rd.services.PopupService'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'PopupService', main];
    function main(scope, PopupService) {
        var moduleID;

        scope.load = function(){
            var sampleDiv = 
            '<div controller="SampleModuleController" caption="弹出框标题" icon="<i class=\'fa fa-windows\'></i>" style="border:1px solid red; margin:6px; padding:6px">\
                <p>这是模块的初始化数据：{{myData}}</p>\
                <p>这是模块控制预定义的数据：{{someData}}</p>\
                <button ng-click="destroyHandler()">确认</button>\
            </div>';

            var initData = {myData: 'load module manually...'};
            moduleID = PopupService.popup(sampleDiv, initData);
        }
    }
    
    rdk.$ngModule.controller('SampleModuleController', ['$scope', 'Utils', 'PopupService',function(scope, Utils, PopupService) {
        console.log('SampleModule controller is running..........');
        scope.someData = 'some data defined in the SampleModule controller...';
        scope.myData = 'sample inter load module manually...';

        scope.destroyHandler = function(){
            PopupService.removePopup(scope.$moduleId);
        }
    }]);

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