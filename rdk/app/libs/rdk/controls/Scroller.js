define(['rd.core', 'css!rd.styles.Scroller', 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'],
    function() {
        var scrollerApp = angular.module("rd.controls.Scroller", ['rd.core']);

        scrollerApp.directive('rdkScroller', ['Utils', 'EventService', 'EventTypes', '$timeout', '$compile', function(Utils, EventService, EventTypes, $timeout, $compile) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {
                    data: '=?',
                    pageNum: '@?',
                    scrollPolicy: '@?',
                    timeout: '@?',
                    hasVerticalScrollbar: '@?',
                },
                //要想ng-repeat开始的时候不编译，这样才能使用其中的数组项
                // terminal: true,

                controller: ['$scope', function(scope) {
                }],
                template: '<div class="slider" > \
                            <div class="slide" rdk-repeat="item in data"  > \
                            </div> \
                            <div class="arrows"> \
                                <div class="left_arrow">  \
                                  <i class="fa fa-angle-left" ng-click="prev()"></i>\
                                </div> \
                                <div class="right_arrow"> \
                                  <i class="fa fa-angle-right" ng-click="next()"></i>\
                                </div> \
                            </div> \
                           </div>',

                compile: function(tEle, tAttrs) {
                        return {
                            post: _link
                        }
                    }
                    // templateUrl:'templates/templateurl.html'                                  
            }

            function _link(scope, elem, attrs, ctrl, transclude) {
                //如果pageNum未配置，默认为1
                scope.pageNum = Utils.getValue(scope.pageNum, attrs.pageNum, 1);
                //获取超时时间
                timeout= Utils.getValue(scope.timeout, attrs.timeout, 5000);

                //scrollstatus:1-click,2-timer,3-都支持，默认3
                var scrollstatus;

                //获取轮播策略
                scope.scrollPolicy = Utils.getValue(scope.scrollPolicy, attrs.scrollPolicy, 'manual,timer');

                if (scope.scrollPolicy.indexOf('manual') != -1) {
                    scrollstatus |= 0x1;
                }
                if (scope.scrollPolicy.indexOf('timer') != -1) {
                    scrollstatus |= 0x2;
                }
                   
                if(scrollstatus & 2 && !(scrollstatus & 1)){
                    elem.find(".arrows").remove();
                }

                //判断是否有垂直滚动条，如果有总宽度减去15
                scope.hasVerticalScrollbar=Utils.isTrue(scope.hasVerticalScrollbar, false);

                //获取控件设置的总宽度,如果设置了总宽度，取css配置
                if ($(elem[0]).width()!=0){
                    var totalwidth=$(elem[0]).width();
                }
                else{
                    if(scope.hasVerticalScrollbar){
                        var totalwidth= elem[0].offsetWidth-15;
                    }
                    else{
                        var totalwidth= elem[0].offsetWidth;
                    }
                }
                //每个要显示区域的平均宽度
                var pagewidth = parseInt(totalwidth / scope.pageNum);

                scope.showdata = []; //存储需要显示的数据
                scope.data.forEach(function(item){
                    scope.showdata.push(item);
                })

                var parentEle = elem.find(".slide");
                var elements = [];

                //对data数据进行监控，发生变化时，清空elements，并重新绑定数据
                scope.$watch('showdata', function(newVal, oldVal) {
                    if (elements.length > 0) {
                        for (var i = 0; i < elements.length; i++) {
                            elements[i].el.remove();
                            elements[i].scope.$destroy();
                        }
                        elements = [];
                    }
                    bindData();
                }, true);


                //将元素和scope进行绑定
                var bindData = function() {
                    for (var i = 0; i <  scope.pageNum; i++) {
                        var newScope = scope.$new();

                        newScope.item = scope.showdata[i];

                        transclude(newScope, function(clone) {
                            // var subclone=clone[0].innerHTML; 
                            //创建div
                            var div = $('<div></div>');
                            div.attr('class', 'context');
                            var newclone = div.append(clone);
                            parentEle.append(newclone);
                            //设置context的宽度
                            $(elem.find(".context")).css('width', pagewidth);

                            var element = {};
                            element.el = newclone;
                            element.scope = newScope;
                            element.scope.$on('$destroy', function() {

                                console.log('被移除')
                            });
                            elements.push(element);
                        });
                        // $compile(elements)(scope);                      
                    }
                };

                  //对数据项进行右移，并赋值给showdata数组
                scope.next = function() {
                    var count = scope.data.length; //图片总数量
                    var tmp=scope.showdata[count - 1]
                    for (var i = count - 1; i > 0; i--) {
                        scope.showdata[i] = scope.showdata[i - 1];
                    }
                    scope.showdata[0] = tmp;
                };

                //对数据项进行左移，并赋值给showdata数组
                scope.prev = function() {
                    var count = scope.data.length; //图片总数量
                    var tmp=scope.showdata[0];
                    for (var i = 0; i < count - 1; i++) {
                        scope.showdata[i] = scope.showdata[i + 1];
                    }
                    scope.showdata[count - 1] = tmp;
                };

                var timer;

                var sliderFunc = function() {
                    timer = $timeout(function() {
                        scope.next();
                        // bindData();
                        console.log("timeout,perform again")
                        timer = $timeout(sliderFunc, timeout);
                    }, timeout);
                };
                if(scrollstatus&2){
                  sliderFunc();
                }


                scope.$on('$destroy', function() {
                    $timeout.cancel(timer);
                });
            }

        }])
    });
