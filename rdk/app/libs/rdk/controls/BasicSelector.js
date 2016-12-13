define(['angular', 'jquery', 'rd.core', 'css!rd.styles.BasicSelector',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'
], function() {
    var basicSelectorApp = angular.module('rd.controls.BasicSelector', ['rd.core']);
    basicSelectorApp.directive('rdkBasicSelector', ['EventService', 'Utils', 'EventTypes', '$timeout', '$compile',
        function(EventService, Utils, EventTypes, $timeout, $compile) {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="rdk-selector-module" ng-click="stopPropagation()">\
                    <div class="search" ng-show="searchable">\
                        <input type="text" class="search-input" ng-model="search[labelField]">\
                        <i class="fa fa-search search-icon"></i>\
                    </div>\
                    <div class="selector">\
                        <li ng-repeat="item in data |filter:search"\
                            ng-click="selectItem(item, $event)" \
                            ng-style="getStyle()"\
                            ng-class="{true:\'selected-item\',false:\'original-item\'}[isSelected(item)]">\
                            {{item[labelField]}}\
                        </li>\
                        <div ng-show="editable">\
                            <div ng-click="addItem($event)" ng-show="showEditor" class="original-item">\
                                <i class="fa fa-plus selector-plus-icon" ng-show="showEditor"></i>\
                            </div>\
                            <input type="text" ng-show="!showEditor" ng-model="inputValue" ng-blur="blur($event)" \
                            ng-keyup="keyPressHandler($event)" maxlength="{{maxLength}}" class="selector-editor">\
                        </div>\
                    </div>\
                </div>',
                scope: {
                    id: '@?',
                    trackItemBy: '@?',

                    labelField: '=?',
                    multipleSelect: '=?',
                    searchable: '=?',
                    editable: '=?',
                    least: '=?',
                    selectedItems: '=?',
                    data: '=?',

                    change: '&?',
                    error: '&?',
                    childChange: '&?',
                    dataChange: '&?',
                    create: '&?',

                    restrict: '@?',
                    maxLength: '@?'
                },
                controller: ['$scope', function(scope) {
                    Utils.onChildChange(scope, scope.childChange(scope));
                }],
                compile: function(tEle, tAttrs) {
                    Utils.bindDataSource(tAttrs, 'data');
                    return {
                        post: _link
                    }
                },
                transclude: true,
                terminal: true
            };

            function _link(scope, iEle, iAttrs, ctrl, transclude) {
                transclude(scope, function(clone,innerScope) {
                    for(key in clone){
                        if (clone.hasOwnProperty(key) && clone[key].tagName == "ITEM_RENDERER"){
                            angular.element(iEle.find("li")[0]).html('').append(clone[key].innerHTML);
                        }
                    }
                    scope.appScope = Utils.findAppScope(scope);
                    $compile(iEle)(scope);//独立作用域的scope
                });

                _bindData();//组件嵌套时，必须这样做双向绑定才生效
                _init();
                _refreshSelectedItems();

                if (scope.id) {
                    EventService.register(scope.id, EventTypes.SELECT, function(event, data) {
                        scope.selectedItems = [];
                        if(!data){
                            _refreshSelectedItems();
                            return;
                        }
                        if(data == "all"){
                            scope.selectedItems = scope.data;
                            scope.appScope[iAttrs.selectedItems] = scope.selectedItems;
                            return;
                        }
                        scope.selectedItems = data;
                        scope.appScope[iAttrs.selectedItems] = scope.selectedItems;
                    });
                }   

                scope.$watch('selectedItems', function(newVal, oldVal) {
                    _refreshSelectedItems();
                }, true);

                scope.$watch('data', function(newVal, oldVal) {
                    _refreshSelectedItems();
                    EventService.raiseControlEvent(scope, EventTypes.DATA_CHANGE, newVal);
                }, true);

                scope.$watch('least', function(newVal, oldVal) {
                    _refreshSelectedItems();
                }, true);

                scope.$watch('multipleSelect', function(newVal, oldVal) {
                    _refreshSelectedItems();
                }, true);

                scope.getStyle = function(){
                    var destObj = {};
                    destObj['list-style'] = 'none';
                    return destObj;
                }

                function _bindData(){//根据appScope重置scope上数据
                    scope.appScope[iAttrs.selectedItems] = scope.appScope[iAttrs.selectedItems] ? scope.appScope[iAttrs.selectedItems] : [];
                    scope.appScope[iAttrs.data] = scope.appScope[iAttrs.data] ? scope.appScope[iAttrs.data] : [];
                    
                    scope.selectedItems = scope.selectedItems ? scope.selectedItems : [];
                    if(scope.selectedItems.length == 0){
                        scope.selectedItems = scope.appScope[iAttrs.selectedItems];
                    }
                    scope.data = scope.data?scope.data:[];
                    if(scope.data.length == 0){
                        scope.data = scope.appScope[iAttrs.data];
                    }
                }

                function _getExistedSelectedItems(items, allItems){
                    var retItems = [];
                    if(!angular.isArray(items)){
                        items = [items];
                    }
                    angular.forEach(items, function(item){
                        var idx = _findItemIndex(item, allItems);
                        if(idx!=-1){
                            retItems.push(allItems[idx]);
                        }
                    })
                    return retItems;
                }                    

                function _init() {
                    scope.labelField = Utils.getValue(scope.labelField, iAttrs.labelField, 'label');
                    scope.trackItemBy = Utils.getValue(scope.trackItemBy, iAttrs.trackItemBy, 'label');
                    scope._trackItemBy = scope.trackItemBy ? scope.trackItemBy.trim().split(/\s*,\s*/) : ['label'];
                    scope.least = Utils.getValue(scope.least, !isNaN(Number(iAttrs.least))?Number(iAttrs.least):undefined, 0);
                    scope.editable = Utils.isTrue(scope.editable, true);
                    scope.multipleSelect = Utils.isTrue(scope.multipleSelect, true);
                    scope.searchable = Utils.isTrue(scope.searchable, true);                   
                    scope.showEditor = true;

                    scope.selectItem = _selectItem;
                    scope.addItem = _addItem;
                    scope.keyPressHandler = _keyPressHandler;
                    scope.blur = _blur;
                    scope.isSelected = _isSelectedItem;
                    scope.stopPropagation = _stopPropagation;
                }

                function _stopPropagation(){
                    event.stopPropagation();
                }

                function _isSelectedItem(item) {
                    if(_findItemIndex(item, scope.selectedItems) == -1){
                        return false;
                    }
                    return true;
                }

                function _blur(event){
                    _resetInput(event);
                }

                function _keyPressHandler(event){                    
                    if(event.keyCode == 13){
                        _resetInput(event);
                    }
                    else if(event.keyCode == 27){
                        scope.showEditor = true;
                        scope.inputValue = "";
                        event.currentTarget.blur();
                    }
                    else{
                        if(!scope.inputValue) return;
                        while (!_validateValue(scope.inputValue)){
                            scope.inputValue = scope.inputValue.substring(0, scope.inputValue.length-1);
                        }
                        scope.inputValue = scope.inputValue.replace(/[-~]/g,'');
                    }
                }

                function _validateValue(val){
                    if(!val) return true;//没值了，不能再-1
                    var fn = Utils.findFunction(scope, scope.restrict);                
                    if(typeof(fn) == 'function') {
                        if(!fn(val)) {
                            EventService.raiseControlEvent(scope, EventTypes.CREATE, false);
                            return false;    
                        }
                    }
                    else{
                        var reg = new RegExp(scope.restrict);
                        if(!reg.test(val)) {
                            EventService.raiseControlEvent(scope, EventTypes.CREATE, false);
                            return false;
                        }                        
                    }
                    return true;
                }

                function _resetInput(event){
                    if((scope.inputValue == "") || (typeof(scope.inputValue) == 'undefined')){
                        scope.showEditor = true;
                        event.currentTarget.blur();
                    }
                    else{
                        var obj = {};
                        angular.forEach(scope._trackItemBy, function(prop, key) {
                            obj[prop] = Utils.uuid();
                        });
                        obj[scope.labelField] = scope.inputValue;
                        scope.data.push(obj);
                        scope.appScope[iAttrs.data] = scope.data;
                        scope.showEditor = true;
                        scope.inputValue = "";

                        EventService.raiseControlEvent(scope, EventTypes.CREATE, true);
                    }
                }

                function _refreshSelectedItems(){
                    scope.selectedItems = _getExistedSelectedItems(scope.selectedItems, scope.data);
                    if(!angular.isArray(scope.selectedItems)){
                        scope.selectedItems = [scope.selectedItems];
                        scope.appScope[iAttrs.selectedItems] = scope.selectedItems;
                        _raise(EventTypes.CHANGE, scope.selectedItems);
                        return;
                    }
                    if(scope.multipleSelect && scope.least > scope.selectedItems.length){
                        //不够，要补齐
                        var len = scope.least-scope.selectedItems.length;
                        for(var j=0; j<len; j++){
                            for(var i=0; i<scope.data.length; i++){
                                var item = scope.data[i];
                                if (_findItemIndex(item, scope.selectedItems) == -1){
                                    scope.selectedItems.push(item);
                                    break;
                                }
                            }
                        }
                        scope.appScope[iAttrs.selectedItems] = scope.selectedItems;
                        _raise(EventTypes.CHANGE, scope.selectedItems);
                        return;
                    }
                    if (!scope.multipleSelect) {
                        if (scope.selectedItems.length > 1){//太多了，只留一个
                            scope.selectedItems.splice(1, scope.selectedItems.length - 1);
                            scope.appScope[iAttrs.selectedItems] = scope.selectedItems;
                            _raise(EventTypes.CHANGE, scope.selectedItems);
                            return;
                        }
                        if(scope.selectedItems.length == 0 && scope.least > 0 && scope.data && scope.data.length){//至少要选中一个
                            scope.selectedItems = scope.data[0];
                            scope.appScope[iAttrs.selectedItems] = scope.selectedItems;
                            _raise(EventTypes.CHANGE, scope.selectedItems);
                            return;
                        }
                    }
                    scope.appScope[iAttrs.selectedItems] = scope.selectedItems;
                }

                function _addItem(event){
                    scope.showEditor = !scope.showEditor;
                    var inputDom = event.currentTarget.nextElementSibling;
                    $timeout(function() {$(inputDom).focus();}, 0);
                }

                function _selectItem(item){
                    var index = _findItemIndex(item, scope.data);
                    var idx = _findItemIndex(item, scope.selectedItems);

                    //单选&未选中，换个
                    if (!scope.multipleSelect && idx == -1){
                        scope.selectedItems = [];
                        scope.selectedItems.push(scope.data[index]);
                    }
                    else if(!scope.multipleSelect && idx != -1){
                        //单选&已选中，清空
                        if(scope.least > 0){
                            _raiseError(101, '至少选中 1 个条目。');
                        }
                        else{
                            scope.selectedItems.splice(0, scope.selectedItems.length);
                        }
                    }
                    else if(scope.multipleSelect && idx == -1){
                        //多选&未选中，选上
                        scope.selectedItems.push(scope.data[index]);
                    }
                    else if(scope.multipleSelect && idx != -1){
                        //多选&已选中，去掉
                        if (scope.selectedItems.length > scope.least){
                            scope.selectedItems.splice(idx, 1);
                        }
                        else{
                            _raiseError(102, '至少选中 ' + scope.least + ' 个条目。');
                        }
                    }
                    else{
                        console.error('不可能跑到这里的');
                    }
                    scope.appScope[iAttrs.selectedItems] = scope.selectedItems;
                    _raise(EventTypes.CHANGE, scope.selectedItems);
                }

                function _findItemIndex(item, dataSet) {
                    scope._trackItemBy = scope.trackItemBy ? scope.trackItemBy.trim().split(/\s*,\s*/) : ['label'];
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

                function _raise(action, data) {
                    if (action == EventTypes.CHANGE) {
                        Utils.childChange(scope, data);
                    }

                    if (scope.id) {
                        EventService.broadcast(scope.id, action, data);
                    }

                    var fn;
                    if (scope[action]) {
                        fn = scope[action](scope);
                    }
                    if (!fn) {
                        fn = defaultHandlers[action];
                    }
                    if (!fn) {
                        return;
                    }

                    try {
                        fn({ name: action, dispatcher: scope.id}, data);
                    } catch (e) {
                        console.error('call "' + action + '" handler failed! msg=' + e.message);
                    }
                }

                function _raiseError(code, message) {
                    _raise(EventTypes.ERROR, { code: code, message: message });
                }

            }

        }
    ]);

    basicSelectorApp.service('BasicSelector', [function() {
        this.selected2string = function(selected, labelField, separator) {
            labelField = labelField || 'label';
            separator = separator || ', ';
            var res = '';
            angular.forEach(selected, function(item) {
                res += item[labelField] + separator;
            });
            return res.substring(0, res.length - separator.length);
        }
    }]);


    var defaultHandlers = {
        error: function(event, data) {
            data.message += '\n提示：为Selector添加一个error属性并提供一个函数作为出错响应，' +
                '可以覆盖此默认出错行为，例如：\n<rdk_selector error="myErrHandler" ...></rdk_selector>';
            console.error('code=' + data.code + ', message=' + data.message);
        }
    }

    return basicSelectorApp;
});
