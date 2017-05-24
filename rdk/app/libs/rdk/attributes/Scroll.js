define(['perfect-scrollbar','rd.core','css!rd.styles.Scroll'], function(perfectScroll) {
    angular.module('rd.attributes.Scroll', ['rd.core'])
        .provider('ScrollConfig', function(){
            var $$options = {
                wheelSpeed:0.7, //鼠标滚轮移动滚动条的速度
                minScrollbarLength:80, //滚动条最小长度
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
        .directive('rdkScroll', ['ScrollConfig','Utils',function (ScrollConfig,Utils) {
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
                var throttle = Utils.throttle;
                iElement.css({position: 'relative',overflow: 'hidden'}); //滚动条容器必要的样式
                perfectScroll.initialize(container,perfectOptions);  //初始化滚动条
                //获取滚动槽的样式宽度
                var railOffsetWidth=Utils.getStyle(container.querySelector(".ps-scrollbar-y-rail"),"width");
                //滚动条需要更新状态调用 perfectScroll.lazyResize
                perfectScroll.lazyResize=function(){
                    if (hlazyResize) clearTimeout(hlazyResize);
                    hlazyResize = setTimeout(function(){
                        perfectScroll.update(container);
                        var scrollBarY = container.querySelector(".ps-scrollbar-y");
                        var scrollBarYRail = container.querySelector(".ps-scrollbar-y-rail");
                        if(scrollBarY == null) return;
                        scrollBarY.offsetHeight==0 ? scrollBarYRail.style.width=0 : scrollBarYRail.style.width=railOffsetWidth;
                    },0);
                };

                throttle(perfectScroll.lazyResize)();

                if(!!MutationObserver)
                {
                    //观察配置对象,观察所有子节点(包括子节点和子节点的子节点)
                    var observerOption={
                        'childList': true,
                        'attributes':true,
                        'characterData':true,
                        'subtree': true,
                        'attributeOldValue':true
                    };
                    //观察子节点变动,更新滚动条,
                    perfectScroll.observerList=[];
                    for(var i= 0 , len=container.children.length ; i<len ; i++){
                        //过滤滚动条节点的观察
                        if(!(container.children[i].classList.contains("ps-scrollbar-x-rail") || container.children[i].classList.contains("ps-scrollbar-y-rail")))
                        {
                            perfectScroll.observer=new MutationObserver(throttle(perfectScroll.lazyResize));
                            perfectScroll.observer.observe(container.children[i], observerOption);
                            perfectScroll.observerList.push(perfectScroll.observer);
                        }
                    }
                    //观察自己
                    perfectScroll.observer=new MutationObserver(throttle(perfectScroll.lazyResize));
                    perfectScroll.observer.observe(container, {
                        'childList': true,
                        'attributes':true,
                        'characterData':true,
                        'subtree': false
                    });
                    var parentNode = _findParentScrollNode(container);
                    if(!!parentNode){
                        perfectScroll.parentNodeObserver  =  new MutationObserver(throttle(perfectScroll.lazyResize));
                        perfectScroll.parentNodeObserver.observe(parentNode, {
                            'childList': true,
                            'attributes':true,
                            'characterData':true,
                            'subtree': false
                        });
                        perfectScroll.observerList.push(perfectScroll.parentNodeObserver);
                    }
                    //dom注销，取消观察对象
                    perfectScroll.observerRemover = new MutationObserver(
                        function(mutations) {
                            mutations.forEach(function(mo) {
                                if (mo.removedNodes.length > 0) {
                                    for (var dom in mo.removedNodes) {
                                        if (mo.removedNodes[dom] == container)
                                        {
                                            perfectScroll.observerList.forEach(function(observer){
                                                observer.disconnect();
                                            });
                                            perfectScroll.observer.disconnect();
                                            perfectScroll.observerList=[];
                                        }
                                    }
                                }
                            });
                        });
                    perfectScroll.observerRemover.observe(container.parentNode, observerOption);
                }
                scope.$on('$destroy', function () { // 注册'$destroy'事件来删除任何易于内存泄漏的代码。
                    if (angular.isDefined(container)) {
                        perfectScroll.destroy(container);
                    }
                });

                function _findParentScrollNode(node){
                    while (node && !node.classList.contains("rdk-scroll") && node.nodeName!="BODY"){
                        node=node.parentNode;
                    }
                    if(node.nodeName == "BODY"){
                        return null
                    }
                    return node;
                }

            }
        }]);

});
