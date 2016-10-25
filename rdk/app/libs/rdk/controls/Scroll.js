define(['angular','jquery','jquery-nicescroll', 'rd.services.DataSourceService', 'rd.services.EventService'], function() {
    angular.module('rd.controls.Scroll', ['rd.services.DataSourceService', 'rd.services.EventService'])
    .provider('$scrollService', function(){
        var $$options = {
            cursorcolor: "#008fd4",//改变滚动条颜色，使用16进制颜色值
            cursoropacitymax: 0.2, //当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
            cursorwidth: "4px", //滚动条的宽度，单位：便素
            cursorborder: "0", // 	CSS方式定义滚动条边框
            cursorborderradius: "2px",//滚动条圆角（像素）
            autohidemode: false //隐藏滚动条的方式
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
            scope.$on('$destroy', function () { // 注册'$destroy'事件来删除任何易于内存泄漏的代码。
                if (angular.isDefined(niceScroll)) {
                    niceScroll.remove()
                }
            })
        }
    }]);
});


