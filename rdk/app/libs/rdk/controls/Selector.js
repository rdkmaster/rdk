define(['angular', 'jquery', 'underscore', 'rd.core','rd.controls.FoldSelector',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function(){
    var selectorApp = angular.module('rd.controls.Selector', ['rd.core','rd.controls.FoldSelector']);
    selectorApp.directive('rdkSelector', ['Utils', 'EventService', 'EventTypes', function (Utils, EventService, EventTypes) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                foldedIcon: '=?',
                unfoldedIcon: '=?',  
                frozen: '=?',
                open: '=?',
                captionEditable: '=?',

                labelField: '=?',
                multipleSelect: '=?',
                searchable: '=?',
                selectorEditable: '=?',
                least: '=?',

                data: '=?',
                selectedItems: '=?',

                groupby: '&?',
                childChange: '&?',

                change: '&?',
                error: '&?',

                id: '@?',
                trackItemBy: '@?'
            },
            controller: ['$scope', '$attrs', function(scope, iAttrs) {
                scope.appScope = Utils.findAppScope(scope);

                _init();
                _refreshItems();

                scope.$watch('data', function(newVal, oldVal){
                    _refreshItems();
                });

                scope.$watch('selectedItems', function(newVal, oldVal){
                    _refreshItems();
                });

                function _refreshItems(){
                    if(scope.groupby(scope)){
                        var fn = scope.groupby(scope);
                        if((scope.data)&&(angular.isArray(scope.data))){
                            scope.data = _.groupBy(scope.data, fn);
                        }
                        if((scope.selectedItems)&&(angular.isArray(scope.selectedItems))){
                            scope.selectedItems = _.groupBy(scope.selectedItems, fn);
                        }                
                    }

                    scope.itemArr = [];
                    if((scope.data)&&(angular.isObject(scope.data))){
                        var keys = _.keys(scope.data);
                        angular.forEach(keys, function(key){
                            var item = {};
                            item['caption'] = key;
                            item['data'] = scope.data[key];
                            if((scope.selectedItems)&&(angular.isObject(scope.selectedItems))){
                                item['selectedItems'] = scope.selectedItems[key];
                            }
                            scope.itemArr.push(item);
                        });
                    }
                }      

                function _init(){
                    scope.foldedIcon = Utils.getValue(scope.foldedIcon, iAttrs.foldedIcon, "fa fa-angle-double-down");
                    scope.unfoldedIcon = Utils.getValue(scope.unfoldedIcon, iAttrs.unfoldedIcon, "fa fa-angle-double-up");
                    scope.open = Utils.isTrue(scope.open, false); 
                    scope.frozen = Utils.isTrue(scope.frozen, false);
                    scope.captionEditable = Utils.isTrue(scope.captionEditable, false);

                    scope.labelField = Utils.getValue(scope.labelField, iAttrs.labelField, "label");
                    scope.trackItemBy = Utils.getValue(scope.trackItemBy, iAttrs.trackItemBy, 'label');
                    scope.least = Utils.getValue(scope.least, !isNaN(Number(iAttrs.least))?Number(iAttrs.least):undefined, 0);
                    scope.multipleSelect = Utils.isTrue(scope.multipleSelect, true);
                    scope.searchable = Utils.isTrue(scope.searchable, false); 
                    scope.selectorEditable = Utils.isTrue(scope.selectorEditable, false); 
                }


                Utils.onChildChange(scope, scope.childChange(scope));

                if(scope.change(scope)){
                    scope.foldSelectorChange = function(event, data){
                        _refreshSelectedItems(data);
                        scope.change(scope)(event, data);
                    }
                }

                if(scope.error(scope)){
                    scope.foldSelectorChange = scope.error(scope);
                }

                if(scope.id){
                    scope.idList = _generateIDList();
                    angular.forEach(scope.idList, function(idStr,index){
                        //外面发到里面
                        EventService.register(scope.id, EventTypes.SELECT, function(event, data){
                            EventService.broadcast(idStr, EventTypes.SELECT, data);
                        });
                        EventService.register(scope.id, EventTypes.OPEN, function(event, data){
                            EventService.broadcast(idStr, EventTypes.OPEN);
                        });
                        EventService.register(scope.id, EventTypes.CLOSE, function(event, data){
                            EventService.broadcast(idStr, EventTypes.CLOSE);
                        });
                        //里面发到外面
                        EventService.register(idStr, EventTypes.CHANGE, function(event, data){
                            if(angular.isArray(data)){
                               _refreshSelectedItems(data); 
                            }
                            var changeObj = {};
                            changeObj.id = idStr;
                            changeObj.data = data;
                            EventService.broadcast(scope.id, EventTypes.CHANGE, changeObj);
                        });
                    })
                }

                function _refreshSelectedItems(data){
                    var lastSelObj = data[data.length-1];
                    var key = _selectedKey(lastSelObj);
                    scope.selectedItems[key] = data;
                }

                function _selectedKey(selObj){
                    delete selObj.$$hashKey;
                    var keys = _.keys(scope.data);
                    for(var i=0; i<keys.length; i++){
                        var arr = scope.data[keys[i]];
                        var idx = _.findIndex(arr, selObj);
                        if(idx != -1){
                            return keys[i];
                        }
                    }
                    return keys[0];
                }

                function _generateIDList(){
                    var idList = [];
                    for(var i=0; i<scope.itemArr.length; i++){
                        var idStr = Utils.createUniqueId();
                        // var idStr = scope.id + '_' + String(i);
                        idList.push(idStr);
                    }
                    return idList;
                }

            }],
            template:
                '<div>\
                    <rdk_fold_selector ng-repeat="item in itemArr" caption="item.caption"\
                                       data="item.data" selected_items="item.selectedItems"\
                                       change="foldSelectorChange"\
                                       folded_icon="foldedIcon" unfolded_icon="unfoldedIcon"\
                                       open="open" frozen="frozen" caption_editable="captionEditable"\
                                       label_field="labelField" track_item_by="{{trackItemBy}}"\
                                       least="least" multiple_select="multipleSelect"\
                                       searchable="searchable" selector_editable="selectorEditable"\
                                       id={{idList[$index]}}>\
                    </rdk_fold_selector>\
                </div>',
            compile: function(tEle, tAttrs) {
                Utils.bindDataSource(tAttrs, 'data');
                return {
                    post: _link
                }
            }
        };

        function _link(scope, iEle, iAttrs, ctrl, transclude){

        }
    }])
});