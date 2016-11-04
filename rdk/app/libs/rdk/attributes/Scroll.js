define(['perfect-scrollbar','rd.core','css!rd.styles.Scroll'], function(perfectScroll) {
    angular.module('rd.attributes.Scroll', ['rd.core'])
        .provider('ScrollConfig', function(){
            var $$options = {
                wheelSpeed:0.7, //鼠标滚轮移动滚动条的速度
                minScrollbarLength:null, //滚动条最小长度
                maxScrollbarLength:null, //滚动条最大长度
                theme:"default" //主题
            };
            //调用ScrollConfigProvider为整个项目配置统一的滚动条风格
            this.setOptions = function(options) {
                angular.extend($$options, options);
            };
            this.$get = function() {
                return {
                    getOptions:function(){ //返回配置对象的拷贝
                        var defaultOptions={};
                        angular.copy($$options,defaultOptions);
                        return defaultOptions;
                    }
                };
            }
        })
        .directive('rdkScroll', ['ScrollConfig',function (ScrollConfig) {
            return {
                restrict: 'A',
                link: _link
            };
            function _link(scope, iElement,iAttrs)
            {
                var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                var hlazyResize=null;
                var container = iElement[0];
                var scrollOptions = scope.$eval(iAttrs.scrollOption);//解析scroll特性配置
                var defaultOptions = ScrollConfig.getOptions();//获取默认配置
                var perfectOptions = angular.extend(defaultOptions, scrollOptions);
                iElement.css({position: 'relative',overflow: 'hidden'}); //滚动条容器必要的样式
                perfectScroll.initialize(container,perfectOptions);  //初始化滚动条
                perfectScroll.lazyResize=function(){  //DOM元素内容不确定是否加载完，滚动条进行延时加载处理
                    if (hlazyResize) clearTimeout(hlazyResize);
                    hlazyResize = setTimeout(function(){
                        perfectScroll.update(container);
                    },200);
                };

                perfectScroll.lazyResize();

                if(!!MutationObserver)
                {
                    //观察配置对象,观察所有子节点(包括子节点和子节点的子节点)
                    var observerOption={
                        'childList': true,
                        'subtree': true
                    };
                    //观察DOM树变动,更新滚动条
                    perfectScroll.observer=new MutationObserver(
                        function(mutations){
                            perfectScroll.lazyResize();
                        }
                    ).observe(container, observerOption);
                    //观察滚动条注销，取消观察
                    perfectScroll.observerRemover = new MutationObserver(
                        function(mutations) {
                            mutations.forEach(function(mo) {
                            if (mo.removedNodes.length > 0) {
                                for (var dom in mo.removedNodes) {
                                    if (mo.removedNodes[dom] == container)
                                    {
                                        perfectScroll.observer.disconnect();
                                    }
                                }
                            }
                        });
                    }).observe(container.parentNode, observerOption);
                }
                scope.$on('$destroy', function () { // 注册'$destroy'事件来删除任何易于内存泄漏的代码。
                    if (angular.isDefined(container)) {
                        perfectScroll.destroy(container);
                    }
                });
            }
        }]);
});


