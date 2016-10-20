define(['angular', 'jquery', 'jquery-ui', 'rd.core', 'css!rd.styles.Tab', 'css!rd.styles.FontAwesome',
    'css!rd.styles.Bootstrap'
], function() {
    var tabApp = angular.module("rd.containers.Tab", ['rd.core']);
    tabApp.directive('rdkTabtitleParser', ['$compile', 'Utils', function($compile, Utils) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var html;
                if (scope.tab.title) {
                    html = scope.tab.title;
                    element.html(html);
                } else {
                    html = scope.tab.title_renderer;
                    element.append(html);
                }
            }
        }
    }]).directive('onFinishRender', function($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function() {
                            scope.$emit('ngRepeatFinished');
                        }, 0);
                    }
                }
            }
        }).directive('rdkTab', ['EventService', 'EventTypes', 'Utils', '$timeout','$compile',
        function(EventService, EventTypes, Utils, $timeout, $compile) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    id: '@?',
                    selectedTab: '=?',
                    heightStyle: '@',
                    showItems: '=',
                    close: '&?'
                },
                replace: true,
                template: function(tElement, tAttrs) {
                    return '<div class="rdk-tab-module">\
                                <div class="tabs">\
                                    <ul class="title">\
                                        <li style="display:{{getIndex($index)==-1?\'none\':\'inline\'}}" ng-repeat="tab in tabs"  on-finish-render>\
                                            <a href="#{{tab.tabid}}" ng-click="tabClick($event)" ng-mouseover="tabMouseOver($event)" ng-class="{\'selected\':currentSelectedIndex == $index}" rdk-tabtitle-parser>\
                                              {{tab.title}}\
                                            </a>\
                                            <span class="bottom_line" style="display: block;" ng-show="picShow($index)">\
                                                <em></em>\
                                            </span>\
                                            <span style="float:left" class="ui-icon ui-icon-close" role="presentation" ng-show="{{tab.closable}}" ng-click="clickHandler($index, $event)"></span>\
                                        </li>\
                                     </ul>\
                                    <div ng-transclude class="content"> </div>\
                                </div>\
                        </div>';
                },
                compile: function(tEle, tAttrs) {
                    return {
                        post: _link
                    }
                }
            }

            function _link(scope, element, attrs) {
                scope.draggable = Utils.isTrue(attrs.draggable, true);
                scope.appScope = Utils.findAppScope(scope);
                scope.toggleCondition = (attrs.toggleCondition ? attrs.toggleCondition : 'click').toLowerCase();

                Utils.publish(scope);

                var dom = element[0].querySelector(".tabs");
                scope.tabs = [];
                scope.currentSelectedIndex = 0;

                $timeout(function() {
                    var tabs = $(element[0].querySelector(".content")).children("div");
                    for (var i = 0; i < tabs.length; i++) {
                        var tabid = Utils.createUniqueId('tab_item_');
                        tabs[i].setAttribute('id', tabid);
                        var title = tabs[i].getAttribute('title');
                        var closable = Utils.isTrue(tabs[i].getAttribute('show_close_button'), false);
                        _prepareTabs(tabs[i], title, tabid, closable);
                    };

                }, 0);

                var off = scope.$on('ngRepeatFinished', function(){
                    _appendTab();
                });  

                scope.addTab  = function(source, curTitle){
                    var reg = /^\s*<div\s+.*<\/div>\s*$/im;
                    var domFractionStr;
                    reg.test(source) ? (domFractionStr = source) : (domFractionStr = Utils.getHtmlFraction(source));

                    var contentDom = $(domFractionStr).get(0);
                    var tabid = Utils.createUniqueId('tab_item_');
                    contentDom.setAttribute('id', tabid);

                    var titleDomStr = contentDom.getAttribute('title');
                    if(curTitle != undefined){
                        titleDomStr = curTitle;
                    }

                    var closable = Utils.isTrue(contentDom.getAttribute('show_close_button'), false);
                    _prepareTabs(contentDom, titleDomStr, tabid, closable); 

                    scope.contentDomStr = $(contentDom)[0].outerHTML;
                    scope.tabid = tabid;
                }        

                scope.picShow = function(index) {
                    return scope.currentSelectedIndex == index;
                }

                scope.tabClick = function(event) {
                    if(scope.toggleCondition!='click') return;
                    _tabSwitchHandler(event);
                }

                scope.tabMouseOver = function(event){
                    if(scope.toggleCondition!='mouseover') return;
                    _tabSwitchHandler(event);
                }

                function _tabSwitchHandler(event){
                    event.preventDefault();
                    event.stopPropagation();
                    var tabId = event.currentTarget.hash;
                    scope.currentSelectedIndex = _getTabIndex(tabId);
                    if (scope.id) {
                        EventService.broadcast(scope.id, EventTypes.CHANGE, scope.currentSelectedIndex);
                    }
                }

                function _prepareTabs(dom, title, tabid, closable){
                    var compileTitle = undefined, renderTitle = undefined;
                    if(title){
                        compileTitle = Utils.compile(scope.$parent, title);
                    }
                    else{
                        renderTitle = dom.querySelector("title_renderer");
                    }
                    scope.tabs.push({title: compileTitle, tabid: tabid, title_renderer: renderTitle, closable: closable});
                }

                function _appendTab(){
                    if(scope.contentDomStr == undefined) return;
                    var tabs = $(dom).tabs();
                    $(tabs[0].querySelector(".content")).append(scope.contentDomStr);
                    tabs.tabs("refresh");
                    $compile($("#"+scope.tabid))(scope);
                    scope.contentDomStr = undefined;//一次新增后重置
                    if(scope.id){
                        EventService.broadcast(scope.id, EventTypes.ADD);
                    }
                }

                function _getTabIndex(tabId) {
                    var tabIndex = -1,
                        tab;
                    for (var i = 0; i < scope.tabs.length; i++) {
                        tab = scope.tabs[i];
                        if (tabId == "#" + tab.tabid) {
                            tabIndex = i;
                            break;
                        }
                    };
                    return tabIndex;
                }

                if(scope.id){
                    EventService.register(scope.id, EventTypes.TAB_SELECT, function(event, data){
                        scope.currentSelectedIndex = data - 1;
                        $(dom).tabs({
                            active: scope.currentSelectedIndex
                        });
                    });
                }

                _callLater(function() {
                    _updateDraggable();
                    _addFeature();
                });

                scope.getIndex = function(idx) {
                    if (!scope.showItems) return 0; //没定义，默认全部显示
                    return scope.showItems.indexOf(idx); //定义了数组，部分显示
                }

                scope.clickHandler = function(index, event){
                    var data = {};
                    data.tabIndex = index;
                    data.tabData = scope.tabs[index];
                    if(scope.id){
                        EventService.broadcast(scope.id, EventTypes.CLOSE, data);
                    }
                    if(scope.close(scope)){
                        scope.close(scope)(event, data);
                    }
                }

                scope.destroyTab = function(index){
                    var panelId = scope.tabs[index].tabid;
                    scope.tabs.splice(index, 1);
                    $("#" + panelId).remove();
                    var tabs = $(dom).tabs();
                    tabs.tabs("refresh");
                    _activeTab(index);
                }

                scope.closeTab = function(index){
                    var closeLi = $("ul").find("li").eq(index);
                    $(closeLi).css({'display': 'none'});
                    var panelId = scope.tabs[index].tabid;
                    $("#" + panelId).css({'display': 'none'});
                    _activeTab(index);
                }

                function _activeTab(index){
                    if(scope.currentSelectedIndex == index){
                        var activeIndex;
                        (scope.currentSelectedIndex>=1) ? (activeIndex=index-1) : (activeIndex=index+1);
                        $(dom).tabs({
                            active: activeIndex
                        }); 
                    }
                }

                function _updateDraggable() {
                    if (!scope.draggable) {
                        return;
                    }
                    var tabs = $(dom).tabs();

                    tabs.find(".ui-tabs-nav").sortable({
                        axis: "x",
                        stop: function($event) {
                            tabs.tabs("refresh");
                        }
                    })
                };

                function _addFeature() {
                    $(dom).tabs({
                        event: attrs.toggleCondition ? attrs.toggleCondition : 'click',//内容连带
                        collapsible: attrs.collapsible && attrs.collapsible == 'true' ? true : false,
                        heightStyle: attrs.heightStyle ? scope.heightStyle : "content"
                    });
                }

                function _callLater(fn, delay) {
                    setTimeout(fn, delay ? delay : 0);
                }
            }
        }
    ]);
});
