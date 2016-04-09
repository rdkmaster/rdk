define(['echarts3', 'angular', 'rd.core', 'css!rd.styles.Graph'], function(echarts) {
    var vmaxGraphApp = angular.module('rd.controls.Graph', ['rd.core']);

    vmaxGraphApp.directive('rdkGraph', ['EventService', 'EventTypes', 'GraphService', 'Utils',
        function(EventService, EventTypes, GraphService, Utils) {

            return {
                restrict: 'E',
                replace: true,
                template: '<div class="rdk-graph-module"> \
                            <div style="width:100%;height:100%" ng-hide="noData"></div> \
                            <div class="no-data" ng-show="noData">图形暂时没有数据</div> \
                        </div>',
                scope: {
                    id: '@',
                    graphTemplate: '@?',
                    graphDefine: '@?',
                    width: '=?',
                    height: '=?',
                    data: '=?',
                    graphContext: '=?',
                },
                compile: _compile
            };

            function _compile(tElement, tAttributes) {
                if (!tAttributes.hasOwnProperty('tAttributes')) {
                    tAttributes.graphContext = 'this';
                }

                return _postLink;
            }

            function _postLink(scope, element, attrs) {
                // width和height在没有给的情况下，可以从父级节点中获取
                // 但是父级dom的尺寸变化了，怎么得知？
                scope.width = scope.width || element[0].offsetWidth || 400;
                scope.height = scope.height || element[0].offsetHeight || 300;
                scope.noData = false;

                _initChart();

                scope.$watch('data', function(newVal, oldVal) {
                    if (newVal == undefined) {
                        return;
                    }
                    _loadGraphData();
                }, true);

                scope.$watch('width', function(newValue, oldValue) {
                    _resize(scope.width, scope.height, scope.myChart);
                }, false);

                scope.$watch('height', function(newValue, oldValue) {
                    _resize(scope.width, scope.height, scope.myChart);
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

                function _initChart() {
                    var dom = element[0].childNodes[1];
                    var myChart = echarts.init(dom);
                    scope.myChart = myChart;
                    _resize(scope.width, scope.height, scope.myChart);

                    if (scope.id) {
                        //------------------------------鼠标事件------------------------------
                        myChart.on('click'              , _echartEventHandler);
                        myChart.on('dblclick'           , _echartEventHandler);
                        myChart.on('mousedown'          , _echartEventHandler);
                        myChart.on('mouseup'            , _echartEventHandler);
                        myChart.on('mouseover'          , _echartEventHandler);
                        myChart.on('mouseout'           , _echartEventHandler);
                        myChart.on('globalout'          , _echartEventHandler);
                        //----------------------------交互逻辑事件---------------------------
                        myChart.on('legendselectchanged', _echartEventHandler);
                        myChart.on('legendselected'     , _echartEventHandler);
                        myChart.on('legendunselected'   , _echartEventHandler);
                        myChart.on('datazoom'           , _echartEventHandler);
                        myChart.on('datarangeselected'  , _echartEventHandler);
                        myChart.on('timelinechanged'    , _echartEventHandler);
                        myChart.on('timelineplaychanged', _echartEventHandler);
                        myChart.on('restore'            , _echartEventHandler);
                        myChart.on('dataviewchanged'    , _echartEventHandler);
                        myChart.on('magictypechanged'   , _echartEventHandler);
                        myChart.on('pieselectchanged'   , _echartEventHandler);
                        myChart.on('pieselected'        , _echartEventHandler);
                        myChart.on('pieunselected'      , _echartEventHandler);
                        myChart.on('mapselectchanged'   , _echartEventHandler);
                        myChart.on('mapselected'        , _echartEventHandler);
                        myChart.on('mapunselected'      , _echartEventHandler);

                        //
                        EventService.register(scope.id, EventTypes.UPDATE_GRAPH, _loadGraphData);
                        EventService.register(scope.id, EventTypes.LOADING, function(event, data) {
                            !!data ? scope.myChart.showLoading() : scope.myChart.hideLoading();
                        });
                    }

                    function _echartEventHandler(param) {
                        param.graphId = scope.id;
                        EventService.broadcast(scope.id, param.type, param);
                    };
                };

                function _loadGraphData() {
                    if (!scope.data) {
                        return;
                    }
                    if (scope.graphDefine || scope.graphTemplate) {
                        require([scope.graphDefine || scope.graphTemplate], function(creator) {
                            try {
                                //在creator内部如果改了scope.data会引起digest循环
                                //控制不好容易引起死循环，拷贝数据太费性能，有没有其他办法了？
                                var option = creator(scope.data, scope.graphContext, GraphService, attrs);
                            } catch (e) {
                                console.error('create graph option error: ' + e);
                                option = { series: [] };
                            }
                            _validateOption(option);
                        });
                    } else {
                        //没有graph模板，则直接就是一个option
                        _validateOption(scope.data);
                    }

                    function _validateOption(option) {
                        console.log('graph option: ' + JSON.stringify(option));
                        console.log(option);

                        //修正echart组件无数据之后下一次有数据出现无数据图层bug
                        scope.myChart.hideLoading();
                        scope.myChart.clear();
                        scope.noData = false;
                        try {
                            scope.myChart.setOption(option, true);
                        } catch(e) {
                            console.error(e);
                            scope.noData = true;
                        }
                        Utils.safeApply(scope);                        

                        if (angular.isDefined(attrs.id)) {
                            EventService.broadcast(attrs.id, EventTypes.GRAPH_UPDATE, scope);
                        }
                    }
                };
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
