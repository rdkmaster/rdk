define(['angular', 'rd.core', 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap', 'css!rd.styles.Separator'], function() {
    var ButtonGroupModule = angular.module('rd.controls.Separator', ['rd.core']);
    ButtonGroupModule.directive('rdkSeparator', ['$compile', 'Utils', function($compile, Utils) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: function(tElement, tAttrs) {
                return '<div class="rdk-separator-module">\
                        </div>';
            },
            compile: function(tEle, tAttrs) {
                return {
                    post: _link
                }
            }
        }

        function _link(scope, element, attrs) {

        }

    }]);
});
