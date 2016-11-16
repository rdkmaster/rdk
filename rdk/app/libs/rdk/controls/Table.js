define(['angular', 'jquery', 'underscore', 'jquery-headfix', 'jquery-gesture', 'rd.services.DataSourceService', "css!rd.styles.Table", 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {

    var tableModule = angular.module('rd.controls.Table', ['rd.core']);

    tableModule.run(["$templateCache", function($templateCache) {
        $templateCache.put("/src/templates/common.html",
            '<div class="rdk-table-module" ng-click="stopPropagation()">\
                <div ng-if="search && (noData!=undefined)" class="searchWapper">\
                    <input type="text" class="form-control search" placeholder="{{searchPrompt}}" ng-focus="searchFocusHandler()"\
                           ng-keyup="keyPressHandler($event)" ng-model="$parent.globalSearch">\
                    <i class="glyphicon glyphicon-search search_icon" ng-click="serverSearchHandler()" style="cursor:{{pagingType==\'server\' ? \'pointer\' : \'default\'}}"></i>\
                    <select ng-show="(pagingType==\'server\' && $parent.globalSearch && searchFocus)?true:false" ng-model="val" ng-change="selectChangeHandler(val)"\
                            ng-options="columnDef.data as columnDef.name for columnDef in columnDefs | realoption"\
                            class="form-control search_select">\
                        <option value="">{{i18n.searchAll}}</option>\
                    </select>\
               </div>\
               <div class="wrapper" style="{{scrollStyle}}">\
                    <table class="rdk-table">\
                        <thead ng-if="!noHeader">\
                            <tr>\
                                <th ng-show="{{addCheckBox}}"><input name="totalCheckBox" type="checkbox" ng-click="totalCheck(allChecked)" ng-model="allChecked"></th>\
                                <th ng-repeat="columnDef in columnDefs" ng-mouseover="cursorHandler($event, columnDef.sortable)" ng-show="columnDef.visible" ng-click="sortHandler($index, columnDef)">\
                                    {{columnDef.title}}\
                                </th>\
                            </tr>\
                        </thead>\
                        <tbody>\
                            <tr class="rowTr" on-finish-render  rdk-row-parser ng-click="setSelected(item,$event)"\
                                ng-class="{\'selected-row\':ifSelected(item)}" ng-dblclick="dbClickHandler(item,$index)">\
                                <td ng-if="addCheckBox"><input type="checkbox" ng-click="singleCheck()" ng-model="currentPageData[$index].checked"></td>\
                                <td rowspan="{{getRowSpan(itemRowSpan,columnDef)}}" ng-repeat="columnDef in columnDefs" rdk-column-parser ng-show="columnDef.visible" class="{{columnDef.class}}" style="width:{{columnDef.width}};cursor:move;{{getRowStyle(itemRowSpan,columnDef)}}">\
                                </td>\
                            </tr>\
                             <tr ng-if="noData">\
                                <td colspan="{{columnDefs.length}}">\
                                    <div class="no-data"></div>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <rdk-paging ng-if="pageVisible && pageCtrl && paging && columnDefs.length!=0 && !noData" data-page-size="pageSize" \
                     data-lang="{{lang}}">\
                </rdk-paging>\
                <div class="clearfix"></div>\
            </div>'
        );

        $templateCache.put("/src/templates/paging.html",
            '<div class="pagingLine">\
                <span class="disabledRecords spanRecords">{{i18n.total}} {{count}} {{i18n.records}}</span>\
                <ul class="pagination">\
                    <li ng-class="prevPageDisabled()"> \
                        <a href ng-click="firstPage()" ng-class="{true:\'disabledRecords\', false:\'enabledRecords\'}[currentPage==0]">\
                            {{i18n.first}}\
                        </a>\
                    </li>\
                    <li ng-class="prevPageDisabled()">\
                        <a href ng-click= "prevPage()" ng-class="{true:\'disabledRecords\', false:\'enabledRecords\'}[currentPage==0]">\
                            {{i18n.prev}}\
                        </a>\
                    </li>\
                    <li ng-show="getPageShow()">\
                        <span class="regularRecords"><i class="regular_left">{{currentPage + 1 }}</i><i class="regular_right">/{{pageCount()+1}}</i></span>\
                    </li>\
                    <li ng-show="!getPageShow()" ng-repeat="n in range()" ng-click="setPage(n)">\
                        <a href="javascript:void(0)" ng-class="{true:\'regularRecords\', false:\'enabledRecords\'}[n == currentPage]">{{n+1}}</a>\
                    </li>\
                    <li ng-class="nextPageDisabled()"> \
                        <a href ng-click="nextPage()" ng-class="{true:\'disabledRecords\', false:\'enabledRecords\'}[currentPage==pageCount()]">\
                             {{i18n.next}}\
                        </a>\
                    </li>\
                    <li ng-class="nextPageDisabled()"> \
                        <a href ng-click="lastPage()" ng-class="{true:\'disabledRecords\', false:\'enabledRecords\'}[currentPage==pageCount()]">\
                            {{i18n.last}}\
                        </a>\
                    </li>\
                </ul>\
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
        .filter('realoption',function(){
            return function(inputArray){
                var array = [];
                for(var i=0;i<inputArray.length;i++){
                    if((inputArray[i].data != undefined) && (inputArray[i].visible !== false) && (inputArray[i].visible != 'false')){
                        array.push(inputArray[i]);
                    }
                }
                return array;
            }
        })
        .directive('rdkRowParser', function($compile, $parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    if (scope.groupTargets) {
                        if (scope.$index == 0) {
                            scope.$parent.rowSpans = undefined;
                        }
                        if (!scope.$parent.rowSpans) {
                            var rowspans = scope.$parent.rowSpans = new Array();
                            var rowSpan, previousRowSpan, item;
                            for (var i = 0; i < scope.$filtered.length; i++) {
                                rowSpan = {};
                                item = scope.$filtered[i];
                                if (i != 0) previousRowSpan = rowspans[i - 1];
                                for (var j = 0; j < scope.groupTargets.length; j++) {
                                    var name = scope.groupFields[j];
                                    var target = scope.groupTargets[j];
                                    if (previousRowSpan && previousRowSpan[target + "real"] > 1) {
                                        rowSpan[target + "real"] = previousRowSpan[target + "real"] - 1;
                                        rowSpan[target] = 0;
                                    } else {
                                        length = generateRowSpan(name, j, i, target);
                                        rowSpan[target] = length;
                                        rowSpan[target + "real"] = length;
                                    }
                                }
                                rowspans.push(rowSpan);
                            };
                            for (var i = 0; i < scope.groupTargets.length; i++) {
                                var groupTarget = scope.groupTargets[i];
                                for (var j = 0; j < scope.columnDefs.length; j++) {
                                    var columnDef = scope.columnDefs[j];
                                    if (groupTarget == columnDef.targets) {
                                        if (angular.isFunction(columnDef.group)) {
                                            var sourceRowSpan = generateSourceRowSpan(groupTarget);
                                            var destRowSpan = columnDef.group.call(undefined, sourceRowSpan, columnDef.data, scope.$filtered, groupTarget);
                                            handleRealRowSpan(destRowSpan, groupTarget);
                                        }
                                    }
                                };
                            };
                        }
                        scope.itemRowSpan = scope.$parent.rowSpans[scope.$index];

                    }

                    function generateSourceRowSpan(groupTarget) {
                        var result = new Array();
                        for (var i = 0; i < rowspans.length; i++) {
                            result.push(rowspans[i][groupTarget]);
                        };
                        return result;
                    }

                    function handleRealRowSpan(destRowSpan, groupTarget) {
                        for (var i = 0; i < rowspans.length; i++) {
                            rowspans[i][groupTarget] = destRowSpan[i];
                        };
                    }

                    function generateRowSpan(name, index, rowIndex, target) {
                        var data = item[name];
                        //TODO 添加 Render 处理
                        var rowspan = 1;
                        var destData, i;
                        if (index == 0) {
                            var datas = new Array();
                            datas.push(scope.item);
                            scope.groupData = scope.$filtered;
                            destData = scope.groupData;
                            i = rowIndex + 1;
                        } else {
                            destData = scope.groupData.slice(-rowSpan[scope.groupTargets[index - 1] + "real"]);
                            i = 1;
                        }
                        for (; i < destData.length; i++) {
                            if (destData[i][name] == data) {
                                rowspan++;
                                if (index == 0) {
                                    datas.push(destData[i]);
                                }
                            } else {
                                break;
                            }
                        };
                        if (index == 0) {
                            scope.groupData = datas;
                        }
                        return rowspan;
                    }
                }
            }
        })
        .directive('rdkColumnParser', function($compile, $parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    var html = '<div style="min-height: 20px" ng-click="editHandler($event, columnDef)" ng-mouseenter="changeShape($event, columnDef)">';
                    if (scope.columnDef.render) {
                        if (angular.isFunction(scope.columnDef.render)) {
                            html += '<div>' + scope.columnDef.render.call(undefined, scope.item) + '</div>';
                        } else {
                            html += '<div>' + scope.columnDef.render + '</div>';
                        }
                    } else if (scope.columnDef.editable) {
                        if (scope.columnDef.editorRenderer) {
                            if (angular.isFunction(scope.columnDef.editorRenderer)) {
                                html += '<div ng-show="true">' + scope.columnDef.editorRenderer.call(undefined, scope.item) + '</div>';
                            } else {
                                html += '<div ng-show="true">' + scope.columnDef.editorRenderer + '</div>';
                            }
                        } else {
                            html += '<div ng-bind="item[columnDef.data]"> </div>';
                            html += '<div ng-show="false">' +
                                '<input class="editInput" value="{{item[columnDef.data]}}" ng-keyup="inputPressHandler($event, item.$index, columnDef,itemRowSpan,$parent.$index)" ng-blur="editorBlurHandler($event, item.$index, columnDef,itemRowSpan,$parent.$index)">' +
                                '</div>';
                        }
                    } else {
                        html += '<div ng-bind="item[columnDef.data]"> </div>'
                    }

                    html += '</div>'
                    element.html(html);
                    $compile(element.contents())(scope);
                }
            }
        }).directive('onFinishRender', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    }, 0);
                }
            }
        }
    });

    tableModule.directive('rdkTable', ['DataSourceService', 'EventService', 'EventTypes', 'Utils', '$timeout', '$compile',function(DataSourceService, EventService, EventTypes, Utils, $timeout,$compile) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/src/templates/common.html',
            controller: ['$scope', function(scope) {

                Utils.publish(scope, this);

                this.setCurrentPage = function(_currentPage) {
                    scope.hasOffReady = false;//翻页时重置
                    scope.currentPage = _currentPage;
                    scope.proxyDs = Utils.compile(scope.$parent, scope.proxyDs);
                    if (scope.pagingType == "server") {
                        _loadDataFromServer();
                    }
                };

                this.getTablePageNumber = function() {
                    return scope.pageNumber;
                }

                this.setPageSize = function(_pageSize){
                    if(scope.pageSize == _pageSize) return;
                    scope.pageSize = _pageSize;
                    this.setCurrentPage(scope.currentPage);
                }

                this.getTableAppScope = function() {
                    return scope.appScope;
                }

                this.setChecked = function(items){
                    if(!scope.addCheckBox) return;
                    _refreshSingleCheckedData(items);
                    scope.refreshSingleCurrentPage();
                }

                this.setGlobalSearch = function(searchVal){
                    if(!scope.search) return;
                    scope.globalSearch = searchVal;
                }

                this.getSearchInfo = function(){
                    _defaultSearchHandler();
                    var searchObject = {};
                    searchObject.searchKey = scope.globalSearch;
                    searchObject.searchFields = scope.searchFields;
                    return searchObject;
                }

                function _refreshSingleCheckedData(items){
                    angular.forEach(scope.destData, function(item){
                        item.checked = false;
                    })
                    angular.forEach(items, function(item){
                        var index = _.findIndex(scope.destData, item);
                        if(index != -1){
                            scope.destData[index].checked = true;
                        }
                    })
                }

                function _defaultSearchHandler(){
                    scope.globalSearch = scope.globalSearch || '';
                    scope.searchFields = scope.searchFields || [];
                    scope.globalSearch == '' ? (scope.searchFields = []) : scope.setDefaultSearchFileds();
                }

                function _loadDataFromServer() {
                    var ds = DataSourceService.get(scope.proxyDs);
                    if (!ds) {
                        return;
                    }
                    var attachCondition = {};
                    attachCondition.paging = {};
                    attachCondition.paging.currentPage = scope.currentPage + 1;
                    attachCondition.paging.pageSize = scope.pageSize;
                    if (scope.fieldStr && scope.directionStr) {
                        attachCondition.orderBy = {};
                        attachCondition.orderBy.field = scope.fieldStr;
                        attachCondition.orderBy.direction = scope.directionStr;
                    }
                    if ((scope.search) && (scope.pagingType == "server")) { //服务端过滤时
                        _defaultSearchHandler();
                        attachCondition.search = {};
                        attachCondition.search.searchKey = scope.globalSearch;
                        attachCondition.search.searchFields = scope.searchFields;
                    }

                    var handler = scope.defaultConditionProcessor(scope.baseCondition, attachCondition);
                    var finallyCondition = {};
                    if (handler) {
                        finallyCondition = handler(scope.baseCondition, attachCondition);
                    } else {
                        if (scope.baseCondition) {
                            finallyCondition = scope.baseCondition;
                        }
                        finallyCondition.paging = attachCondition.paging;
                        if (attachCondition.orderBy) {
                            finallyCondition.orderBy = attachCondition.orderBy;
                        };
                        if (attachCondition.search) {
                            finallyCondition.search = attachCondition.search;
                        };
                    }
                    ds.query(finallyCondition, { "directQuery": true, "supressEvent": false });
                }
            }],
            scope: {
                id: '@',
                setting: '=?',
                data: '=?',
                selectedIndex: '=?',
                pageSize: "@?",
                pagingType: "@?",
                pagingVisible: "@?",
                lang: "@?",
                searchPrompt: "@?",
                searchPattern: '@?',
                proxyDs: "@?",
                pageNumber: "@?",
                addCheckBox: "=?",
                defaultConditionProcessor: "&?",
                floatableHeader: "@?",
                change: "&?",
                select: "&?",
                doubleClick: "&?",
                check: "&?",
            },
            compile: function(tElement, tAttributes) {

                if (!tAttributes.hasOwnProperty('proxyDs')) {
                    tAttributes.proxyDs = tAttributes.ds;
                }

                Utils.bindDataSource(tAttributes, 'data', 'proxyDs');

                //暂留rowFilter,后期实现search功能
                var rowFilter = "";

                if ((tAttributes.search == "true") ? true : ((tAttributes.searchable == "true") ? true : false)) {
                    rowFilter += "| filter:globalSearch";
                };
                var pagingFilter = "";
                pagingFilter += " | offset: currentPage:pageSize |limitTo: pageSize";

                if (tAttributes.pagingType !== "server") {
                    tElement.find("rdk-paging").attr("count", "$filtered.length");
                    tElement[0].querySelector(".rowTr").setAttribute("ng-repeat", "item in $filtered = (destData" + rowFilter + ")" + pagingFilter);
                } else {
                    tElement.find("rdk-paging").attr("count", "data.paging.totalRecord");
                    tElement[0].querySelector(".rowTr").setAttribute("ng-repeat", "item in $filtered = destData");
                }

                return function link(scope, element, attrs, ctrl) {

                    scope.getRowSpan = function(itemRowSpan, item) {
                        return itemRowSpan && itemRowSpan[item["targets"]] ? itemRowSpan[item["targets"]] : 1;
                    }

                    scope.getRowStyle = function(itemRowSpan, item) {
                        var result = "";
                        if (itemRowSpan && itemRowSpan[item["targets"]] == 0) {
                            result = "display:none";
                        }
                        return result;
                    }
                    _init();
                    scope.searchPrompt="Search";

                    function _init() {

                        if (angular.isUndefined(scope.proxyDs) && scope.pagingType == "server") {
                            console.warn('Table with server as pagingType must provide ds attribute');
                            return;
                        }

                        if (scope.proxyDs) {
                            EventService.register(scope.proxyDs, EventTypes.BEFORE_QUERY, function(event, data) {
                                scope.baseCondition = data.condition;
                            });
                        };

                        //分页栏是否展现
                        scope.pageVisible = Utils.isTrue(scope.pagingVisible, true);

                        //根据data生成并且和用户自定义def合并
                        scope.columnDefs = [];
                        //每页显示N行
                        scope.pageSize = scope.pageSize || 20;
                        //默认分页
                        scope.paging = angular.isDefined(scope.paging) ? scope.paging : true;
                        //默认采用本地分页
                        scope.pagingType = angular.isDefined(scope.pagingType) ? scope.pagingType : "local";

                        scope.currentPage = 0;

                        //appScope 为列渲染器提供可能
                        scope.appScope = Utils.findAppScope(scope);

                        //控制分页的显示
                        scope.pageCtrl = angular.isDefined(scope.pageCtrl) ? scope.pageCtrl : true;

                        //选中行
                        scope.selectedModel = {};

                        //启用搜索功能
                        scope.search = (attrs.search == "true") ? true : ((attrs.searchable == "true") ? true : false); //优先attrs.search

                        //ux分页样式
                        scope.pageNumber = parseInt(scope.pageNumber) || 0;

                        //首列复选框
                        scope.addCheckBox = Utils.isTrue(scope.addCheckBox, false);

                        //后端排序异步id监听
                        scope.innerID = Utils.createUniqueId('table_inner_');

                        //后端排序开关
                        scope.serverSortCache = false;             

                        //表头开关
                        $timeout(function(){
                            scope.floatableHeader = Utils.isTrue(scope.floatableHeader, true);
                        }, 0);

                        //默认国际化
                        if (typeof(attrs.lang) === 'undefined') { //今后会废弃lang属性
                            scope.lang = 'zh-CN';
                            if ((scope.appScope.i18n) && (scope.appScope.i18n.$locale)) {
                                scope.lang = scope.appScope.i18n.$locale;
                            }
                        }

                        /*table国际化*/
                        initializeTableI18n();
                        refreshTableI18n();

                        if (angular.isDefined(attrs.id)) {
                            EventService.register(attrs.id, EventTypes.HIGHLIGHT, function(event, data) {
                                _highLightItem(data);
                            });
                        }

                        scope.searchFocusHandler = function(){
                            scope.searchFocus = true;
                        }

                        scope.$watch("data", function(newVal, oldVal) {
                            scope.hasOffReady = false;//watch时重置
                            scope.currentPage = 0;
                            _reloadLocalData();
                            if (scope.pagingType == "server") {
                                scope.currentPage = scope.data.paging ? (scope.data.paging.currentPage - 1) : 0;
                            }
                            if (ctrl.pageCtrl) {
                                ctrl.pageCtrl.setPageByTable(scope.currentPage);
                            }
                        }, true);

                        scope.$watch("$filtered", function(newVal, oldVal) {
                            if (newVal) {
                                if (angular.isDefined(attrs.id)) {
                                    EventService.broadcast(attrs.id, EventTypes.PAGING_DATA_CHANGE, newVal);
                                }
                            }
                        }, true);


                        scope.$watch("setting.columnDefs", function(newVal, oldVal) {
                            if (newVal != oldVal) {
                                _reloadLocalData();
                            }
                        }, true);

                        scope.$watch("globalSearch", function(newVal, oldVal) {
                            if (newVal != oldVal) {
                                if (scope.pagingType == "server") return; //#115
                                if (ctrl.pageCtrl) {
                                    ctrl.pageCtrl.firstPage();
                                }
                            }
                        }, true);

                        scope.stopPropagation = function() {
                            event.stopPropagation();
                        }

                        scope.selectChangeHandler = function(val) { //交互
                            if (val == null) {
                                scope.searchFields = _getValue(scope.columnDefs);
                                return;
                            }
                            scope.searchFields = [val];
                        }

                        scope.keyPressHandler = function(event) {
                            if (scope.globalSearch == undefined) return;
                            while (!_validateValue(scope.globalSearch, scope.searchPattern)) {
                                scope.globalSearch = scope.globalSearch.substring(0, scope.globalSearch.length - 1);
                            }
                            if(event.keyCode == 13){
                                scope.serverSearchHandler();
                            }
                        }

                        scope.serverSearchHandler = function(){
                            if((scope.globalSearch == undefined) || (scope.pagingType != 'server')) return;
                            scope.currentPage = 0;
                            scope.globalSearch == '' ? (scope.searchFields = []) : scope.setDefaultSearchFileds();
                            ctrl.setCurrentPage(scope.currentPage);
                        }

                        scope.setDefaultSearchFileds = function(){
                            if((!scope.searchFields) || (scope.searchFields.length == 0)){ //没交互时给默认值
                                scope.searchFields = _getValue(scope.columnDefs);
                            }
                        }

                        scope.cursorHandler = function(event, sortable) {
                            if (sortable) {
                                $(event.target).css({ 'cursor': 'pointer' });
                            }
                        }

                        scope.changeShape = function(event, columnDef) {
                            if (columnDef.editable) {
                                $(event.currentTarget).addClass("mouseShape");
                            } else {
                                $(event.currentTarget).css({ 'cursor': 'text' });
                            }
                        }

                        scope.editHandler = function(event, columnDef) {
                            var tdDivTarget = event.currentTarget;
                            var firstDivTarget = tdDivTarget.childNodes[0];
                            var lastDivTarget = tdDivTarget.childNodes[1];
                            if ((columnDef.editable) && (!columnDef.editorRenderer)) { //单元格td
                                var tdWidthCache = event.currentTarget.parentNode.offsetWidth;
                                $(firstDivTarget).css('display', "none");
                                $(lastDivTarget).css('display', "inline");
                                $(lastDivTarget).removeAttr("class");
                                $(lastDivTarget.childNodes[0]).val($(lastDivTarget.childNodes[0]).attr("value"));
                                $(lastDivTarget.childNodes[0]).focus();
                                event.currentTarget.parentNode.style.width = tdWidthCache + 'px';
                            }
                        }

                        scope.editorBlurHandler = function(event, row, columnDef, itemRowSpan, filterIndex) {
                            var inputTarget = event.currentTarget;
                            var divTarget = inputTarget.parentNode;

                            _blurHandler(divTarget);
                            if ((columnDef.editable) && (!columnDef.editorRenderer)) {
                                scope.refreshData(inputTarget, row, columnDef.columnIdx, itemRowSpan, filterIndex, columnDef);
                            }
                        }

                        scope.refreshData = function(inputTarget, row, column, itemRowSpan, filterIndex, columnDef) {
                            var cells = new Array();
                            if (itemRowSpan && itemRowSpan[columnDef["targets"]]) {
                                var destData = scope.$filtered.slice(filterIndex, filterIndex + itemRowSpan[columnDef["targets"]]);
                                for (var i = 0; i < destData.length; i++) {
                                    cells.push(new Array(destData[i].$index, column));
                                };
                            } else {
                                cells.push(new Array(row, column));
                            }

                            var changeData = {};
                            changeData['oldValue'] = scope.data.data[row][column];
                            changeData['newValue'] = $(inputTarget).val();
                            changeData['rowIndex'] = row;
                            changeData['columnIndex'] = column;
                            changeData['cells'] = cells;

                            EventService.raiseControlEvent(scope, 'change', changeData);
                        }

                        scope.inputPressHandler = function(event, row, columnDef, itemRowSpan, filterIndex) { //input上的event
                            var inputTarget = event.currentTarget;
                            var divTarget = $(inputTarget).parent().get(0);
                            var column = columnDef.columnIdx;

                            if (event.keyCode == 13) {
                                scope.refreshData(inputTarget, row, column, itemRowSpan, filterIndex, columnDef);
                                _blurHandler(divTarget);
                            }
                            if (event.keyCode == 27) {
                                $(inputTarget).val(scope.data.data[row][column]);
                                _blurHandler(divTarget);
                            }
                        }

                        scope.sortHandler = function(iCol, columnDef) {
                            if (!columnDef.sortable) return;

                            var table = $(element.find("table")).get(0);

                            if (scope.pagingType == "server") {
                                scope.serverSortCache = true;
                                if (table.sortCol == iCol) {
                                    table.direction.reverse();
                                    _loadSortDataFromServer(columnDef.data, table.direction[0]);
                                } else { //不是先前列
                                    _loadSortDataFromServer(columnDef.data, 'asc');
                                }
                                EventService.register(scope.innerID, EventTypes.TABLE_READY, function() {
                                    _addSortArrow(iCol, table);
                                    table.sortCol = iCol;
                                });
                            } else {
                                if (table.sortCol == iCol) {
                                    scope.destData.reverse();
                                } else {
                                    scope.destData.sort(_compareElement(columnDef)); //从小到大排
                                }

                                _addSortArrow(iCol, table);
                                table.sortCol = iCol;
                            }
                        }

                        scope.ifSelected = function(item) {
                            return item.$$hashKey == scope.selectedModel.$$hashKey;
                        };

                        scope.setSelected = function(item, event) {
                            if (item.$$hashKey == scope.selectedModel.$$hashKey) {
                                // scope.selectedModel = {};
                            } else {
                                scope.selectedModel = item;
                            }
                            EventService.raiseControlEvent(scope, 'select', item);
                        };

                        scope.singleCheck = function(){
                            scope.refreshSingleCurrentPage();
                            _totalBroadcast();
                        }

                        scope.totalCheck = function(isChecked){
                            scope.refreshTotalCurrentPage(isChecked);
                            _totalBroadcast();
                        }

                        scope.dbClickHandler = function(item, index) {
                            var data = {};
                            data.data = item;
                            data.index = index;
                            EventService.raiseControlEvent(scope, 'double_click', data);
                        }

                        scope.isFirstPage = function() {
                            return scope.currentPage == 0;
                        }

                        scope.afterStickyWrap = function() {
                            if (scope.setting && scope.setting.scrollX) {
                                var ele = element[0].querySelector(".sticky-wrap");
                                $(ele).addClass("sticky-wrap-overflow"); //scrollX作用使滚动条产生在内部
                            }
                        }

                        scope.refreshSingleCurrentPage = function(){
                            scope.currentPageData = scope.getCurrentPageDataArr();
                            scope.refreshTotal4Single();
                        }

                        scope.refreshTotalCurrentPage = function(isChecked){
                            scope.currentPageData = scope.getCurrentPageDataArr();
                            _refreshCurrentSingleChecked(isChecked);
                        }

                        scope.getCurrentPageDataArr = function(){
                            if(scope.pagingType == "server"){
                                return scope.destData;
                            }
                            var currentPage = parseInt(scope.currentPage, 10);
                            var pageSize = parseInt(scope.pageSize, 10);
                            var start = currentPage * pageSize;
                            return scope.destData.slice(start, start+pageSize); //子数组
                        }

                        scope.getOrginTable = function(){
                            return scope.floatableHeader ? (element.find('.sticky-enabled')) : (element.find('table'));
                        }

                        scope.refreshTotal4Single = function(){
                            var isChecked = _isAllChecked();
                            scope.allChecked = isChecked;//双绑没生效，后面用dom找
                            _resetTotalCheckStatus(isChecked);
                            _resetFixHeadCheckStatus(isChecked);
                        }

                        var off = scope.$on('ngRepeatFinished', function(event) {
                            if(scope.hasOffReady) return;

                            _reFreshTable();
                            _reSetTableHeaders(); //重定义表头

                            if(scope.floatableHeader){
                                $(element.find("table")).fixHeader();
                            }

                            scope.afterStickyWrap();

                            scope.$watch("selectedIndex", function(newVal, oldVal) { //根据selectedIndex高亮显示
                                if (newVal != undefined) {
                                    if (scope.selectedIndex != undefined) {
                                        _highLightItem(scope.selectedIndex);
                                    }
                                }
                            }, true);
                            
                            scope.refreshSingleCurrentPage();//翻页必进，$filtered/watch
                            _serverSortResponse();//后端排序，刷新后的响应
                            _searchGapClick();
                            scope.hasOffReady = true;
                        });
                    };
                    //END INIT

                    function _refreshCurrentSingleChecked(isChecked){
                        _resetFixHeadCheckStatus(isChecked);
                        angular.forEach(scope.currentPageData, function(rowData){
                            rowData.checked = isChecked;
                        })
                    }

                    function _searchGapClick(){
                        if((!scope.search) || (scope.pagingType != 'server')) return;
                        $(document).mouseup(function(e){
                            var searchWrapper = element[0].querySelector('.searchWapper');
                            if(!$(searchWrapper).is(e.target) && $(searchWrapper).has(e.target).length === 0){
                                scope.searchFocus = false;
                            }
                        })
                    }

                    function initializeTableI18n() {
                        scope.lang = scope.lang.toLowerCase();
                        if (scope.lang == 'zh-cn' || scope.lang == 'zh_cn') {
                            scope.i18n = {
                                'noData': '暂无数据',
                                'searchBy': '在',
                                'search': '字段中搜索',
                                'searchAll': '搜索所有字段'
                            };
                        } else {
                            scope.i18n = {
                                'noData': 'No Data',
                                'searchBy': 'Search by',
                                'search': '',
                                'searchAll': 'Search all fields'
                            };
                        };
                    }

                    function refreshTableI18n() {
                        if (!scope.appScope.i18n) return;
                        scope.i18n.noData = scope.appScope.i18n.table_noData ? scope.appScope.i18n.table_noData : scope.i18n.noData;
                        scope.i18n.searchBy = scope.appScope.i18n.table_searchBy ? scope.appScope.i18n.table_searchBy : scope.i18n.searchBy;
                        scope.i18n.search = scope.appScope.i18n.table_search ? scope.appScope.i18n.table_search : scope.i18n.search;
                        scope.i18n.searchAll = scope.appScope.i18n.table_searchAll ? scope.appScope.i18n.table_searchAll : scope.i18n.searchAll;
                    }

                    function _serverSortResponse(){
                        if(scope.serverSortCache){
                            EventService.broadcast(scope.innerID, EventTypes.TABLE_READY);
                            scope.serverSortCache = false;
                        }
                    }

                    function _totalBroadcast(){
                        var data = {};
                        data.data = _getCheckedItems();
                        EventService.raiseControlEvent(scope, 'check', data);
                    }

                    function _getCheckedItems(){
                        var arr = [];
                        angular.forEach(scope.destData, function(item){
                            if(item.checked){
                                arr.push(item);
                            }
                        })
                        return arr;
                    }

                    function _resetTotalCheckStatus(isChecked){
                        var originTable = scope.getOrginTable();
                        var arr = originTable.find('input[name="totalCheckBox"]');
                        arr[0].checked = isChecked;
                    }

                    function _resetFixHeadCheckStatus(isChecked){
                        if(!scope.floatableHeader) return;
                        var arr = element.find('.sticky-thead').find('input[name="totalCheckBox"]');
                        arr[0].checked = isChecked;
                    }

                    function _isAllChecked(){
                        for(var i=0; i<scope.currentPageData.length; i++){
                            if(!scope.currentPageData[i].checked) return false;
                        }
                        return true;
                    }

                    function _blurHandler(target) {
                        $(target).css('display', "none");
                        $(target).prev().css('display', "inline");
                    }

                    function _validateValue(val, pattern) {
                        if (!val) return true; //没值了，不能再-1
                        var reg = new RegExp(pattern);
                        if (!reg.test(val)) {
                            return false;
                        }
                        return true;
                    }

                    function _getValue(columnDefs) {
                        var arr = [];
                        for (var i = 0; i < columnDefs.length; i++) {
                            arr.push(columnDefs[i].data);
                        }
                        return arr;
                    }

                    function _loadSortDataFromServer(field, direction) {
                        scope.fieldStr = field;
                        scope.directionStr = direction;
                        ctrl.setCurrentPage(scope.currentPage);
                    }

                    function _highLightItem(index) {
                        if (scope.destData) { //destData有定义时
                            var selectedItem = scope.destData[index];
                            scope.setSelected(selectedItem, null);
                        }
                    }

                    function _reFreshTable() {
                        $($(element.find("table")).get(0)).unwrap();
                        $($(element.find("table")).get(1)).remove();
                    }

                    var _compileHeads={};//需要被编译的表头对象

                    function _reSetTableHeaders(){
                        var thead = element[0].querySelector('thead');
                        var ths=thead.querySelector("tr:last-child").querySelectorAll("th[ng-repeat]");
                        for(var key in _compileHeads)
                        {
                            for(var i= 0,thLen=ths.length;i<thLen;i++){
                                if(_compileHeads.hasOwnProperty(key) && key==i){
                                    var th= $compile(_compileHeads[key])(scope.appScope);
                                    ths[i].innerHTML=null;
                                    $(ths[i]).append(th);
                                }
                            }
                        }
                        if(!!scope.setting && scope.setting.additionalHeader){
                            var template=angular.element(scope.setting.additionalHeader);
                            var trs= $compile(template)(scope.appScope);
                            $(thead).prepend(trs);
                        }
                    }
                    var scrollWidth, first = true,
                        stickyWrapElement;

                    function _reloadLocalData() {
                        function _convertToObject(input) {
                            var result = new Array();
                            angular.forEach(input.data, function(data, index) {
                                var obj = {};
                                angular.forEach(input.field, function(field, index) {
                                    obj[field] = data[index];
                                });
                                obj["$index"] = index; //item上存原行
                                obj["checked"] = false;
                                result.push(obj);
                            });
                            return result;
                        }
                        if ($.isEmptyObject(scope.data)) return; //first time
                        if (!scope.data.data) {
                            scope.noData = true;
                        } else if (scope.data.data.length == 0) {
                            scope.noData = true;
                        } else {
                            scope.noData = false;
                        }
                        if (!scope.data.header) {
                            scope.noHeader = true;
                        } else if (scope.data.header.length == 0) { //column.title是从header取
                            scope.noHeader = true;
                        } else {
                            scope.noHeader = false;
                        }

                        scope.destData = _convertToObject(scope.data);
                        scope.columnDefs = [];
                        scope.groupFields = undefined;
                        //预留以实现自定义列的Group
                        scope.groupTargets = undefined;
                        //scrollStyle
                        if (scope.setting && scope.setting.scrollX) {
                            scope.scrollStyle = "overflow:auto;width:100%;";
                            first = true;
                            $(element.find("tbody")).touchEvent("swipe", "detouch");
                            $(element.find("tbody")).touchEvent("swipe", "touch", _move);
                        }
                        _produceColumnDefs();

                        _pageCtrlShow();
                    }
                    //END RELOADLOCALDATA

                    function _move(e) {
                        if (first) {
                            first = false;
                            scrollWidth = element[0].querySelector(".rdk-table").offsetWidth - element[0].offsetWidth;
                            stickyWrapElement = element[0].querySelector(".sticky-wrap");
                        }

                        var startPoint = e.startPoint;
                        var endPoint = e.endPoint;
                        var x = -(endPoint.x - startPoint.x);

                        stickyWrapElement.scrollLeft = stickyWrapElement.scrollLeft + x;

                        if (stickyWrapElement.scrollLeft < 0) {
                            stickyWrapElement.scrollLeft = 0;
                        }

                        if (stickyWrapElement.scrollLeft > scrollWidth) {
                            stickyWrapElement.scrollLeft = scrollWidth;
                        }
                    }

                    function _produceColumnDefs() {
                        scope.columnDefs = [];
                        for (var i = 0; i < scope.data.field.length; i++) {
                            columnDef = {};
                            columnDef.data = scope.data.field[i];
                            columnDef.title = scope.data.header[i];
                            columnDef.targets = i;
                            columnDef.columnIdx = i;
                            columnDef.visible = true;
                            columnDef.sortable = false;
                            columnDef.sortas = 'string';
                            columnDef.sort = undefined;
                            columnDef.editable = false;
                            columnDef.name = scope.i18n.searchBy + scope.data.header[i] + scope.i18n.search;
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
                                if (def.sortable == undefined) {
                                    def.sortable = false;
                                }
                                if (def.sortas == undefined) {
                                    def.sortas = 'string';
                                }
                                if (def.sort == undefined) {
                                    def.sort = undefined;
                                }
                                if (def.editable == undefined) {
                                    def.editable = false;
                                }
                                _parseTitle(target,def.title);
                                if (target === undefined) {
                                    columnDef = {};
                                    columnDef.data = def.data;
                                    columnDef.title = def.title;
                                    columnDef.visible = def.visible;
                                    columnDef.sortable = def.sortable;
                                    columnDef.sortas = def.sortas;
                                    columnDef.sort = def.sort;
                                    columnDef.render = def.render;
                                    columnDef.editable = def.editable;
                                    columnDef.editorRenderer = def.editorRenderer;
                                    columnDef.class = def.class;
                                    columnDef.width = def.width;
                                    columnDef.group = def.group;
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
                                        for (var j = 0; j < scope.columnDefs.length; j++) {
                                            if ((angular.isNumber(target) && parseInt(scope.columnDefs[j].targets) == parseInt(target)) ||
                                                (angular.isString(target) && scope.columnDefs[j].data == target)) {
                                                exist = true;
                                                if (def.title != undefined) {
                                                    scope.columnDefs[j].title = def.title;
                                                }
                                                if (def.visible != undefined) {
                                                    scope.columnDefs[j].visible = def.visible;
                                                }
                                                if (def.sortable != undefined) {
                                                    scope.columnDefs[j].sortable = def.sortable;
                                                }
                                                if (def.sortas != undefined) {
                                                    scope.columnDefs[j].sortas = def.sortas;
                                                }
                                                if (def.sort != undefined) {
                                                    scope.columnDefs[j].sort = def.sort;
                                                }
                                                if (def.editable != undefined) {
                                                    scope.columnDefs[j].editable = def.editable;
                                                }
                                                scope.columnDefs[j].render = def.render;
                                                scope.columnDefs[j].editorRenderer = def.editorRenderer;
                                                scope.columnDefs[j].class = def.class;
                                                scope.columnDefs[j].width = def.width;
                                                scope.columnDefs[j].group = def.group;
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

                        //generate groupFields

                        for (var i = 0; i < scope.columnDefs.length; i++) {
                            if (scope.columnDefs[i].group) {
                                if (!scope.groupFields) {
                                    scope.groupFields = new Array();
                                    scope.groupTargets = new Array();
                                }
                                if (scope.columnDefs[i].data) {
                                    scope.groupFields.push(scope.columnDefs[i].data);
                                } else {
                                    scope.groupFields.push(undefined);
                                }
                                scope.groupTargets.push(scope.columnDefs[i].targets);

                            }
                        };
                    }
                    //END produceColumnDefs

                    function _addSortArrow(iCol, table) {
                        var ascChar = "▲";
                        var descChar = "▼";

                        var startCol = 0;
                        if(scope.addCheckBox){
                            ++iCol;
                            startCol = 1;
                        }

                        for (var t = startCol; t < table.tHead.rows[0].cells.length; t++) {
                            var th = $(table.tHead.rows[0].cells[t]);
                            var thText = th.html().replace(ascChar, "").replace(descChar, "");

                            if (t != iCol) {
                                th.html(thText);
                            }
                        }

                        var thCell = $(table.tHead.rows[0].cells[iCol]);
                        if (thCell.html().indexOf(ascChar) == -1 && thCell.html().indexOf(descChar) == -1) {
                            thCell.html(thCell.html() + ascChar); //没序先升序
                            table.direction = ['asc', 'desc'];
                        } else if (thCell.html().indexOf(ascChar) != -1) {
                            thCell.html(thCell.html().replace(ascChar, descChar)); //升序改降序
                            table.direction = ['desc', 'asc'];
                        } else if (thCell.html().indexOf(descChar) != -1) {
                            thCell.html(thCell.html().replace(descChar, ascChar)); //降序改升序
                            table.direction = ['asc', 'desc'];
                        }
                    }

                    function _compareElement(columnDef) {
                        return function(tr1, tr2) {
                            if (columnDef.sort == undefined) { //没sort，按sortas，默认sortas is string
                                var val_1 = _convert(tr1[columnDef.data], columnDef.sortas);
                                var val_2 = _convert(tr2[columnDef.data], columnDef.sortas);
                                if (val_1 < val_2) {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            } else {
                                var val_1 = tr1[columnDef.data];
                                var val_2 = tr2[columnDef.data];
                                var ret = columnDef.sort(val_1, val_2);
                                return ret;
                            }
                        };
                    }

                    function _convert(val, sortas) {
                        switch (sortas) {
                            case "int":
                                return parseInt(val, 10);
                            case "float":
                                return parseFloat(val);
                            case "date":
                                return new Date(Date.parse(val));
                            case "string":
                            default:
                                return val.toString();
                        }
                    }

                    function _pageCtrlShow() {
                        scope.pageCtrl = true;
                        if (scope.setting && scope.setting.pageCtrl != undefined) {
                            scope.pageCtrl = scope.setting.pageCtrl
                        }
                    }

                    function _parseTitle(target,title){
                        var isFunction = typeof title === 'function';
                        target =  target || scope.columnDefs.length;
                        if(isFunction){
                            _compileHeads[target]=title(scope.data,target);
                        }
                    }
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

                /*paging国际化处理*/
                $scope.appScope = getTableAppScope();
                initializePagingI18n();
                refreshPagingI18n();

                $scope.currentPage = 0;

                $scope.pageNumber = getPageNumber();

                function initializePagingI18n() {
                    $scope.lang = $scope.lang.toLowerCase();
                    if ($scope.lang == 'zh-cn' || $scope.lang == 'zh_cn') {
                        $scope.i18n = {
                            'total': '共',
                            'records': '条记录',
                            'next': '下一页',
                            'prev': '上一页',
                            'first': '首页',
                            'last': '尾页'
                        }
                    } else {
                        $scope.i18n = {
                            'total': 'Total ',
                            'records': 'Records',
                            'next': 'Next',
                            'prev': 'Prev',
                            'first': 'First',
                            'last': 'Last'
                        }
                    }
                }

                function refreshPagingI18n() {
                    if (!$scope.appScope.i18n) return;
                    $scope.i18n.total = $scope.appScope.i18n.table_total ? $scope.appScope.i18n.table_total : $scope.i18n.total;
                    $scope.i18n.records = $scope.appScope.i18n.table_records ? $scope.appScope.i18n.table_records : $scope.i18n.records;
                    $scope.i18n.next = $scope.appScope.i18n.table_next ? $scope.appScope.i18n.table_next : $scope.i18n.next;
                    $scope.i18n.prev = $scope.appScope.i18n.table_prev ? $scope.appScope.i18n.table_prev : $scope.i18n.prev;
                    $scope.i18n.first = $scope.appScope.i18n.table_first ? $scope.appScope.i18n.table_first : $scope.i18n.first;
                    $scope.i18n.last = $scope.appScope.i18n.table_last ? $scope.appScope.i18n.table_last : $scope.i18n.last;
                }

                function getTableAppScope() {
                    return $scope.TableCtrl.getTableAppScope();
                }

                function getPageNumber() {
                    return $scope.TableCtrl.getTablePageNumber();
                }

                $scope.getPageShow = function() {
                    return $scope.pageNumber == 0;
                }

                $scope.firstPage = function() {
                    if ($scope.currentPage == 0) return;
                    $scope.currentPage = 0;
                    $scope.setCurrentPageToTable();
                }
                $scope.prevPage = function() {
                    if ($scope.currentPage == 0) return;
                    if ($scope.currentPage > 0) {
                        $scope.currentPage--;
                    }
                    $scope.setCurrentPageToTable();
                };
                $scope.nextPage = function() {
                    if ($scope.currentPage == $scope.pageCount()) return;
                    if ($scope.currentPage < $scope.pageCount()) {
                        $scope.currentPage++;
                    }
                    $scope.setCurrentPageToTable();
                };
                $scope.lastPage = function() {
                    if ($scope.currentPage == $scope.pageCount()) return;
                    $scope.currentPage = $scope.pageCount();
                    $scope.setCurrentPageToTable();
                }

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
                    var currentPage = $scope.currentPage + 1;
                    var totalPage = $scope.pageCount() + 1;
                    var pageNumber = parseInt($scope.pageNumber);

                    var distance = (totalPage < pageNumber) ? totalPage : pageNumber;
                    var ret = [];
                    var start = 0; //注意start是从0取的

                    if (currentPage >= Math.ceil(distance / 2)) {
                        start = currentPage - Math.ceil(distance / 2);
                        if (start + distance > totalPage) {
                            start = totalPage - distance;
                        }
                    }

                    for (var i = start; i < start + distance; i++) {
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