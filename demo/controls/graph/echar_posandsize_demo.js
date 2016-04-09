var app = angular.module("myApp", ['rd.services.DataSourceService', 'rd.attributes.bind_ds',
    'rd.controls.Graph', 'rd.services.NodeService', 'rd.controls.GraphGroup','rd.controls.Gis'
]);

app.controller('ctrl', ['$scope', 'DataSourceService', 'EventService', '$timeout','EventTypes',
    function(scope, DSService, EventService, $timeout, EventTypes) {
        EventService.init(scope);
        var isAllService = true;
        var dsLowspeedPie = DSService.create('dsLowspeedPie', '/demo/comm/ne_range');
        var dsLowspeedCount = DSService.create('dsLowspeedCount', '/demo/comm/ne_range');
        var dsScatterDiagram = DSService.create('dsScatterDiagram', '/demo/lowspeed/ploblem_ne_list');

        dsLowspeedPie.dataProcessor = function(dataBuffer) {
            var mapServiceNum = {};
            var result = {};
            var getData = dataBuffer.data;

            result.data = [];
            result.header = [];
            result.rowDescriptor = [];
            result.field = [];

            for (var i = 0; i < getData.length; i++) {
                if (mapServiceNum[getData[i].serviceid + ',' + getData[i].servicename] === undefined) {
                    mapServiceNum[getData[i].serviceid + ',' + getData[i].servicename] = parseInt(getData[i].service_num);
                } else {
                    mapServiceNum[getData[i].serviceid + ',' + getData[i].servicename] += parseInt(getData[i].service_num);
                }
            }

            var aryClttimeServiceid = Object.keys(mapServiceNum);

            angular.forEach(aryClttimeServiceid, function(item, key) {
                var serviceidAndServicename = item.split(",");
                var tmpArray = [serviceidAndServicename[1], serviceidAndServicename[0], mapServiceNum[item]];
                result.data.push(tmpArray);
            });

            return result;
        };

        dsLowspeedCount.dataProcessor = function(dataBuffer) {
            var mapServiceNum = {};
            var mapTotalServiceNum = {};
            var result = {};
            var getData = dataBuffer.data;
            var data = [
                [],
                []
            ];
            var header = [];
            var rowDescriptor = ['低速率次数', '低速率比率'];
            var field = [];

            if (isAllService) {
                for (var i = 0; i < dataBuffer.data.length; i++) {
                    if (mapServiceNum[getData[i].clttime] === undefined) {
                        mapServiceNum[getData[i].clttime] = parseInt(getData[i].service_num);
                    } else {
                        mapServiceNum[getData[i].clttime] += parseInt(getData[i].service_num);
                    }

                    if (mapTotalServiceNum[getData[i].clttime] === undefined) {
                        mapTotalServiceNum[getData[i].clttime] = parseInt(getData[i].total_service_num);
                    } else {
                        mapTotalServiceNum[getData[i].clttime] += parseInt(getData[i].total_service_num);
                    }
                };

                var aryClttimeServiceid = Object.keys(mapServiceNum);

                angular.forEach(aryClttimeServiceid, function(item, key) {
                    data[0].push(mapServiceNum[item]);
                    var lowspeedRatio = mapServiceNum[item] / mapTotalServiceNum[item] * 100;
                    data[1].push(lowspeedRatio);

                    header.push(item);
                });
            } else {
                for (var i = 0; i < dataBuffer.data.length; i++) {
                    if (mapServiceNum[getData[i].clttime + ',' + getData[i].serviceid + ',' + getData[i].servicename] === undefined) {
                        mapServiceNum[getData[i].clttime + ',' + getData[i].serviceid + ',' + getData[i].servicename] = parseInt(getData[i].service_num);
                    } else {
                        mapServiceNum[getData[i].clttime + ',' + getData[i].serviceid + ',' + getData[i].servicename] += parseInt(getData[i].service_num);
                    }

                    if (mapTotalServiceNum[getData[i].clttime + ',' + getData[i].serviceid + ',' + getData[i].servicename] === undefined) {
                        mapTotalServiceNum[getData[i].clttime + ',' + getData[i].serviceid + ',' + getData[i].servicename] = parseInt(getData[i].total_service_num);
                    } else {
                        mapTotalServiceNum[getData[i].clttime + ',' + getData[i].serviceid + ',' + getData[i].servicename] += parseInt(getData[i].total_service_num);
                    }
                };

                var aryClttimeServiceid = Object.keys(mapServiceNum);

                angular.forEach(aryClttimeServiceid, function(item, key) {
                    data[0].push(mapServiceNum[item]);
                    var lowspeedRatio = mapServiceNum[item] / mapTotalServiceNum[item] * 100;
                    data[1].push(lowspeedRatio);

                    header.push(item.split(",")[0]);
                });
            }

            result["data"] = data;
            result["header"] = header;
            result["rowDescriptor"] = rowDescriptor;
            result["field"] = field;
            return result;
        };  

        dsScatterDiagram.dataProcessor = function(dataBuffer) {
            var lst = dataBuffer;
            for (var i = 0; i < lst.length; i++) {
                lst[i].service_num = Math.random() * 100 * i;
                lst[i].avg_speed = Math.random() * 100 * i;
            }
            return lst;     
        };         
        
        $timeout(
            function() {
                EventService.broadcast('dsLowspeedCount', "start_query", "");
                EventService.broadcast('dsLowspeedPie', "start_query", "");
                EventService.broadcast('dsScatterDiagram', "start_query", {serviceId: 1});
            },
            500
        );

        EventService.register("lowspeedPie", EventTypes.GRAPH_UPDATE, function(event, data) {
            scope.pieTitileWidth = data.myChart._chartList[0]._itemGroupLocation["width"];
            scope.pieTitileHeight = data.myChart._chartList[0]._itemGroupLocation["height"];
            scope.pieTitileX = data.myChart._chartList[0]._itemGroupLocation["x"];
            scope.pieTitileY = data.myChart._chartList[0]._itemGroupLocation["y"]; 

            scope.pieLegendWidth = data.myChart._chartList[1]._itemGroupLocation["width"];
            scope.pieLegendHeight = data.myChart._chartList[1]._itemGroupLocation["height"];
            scope.pieLegendX = data.myChart._chartList[1]._itemGroupLocation["x"];
            scope.pieLegendY = data.myChart._chartList[1]._itemGroupLocation["y"]; 
        }); 

        EventService.register("lowspeedRectangular", EventTypes.GRAPH_UPDATE, function(event, data) {
            scope.rectangularTitileWidth = data.myChart._chartList[0]._itemGroupLocation["width"];
            scope.rectangularTitileHeight = data.myChart._chartList[0]._itemGroupLocation["height"];
            scope.rectangularTitileX = data.myChart._chartList[0]._itemGroupLocation["x"];
            scope.rectangularTitileY = data.myChart._chartList[0]._itemGroupLocation["y"]; 

            scope.rectangularLegendWidth = data.myChart._chartList[1]._itemGroupLocation["width"];
            scope.rectangularLegendHeight = data.myChart._chartList[1]._itemGroupLocation["height"];
            scope.rectangularLegendX = data.myChart._chartList[1]._itemGroupLocation["x"];
            scope.rectangularLegendY = data.myChart._chartList[1]._itemGroupLocation["y"]; 
        });

        EventService.register("lowspeedScatter", EventTypes.GRAPH_UPDATE, function(event, data) {
            scope.scatterTitileWidth = data.myChart._chartList[0]._itemGroupLocation["width"];
            scope.scatterTitileHeight = data.myChart._chartList[0]._itemGroupLocation["height"];
            scope.scatterTitileX = data.myChart._chartList[0]._itemGroupLocation["x"];
            scope.scatterTitileY = data.myChart._chartList[0]._itemGroupLocation["y"]; 

            scope.scatterLegendWidth = data.myChart._chartList[1]._itemGroupLocation["width"];
            scope.scatterLegendHeight = data.myChart._chartList[1]._itemGroupLocation["height"];
            scope.scatterLegendX = data.myChart._chartList[1]._itemGroupLocation["x"];
            scope.scatterLegendY = data.myChart._chartList[1]._itemGroupLocation["y"]; 

        });                 

    }])
