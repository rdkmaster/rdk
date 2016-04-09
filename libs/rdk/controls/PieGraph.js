define(['angular','rd.controls.Graph'], function() {
    var vmaxGraphApp = angular.module('rd.controls.PieGraph', ['rd.controls.Graph']);

    vmaxGraphApp.directive('rdkPieGraph', ['GraphService',
        function(GraphService) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div><rdk_graph graph_template="graphTemplate" data="1" style="width:800px;height:600px"></rdk_graph></div>',
                scope: {
                    graphTemplate: '=',
                    data: '=',
                    nameField: '@',
                    valueField: '@',
                    style: '='
                },
                compile: _compile
            };

            function _compile(tElement, tAttributes) {
                // _fixProperty(tAttributes, 'graphTemplate');
                // _fixProperty(tAttributes, 'data');

                return _postLink;
            }

            function _postLink(scope, element, attrs) {
                // //将 style 作为属性传入 
                // if (!!attrs.style) {
                //     graphDom.setAttribute("style", attrs.style);
                // }
                // _initChart(scope, graphDom);

                // NodeService.addScope(graphDomId, scope);

                scope.$watch('data', function(newVal, oldVal) {
                    if (newVal == undefined || newVal == oldVal) {
                        return;
                    }
                    _updateGraphData(scope);
                }, true);

                scope.$watch('graphTemplate', function(newVal, oldVal) {
                    if (newVal == undefined || angular.equals(newVal, oldVal)) {
                        return;
                    }
                    _updateGraphData(scope);
                }, true);
            }

            function _updateGraphData(scope) {
                if (!scope.graphTemplate || !scope.data) {
                    return;
                }
                if (scope.nameField != 'name') {
                    _fixData(scope.data, 'name', scope.nameField);
                }
                if (scope.valueField != 'value') {
                    _fixData(scope.data, 'value', scope.valueField);
                }
                var legend = GraphService.column(scope.data, 'name');
                scope.graphTemplate.legend.data = legend;
                scope.graphTemplate.series[0].data = scope.data;
            }

            function _fixData(array, newField, oldField) {
                //污染传递进来的数据可以提升效率
                angular.forEach(array, function(value, key) {
                    value[newField] = value[oldField];
                });
            }
        }
    ]);
});
