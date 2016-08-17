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
    }]).directive('rdkTab', ['EventService', 'EventTypes', 'Utils',
        function(EventService, EventTypes, Utils) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    id: '@?',
                    selectedTab: '=?',
                    heightStyle: '@',
                    showItems: '='
                },
                replace: true,
                template: function(tElement, tAttrs) {
                    return '<div class="rdk-tab-module">\
                                <div class="tabs">\
                                    <ul class="title">\
                                        <li style="display:{{getIndex($index)==-1?\'none\':\'inline\'}}" ng-repeat="tab in tabs">\
                                            <a href="#{{tab.tabid}}" ng-click="tabClick($event)" ng-class="{\'selected\':currentSelectedIndex == $index}" rdk-tabtitle-parser>\
                                              {{tab.title}}\
                                            </a>\
                                            <span class="bottom_line" style="display: block;" ng-show="picShow($index)">\
                                                <em></em>\
                                            </span>\
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
                var dom = element[0].querySelector(".tabs");

                scope.tabs = [];

                scope.currentSelectedIndex = 0;

                
                var tabs = $(element[0].querySelector(".content")).children("div");
                for (var i = 0; i < tabs.length; i++) {
                    var tabid = Utils.createUniqueId('tab_item_');
                    tabs[i].setAttribute('id', tabid);
                    var title = tabs[i].getAttribute('title')
                    var compileTitle, renderTitle;
                    if (title) {
                        compileTitle = Utils.compile(scope.$parent, title);
                    } else {
                        renderTitle = tabs[i].querySelector("title_renderer");
                    }
                    scope.tabs.push({ title: compileTitle, tabid: tabid, title_renderer: renderTitle });
                };

               

                scope.picShow = function(index) {
                    return scope.currentSelectedIndex == index;
                }

                scope.tabClick = function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    var tabId = event.currentTarget.hash;
                    scope.currentSelectedIndex = _getTabIndex(tabId);
                }

                function _getTabIndex(tabId) {
                    var tabIndex = -1,tab;
                    for (var i = 0; i < scope.tabs.length; i++) {
                        tab = scope.tabs[i];
                        if (tabId == "#"+tab.tabid) {
                            tabIndex = i;
                            break;
                        }
                    };
                    return tabIndex;
                }

                EventService.register(attrs.id, EventTypes.TAB_SELECT,
                    function(event, data) {
                        scope.currentSelectedIndex = data - 1;
                        $(dom).tabs({
                            active: scope.currentSelectedIndex
                        });
                    });

                _callLater(function() {
                    _updateDraggable();
                    _addFeature();
                });

                scope.getIndex = function(idx) {
                    if (!scope.showItems) return 0; //没定义，默认全部显示
                    return scope.showItems.indexOf(idx); //定义了数组，部分显示
                }


                function _updateDraggable() {
                    if (!scope.draggable) {
                        return;
                    }
                    var tabs = $(dom).tabs();
                    tabs.find(".ui-tabs-nav").sortable({
                        axis: "x",
                        stop: function() {
                            tabs.tabs("refresh");
                        }
                    })
                };

                function _addFeature() {
                    $(dom).tabs({
                        event: attrs.toggleCondition ? scope.toggleCondition : "click",
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
