define(['angular','jquery','jquery-nicescroll', 'rd.services.DataSourceService', 'rd.services.EventService'], function() {
    angular.module('rd.controls.Scroll', ['rd.services.DataSourceService', 'rd.services.EventService'])
    .provider('$scrollService', function(){
        var $$options = {
            cursorcolor: "#008fd4",//#CC0071 光标颜色
            cursoropacitymax: 0.2, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
            cursorwidth: "4px", //像素光标的宽度
            cursorborder: "0", // 	游标边框css定义
            cursorborderradius: "2px",//以像素为光标边界半径
            autohidemode: false //是否隐藏滚动条
        };
        //调用provider为整个项目配置滚动条风格
        this.setOptions = function(options) {
            angular.extend($$options, options);
        };
        this.$get = function() {
            return {
                getOptions:function(){
                    var defaultOptions={};
                    angular.copy($$options,defaultOptions);
                    return defaultOptions;
                }
            };
        }
    })
    .directive('rdkScroll', ['DataSourceService','EventService', 'Utils','EventTypes','$scrollService', function (DataSourceService,EventService,Utils,EventTypes,$scrollService) {
        return {
            restrict: 'A',
            link: _link
        };
        function _link(scope, iElement, iAttrs)
        {
            var scrollOptions = scope.$eval(iAttrs.scrollOption);//scroll特性配置对象
            var defaultOptions = $scrollService.getOptions();//获取统一风格的配置对象
            var niceOptions = angular.extend(defaultOptions, scrollOptions);
            var niceScroll = $(iElement).niceScroll(niceOptions);
            scope.$on('$destroy', function () {
                if (angular.isDefined(niceScroll)) {
                    niceScroll.remove()
                }
            })
        }
    }]);
});


