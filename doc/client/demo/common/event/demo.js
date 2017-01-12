(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.core'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService', main];
    function main(scope, EventService) {
        EventService.register('disp1', 'type1', callback);
        EventService.register('disp2', 'type2', callback);
        EventService.register('disp3', 'type3', callback);

        var events = [
            {dispatcher: 'disp1', type: 'type1'}, 
            {dispatcher: 'disp2', type: 'type2'}, 
            {dispatcher: 'disp3', type: 'type3'}];
        EventService.onEvents(events, function() {
            alert('onEvents成功！');
        });

        
        scope.shownEvents = {
            type1: false, type2: false, type3: false
        }

        function callback(event, data) {
            scope.shownEvents[event.name] = true;
        }

        scope.broadcast = function(dispatcher, type) {
            EventService.broadcast(dispatcher, type, null);
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