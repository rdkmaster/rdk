define(['angular', 'rd.services.EventService'], function() {
    var gisApp = angular.module('rd.controls.GIS', ['rd.services.EventService']);
    gisApp.controller('GisCtrl', ['$scope', 'EventService', '$attrs',
            function($scope, EventService, $attrs) {
                var gis;
                var option;
                this.initMap = function(gisFrame) {
                    $scope.gisFrame = gisFrame;
                    option = $scope.option;

                    $scope.gisFrame.onload = function() {
                        gis = $scope.gisFrame.contentWindow;
                        gis.initialized = function() {
                            gis.InitMap(option.userName, option.pageName, "127.0.0.1");
                            gis.InitCellGridsStatus(option.defalutCellGridsStatu);
                            $scope.status = option.defalutCellGridsStatu;

                            gis.SwitchCellGridsStatus(function(status) {
                                $scope.status = status;
                                EventService.broadcast($attrs.id, "switch_cell_grids_status", status);
                            });

                            EventService.register($attrs.id, "load_cell", function(event, serverFileName) {
                                _loadData(serverFileName, _loadCells);
                            });

                            EventService.register($attrs.id, "render_cell_by_value", function(event, serverFileName) {
                                _renderCellByValue(serverFileName);
                            });

                            EventService.register($attrs.id, "load_grid", function(event, serverFileName) {
                                _loadData(serverFileName, _loadGrids);
                            });

                            EventService.broadcast($attrs.id, "gis_init_finish");
                        };

                    };
                }


                function _loadData(serverFileName, fun) {
                    var options = {};
                    options.callback = deleteWorkSpaceCallback;
                    gis.DeleteWorkSpaceEx(option.userName, option.pageName, true, options);

                    function deleteWorkSpaceCallback(status) {
                        if (status) {
                            fun.call(this, serverFileName);
                        } else {
                            console.log("delete workspace failed");
                        }
                    }
                }


                function _loadGrids(serverFileName) {
                    var gridOption = option.gridsData;
                    gridOption.gridsDataPathName = serverFileName;
                    gridOption.system = option.systemType;
                    gis.LoadGrids(gridOption);
                    gis.queryGridbyGeom(callbackFun);

                    function callbackFun(GridInfo) {
                        gridInfos = new Array();
                        for (var i = 0; i < GridInfo.length; i++) {
                            var layername = GridInfo[i].girdsLayerName;
                            for (var feature in GridInfo[i].grids) {
                                var earthID = GridInfo[i].grids[feature].Earthid;
                                var xOffset = GridInfo[i].grids[feature].Xoffset;
                                var yOffset = GridInfo[i].grids[feature].Yoffset;
                                gridInfo = {};
                                gridInfo.earthID = earthID;
                                gridInfo.xOffset = xOffset;
                                gridInfo.yOffset = yOffset;
                                gridInfos.push(gridInfo);
                            }
                        }

                        if (gridInfos.length != 0) {
                            EventService.broadcast($attrs.id, "grid_select", {
                                "gridInfos": gridInfos,
                                "status": $scope.status
                            });
                        }
                    }
                }

                function _renderCellByValue(serverFileName) {
                    gis.RenderCellByValue(option.systemType, option.valueCategory, serverFileName);
                }

                function _loadCells(serverFileName) {
                    var status = gis.LoadCells(option.systemType, serverFileName);

                    if (status) {
                        EventService.broadcast($attrs.id, "load_cell_complete",
                            status);

                        gis.QueryByRectangle(getCellInfo);
                        gis.QueryByPoint(getCellInfo);

                        function getCellInfo(cells) {
                            cellIds = new Array();
                            for (var i = 0; i < cells.length; i++) {
                                //判断小区图层
                                if (cells[i].LayerName.indexOf("cell") != -1) {
                                    if (typeof(cells[i].GlobalIDs) != 'undefined') {
                                        for (var j in cells[i].GlobalIDs[0]) {
                                            var arr = cells[i].GlobalIDs[0][j].split("_");
                                            var len = arr.length;
                                            var enodeb_id = arr[len - 2];
                                            var cell_id = arr[len - 1];
                                            store(enodeb_id, cell_id);
                                        }
                                    } else if (typeof(cells[i].VectorCenter) != 'undefined') {
                                        for (var j = 0; j < cells[i].Propertys.length; j++) {
                                            if (cells[i].Propertys[j].cid == -1) {
                                                continue;
                                            }
                                            var enodeb_id = cells[i].Propertys[j].enodebid;
                                            var cell_id = cells[i].Propertys[j].cid;
                                            store(enodeb_id, cell_id);
                                        }
                                    }
                                }
                            };

                            function store(enodeb_id, cell_id) {
                                var obj = {};
                                obj.enodeb_id = enodeb_id;
                                obj.cell_id = cell_id
                                cellIds.push(obj);
                            };

                            if (cellIds.length != 0) {
                                EventService.broadcast($attrs.id, "cell_select", {
                                    "cellIds": cellIds,
                                    "status": $scope.status
                                });
                            }
                        }
                    }
                }
            }
        ])
        .directive('rdkGis', ['$compile', function($compile) {
            return {
                restrict: 'E',
                replace: true,
                template: '<iframe  src="http://10.43.41.47:8080/webgis/dmap.html" id="gisFrame"></iframe>',
                controller: 'GisCtrl',
                scope: {
                    option: "="
                },
                compile: function(tElement, tAttributes) {
                    return function postLink(scope, element, attrs, ctrl, transclude) {
                        var gisFrameID = "gisFrame_" + new Date().getTime()
                        $("#gisFrame").attr("id", gisFrameID);
                        var dom = document.getElementById(gisFrameID);
                        ctrl.initMap(dom);
                    }
                }
            };
        }]);
});
