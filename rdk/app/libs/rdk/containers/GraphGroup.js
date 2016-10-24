define(['angular', 'rd.services.NodeService'], function() {
    var graphGroupModule = angular.module('rd.containers.GraphGroup', ['rd.core']);
    graphGroupModule.directive('rdkGraphGroup', ['NodeService', function(NodeService) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div ng-transclude></div>',
            compile: function(tElement, tAttributes) {
                return function postLink(scope, element, attrs, ctrl, transclude) {
                    if (attrs.connectGraph == 'true') {
                        _connectChart(element[0]);
                    }
                }
            }
        };

        function _connectChart(dom) {
            var chartList = [];
            angular.forEach(dom.childNodes, function(subDom, key) {
                var id;
                try {
                    id = subDom.childNodes[0].id;
                } catch (e) {
                    return;
                }
                if (!id || !id.match(/__unique_id__\d+/)) {
                    return;
                }

                var sp = NodeService.getScope(id);
                if (!sp) {
                    return;
                }
                chartList.push(sp.myChart);
            });

            //多图联动需要将各个chart连接起来
            angular.forEach(chartList, function(chart, key) {
                chart.connect(chartList);
            });
        }
    }]);
});
