define(['angular', 'jquery', 'rd.core', 'css!rd.styles.TabSelector',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function(){

    var tabSelectorApp = angular.module('rd.controls.TabSelector',['rd.core']);
    tabSelectorApp.directive('rdkTabSelector', ['Utils',function (Utils) {
        return {
            restrict: 'E',
            template:
                '<div class="rdk-tabselector-module" ng-click="stopPropagation()">\
                    <ul class="nav nav-tabs">\
                        <li ng-repeat="tab in tabs" ng-show="tab.shown" ng-class="{true:\'active\',false:\'inactive\'}[tab.selected]">\
                            <a href="javascript:void(0)" ng-click="activeTab(tab)">{{tab[labelField]}}</a>\
                        </li>\
                    </ul>\
                    <rdk_basic_selector change="selectorChangeHandler" selected_items="currentSelectedItems" class="tabs-content-border" data="currentItems"\
                        label_field="labelField" track_item_by="{{trackItemBy}}"\
                        multiple_select="multipleSelect"\
                        searchable="searchable" editable="editable">\
                        </rdk_basic_selector>\
                </div>',
            replace: true,
            scope: {
                id: '@?',

                nodeField: '=?',

                labelField: '=?',
                trackItemBy: '@?',
                multipleSelect: '=?',
                searchable: '=?',
                editable: '=?',

                selectedItems: '=?',
                data: '=?',

                childChange: '&?',
            },
            controller: ['$scope', function(scope){
                Utils.onChildChange(scope, scope.childChange(scope));
            }],
            compile: function(tEle, tAttrs) {
                Utils.bindDataSource(tAttrs, 'data');
                return {
                    post: _link
                }
            }
        };

        function _link(scope, iEle, iAttrs, ctrl, transclude) {

            _init();
            _renderData();

            scope.$watch('data', function(newVal, oldVal) {
                _renderData();
            }, true);

            scope.$watch('selectedItems', function(newVal, oldVal) {
                _renderData();
            }, true);

            function _init(){
                scope.nodeField = Utils.getValue(scope.nodeField, iAttrs.nodeField, 'node');
                scope.labelField = Utils.getValue(scope.labelField, iAttrs.labelField, 'label');
                scope.trackItemBy = Utils.getValue(scope.trackItemBy, iAttrs.trackItemBy, scope.labelField);
                scope._trackItemBy = scope.trackItemBy ? scope.trackItemBy.trim().split(/\s*,\s*/) : [scope.labelField];
                scope.multipleSelect = Utils.isTrue(iAttrs.multipleSelect, true);
                scope.searchable = Utils.isTrue(iAttrs.searchable, false);
                scope.editable = Utils.isTrue(iAttrs.editable, false);
                
                scope.activeTab = _activeTab;
                scope.selectorChangeHandler = _selectorChangeHandler;
                scope.stopPropagation = _stopPropagation;
            }

            function _stopPropagation(){
                event.stopPropagation();
            }

            function _renderData(){
                if (!scope.data || !scope.data.classes) return;
                _initializeData();
                _activeNextTab();//首次首页
                _renderSelectedItems();//选中
            }

            function _renderSelectedItems(){
                for(var i=0; i<scope.tabs.length; i++){
                    if(!scope.tabs[i].currentItems) break;
                    _activeTab(scope.tabs[i]);//激活当前
                    _selectorChangeHandler(null, scope.selectedItemsCache);//是否呈现下一页
                }
                _activeTab(scope.tabs[0]);//激活首页
            }

            function _initializeData(){
                scope.tabs = [];
                $.extend(true, scope.tabs, scope.data.classes);//防止内部变化触发watch

                scope.currentItems = scope.data[scope.nodeField];//数据初始化
                scope.currentSelectedItems = [];
                scope.currentIndex = -1;

                _intializeSelectedItems();//scope.selectedItemsCache
            }

            function _selectorChangeHandler(event, data){
                var curSelItems = _getCurrentTabSelectedItems(data, scope.currentItems);
                scope.tabs[scope.currentIndex].selectedItems = curSelItems;

                if(curSelItems.length == 1){            
                    _itemSelectHandler(curSelItems[0]);
                }
                else{
                    _deActiveNextTab();
                }
            }           

            function _activeTab(tab){
                angular.forEach(scope.tabs, function(t) {
                    t.selected = t == tab;//只选中当前tab
                });
                tab.shown = true;
                scope.currentItems = tab.currentItems;
                scope.currentIndex = tab.index;  
                scope.currentSelectedItems = tab.selectedItems;       
            }

            function _deActiveNextTab(){
                //所有tab都不选中不显示，只显示当前tab
                var item;
                for (var i = scope.currentIndex; i < scope.tabs.length; i++) {
                    item = scope.tabs[i];
                    if (!item) {
                        continue;
                    }
                    item.selected = i==scope.currentIndex;
                    item.shown = i==scope.currentIndex;
                    item.selectedItems = (i==scope.currentIndex?item.selectedItems:[]);
                }
            }

            function _activeNextTab() {
                _deActiveNextTab();               
                scope.currentIndex++;//显示当前的基础上，选中并显示下一个
                var item = scope.tabs[scope.currentIndex];
                if (item) {
                    item.selected = true;
                    item.shown = true;
                    item.currentItems = scope.currentItems;//数据初始化
                    item.index = scope.currentIndex;
                }
            }

            function _itemSelectHandler(selectedItem){
                if(!selectedItem.hasOwnProperty(scope.nodeField)){
                    return;
                }
                var items = selectedItem[scope.nodeField];
                if((items instanceof Array) && (items.length==0)){                  
                    return;
                }
                scope.currentItems = items;//重置下一页数据
                _activeNextTab();
                _activeTab(scope.tabs[scope.currentIndex-1]);
            }

            function _getCurrentTabSelectedItems(items, allItems){
                var retItems = [];
                angular.forEach(items, function(item){
                    var idx = _findItemIndex(item, allItems);
                    if(idx!=-1){
                        retItems.push(allItems[idx]);
                    }
                })
                return retItems;
            }

            function _findItemIndex(item, dataSet) {
                if (!dataSet) {
                    return -1;
                }
                for (var i = 0, len = dataSet.length; i < len; i++) {
                    if (_isMatch(item, dataSet[i], scope._trackItemBy)) {
                        return i;
                    }
                };
                return -1;
            }

            function _isMatch(obj1, obj2, trackItemBy) {
                for (var j = 0; j < trackItemBy.length; j++) {
                    var prop = trackItemBy[j].trim();
                    if (!obj1.hasOwnProperty(prop) || !obj2.hasOwnProperty(prop) || obj1[prop] != obj2[prop]) {
                        return false;
                    }
                }
                return true;
            }

            function _intializeSelectedItems(){
                //scope.selectedItems是外面给的初始化时的某层被选中对象，外层给后不变
                //scope.selectedItemsCache放的所有父层及当前的被选中对象，内里加parents
                //scope.currentSelectedItems放的当前tab页被选中对象，随tab页变化
                if (!scope.selectedItems) {
                    scope.selectedItems = [];
                }
                if (!angular.isArray(scope.selectedItems)) {
                    scope.selectedItems = [scope.selectedItems];
                }
                if(scope.selectedItems.length == 0){
                    return;
                }
                scope.selectedItemsCache = scope.selectedItems;
                var parentsArr = _getParentsArr(); 
                scope.selectedItemsCache = scope.selectedItemsCache.concat(parentsArr);            
            }

            function _getParentsArr(){
                scope.parentsArr = [];
                _findItemFromBegining(scope.selectedItemsCache[0]);
                return scope.parentsArr;
            }

            function _findItemFromBegining(item){
                var dataArr = scope.data[scope.nodeField];
                var idx = _findItemIndex(item, dataArr);
                if(idx == -1){
                    _findItemInChildren(item, dataArr);
                }              
            }

            function _findItemInChildren(item, dataArr){
                angular.forEach(dataArr, function(dataObj){
                    var arr = dataObj[scope.nodeField];
                    var idx = _findItemIndex(item, arr);
                    if(idx == -1){
                        _findItemInChildren(item, arr);
                    }
                    else{
                        scope.parentsArr.push(dataObj);
                        _findItemFromBegining(dataObj);
                    }
                })
            }        
        }
    }])

    })