define(['angular', 'jquery', 'jquery-ui', 'rd.core', 'css!rd.styles.Global',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
    var tabApp = angular.module("rd.containers.Tab", ['rd.core']);
    tabApp.directive('rdkTab', ['EventService', 'EventTypes', 'Utils',
        function(EventService, EventTypes, Utils) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    id: '@?',
                    // draggable: '@?',
                    // tabAppend: '@',
                    selectedTab: '=?',
                    // toggleCondition: '@',
                    // collapsible: '@',
                    // tabDisabled: '@',
                    heightStyle: '@'
                },
                replace: true,
                template: function(tElement, tAttrs) {
                    return '<div class="container">' +
                                '<div>'+
                                    '<ul>' +
                                        '<li ng-repeat="tab in tabs"><a href="#{{tab.tabid}}">{{tab.title}}</a></li>' +
                                        // '<span ng-if="tabAppend" class="glyphicon glyphicon-plus" style="margin: 12px 0px 0px 5px;">' +
                                        // '</span>'+
                                    '</ul>' +
                                    '<div ng-transclude> </div>' +
                                '</div>' +
                        '</div>';
                },
                compile: function(tEle, tAttrs) {
                            // Utils.bindDataSource(tAttrs, 'data');
                            return {
                                post: _link
                            }
                        }
                }

                function _link(scope, element, attrs) {
                    scope.draggable = Utils.isTrue(attrs.draggable, true);
                    var dom = element[0].childNodes[0];

                    scope.tabs = [];
                    var divs = element[0].childNodes[0].childNodes[1].childNodes;
                    for (var i = 0; i < divs.length; i++) {
                        var div = divs[i];
                        if (div.nodeType != 1) {
                            continue;
                        }
                        var tabid = Utils.createUniqueId('tab_item_');
                        div.setAttribute('id', tabid);
                        var title = Utils.compile(scope.$parent, div.getAttribute('title'));
                        scope.tabs.push({ title: title, tabid: tabid });
                    };

                    $(dom).click(function(event) {
                        event.preventDefault();
                        var tabId = event.target.id;
                        if (tabId.indexOf("-id") > 0 && attrs.id) {
                            var tabNum = tabId.slice(-1);
                        }

                        if (angular.isDefined(attrs.id) && tabNum != undefined) {
                            EventService.broadcast(attrs.id, event.type, tabNum);
                        }
                    });

                    EventService.register(attrs.id, EventTypes.TAB_SELECT,
                        function(event, data) {
                            $(dom).tabs({
                                active: data - 1
                            });
                        });

                    _callLater(function() {
                        _updateDraggable();
                        _addFeature();
                    });


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
