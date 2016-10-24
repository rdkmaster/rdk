define(['rd.services.Utils', 'rd.services.EventService'], function() {
    angular.module('rd.containers.Accordions', ['rd.core'])
        .controller('accordionsCtrls', ['$scope', 'Utils', 'EventService', 'EventTypes', function(scope, Utils, EventService, EventTypes) {
            this.activeOnlyOneExpend = function(elemCount) {
                for (var i = 0; i < elemCount; i++) {
                    EventService.register('kqi_accordion_' + i, EventTypes.CHANGE, function(event, data) {
                        var target = event.dispatcher;
                        if (data) {
                            for (var j = 0; j < elemCount; j++) {
                                var name = 'kqi_accordion_' + j;
                                if (name != target) {
                                    EventService.broadcast(name, EventTypes.CLOSE, {});
                                }
                            }
                        }
                    });
                }
            }
        }])
        .directive('rdkAccordions', ['EventService', function(EventService) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,
                scope: {

                },
                template: '<div>' + '<div ng-transclude style="width: 100%;"></div>' + '</div>',
                controller: 'accordionsCtrls',
                compile: function(tElement, tAttrs, transclude) {
                    return {
                        pre: function(scope, iElement, iAttrs, controller) {},
                        post: function(scope, iElement, iAttrs, controller) {
                            if (angular.isDefined(iAttrs.onlyOneExpand)) {
                                scope.$on('ngRepeatFinished', function(event, data) {
                                    controller.activeOnlyOneExpend(data);
                                });

                            }
                        }
                    }
                }
            };
        }])
        .directive('repeatDone', ['$timeout', function(timeout) {
            return {
                link: function(scope, elem, attrs) {
                    if (scope.$last) {
                        var elemCount = elem.parent().children().length;
                        timeout(function() {
                            scope.$emit('ngRepeatFinished', elemCount);
                        });
                    }
                }
            }
        }]);
});
