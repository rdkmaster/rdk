define(['angular','rd.core', 'ngProgress', 'rd.services.Utils', 'jquery', 'angular-bootstrap-progressbar', 'css!rd.styles.ProgressBar', 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
    var progressApp = angular.module("rd.controls.ProgressBar", ['rd.core', 'ui.bootstrap.progressbar', 'ngProgress']);
    progressApp.directive('rdkProgressbar', ['Utils', '$compile', function(Utils, $compile) {
        var scopeDefine={
            value: "=",
            max: "=?",
            type: "=?",
            animate: "@?",
        };
        return {
            restrict: 'E',
            replace: true,
            scope: scopeDefine,
            transclude: true,
            terminal: true,
            template: '<div class="rdk-progressbar-module">\
                         <uib-progressbar value="value" type="{{type}}" max="max" animate="animate">\
                                <b>{{value}}%</b>\
                         </uib-progressbar>\
                      </div>',
            compile: function(tElement, tAttrs, transclude) {
                Utils.checkEventHandlers(tAttrs,scopeDefine);
                return function(scope, element, attrs, ctrl, transclude) {
                    scope.max = Utils.getValue(scope.max, tAttrs.max, 100);
                    scope.type = Utils.getValue(scope.type, tAttrs.type, "success");
                    scope.animate = angular.isDefined(tAttrs.animate) ? tAttrs.animate : "true";

                    transclude(scope, function(clone, innerScope) {
                        for (var key in clone) {
                            if (clone.hasOwnProperty(key) && clone[key].tagName == "RENDER") {
                                angular.element(element.find("uib-progressbar")[0]).html('').append(clone[key].innerHTML);
                            }
                        };
                        $compile(element)(scope);
                    });

                }
            }
        };
    }]);

    progressApp.factory('ProgressbarFactory', ['ngProgressFactory', function(ngProgressFactory) {
        var service = {
            createInstance: function() {
                return ngProgressFactory.createInstance();
            }
        };
        return service;
    }]);
});
