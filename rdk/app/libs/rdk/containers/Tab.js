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
    }]).directive('rdkTab', ['EventService', 'EventTypes', 'Utils', '$timeout','$compile', '$controller',
        function(EventService, EventTypes, Utils, $timeout, $compile, $controller) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    id: '@?',
                    selectedTab: '=?',
                    heightStyle: '@',
                    showItems: '=',
                    close: '&?',
                    change: '&?',
                    add: '&?',
                    moveStep:'@?'
                },
                replace: true,
                controller: ['$scope', function(scope){
                    Utils.publish(scope, this);

                    this.addTab = function(source, tabController, initData){
                        scope.addTab(source, tabController, initData);
                    }

                    this.destroyTab = function(index){
                        scope.destroyTab(index);
                    }

                    this.closeTab = function(index){
                        scope.closeTab(index);
                    }

                    this.getTabs = function(){
                        return scope.tabs;
                    }
                }],
                template: function(tElement, tAttrs) {
                    return '<div class="rdk-tab-module">\
                                <div class="tabs">\
                                    <div style="display: flex">\
                                        <div class="rdk-tabs-wrap">\
                                            <ul class="title" ng-style="{\'left\':-tabsOffset+\'px\'}">\
                                                <li ng-style="getLiStyle($index)" ng-repeat="tab in tabs track by $index"  on-finish-render>\
                                                    <a href="#{{tab.tabid}}" ng-click="tabClick($event, $index)" ng-mouseover="tabMouseOver($event)" ng-class="{\'selected\':currentSelectedIndex == $index}" rdk-tabtitle-parser>\
                                                      {{tab.title}}\
                                                    </a>\
                                                    <span class="ui-icon ui-icon-close" role="presentation" ng-show="{{tab.closable}}" ng-click="$clickHandler($index, $event)"></span>\
                                                    <span class="bottom_line" ng-show="picShow($index)">\
                                                        <em></em>\
                                                    </span>\
                                                </li>\
                                             </ul>\
                                         </div>\
                                        <div ng-show="removeableTabs" class="move-wrap">\
                                            <i ng-class="{\'disabled\':isMove(-1)}" ng-click="changeTabs(-1)" class="move fa fa-caret-left"></i>\
                                            <i ng-class="{\'disabled\':isMove(+1)}" ng-click="changeTabs(+1)"  class="move fa fa-caret-right"></i>\
                                        </div>\
                                    </div>\
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
                scope.toggleCondition = (attrs.toggleCondition ? attrs.toggleCondition : 'click').toLowerCase();
                scope.selectedTab = Utils.getValue(scope.selectedTab, attrs.selectedTab, 0);
                if(scope.showItems) scope.selectedTab = scope.showItems[scope.showItems.length-1];
                scope.appScope = Utils.findAppScope(scope);
                scope.compileScope = scope.appScope;
                scope.controllerScope = {};

                var dom = element[0].querySelector(".tabs");
                scope.tabs = [];
                scope.currentSelectedIndex = 0;

                scope.tabsOffset=0;
                scope.tabsPading=0;
                scope.removeableTabs=false;
                scope.moveStep= Utils.getValue(scope.moveStep, attrs.moveStep, 3); //移动个数

                var tabsDom = element[0].querySelector(".title");
                var tabItems=null;
                var offsetMax=0; //最大偏移量
                var totalOffsetWidth=0;
                var _hasDirecChanged=false; //到最大偏移量时移动方向是否变化
                var _pageIndex=0;
                var _step=parseInt(scope.moveStep);

                scope.isMove = function(type){
                    if(type==-1){
                        return scope.tabsOffset==0
                    }else{
                        return scope.tabsOffset==offsetMax
                    }
                };

                scope.changeTabs =function(direction){
                    if(scope.tabsOffset==0 && direction<0){
                        return
                    }else if(scope.tabsOffset==offsetMax && direction>0){
                        return
                    }
                    //方向变化
                    if((direction<0 && !_hasDirecChanged) || (direction>0 && _hasDirecChanged)){
                        _pageIndex--;
                    }
                    if(scope.tabsOffset==offsetMax && direction<0)
                    {
                        _hasDirecChanged=true;
                        _pageIndex=0;
                    }
                    if(scope.tabsOffset==0 && direction>0)
                    {
                        _hasDirecChanged=false;
                        _pageIndex=0;
                    }
                    debugger;
                    scope.tabsOffset += _calculOffset(_pageIndex,_step,_hasDirecChanged)*direction;
                    if((direction>0 && !_hasDirecChanged) || (direction<0 && _hasDirecChanged)){
                        _pageIndex++;
                    }
                    //边界
                    if(scope.tabsOffset>=offsetMax){
                        scope.tabsOffset=offsetMax
                    }
                    else if(scope.tabsOffset<=0){
                        scope.tabsOffset=0
                    }
                };

                function _calculOffset(page,step,flag){
                    var offsetRange = page*step;
                    var offsetLeft=0;

                    for(var i= 0 , len=tabItems.length ; i<len ; i++)
                    {
                        //左边计算偏移量
                        if(i>=offsetRange && i<offsetRange+step && !flag)
                        {
                            console.log(888);
                            offsetLeft+=tabItems[i].offsetWidth;
                        }
                        //右边计算偏移量
                        else if(i > (tabItems.length-1) - (offsetRange + step) && i <= tabItems.length-1 - offsetRange && flag){
                            console.log(999);
                            offsetLeft+=tabItems[i].offsetWidth;
                        }
                    }
                    return offsetLeft;
                }

                $timeout(function() {
                    var tabs = $(element[0].querySelector(".content")).children("div");
                    for (var i = 0; i < tabs.length; i++) {
                        var tabid = Utils.createUniqueId('tab_item_');
                        tabs[i].setAttribute('id', tabid);
                        var title = tabs[i].getAttribute('title');
                        var closable = tabs[i].getAttribute('show_close_button');
                        _prepareTabs(tabs[i], title, tabid, closable);
                    };
                }, 0);

                function _setTabsWidth(){  //设置tabs容器宽度,判断显示移动按钮
                    tabItems =element[0].querySelector(".title").querySelectorAll("li");
                    var total=0;
                    for(var i= 0 , len=tabItems.length ; i<len ; i++)
                    {
                        total+=tabItems[i].offsetWidth;
                    }
                    totalOffsetWidth=total;
                    tabsDom.style.width=totalOffsetWidth+10+"px"; //10校验误差
                    offsetMax=totalOffsetWidth+10-tabsDom.parentNode.offsetWidth;
                    if(offsetMax>0){
                        scope.removeableTabs=true;
                    }
                }
                //重新计算最大偏移量
                scope.$watch("removeableTabs", function(newVal, oldVal) {
                    $timeout(function() {
                        offsetMax=totalOffsetWidth+10-tabsDom.parentNode.offsetWidth;
                    },0)
                });
                var off = scope.$on('ngRepeatFinished', function(){
                    _appendTab();
                    _updateDraggable();
                    _addFeature();
                    _setTabsWidth();
                    scope.$watch("selectedTab", function(newVal, oldVal) {
                        _activeTabByIndex(newVal);
                        var tabs = $(dom).tabs();
                        tabs.tabs("refresh"); 
                    }, true);

                });

                scope.getLiStyle = function(index){
                    var destObj = {};
                    destObj.display = (scope.getIndex(index) == -1 ? 'none' : 'inline');
                    return destObj;
                }

                scope.addTab = function(source, tabController, initData){//变量controlscope私有化
                    _compileScopeHandler(tabController, initData);
                    _domFractionHandler(source);
                }

                scope.picShow = function(index) {
                    return scope.currentSelectedIndex == index;
                }

                scope.tabClick = function(event, index) {
                    if(scope.toggleCondition!='click') return;
                    _tabSwitchHandler(event);
                    scope.selectedTab = index;
                }

                scope.tabMouseOver = function(event){
                    if(scope.toggleCondition!='mouseover') return;
                    _tabSwitchHandler(event);
                }

                function _compileScopeHandler(tabController, initData){
                    if(tabController){
                        scope.compileScope = scope.appScope.$new();
                        Utils.shallowCopy(initData, scope.compileScope);
                        $controller(tabController, {$scope: scope.compileScope, tabIndex: 1});//实例化tabController
                        return;
                    }
                    Utils.shallowCopy(initData, scope.compileScope);
                }

                function _domFractionHandler(source){
                    var reg = /<([a-z]+)(\s*\w*?\s*=\s*".+?")*(\s*?>[\s\S]*?(<\/\1>)+|\s*\/>)/i;
                    var domFractionStr;
                    reg.test(source) ? (domFractionStr = source) : (domFractionStr = Utils.getHtmlFraction(source));

                    var contentDom = $(domFractionStr).get(0);
                    var tabid = Utils.createUniqueId('tab_item_');
                    contentDom.setAttribute('id', tabid);

                    var titleDomStr = contentDom.getAttribute('title');
                    var closable = contentDom.getAttribute('show_close_button');
                    _prepareTabs(contentDom, titleDomStr, tabid, closable);
                    _add2ControllerScope(tabid);

                    scope.contentDomStr = $(contentDom)[0].outerHTML;
                    scope.tabid = tabid;
                }

                function _add2ControllerScope(tabid){
                    if(scope.compileScope !== scope.appScope && !!scope.compileScope){
                        scope.controllerScope[tabid] = scope.compileScope;
                    }
                }

                function _tabSwitchHandler(event){
                    event.preventDefault();
                    event.stopPropagation();
                    var tabId = event.currentTarget.hash;
                    scope.currentSelectedIndex = _getTabIndex(tabId);
                    EventService.raiseControlEvent(scope, EventTypes.CHANGE, scope.currentSelectedIndex);
                }

                function _prepareTabs(dom, title, tabid, closable){
                    $(dom).removeAttr('title');
                    var compileTitle = undefined, compileClosable = undefined, renderTitle = undefined;
                    if(title){
                        compileTitle = Utils.compile(scope.compileScope, title);
                    }
                    else{
                        renderTitle = dom.querySelector("title_renderer");
                    }
                    if(closable){
                        compileClosable = Utils.compile(scope.compileScope, closable);
                    }
                    compileClosable = Utils.isTrue(compileClosable, false);

                    scope.tabs.push({title: compileTitle, tabid: tabid, title_renderer: renderTitle, closable: compileClosable});
                }

                function _appendTab(){
                    if(scope.contentDomStr == undefined) return;
                    var tabs = $(dom).tabs();
                    $(tabs[0].querySelector(".content")).append(scope.contentDomStr);
                    tabs.tabs("refresh");
                    $compile($('#'+scope.tabid))(scope.compileScope);
                    scope.contentDomStr = undefined;//一次新增后重置
                    EventService.raiseControlEvent(scope, EventTypes.ADD);
                    $timeout(function(){
                        EventService.broadcast('EventService', 'module_ready');
                    }, 0);                   
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
                        scope.selectedTab = data;
                    });
                }

                scope.getIndex = function(idx) {
                    if(!scope.showItems) return 0; //没定义，默认全部显示
                    return scope.showItems.indexOf(idx); //定义了数组，部分显示
                }

                scope.$clickHandler = function(index, event){
                    var data = {};
                    data.tabIndex = index;
                    data.tabData = scope.tabs[index];
                    data.scope = scope.controllerScope[scope.tabs[index].tabid];
                    EventService.raiseControlEvent(scope, EventTypes.CLOSE, data);
                }

                scope.destroyTab = function(index){
                    _destroy4ControllerScope(index);
                    var panelId = scope.tabs[index].tabid;
                    scope.tabs.splice(index, 1);
                    $("#" + panelId).remove();
                    _activeTab(index);

                }

                scope.closeTab = function(index){
                    var closeLi = element.find("ul").eq(0).find("li").eq(index);
                    $(closeLi).css({'display': 'none'});
                    var panelId = scope.tabs[index].tabid;
                    $("#" + panelId).css({'display': 'none'});
                    _activeTab(index);
                }

                function _destroy4ControllerScope(index){
                    var tabid = scope.tabs[index].tabid;
                    if (scope.controllerScope[tabid] !== scope.appScope && !!scope.controllerScope[tabid]) {
                        scope.controllerScope[tabid].$destroy();
                        delete scope.controllerScope[tabid];
                    }
                }

                function _activeTabByIndex(index){
                    scope.currentSelectedIndex = index;
                    $(dom).tabs({
                        active: scope.currentSelectedIndex
                    });
                }

                function _activeTab(index){
                    if(scope.currentSelectedIndex >= index){
                        var activeIndex;
                        (scope.currentSelectedIndex>=1) ? (activeIndex=index-1) : (activeIndex=index+1);
                        scope.selectedTab = activeIndex;
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
