define(['angular', 'rd.core','css!rd.styles.FontAwesome','css!rd.styles.Bootstrap','css!rd.styles.ButtonGroup'], function() {
    var ButtonGroupModule = angular.module('rd.containers.ButtonGroup', ['rd.core']);
     ButtonGroupModule.directive('rdkSeparator', ['$compile', 'Utils', function($compile, Utils) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: function(tElement, tAttrs) {
                return '<div class="rdk-buttongroup-separator">\
                        </div>';
            },
        }


    }]).directive('rdkButtonGroup', ['$compile', 'Utils', function($compile, Utils) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: function(tElement, tAttrs) {
                    return '<div class="rdk-buttongroup-module">\
                                <div class="buttons">\
                                    <div ng-transclude class="content"> </div>\
                                </div>\
                                <div style="clear:both"></div>\
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
