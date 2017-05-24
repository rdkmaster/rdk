define(['angular', 'jquery', 'underscore', 'jquery-headfix', 'jquery-gesture',
    'rd.services.DataSourceService', "css!rd.styles.Table", 'css!rd.styles.FontAwesome',
    'css!rd.styles.Bootstrap','rd.controls.Button','css!rd.styles.IconFonts',
    'bootstrap-select','bootstrap','rd.attributes.Scroll',"rd.attributes.Resize"
], function() {

    var tableModule = angular.module('rd.controls.Table', ['rd.core','rd.controls.Button','rd.attributes.Scroll','rd.attributes.Resize']);

    tableModule.run(["$templateCache", function($templateCache) {
        $templateCache.put("/src/templates/common.html",
            '<div>\
            <div class="rdk-table-module rdk-table-search-{{searchPosition}}">\
                <div ng-if="search" class="searchWapper search-position-{{searchPosition}}">\
                    <input type="text" ng-style="width" class="form-control search" placeholder="{{searchPrompt}}" ng-focus="searchFocusHandler()"\
                           ng-keyup="keyPressHandler($event)" ng-class="{\'border-style\':$parent.globalSearch!=\'\' && $parent.globalSearch!=null}" ng-model="$parent.globalSearch" ng-mouseenter="searchMouseEnterHandler()" ng-mouseleave="searchMouseLeaveHandler()">\
                    <i class="glyphicon glyphicon-search search_icon" ng-click="serverSearchHandler()" style="cursor:{{pagingType==\'server\' || pagingType==\'server-auto\' ? \'pointer\' : \'default\'}}"></i>\
                    <div ng-show="($parent.globalSearch && searchFocus)?true:false">\
                        <select selectpicker="{{columnDefs.length}}" ng-model="val" ng-change="selectChangeHandler(val)"\
                                ng-options="columnDef.data as columnDef.name for columnDef in columnDefs | realoption"\
                                class="form-control search_select">\
                            <option value="">{{i18n.searchAll}}</option>\
                        </select>\
                    </div>\
               </div>\
               <div class="wrapper" ng-style="{{scrollStyle}}">\
                    <table class="rdk-table" >\
                        <thead ng-if="!noHeader">\
                            <tr>\
                                <th ng-if="addCheckBox && visibleColumnDefsCount!=0"><input name="totalCheckBox" type="checkbox" ng-click="totalCheck(allChecked)" ng-model="allChecked"></th>\
                                <th ng-repeat="columnDef in columnDefs track by columnDef.targets" on-finish-render="tableHeadNgRepeatFinished" ng-mouseover="cursorHandler($event, columnDef.sortable)" ng-show="columnDef.visible" ng-click="sortHandler($index, columnDef)">\
                                    {{columnDef.title}}\
                                    <i ng-if="columnDef.sortable && !curSortCol($index)" class="rdk-table-icon rdk-table-sort"></i>\
                                    <i ng-if="columnDef.sortable && curSortCol($index)" class="rdk-table-icon" ng-class="{true:\'rdk-table-sort-down\',false:\'rdk-table-sort-up\'}[changeSortIconStatus($index)]"></i>\
                                </th>\
                            </tr>\
                        </thead>\
                        <tbody ng-mouseleave="clearHovered()">\
                            <tr class="rowTr" on-finish-render  rdk-row-parser ng-click="setSelected(item,$event)"\
                                ng-class="{\'row-span\':groupTargets,\'selected-row\':ifRowHighLight(item,\'click\'),\'selected-row-hover\':ifRowHighLight(item,\'hover\')}" ng-dblclick="dbClickHandler(item,$index)">\
                                <td ng-if="addCheckBox"><input type="checkbox" ng-click="singleCheck()" ng-model="currentPageData[$index].checked"></td>\
                                <td ng-class="{\'selected-row-td\':ifRowHighLight(item,\'click\',columnDef),\'selected-row-hover-td\':ifRowHighLight(item,\'hover\',columnDef)}" ng-mouseenter="setHovered(item,$event)" rowspan="{{getRowSpan(itemRowSpan,columnDef)}}" ng-repeat="columnDef in columnDefs" rdk-column-parser ng-show="columnDef.visible" class="{{columnDef.class}}" ng-style="getCellStyle(itemRowSpan,columnDef)">\
                                </td>\
                            </tr>\
                             <tr ng-if="noData">\
                                <td colspan="{{addCheckBox?(visibleColumnDefsCount+1):visibleColumnDefsCount}}">\
                                    <div class="no-data"></div>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>\
                </div>\
                <rdk-paging ng-if="pageVisible && pageCtrl && paging" data-page-size="pageSize" \
                     data-lang="{{lang}}" current-page="currentPage" data-search-position="{{searchPosition}}" ng-class="{true:\'visiblePageLine\', false:\'unvisiblePageLine\'}[columnDefs.length!=0 && !noData]">\
                </rdk-paging>\
                <div ng-if="showExport && !noData" class="table-export"><rdk_button click="touchExport" icon="iconfont iconfont-e8c9" label="{{exportLabel}}"></rdk_button></div>\
                <div class="clearfix"></div>\
            </div>\
            </div>'
        );

        $templateCache.put("/src/templates/paging.html",
            '<div class="pagingLine">\
                <span class="disabledRecords spanRecords search-{{searchPosition}}">{{i18n.total}} {{count}} {{i18n.records}}</span>\
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
        $templateCache.put("/src/templates/pagingGoTo.html",
            '<div class="pagingLine page-contain">\
                <span class="disabledRecords spanRecords search-{{searchPosition}}">{{i18n.total}} {{count}} {{i18n.records}}</span>\
                <ul class="pagination">\
                    <li ng-class="prevPageDisabled()"> \
                        <a href ng-click="firstPage()" ng-class="{true:\'disabledRecords\', false:\'enabledRecords\'}[currentPage==0]">\
                            <i class="iconfont iconfont-e8e1" aria-hidden="true"></i>\
                        </a>\
                    </li>\
                    <li ng-class="prevPageDisabled()">\
                        <a href ng-click= "prevPage()" ng-class="{true:\'disabledRecords\', false:\'enabledRecords\'}[currentPage==0]">\
                            <i class="iconfont iconfont-e8df" aria-hidden="true"></i>\
                        </a>\
                    </li>\
                    <li>\
                        <span class="regularRecords">\
                        <input type="text"  class="regular_left" ng-model="inpPageVal" ng-keydown="test()" ng-keyup="gotoPageHandle($event)" ng-blur="pageBlurHandle()">\
                        <i class="regular_right">  /  {{pageCount()+1}}</i></span>\
                    </li>\
                    <li ng-class="nextPageDisabled()"> \
                        <a href ng-click="nextPage()" ng-class="{true:\'disabledRecords\', false:\'enabledRecords\'}[currentPage==pageCount()]">\
                             <i class="iconfont iconfont-e8e0" aria-hidden="true"></i>\
                        </a>\
                    </li>\
                    <li ng-class="nextPageDisabled()"> \
                        <a href ng-click="lastPage()" ng-class="{true:\'disabledRecords\', false:\'enabledRecords\'}[currentPage==pageCount()]">\
                            <i class="iconfont iconfont-e8e2" aria-hidden="true"></i>\
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
        .filter('fieldfilter', function(){
            return function(data, searchFields, globalSearch){
                if((!searchFields)||(searchFields.length != 1)) return data;
                var array = [];
                angular.forEach(data, function(obj){
                    var fieldStr = obj[searchFields[0]];
                    if(fieldStr.toString().toLowerCase().indexOf(globalSearch.toLowerCase()) != -1){
                        array.push(obj);
                    }
                })
                return array;
            }
        })
        //页面中获取过滤后的数组长度
        .filter('size', function() {
            return function (items) {
                if (!items)
                    return 0;
                return items.length
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
                                '<input class="editInput" ng-model="item[columnDef.data]"  ng-keyup="inputPressHandler($event, item.$index, columnDef,itemRowSpan,$parent.$index)" ng-blur="editorBlurHandler($event, item.$index, columnDef,itemRowSpan,$parent.$index)">' +
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
        });
    tableModule.directive('rdkTable', ['DataSourceService', 'EventService', 'EventTypes', 'Utils', '$timeout', '$compile',function(DataSourceService, EventService, EventTypes, Utils, $timeout,$compile) {
        var scopeDefine={
            id: '@',
            setting: '=?',
            data: '=?',
            selectedIndex: '=?',
            pageSize: "@?",
            pagingType: "@?",
            pagingVisible: "@?",
            lang: "@?",
            search:"=?",
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
            export: "&?",
            searchPosition:"@?",
            searchWidth:"@?",
            exportLabel:"@?",
            showExport:"=?",
            resize:"@?",
        };
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '/src/templates/common.html',
            controller: ['$scope', function(scope) {

                Utils.publish(scope, this);

                this.setCurrentPage = function(_currentPage) {
                    scope.currentPage = _currentPage;
                    scope.proxyDs = Utils.compile(scope.$parent, scope.proxyDs);
                    if (scope.pagingType == "server") {
                        _loadDataFromServer();
                    } else if (scope.pagingType == "server-auto") {
                        _loadDataFromPagingService();
                    }
                };

                this.resetCurrentPage = function(){
                    scope.currentPage = 0;
                }

                this.getTablePageNumber = function() {
                    return scope.pageNumber;
                }

                this.setPageSize = function(_pageSize){
                    if(scope.pageSize == _pageSize) return;
                    scope.pageSize = _pageSize;

                    var ctrl = this;
                    $timeout(function(){
                        var maxCount = ctrl.pageCtrl.pageCount();
                        if(scope.currentPage > maxCount){
                            scope.currentPage = maxCount;
                        }
                        ctrl.pageCtrl.setPage(scope.currentPage);
                    }, 0);
                }

                this.getGlobalSearch = function(){
                    if(!scope.search) return;
                    return scope.globalSearch;
                };

                this.getCurrentPage = function(){
                    return scope.currentPage;
                };

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
                    scope.defaultSearchHandler();
                    var searchObject = {};
                    searchObject.searchKey = scope.globalSearch;
                    searchObject.searchFields = _getSearchFields();
                    return searchObject;
                }

                this.scrollTo=function(index){
                    scope.highLightItem(index);
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

                function _getSearchFields(){
                    return scope.globalSearch == '' ? [] : scope.searchFields;//后端过滤要求:空字符串时，fields填空数组
                }

                function _loadDataFromServer() {
                    var ds = DataSourceService.get(scope.proxyDs);
                    if (!ds) {
                        console.error('need a datasource when pagingType=="server"');
                        return;
                    }
                    var attachCondition = {};
                    attachCondition.paging = {};
                    attachCondition.paging.currentPage = scope.currentPage + 1;
                    attachCondition.paging.pageSize = scope.pageSize;
                    if (scope.sortField && scope.directionStr) {
                        attachCondition.orderBy = {};
                        attachCondition.orderBy.field = scope.sortField;
                        attachCondition.orderBy.direction = scope.directionStr;
                    }
                    if ((scope.search) && (scope.pagingType == "server" || scope.pagingType == "server-auto")) {
                        scope.defaultSearchHandler();
                        attachCondition.search = {};
                        attachCondition.search.searchKey = scope.globalSearch;
                        attachCondition.search.searchFields = _getSearchFields();
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

                function _loadDataFromPagingService() {
                    var ds = DataSourceService.get(scope.proxyDs);
                    if (!ds) {
                        console.error('need a datasource when pagingType=="server-auto"');
                        return;
                    }
                    ds.query(scope.baseCondition, { "directQuery": true, "supressEvent": false });
                }
            }],
            scope: scopeDefine,
            compile: function(tElement, tAttributes) {
                Utils.checkEventHandlers(tAttributes,scopeDefine);
                if (!tAttributes.hasOwnProperty('proxyDs')) {
                    tAttributes.proxyDs = tAttributes.ds;
                }

                Utils.bindDataSource(tAttributes, 'data', 'proxyDs');

                //暂留rowFilter,后期实现search功能
                var rowFilter = "";

                rowFilter += "| filter:globalSearch";

                var pagingFilter = "";
                pagingFilter += " | offset: currentPage:pageSize |limitTo: pageSize";

                var searchFieldFilter = "";
                searchFieldFilter = " | fieldfilter: searchFields : globalSearch";

                var filterCount = "";

                //filterCount = "$filtered = (destData| filter:globalSearch) | offset: currentPage:pageSize |limitTo: pageSize | fieldfilter: searchFields : globalSearch |size";
                filterCount = "$filtered = (destData| filter:globalSearch) | fieldfilter: searchFields : globalSearch |size";

                if (tAttributes.pagingType !== "server" && tAttributes.pagingType !== "server-auto") {
                    tElement.find("rdk-paging").attr("count", filterCount);
                    tElement[0].querySelector(".rowTr").setAttribute("ng-repeat", "item in $filtered = (destData" + rowFilter + ")" + pagingFilter + searchFieldFilter);
                } else {
                    tElement.find("rdk-paging").attr("count", "data.paging.totalRecord");
                    tElement[0].querySelector(".rowTr").setAttribute("ng-repeat", "item in $filtered = destData");
                }

                if(tAttributes.customScroll=="rdk-scroll" && tAttributes.rdkScroll == null){
                    tElement[0].querySelector(".wrapper").setAttribute("rdk-scroll","");
                }

                if(tAttributes.pageNumber === "-1"){
                    tElement.find("rdk-paging").attr("page-goto", true);
                }

                if(!!tAttributes.resize){
                    var tableElement=tElement[0].querySelector(".rdk-table");
                    tableElement.setAttribute("resizeable","");
                    tableElement.setAttribute("mode","resizeMode");
                    tableElement.setAttribute("id","rdkTable{{$id}}");
                    tableElement.style.tableLayout="fixed";
                }

                return function link(scope, element, attrs, ctrl) {
                    scope.getRowSpan = function(itemRowSpan, item) {
                        return itemRowSpan && itemRowSpan[item["targets"]] ? itemRowSpan[item["targets"]] : 1;
                    }

                    _init();

                    scope.showExport = Utils.isTrue(scope.showExport, false);
                    scope.searchWidth = Utils.getValue(scope.searchWidth, attrs.searchWidth, "168px");
                    scope.exportLabel = Utils.getValue(scope.exportLabel, attrs.exportLabel, "");
                    scope.resizeMode = Utils.getValue(scope.resize, attrs.resize, "BasicResizer");

                    scope.touchExport = function() {
                        EventService.raiseControlEvent(scope, EventTypes.EXPORT, null)
                    };
                    scope.width = {
                        "width":scope.searchWidth
                    }

                    var curSortIndex;
                    var sortIconStatus=true;

                    function _init() {

                        if (angular.isUndefined(scope.proxyDs) && (scope.pagingType == "server" || scope.pagingType == "server-auto")) {
                            console.error('Table with server as pagingType must provide ds attribute');
                            return;
                        }

                        if (scope.proxyDs) {
                            EventService.register(scope.proxyDs, EventTypes.BEFORE_QUERY, function(event, data) {
                                curSortIndex=-1; //重置排序索引
                                scope.baseCondition = data.condition;
                                scope.sortField = undefined;    //重新发起查询后需要重置sort
                            });

                            if (scope.pagingType == 'server-auto') {
                                EventService.register(scope.proxyDs, EventTypes.CREATE, _initAjaxConfigProcessor);
                            }

                            function _initAjaxConfigProcessor(event, ds) {
                                EventService.remove(scope.proxyDs, EventTypes.CREATE, _initAjaxConfigProcessor);
                                ds.ajaxConfigProcessor = _ajaxConfigProcessor;
                            }

                            function _ajaxConfigProcessor(config) {
                                var url = config.url;
                                if (url[0] != '/') {
                                    var baseURI = document.head.baseURI.substring(location.origin.length);
                                    url = baseURI + url;
                                }

                                var key = config.method == 'get' ? 'params' : 'data';
                                var param = {
                                    peerParam: config[key],
                                    service: url,
                                    paging: {
                                        currentPage: Number(scope.currentPage+1),
                                        pageSize: Number(scope.pageSize)
                                    }
                                }
                                if (!!scope.globalSearch) {
                                    param.filter = {
                                        key: scope.globalSearch,
                                        field: scope.searchFields
                                    }
                                }
                                if (!!scope.sortField && !!scope.directionStr) {
                                    var sortas = scope.columnDefs[scope.data.field.indexOf(scope.sortField)].sortas;
                                    param.sort = {
                                        order: scope.directionStr,
                                        field: scope.sortField,
                                        as: sortas
                                    }
                                }
                                config[key] = param;
                                config.url = '/rdk/service/app/common/paging';

                                return config;
                            }

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
                        if (scope.pagingType == 'server') {
                            console.warn('pagingType="server" is deprecated, try pagingType="server-auto" instead.');
                        }

                        scope.currentPage = 0;

                        //appScope 为列渲染器提供可能
                        scope.appScope = Utils.findAppScope(scope);

                        //控制分页的显示
                        scope.pageCtrl = angular.isDefined(scope.pageCtrl) ? scope.pageCtrl : true;

                        //选中行高亮
                        scope.selectedModel = {
                            rows:[],
                            cols:[]
                        };
                        scope.hoveredModel = {
                            rows:[],
                            cols:[]
                        };

                        //启用搜索功能
                        scope.search = Utils.getValue(scope.search, attrs.search, false);

                        if(scope.search){
                            scope.searchPosition = (scope.searchPosition == 'bottom') ? 'bottom' : 'top';
                        }

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

                        scope.selectable=angular.isDefined(scope.setting) && angular.isDefined(scope.setting.selectable) ? scope.setting.selectable:true;

                        scope.compileHeads={};//需要被编译的表头对象
                        _searchGapClick();//只要有search

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
                        };
                        //搜索框在底部时，搜索框遮住了总记录数
                        if(attrs.pageNumber=="-1" && attrs.searchPosition =="bottom")
                        {
                            scope.searchMouseLeaveHandler =function(){
                                scope.searchPrompt="Total "+ scope.data.data.length + " Records";
                            };
                            scope.searchMouseEnterHandler =function(){
                                scope.searchPrompt="Search";
                            };

                        }else{
                            scope.searchPrompt="Search";
                        }

                        scope.$watch("data", function(newVal, oldVal) {
                            if($.isEmptyObject(newVal)) return;
                            scope.currentPage = 0;
                            _reloadLocalData();
                            if (scope.pagingType == "server" || scope.pagingType == "server-auto") {
                                scope.currentPage = scope.data.paging ? (scope.data.paging.currentPage - 1) : 0;
                            }
                            if (ctrl.pageCtrl) {
                                $timeout(function(){
                                    ctrl.pageCtrl.setPageByTable(scope.currentPage);
                                }, 0);
                            }
                        }, true);

                        scope.$watch("$filtered", function(newVal, oldVal) {
                            if (newVal) {
                                if (angular.isDefined(attrs.id)) {
                                    EventService.broadcast(attrs.id, EventTypes.PAGING_DATA_CHANGE, newVal);
                                }
                                _resetCurrentPageData(newVal);
                            }
                        }, true);

                        scope.$watch("currentPage", function(newVal, oldVal) {
                            if (newVal) {
                                if (angular.isDefined(attrs.id)) {
                                    EventService.broadcast(attrs.id, EventTypes.PAGING_NUMBER_CHANGE, newVal);
                                }
                            }
                        }, true);

                        scope.$watch("setting.columnDefs", function(newVal, oldVal) {
                            if (newVal != oldVal) {
                                _reloadLocalData();
                            }
                        }, true);

                        scope.$watch("compileHeads", function(newVal, oldVal) {
                            if (newVal != oldVal) {
                                _restTableHeaders(oldVal);
                                _reSetTableHeaders();
                            }
                        }, true);

                        scope.$watch("globalSearch", function(newVal, oldVal) {
                            if (newVal != oldVal) {
                                if (scope.pagingType == "server" || scope.pagingType == "server-auto") return; //#115
                                ctrl.setChecked([]);
                                if (ctrl.pageCtrl) {
                                    ctrl.pageCtrl.firstPage();
                                }
                            }
                        }, true);

                        scope.$watch('search',function(newVal){
                            if(!newVal){
                                scope.globalSearch = '';
                            }
                        });
                        scope.getCellStyle = function(itemRowSpan,columnDef){
                            var destObj = {};
                            if (itemRowSpan && itemRowSpan[columnDef["targets"]] == 0) {
                                destObj.display="none";
                            }
                            destObj.width = columnDef.width;
                            if(scope.setting && scope.setting.scrollX){
                                destObj.cursor = 'move';
                            }
                            return destObj;
                        }

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
                            scope.defaultSearchHandler();
                            if(event.keyCode == 13){
                                scope.serverSearchHandler();
                            }
                        }

                        scope.serverSearchHandler = function(){
                            if(scope.globalSearch == undefined || (scope.pagingType != 'server' && scope.pagingType != 'server-auto')) return;
                            scope.currentPage = 0;
                            ctrl.setCurrentPage(scope.currentPage);
                        }

                        scope.defaultSearchHandler = function(){
                            scope.globalSearch = scope.globalSearch || '';
                            if((!scope.searchFields) || (scope.searchFields.length == 0)){//没交互时给默认值
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
                                //$(lastDivTarget.childNodes[0]).val($(lastDivTarget.childNodes[0]).attr("value"));
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
                            var cells = [];
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

                            scope.data.data[row][column] = $(inputTarget).val();
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
                            if(curSortIndex!==iCol){
                                sortIconStatus=true;
                            }
                            sortIconStatus=!sortIconStatus;
                            var table = element[0].querySelector('.sticky-enabled');
                            if (scope.pagingType == "server" || scope.pagingType == "server-auto") {
                                scope.serverSortCache = true;
                                if (curSortIndex == iCol) {
                                    _loadSortDataFromServer(columnDef.data, sortIconStatus?'desc':'asc');
                                } else { //不是先前列
                                    _loadSortDataFromServer(columnDef.data, 'asc');
                                }
                                EventService.register(scope.innerID, EventTypes.TABLE_READY, function() {
                                    table.sortCol = iCol;
                                });
                            } else {
                                if (curSortIndex == iCol) {
                                    scope.destData.reverse();
                                } else {
                                    scope.destData.sort(_compareElement(columnDef)); //从小到大排
                                }
                            }
                            curSortIndex=iCol;
                        };
                        scope.curSortCol=function(index){
                            return curSortIndex===index;
                        };
                        scope.changeSortIconStatus=function(index){
                            return curSortIndex===index &&  sortIconStatus;
                        };

                        scope.ifRowHighLight = function(item,type,columnDef){
                            if(!scope.selectable){
                                return
                            }
                            if(type==="click"){
                                if(!columnDef){
                                    return Utils.contains(scope.selectedModel.rows,item,true)!=-1 && scope.selectedModel.cols.length==0;
                                }else{
                                    return Utils.contains(scope.selectedModel.rows,item,true)!=-1 && scope.selectedModel.cols.indexOf(columnDef.targets)!=-1;
                                }
                            }else if(type==="hover"){
                                if(!columnDef){
                                    return  Utils.contains(scope.hoveredModel.rows,item,true)!=-1 && scope.hoveredModel.cols.length==0;
                                }else{
                                    return Utils.contains(scope.hoveredModel.rows,item,true)!=-1 && scope.hoveredModel.cols.indexOf(columnDef.targets)!=-1;
                                }
                            }
                        };
                        scope.setSelected = function(item, event) {
                            if(!scope.selectable){
                                return
                            }
                            if(event!=null){
                                scope.selectedModel = _setRowHighLight(item,event.target);
                            }else{
                                scope.selectedModel.rows[0]=item;
                            }
                            EventService.raiseControlEvent(scope, 'select', item);
                        };
                        scope.setHovered = function(item, event) {
                            if(!scope.selectable){
                                return
                            }
                            scope.hoveredModel = _setRowHighLight(item,event.target);
                        };
                        scope.clearHovered = function() {
                            scope.hoveredModel = {
                                rows:[],
                                cols:[]
                            };
                        };
                        function _setRowHighLight(rowItem,targetNode){
                            var highLight = {
                                rows:[],
                                cols:[]
                            };
                            var tdDom=_findParentTdByChild(targetNode);
                            if (!tdDom) {
                                return highLight;
                            }
                            var rowSpanCount = parseInt(tdDom.getAttribute("rowSpan"));
                            if(rowSpanCount!=1)
                            {
                                for(var i=0 ; i<rowSpanCount ; i++)
                                {
                                    highLight.rows.push(scope.$filtered[rowItem.$index+i]);
                                }
                            }
                            else{
                                var tds = tdDom.parentNode.querySelectorAll("td[rowSpan]");
                                for(var k= 0,len=tds.length ; k<len ; k++)
                                {
                                    if(tds[k].getAttribute("rowSpan") == "1"){
                                        highLight.cols.push(k);
                                    }
                                }
                                highLight.rows.push(rowItem);
                            }
                            return highLight;
                        }

                        function _findParentTdByChild(node){
                            while (node && node.nodeName!="TD"){
                                node=node.parentNode;
                            }
                            return node;
                        }

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

                        scope.refreshSingleCurrentPage = function(){
                            scope.currentPageData = scope.getCurrentPageDataArr();
                            scope.refreshTotal4Single();
                        }

                        scope.refreshTotalCurrentPage = function(isChecked){
                            scope.currentPageData = scope.getCurrentPageDataArr();
                            _refreshCurrentSingleChecked(isChecked);
                        }

                        scope.getCurrentPageDataArr = function(){
                            if(scope.pagingType == "server" || scope.pagingType == "server-auto") {
                                return scope.destData;
                            }
                            var currentPage = parseInt(scope.currentPage, 10);
                            var pageSize = parseInt(scope.pageSize, 10);
                            var start = currentPage * pageSize;
                            return scope.destData.slice(start, start+pageSize); //子数组
                        }

                        scope.refreshTotal4Single = function(){
                            var isChecked = _isAllChecked();
                            scope.allChecked = isChecked;//双绑没生效，后面用dom找
                            _resetTotalCheckedDom(isChecked);
                        }
                        var isFirstBroadCast=true;
                        scope.$on('ngRepeatFinished', function() {
                            _fixTableHeader();
                            scope.refreshSingleCurrentPage();
                            _serverSortResponse();//后端排序，刷新后的响应
                            scope.$watch("selectedIndex", function(newVal, oldVal) { //根据selectedIndex高亮显示
                                if (newVal != undefined) {
                                    if (scope.selectedIndex != undefined) {
                                        _highLightItem(scope.selectedIndex);
                                    }
                                }
                            }, true);
                            if(attrs.pageNumber=="-1" && attrs.searchPosition =="bottom"){
                                scope.searchPrompt="Total "+ scope.data.data.length + " Records";
                            }
                            if(attrs.resize && isFirstBroadCast){
                                EventService.broadcast('rdkTable_'+scope.$id, EventTypes.READY,null);
                                isFirstBroadCast=false;
                            }
                        });
                        scope.$on('tableHeadNgRepeatFinished', function() {
                            _reSetTableAddHeaders(); //多级表头
                            _reSetTableHeaders(); //自定义表头
                        });

                    };
                    //END INIT

                    function _resetCurrentPageData(newVal){
                        scope.currentPageData = newVal.concat();
                    }

                    function _fixTableHeader(){
                        _beforeFixHeader();
                        $(element.find("table")).fixHeader();//wrapper->[sticky-wrap]->sticky-enabled->[sticky-thead]
                        _afterFixHeader();
                        if(scope.floatableHeader) return;
                        $(element[0].querySelector('.sticky-thead')).remove();
                    }

                    function _beforeFixHeader(){
                        if($(element).has($('.sticky-wrap')).length != 0){
                             $(element[0].querySelector('.sticky-enabled')).unwrap();
                        }
                        if($(element).has($('.sticky-thead')).length != 0){
                            $(element[0].querySelector('.sticky-thead')).remove();
                        }
                    }

                    function _afterFixHeader(){
                        if(scope.setting && scope.setting.scrollX && attrs.customScroll!=="rdk-scroll") {
                            var handDragElement = element[0].querySelector(".sticky-wrap");//拖动产生在这层
                            $(handDragElement).addClass("sticky-wrap-overflow");
                        }
                        if(scope.addCheckBox){
                            $compile($(element[0].querySelector('.sticky-thead th:first-child')))(scope);
                        }
                    }

                    function _refreshCurrentSingleChecked(isChecked){
                        _resetTotalCheckedDom(isChecked);
                        angular.forEach(scope.currentPageData, function(rowData){
                            rowData.checked = isChecked;
                        })
                    }

                    function _searchGapClick(){
                        if(!scope.search) return;
                        $(document).mouseup(function(e){
                            var searchWrapper = element[0].querySelector('.searchWapper');
                            if(!$(searchWrapper).is(e.target) && $(searchWrapper).has(e.target).length === 0){
                                scope.searchFocus = false;
                            }
                            Utils.safeApply(scope);
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

                    function _resetTotalCheckedDom(isChecked){
                        _resetTotalCheckStatus(isChecked);
                        _resetFixHeadCheckStatus(isChecked);
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
                        var originTable = element.find('.sticky-enabled');
                        var arr = originTable.find('input[name="totalCheckBox"]');
                        if(arr.length == 0) return;
                        arr[0].checked = isChecked;
                    }

                    function _resetFixHeadCheckStatus(isChecked){
                        if(!scope.floatableHeader) return;
                        var copyTable = element.find('.sticky-thead');
                        var arr = copyTable.find('input[name="totalCheckBox"]');
                        if(arr.length == 0) return;
                        arr[0].checked = isChecked;
                    }

                    function _isAllChecked(){
                        if(scope.currentPageData.length == 0) return false;
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
                        scope.sortField = field;
                        scope.directionStr = direction;
                        ctrl.setCurrentPage(scope.currentPage);
                    }
                    //根据index索引指定行选中并高亮
                    scope.highLightItem = _highLightItem;
                    function _highLightItem(index) {
                        if (scope.destData && +index < scope.destData.length) { //destData有定义时
                            var selectedItem = scope.destData[index];
                            scope.setSelected(selectedItem, null);
                            var scrollIndex = +index+1;
                            var selector;
                            if(!!element[0].scrollIntoViewIfNeeded){
                                selector = ".rdk-table>tbody>tr:nth-of-type(" + scrollIndex + ")";
                                element[0].querySelector(selector).scrollIntoViewIfNeeded();
                            }else{
                                //兼容IE,火狐不支持scrollIntoViewIfNeeded
                                scrollIndex = scrollIndex>3 ? scrollIndex-3 : 1;
                                if(scrollIndex>1){
                                    selector = ".rdk-table>tbody>tr:nth-of-type(" + scrollIndex + ")";
                                }else{
                                    selector = ".rdk-table>thead";
                                }
                                element[0].querySelector(selector).scrollIntoView();
                            }

                        }
                    }

                    var _hasAddTrReady=false; //标记多级表头的Html字符串是否插入到模板中
                    function _reSetTableHeaders(){
                        var thead = element[0].querySelector('thead');
                        var ths=thead.querySelector("tr:last-child").querySelectorAll("th[ng-repeat]");
                        //创建一个节点包裹自定义表头渲染的DOM元素
                        var customHeader="<div class='rdk-table-custom-header'>";
                        var customHeaderEndTag="</div>";
                        for(var key in scope.compileHeads)
                        {
                            for(var i= 0,thLen=ths.length;i<thLen;i++){
                                if(scope.compileHeads.hasOwnProperty(key) && key==i){
                                    var th= $compile(customHeader + scope.compileHeads[key] + customHeaderEndTag)(scope.appScope);
                                    $(th).on("click",function(event){
                                        var evt = event || window.event;
                                        evt.stopPropagation();
                                    });
                                    if(ths[i].querySelector(".rdk-table-custom-header")){
                                        $(ths[i].querySelector(".rdk-table-custom-header")).remove();
                                    }
                                    $(ths[i]).prepend(th);
                                }
                            }
                        }
                    }
                    //重置表头自定义的列渲染，删除已渲染好的节点元素
                    function _restTableHeaders(compileHeads){
                        var thead = element[0].querySelector('thead');
                        var ths=thead.querySelector("tr:last-child").querySelectorAll("th[ng-repeat]");
                        for(var i= 0,thLen=ths.length;i<thLen;i++) {
                            for (var key in compileHeads) {
                                if (compileHeads.hasOwnProperty(key) && key == i) {
                                    ths[i].querySelector(".rdk-table-custom-header").innerHTML = null;
                                }
                            }
                        }
                    }
                    function _reSetTableAddHeaders(){
                        if(_hasAddTrReady){
                            return;
                        }
                        if(!!scope.setting && scope.setting.additionalHeader){
                            var thead = element[0].querySelector('thead');
                            if(thead==null){ //没有表头则创建
                                var table = element[0].querySelector('table');
                                thead=document.createElement("thead");
                                $(table).prepend(thead);
                            }
                            var template=angular.element(scope.setting.additionalHeader);
                            var trs= $compile(template)(scope.appScope);
                            $(thead).prepend(trs);
                        }
                        _hasAddTrReady=true;  //表头已重定义
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
                        } else if (scope.setting && scope.setting.noHeader) {
                            scope.noHeader = true;
                        } else {
                            scope.noHeader = false;
                        }

                        scope.destData = _convertToObject(scope.data);
                        if((scope.destData.length == 0) && (scope.addCheckBox)){
                            ctrl.setChecked([]);
                        }
                        scope.columnDefs = [];
                        scope.groupFields = undefined;
                        //预留以实现自定义列的Group
                        scope.groupTargets = undefined;
                        //scrollStyle
                        if (scope.setting && scope.setting.scrollX && attrs.customScroll!=="rdk-scroll") {
                            scope.scrollStyle = "overflow:auto;width:100%;";
                            first = true;
                            $(element.find("tbody")).touchEvent("swipe", "detouch");
                            $(element.find("tbody")).touchEvent("swipe", "touch", _move);
                        }

                        _produceColumnDefs();
                        _produceVisibleColumnDefsCount();
                        _pageCtrlShow();
                    }
                    //END RELOADLOCALDATA

                    function _move(e) {
                        if (first) {
                            first = false;
                            scrollWidth = element[0].querySelector(".rdk-table").offsetWidth - element[0].offsetWidth;
                            stickyWrapElement = element[0].querySelector(".sticky-wrap");//拖动作用在这层
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

                    function _produceVisibleColumnDefsCount(){
                        var count = scope.columnDefs.length;
                        angular.forEach(scope.columnDefs, function(columnDef){
                            if(columnDef.visible == false){
                                count--;
                            }
                        });
                        scope.visibleColumnDefsCount = count;
                    }

                    function _produceColumnDefs() {
                        scope.columnDefs = [];
                        scope.compileHeads={};
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
                            columnDef.hasSort=false; //此列是否有点击过进行排序
                            //columnDef.sortIconStatus=true;  todo:数据刷新columnDefs会被重置
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
                                    columnDef.targets = scope.columnDefs.length;
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
                        if(isFunction){
                            if(target!==0){
                                target =  target || scope.columnDefs.length;
                            }
                            scope.compileHeads[target]=title(scope.data,target);
                        }
                    }
                }
            }
        }
    }]);


    tableModule.directive('rdkPaging', ['Utils', function(Utils) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: function(elem, attr){
                if(attr.pageGoto=="true"){
                    return '/src/templates/pagingGoTo.html';
                }else{
                    return '/src/templates/paging.html'
                }
            },
            require: "^rdkTable",
            scope: {
                count: "=",
                pageSize: "=",
                lang: "@",
                searchPosition:"@?",
                currentPage:"="
            },
            link: function($scope, element, attrs, TableCtrl) {
                $scope.TableCtrl = TableCtrl;
                $scope.TableCtrl.pageCtrl = $scope;
                /*paging国际化处理*/
                $scope.appScope = getTableAppScope();
                initializePagingI18n();
                refreshPagingI18n();

                $scope.currentPage = Utils.getValue($scope.currentPage, attrs.currentPage, 0);

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
                    var pageCount = $scope.pageCount()
                    if ($scope.currentPage == pageCount) return;
                    if ($scope.currentPage < pageCount) {
                        $scope.currentPage++;
                    }
                    $scope.setCurrentPageToTable();
                };
                $scope.lastPage = function() {
                    if ($scope.currentPage == $scope.pageCount()) return;
                    $scope.currentPage = $scope.pageCount();
                    $scope.setCurrentPageToTable();
                };
                $scope.gotoPage = function(pageVal) {
                    if (pageVal==null) return;
                    $scope.currentPage = pageVal;
                    $scope.setCurrentPageToTable();
                };
                $scope.inpPageVal = $scope.currentPage+1;
                $scope.gotoPageHandle=function(event){
                    var e = event || window.event;
                    $scope.inpPageVal=$scope.inpPageVal.toString().replace(/\D/g,'');
                    if($scope.inpPageVal!="" && $scope.inpPageVal<=0){
                        $scope.inpPageVal=1;
                    }
                    else if($scope.inpPageVal>$scope.pageCount()+1){
                        $scope.inpPageVal = $scope.pageCount()+1;
                    }
                    if(e && e.keyCode==13){ // enter 键
                        !!$scope.inpPageVal && $scope.gotoPage($scope.inpPageVal-1);
                    }
                };
                $scope.pageBlurHandle=function(){
                    $scope.inpPageVal=$scope.currentPage+1;
                };
                $scope.$watch('currentPage',function(newVal,oldVal){
                    $scope.inpPageVal = newVal+1;
                });

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