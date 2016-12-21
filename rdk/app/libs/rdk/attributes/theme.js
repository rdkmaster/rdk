define(['css!rd.styles.Theme'], function() {
    var dsModule = angular.module('rd.attributes.theme', []);
    dsModule.directive('rdkTheme', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element.addClass(attr.rdkTheme);
                if(attr.rdkTheme==undefined) attr.rdktheme="";
           }
        }
    })
});
