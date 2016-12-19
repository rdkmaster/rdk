define(['rd.controls.Graph'], function() {
    var gisApp = angular.module('rd.controls.Map', ['rd.controls.Graph']);

    gisApp.directive('rdkMap', ['GraphService', 'DataSourceService', 'EventService', 'EventTypes', 'Utils',
        function(GraphService, DataSourceService, EventService, EventTypes, Utils) {
            var scopeDefine={
                id: '@',
                mapDefine: '@?',
                width: '=?',
                height: '=?',
                data: '=?',
                map: '=',
                graphContext: '=?'
            };
            return {
                restrict: 'E',
                replace: true,
                template: '<div>\
                              <rdk_graph id="{{id}}" graph_define="{{mapDefine}}" \
                                  width="width" height="height" data="data" graph_context="graphContext"\
                                  event_handler="gisEventHandler">\
                              </rdk_graph>\
                           </div>',
                scope: scopeDefine,
                compile: _compile
            };

            function _compile(tElement, tAttributes) {
                Utils.checkEventHandlers(tAttributes,scopeDefine);
                tAttributes.graphContext = 'this';
                Utils.bindDataSource(tAttributes, 'data', undefined, false);
                return _postLink;
            }

            function _postLink(scope, element, attrs) {
                var ds = DataSourceService.create(Utils.uuid(), "$DataUrl$");
                var mapData, nameDataMap;

                EventService.register(ds.id, 'result', function(event, data) {
                    mapData = data;
                    var mapType = scope.$$childHead.setMapData(data);
                    EventService.broadcast(scope.id, EventTypes.UPDATE_GRAPH);
                    generateNameDataMap();
                });

                scope.$watch('map', function(newValue, oldValue) {
                    ds.query({ DataUrl: newValue });
                }, false);

                scope.gisEventHandler = function(param) {
                    if (param.type == "mapselected") {
                        var coordinateSystem = scope.$$childHead.chart.getModel().getSeriesByIndex(0).coordinateSystem;
                        var center = coordinateSystem.getRegion(param.name).center;
                        var pos = coordinateSystem.dataToPoint(center);
                        param.event = {};
                        param.event.event = {};
                        param.event.event.zrX = pos[0];
                        param.event.event.zrY = pos[1];
                    }
                    param.rawData = nameDataMap[param.name];
                    param.id = scope.id;
                    return param;
                }

                function generateNameDataMap() {
                    nameDataMap = {};
                    for (var i = 0; i < mapData.features.length; i++) {
                        var feature = mapData.features[i];
                        nameDataMap[feature.properties.name] = feature;
                    };
                }

            }
        }
    ]);
});
