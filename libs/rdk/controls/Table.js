define(['angular', 'rd.services.DataSourceService', "css!rd.styles.Table", 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {

    var tableModule = angular.module('rd.controls.Table', ['rd.services.DataSourceService']);

    tableModule.run(["$templateCache", function($templateCache) {
        $templateCache.put("/src/templates/common.html",
            '<div class="rdk-table-module">\
               <div class="wrapper" style="{{scrollStyle}}">\
                    <table class="rdk-table">\
                        <thead ng-if="!customHeader">\
                            <tr>\
                                <th ng-repeat="columnDef in columnDefs" ng-show="columnDef.visible">\
                                    {{columnDef.title}}\
                                </th>\
                            </tr>\
                        </thead>\
                        <tbody>\
                            <tr id="rowTr" ng-click="setSelected(item)"\
                                ng-class="{\'selected-row\':ifSelected(item)}" ng-dblclick="dbClickHandler(item,$index)">\
                                <td ng-repeat="columnDef in columnDefs" rdk-column-parser ng-show="columnDef.visible" class="{{columnDef.class}}" style="width:{{columnDef.width}}">\
                                </td>\
                            </tr>\
                             <tr ng-if="noData">\
                                   <td colspan="{{columnDefs.length}}">{{i18n.noData}}</td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <rdk-paging ng-if="paging && columnDefs.length!=0" data-page-size="pageSize" \
                    class="rdk-table-paging"  data-lang="{{lang}}">\
                </rdk-paging>\
                <div class="clearfix"></div>\
            </div>'
        );

        $templateCache.put("/src/templates/paging.html",
            '<div>\
                <div class="col-xs-9">\
                    <nav ng-hide="pageCount()==0">\
                        <ul class="pagination">\
                            <li ng-class="prevPageDisabled()">\
                                <a href ng-click= "prevPage()">\
                                    «{{i18n.prev}}\
                                </a>\
                            </li>\
                            <li ng-repeat="n in range()" ng-class="{active: n == currentPage}"\
                                    ng-click="setPage(n)">\
                                <a href="javascript:void(0)">\
                                    {{::n + 1 }}\
                                </a>\
                            </li> \
                            <li ng-class="nextPageDisabled()"> \
                                <a href ng-click="nextPage()">\
                                     {{ i18n.next }}»\
                                </a>\
                            </li>\
                        </ul>\
                     </nav>\
                </div>\
                <div class ="col-xs-3">\
                    <span class="label label-default count">{{count}}<span class="records">{{i18n.records}}</span></span>\
                </div>\
            </div> '
        );
    }]);


    tableModule.filter('offset', function() {
            return function(input, start, pageSize) {
                if (!input) return;
                start = parseInt(start, 10);
                pageSize = parseInt(pageSize, 10);
                var offset = start * pageSize;
                return input.slice(offset, offset + pageSize);
            };
        })
        .directive('rdkColumnParser', function($compile, $parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    var html = '';
                    if (scope.columnDef.render) {
                        if (angular.isFunction(scope.columnDef.render)) {
                            html = scope.columnDef.render.call(scope.item);
                        } else {
                            html = scope.columnDef.render;
                        }
                        element.html(html);
                        $compile(element.contents())(scope);
                    } else {
                        html = scope.item[scope.columnDef.data];
                        element.html(html);
                    }
                }
            }
        });

    tableModule.directive('rdkTable', ['DataSourceService', 'EventService', 'EventTypes', 'Utils', function(DataSourceService, EventService, EventTypes, Utils) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/src/templates/common.html',
            transclude: true,
            controller: ['$scope', function(scope) {
                this.setCurrentPage = function(_currentPage) {
                    scope.currentPage = _currentPage;
                    if (scope.pagingType == "server") {
                        _loadDataFromServer();
                    }
                };

                function _loadDataFromServer() {
                    scope.conditions = {};
                    scope.conditions.paging = {};
                    scope.conditions.paging.currentPage = scope.currentPage + 1;
                    scope.conditions.paging.pageSize = scope.pageSize;
                    scope.dataSource.query(scope.conditions);
                }
            }],
            scope: {
                setting: '=?',
                data: '=?',
                pageSize: "@?",
                pagingType: "@?",
                lang: "@?"
            },
            compile: function(tElement, tAttributes) {
                //暂留rowFilter,后期实现search功能
                var rowFilter = "";
                var pagingFilter = "";

                pagingFilter += " | offset: currentPage:pageSize |limitTo: pageSize";

                if (tAttributes.pagingType !== "server") {
                    tElement.find("rdk-paging").attr("count", "$filtered.length");
                    tElement[0].querySelector("#rowTr").setAttribute("ng-repeat", "item in $filtered = (destData" + rowFilter + ")" + pagingFilter);
                } else {
                    tElement.find("rdk-paging").attr("count", "data.paging.totalRecord");
                    tElement[0].querySelector("#rowTr").setAttribute("ng-repeat", "item in $filtered = (destData" + rowFilter + ")");
                }

                return function link(scope, element, attrs, ctrl, transclude) {


                    _init();

                    transclude(scope, function(clone, innerScope) {
                        scope.$owner = innerScope.$parent;
                        for (var key in clone) {
                            if (clone.hasOwnProperty(key) && clone[key].tagName == "THEAD") {
                                _addHeaderPattern(clone[key]);
                            }
                        };
                    });

                    function _addHeaderPattern(node) {
                        scope.customHeader = true;
                        node.removeAttribute('ng-non-bindable');
                        element.find("table").prepend(node);
                    };


                    function _init() {
                        //根据data生成并且和用户自定义def合并
                        scope.columnDefs = [];
                        //每页显示N行
                        scope.pageSize = scope.pageSize || 20;
                        //默认分页
                        scope.paging = angular.isDefined(scope.paging) ? scope.paging : true;
                        //默认采用本地分页
                        scope.pagingType = angular.isDefined(scope.pagingType) ? scope.pagingType : "local";

                        scope.currentPage = 0;

                        scope.customHeader = false;

                        //appScope 为列渲染器提供可能
                        scope.appScope = Utils.findAppScope(scope);

                        //选中行
                        scope.selectedModel = {};

                        //默认国际化
                        if (typeof(attrs.lang) === 'undefined') {
                            scope.lang = 'zh-CN';
                        }

                        if (scope.lang == 'zh-CN') {
                            scope.i18n = {
                                'noData': '暂无数据'
                            };
                        } else {
                            scope.i18n = {
                                'noData': 'No Data'
                            };
                        };

                        //Table 提供两种方式提供数据。 属性的data 优先，另外就是数据源模式
                        if (typeof(attrs.data) === 'undefined') {
                            EventService.register("EventService", EventTypes.READY, function(event, data) {
                                scope.dataSource = DataSourceService.get(attrs.ds);
                            });

                            EventService.register(attrs.ds, EventTypes.RESULT, function(event, data) {
                                scope.data = data;
                                _reloadLocalData();
                                if (scope.pagingType == "server") {
                                    if (ctrl.pageCtrl) {
                                        ctrl.pageCtrl.setPageByTable(data.paging.currentPage - 1);
                                    }
                                }
                            });
                        } else {
                            scope.$watch("data", function(newVal, oldVal) {
                                if (newVal != undefined) {
                                    _reloadLocalData();
                                    if (ctrl.pageCtrl) {
                                        ctrl.pageCtrl.setPageByTable(0);
                                    }
                                }
                            }, true);
                        };

                        scope.ifSelected = function(item) {
                            return item.$$hashKey == scope.selectedModel.$$hashKey;
                        };

                        scope.setSelected = function(item) {
                            if (item.$$hashKey == scope.selectedModel.$$hashKey)
                                scope.selectedModel = {};
                            else
                                scope.selectedModel = item;
                            if (angular.isDefined(attrs.id)) {
                                EventService.broadcast(attrs.id, EventTypes.SELECT, scope.selectedModel);
                            }
                        };


                        scope.dbClickHandler = function(item, index) {
                            if (angular.isDefined(attrs.id)) {
                                var data = {};
                                data.data = item;
                                data.index = index;
                                EventService.broadcast(attrs.id, EventTypes.DOUBLE_CLICK, data);
                            }
                        }
                    };
                    //END INIT

                    function _reloadLocalData() {
                        function _convertToObject(input) {
                            var result = new Array();
                            angular.forEach(input.data, function(data) {
                                var obj = {};
                                angular.forEach(input.field, function(field, index) {
                                    obj[field] = data[index];
                                });
                                result.push(obj);
                            });
                            return result;
                        }
                        if (scope.data.data.length == 0) {
                            scope.noData = true;
                        } else {
                            scope.noData = false;
                        }
                        scope.destData = _convertToObject(scope.data);
                        scope.columnDefs = [];
                        //scrollStyle
                        if (scope.setting && scope.setting.scrollX) {
                            scope.scrollStyle = "overflow:auto;width:100%;";
                        }
                        _produceColumnDefs();
                    }
                    //END RELOADLOCALDATA

                    function _produceColumnDefs() {
                        for (var i = 0; i < scope.data.field.length; i++) {
                            columnDef = {};
                            columnDef.data = scope.data.field[i];
                            columnDef.title = scope.data.header[i];
                            columnDef.targets = i;
                            columnDef.visible = true;
                            scope.columnDefs.push(columnDef);
                        }

                        if (scope.setting && scope.setting.columnDefs) {
                            //合并操作
                            var customColumnDefs = scope.setting.columnDefs;
                            for (var i = 0; i < customColumnDefs.length; i++) {
                                var def = customColumnDefs[i];
                                var target = def.targets;
                                if (def.visible == undefined) {
                                    def.visible = true;
                                }
                                if (target === undefined) {
                                    columnDef = {};
                                    columnDef.data = def.data;
                                    columnDef.title = def.title;
                                    columnDef.visible = def.visible;
                                    columnDef.render = def.render;
                                    columnDef.class = def.class;
                                    columnDef.width = def.width;
                                    columnDef.targets = scope.columnDefs.length + 1;
                                    scope.columnDefs.push(columnDef);
                                } else {
                                    if (customColumnDefs[i].override === false) {
                                        for (var j = 0; j < scope.columnDefs.length; j++) {
                                            if (parseInt(scope.columnDefs[j].targets) >= parseInt(target)) {
                                                scope.columnDefs[j].targets = scope.columnDefs[j].targets + 1;
                                            }
                                        };
                                        scope.columnDefs.push(def);
                                    } else {
                                        var exist = false;
                                        for (var j= 0; j < scope.columnDefs.length; j++) {
                                            if ((angular.isNumber(target) && parseInt(scope.columnDefs[j].targets) == parseInt(target)) ||
                                                (angular.isString(target) && scope.columnDefs[j].data == target)) {
                                                exist = true;
                                                if (def.title != undefined) {
                                                    scope.columnDefs[j].title = def.title;
                                                }
                                                if (def.visible != undefined) {
                                                    scope.columnDefs[j].visible = def.visible;
                                                }
                                                scope.columnDefs[j].render = def.render;
                                                scope.columnDefs[j].class = def.class;
                                                scope.columnDefs[j].width = def.width;
                                                break;
                                            }
                                        };
                                        if (!exist) {
                                            scope.columnDefs.push(def);
                                        }
                                    }
                                }
                            };
                        }
                        //对columnDefs 排序根据targets升序
                        scope.columnDefs.sort(function(a, b) {
                            return a.targets > b.targets ? 1 : -1
                        });
                    }
                    //END produceColumnDefs
                }
            }
        }
    }]);


    tableModule.directive('rdkPaging', ['$compile', function($compile) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/src/templates/paging.html',
                require: "^rdkTable",
                scope: {
                    count: "=",
                    pageSize: "=",
                    lang: "@"
                },
                link: function($scope, element, attrs, TableCtrl) {
                    $scope.TableCtrl = TableCtrl;
                    $scope.TableCtrl.pageCtrl = $scope;
                    if ($scope.lang == 'zh-CN') {
                        $scope.i18n = {
                            'records': ' 条记录',
                            'next': '下一页',
                            'prev': '上一页'
                        }
                    } else {
                        $scope.i18n = {
                            'records': ' Records',
                            'next': 'Next',
                            'prev': 'Prev'
                        }
                    }

                    $scope.currentPage = 0;
                    $scope.prevPage = function() {
                        if ($scope.currentPage > 0) {
                            $scope.currentPage--;
                        }
                        $scope.setCurrentPageToTable();
                    };
                    $scope.nextPage = function() {
                        if ($scope.currentPage < $scope.pageCount()) {
                            $scope.currentPage++;
                        }
                        $scope.setCurrentPageToTable();
                    };

                    $scope.setCurrentPageToTable = function() {
                        $scope.TableCtrl.setCurrentPage($scope.currentPage);
                    };

                    $scope.prevPageDisabled = function() {
                        return $scope.currentPage === 0 ? "disabled" : "";
                    };

                    $scope.pageCount = function() {
                        return $scope.count > 0 ? Math.ceil($scope.count / $scope.pageSize) - 1 : 0;
                    };

                    $scope.nextPageDisabled = function() {
                        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
                    };

                    $scope.setPage = function(n) {
                        $scope.currentPage = n;
                        $scope.setCurrentPageToTable();
                    };

                    $scope.setPageByTable = function(n) {
                        $scope.currentPage = n;
                    };

                    $scope.range = function() {
                        var rangeSize = $scope.pageCount() + 1 < 5 ? $scope.pageCount() + 1 : 5;
                        var ret = [];
                        var start = $scope.currentPage;
                        if (start > $scope.pageCount() - rangeSize) {
                            start = $scope.pageCount() - rangeSize + 1;
                        }
                        for (var i = start; i < start + rangeSize; i++) {
                            ret.push(i);
                        }
                        return ret;
                    };
                    $scope.setCount = function(n) {
                        $scope.count = n;
                    }



                }
            };
        }])
});
