define(['echarts', 'angular', 'rd.core', 'css!rd.styles.Graph'], function(echarts) {
    var vmaxGraphApp = angular.module('rd.controls.Graph', ['rd.core']);
    vmaxGraphApp.provider('RdkGraph', [function() {
        var themeDefine = "../rdk/controls/assets/chart_theme"; //增加默认值
        this.setTheme = function(theme) {
            themeDefine = theme;
        }

        this.$get = function() {
            var service = {
                getTheme: function() {
                    return themeDefine;
                }
            };
            return service;
        }
    }]);
    vmaxGraphApp.directive('rdkGraph', ['EventService', 'EventTypes', 'GraphService', 'Utils', 'RdkGraph', '$timeout',
        function(EventService, EventTypes, GraphService, Utils, RdkGraph, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="rdk-graph-module"> \
                            <div style="width:100%;height:100%" ng-hide="noData"></div> \
                            <div class="no-data" ng-show="noData"></div> \
                        </div>',
                scope: {
                    id: '@',
                    graphTemplate: '@?',
                    graphDefine: '@?',
                    width: '=?',
                    height: '=?',
                    data: '=?',
                    graphContext: '=?',
                    eventHandler: '&?'
                },
                compile: _compile
            };

            function _compile(tElement, tAttributes) {
                if (!tAttributes.hasOwnProperty('graphContext')) {
                    tAttributes.graphContext = 'this';
                }
                Utils.bindDataSource(tAttributes, 'data');

                return _postLink;
            }

            function _postLink(scope, element, attrs) {
                // width和height在没有给的情况下，可以从父级节点中获取
                // 但是父级dom的尺寸变化了，怎么得知？
                scope.width = scope.width || element[0].offsetWidth || 400;
                scope.height = scope.height || element[0].offsetHeight || 300;
                scope.noData = false;
                var mapData, mapType;
                _initChart();
                scope.$watch("data", function(newVal, oldVal) {
                    if (newVal == undefined || Object.getOwnPropertyNames(newVal).length ==0 ) {
                        return;
                    }
                    _loadGraphData();
                }, true);
                scope.$watch('width', function(newValue, oldValue) {
                    _resize(scope.width, scope.height, scope.chart);
                }, false);

                scope.$watch('height', function(newValue, oldValue) {
                    _resize(scope.width, scope.height, scope.chart);
                }, false);


                function _resize(width, height, chart) {
                        var w = parseInt(width);
                        w = isNaN(w) ? 0 : w;
                        var h = parseInt(height);
                        h = isNaN(h) ? 0 : h;

                        var rootDom = element[0];
                        var graphDom = element[0].childNodes[1];
                        rootDom.style.width = graphDom.style.width = w + 'px';
                        rootDom.style.height = graphDom.style.height = h + 'px';

                        var labelDom = element[0].childNodes[3];
                        labelDom.style.width = w + 'px';
                        labelDom.style.height = h + 'px';
                        labelDom.style['line-height'] = h + 'px';

                        chart.resize();

                }

                // function _setTheme() {
                //     var themeDefine = RdkGraph.getTheme();
                //     if (themeDefine) {
                //         require([themeDefine], function(themeTarget) {
                //             theme = themeTarget;
                //             scope.chart._theme = theme;
                //         });
                //     }
                // }

                function _initChart() {
                    var dom = element[0].childNodes[1];
                    var myChart = echarts.init(dom);
                    scope.chart = myChart;
                    //_setTheme();
                    _resize(scope.width, scope.height, scope.chart);

                    scope.setMapData = function(data) {
                        mapType = Utils.uuid();
                        mapData = data;
                        echarts.registerMap(mapType, mapData);
                        return mapType;
                    }

                    if (scope.id) {
                        //------------------------------鼠标事件------------------------------
                        myChart.on('click', _defaultEventHandler);
                        myChart.on('dblclick', _defaultEventHandler);
                        myChart.on('mousedown', _defaultEventHandler);
                        myChart.on('mouseup', _defaultEventHandler);
                        myChart.on('mouseover', _defaultEventHandler);
                        myChart.on('mouseout', _defaultEventHandler);
                        myChart.on('globalout', _defaultEventHandler);
                        //----------------------------交互逻辑事件---------------------------
                        myChart.on('legendselectchanged', _defaultEventHandler);
                        myChart.on('legendselected', _defaultEventHandler);
                        myChart.on('legendunselected', _defaultEventHandler);
                        myChart.on('datazoom', _defaultEventHandler);
                        myChart.on('datarangeselected', _defaultEventHandler);
                        myChart.on('timelinechanged', _defaultEventHandler);
                        myChart.on('timelineplaychanged', _defaultEventHandler);
                        myChart.on('restore', _defaultEventHandler);
                        myChart.on('dataviewchanged', _defaultEventHandler);
                        myChart.on('magictypechanged', _defaultEventHandler);
                        myChart.on('pieselectchanged', _defaultEventHandler);
                        myChart.on('pieselected', _defaultEventHandler);
                        myChart.on('pieunselected', _defaultEventHandler);
                        myChart.on('mapselectchanged', _defaultEventHandler);
                        myChart.on('mapselected', _defaultEventHandler);
                        myChart.on('mapunselected', _defaultEventHandler);

                        
                        EventService.register(scope.id, EventTypes.UPDATE_GRAPH, _loadGraphData);
                        EventService.register(scope.id, EventTypes.LOADING, function(event, data) {
                            !!data ? scope.chart.showLoading() : scope.chart.hideLoading();
                        });

                        EventService.register(scope.id, "mapSelect", _selectEventHandler);
                        EventService.register(scope.id, "mapUnSelect", _selectEventHandler);
                        EventService.register(scope.id, "mapToggleSelect", _selectEventHandler);
                        EventService.register(scope.id, "pieSelect", _selectEventHandler);
                        EventService.register(scope.id, "pieUnSelect", _selectEventHandler);
                        EventService.register(scope.id, "pieToggleSelect", _selectEventHandler);

                    }

                    function _selectEventHandler(event, data) {
                        data.type = event.name;
                        myChart.dispatchAction(data);
                    }

                    function _defaultEventHandler(param) {
                        param.graphId = scope.id;
                        handler = scope.eventHandler(param);
                        if (handler) {
                            param = handler(param);
                        }
                        EventService.broadcast(scope.id, param.type, param);
                    };
                };

                function _loadGraphData() {
                    if (scope.graphDefine || scope.graphTemplate) {
                        require([scope.graphDefine || scope.graphTemplate], function(creator) {
                            try {
                                //在creator内部如果改了scope.data会引起digest循环
                                //控制不好容易引起死循环，拷贝数据太费性能，有没有其他办法了？
                                var option = creator(scope.data, scope.graphContext, GraphService, attrs, { "data": mapData, "type": mapType });
                            } catch (e) {
                                console.error('create graph option error: ' + e.message + '\n' + e.stack);
                            }
                            _setThemeAndValidateOption(option);
                        });
                    } else {
                        //没有graph模板，则直接就是一个option
                        _setThemeAndValidateOption(scope.data);
                    }
                };

                function _setThemeAndValidateOption(option){
                    var themeDefine = RdkGraph.getTheme();
                    if (themeDefine && !scope.chart._theme) {
                        require([themeDefine], function(themeTarget) {
                            scope.chart._theme = themeTarget;
                            _validateOption(option);
                        });
                    }else{
                        _validateOption(option);
                    }
                }

                function _validateOption(option) {
                    console.log('graph option: ' + JSON.stringify(option));
                    console.log(option);

                    //修正echart组件无数据之后下一次有数据出现无数据图层bug
                    scope.chart.hideLoading();
                    scope.chart.clear();
                    if (!!option) {
                        scope.noData = false;
                        try {
                            scope.option = option;
                            scope.chart.setOption(option, true,false);

                        } catch (e) {
                            console.error(e);
                            scope.noData = true;
                        }
                    } else {
                        scope.noData = true;
                    }
                    Utils.safeApply(scope);

                    if (angular.isDefined(attrs.id)) {
                        EventService.broadcast(attrs.id, EventTypes.GRAPH_UPDATE, scope);
                    }
                }
            }

        }
    ]);

    vmaxGraphApp.service('GraphService', [function() {
        this.column = function(matrix, idx) {
            var arr = [];
            for (var i = 0; i < matrix.length; i++) {
                arr.push(matrix[i][idx]);
            };
            return arr;
        }

        this.row = function(matrix, idx) {
            return matrix[idx];
        }

        this.distinct = function(array) {
            var distincted = [];
            for (idx in array) {
                if (distincted.indexOf(array[idx]) >= 0) {
                    continue;
                }
                distincted.push(array[idx]);
            }
            return distincted;
        }

        this.classify = function(data, column, byRow) {
            if (byRow) {
                var result = {};
                for (idx in column) {
                    var key = column[idx];
                    var row = result.hasOwnProperty(key) ? result[key] : [];
                    row.push($ctx.column(data, idx));
                    result[key] = row;
                }
            } else {
                var result = {};
                for (idx in column) {
                    var key = column[idx];
                    var row = result.hasOwnProperty(key) ? result[key] : [];
                    row.push(data[idx]);
                    result[key] = row;
                }
            }
            return result;
        }
    }]);
});
