(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'rd.services.EventService','rd.controls.Graph','jquery','rd.core'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', 'EventService',main];
    function main(scope,EventService) {
    function setSize(){
        var containerHeight=16+26*7;//公式16+26*n  其中n为data数据对象中的header的个数(data.header.length)
        //var containerWidth=jQuery('#graph').parent().width()-108;//其中108 为左侧元素的宽度+margin值
        jQuery('#graph').css('height',containerHeight+"px");//根据数据的长度设置柱状图的自适应高度
        //jQuery('#graph').css('width',containerWidth+"px");
    };
    setSize();
    EventService.register('dsGraph', 'result', function(event, data) {
        scope.titles=data.header;
        $('.selector > .selector_symbol').first().addClass('iconfont iconfont-shape');
        scope.check_items=function($event){//勾选事件
            var target=jQuery($event.target);
            if(target.hasClass('iconfont iconfont-shape')){
                target.removeClass('iconfont iconfont-shape');
                target.parent().siblings().children('i').removeClass('iconfont iconfont-shape')
                portData=target.next().html();
                alert(false)
                return portData;

            }else{
                target.addClass('iconfont iconfont-shape')
                target.parent().siblings().children('i').removeClass('iconfont iconfont-shape')
                portData=target.next().html();
                alert(portData);
                return portData;

            }
        }
    });
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