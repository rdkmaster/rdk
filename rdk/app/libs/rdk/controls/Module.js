define(['rd.core'], function() {
    var tabApp = angular.module("rd.controls.Module", ['rd.core']);
    tabApp.directive('rdkModule', ['EventService', 'EventTypes', 'Utils', '$compile', '$controller', '$timeout',
        function(EventService, EventTypes, Utils, $compile, $controller, $timeout) {
            return {
                restrict: 'E',
                scope: {
                    id: '@?',
                    url: '@?',
                    controller: '@?',
                    loadOnReady: '@?'
                },
                replace: true,
                template: '<div></div>',
                controller: ['$scope', function(scope) {
                    Utils.publishController(scope.id, this);
                }],
                link: function(scope, element, attrs) {
                    scope.url = Utils.getValue(scope.url, attrs.url, '');
                    scope.controller = Utils.getValue(scope.controller, attrs.controller, '');
                    scope.loadOnReady = Utils.isTrue(attrs.loadOnReady, true);
                    scope.initData = Utils.getValue(scope.initData, attrs.initData, '');
                    try {
                        scope.initData = eval('(' + scope.initData + ')');
                    } catch(e) {
                        //do nothing
                    }
                    scope.loaded = false;
                    scope.load = _load;

                    if (scope.loadOnReady) {
                        _load(scope.url, scope.controller, scope.initData);
                    }

                    function _load(url, controller, initData) {
                        if (scope.loaded) {
                            console.warn('module has been loaded!');
                            return;
                        }

                        if (!url) {
                            console.warn('invalid module url')
                            return;
                        }

                        var html = $(Utils.getHtmlFraction(url+'?'+Utils.createUniqueId()));
                        // var html = $('<div id="fff" style="height:200px" controller="SampleModule"><p>hello {{data}}</p><rdk_time></rdk_time></div>');
                        if (!html[0]) {
                            console.error('invalid module template, url=' + url);
                            return;
                        }
                        var id = Utils.createUniqueId('module_');
                        html.attr('id', id);
                        element.append(html);

                        var moduleScope;
                        var appScope = Utils.findAppScope(scope);
                        var ctrl = controller;
                        ctrl = ctrl ? ctrl : html.attr('controller');
                        if(ctrl) {
                            moduleScope = appScope.$new();
                            //实例化一个控制器
                            $controller(ctrl, {$scope: moduleScope});
                            if (angular.isObject(initData)) {
                                Utils.shallowCopy(initData, moduleScope);
                            } else {
                                moduleScope.initData = initData;
                            }
                        } else {
                            moduleScope = appScope;
                        }                  

                        var compiled = $compile($('#' + id))(moduleScope);
                        scope.loaded = true;
                    }
                }
            }
        }
    ]);
});
