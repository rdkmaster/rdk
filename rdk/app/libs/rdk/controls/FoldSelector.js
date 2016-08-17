define(['angular', 'jquery', 'rd.core',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function() {
        var foldSelectorApp = angular.module('rd.controls.FoldSelector',['rd.core']);
        foldSelectorApp.directive('rdkFoldSelector', ['Utils','$compile', 'EventService', 'EventTypes', 
            function (Utils, $compile, EventService, EventTypes) {
            return {
                restrict: 'E',
                template: 
                    '<div>\
                        <rdk_accordion id="{{accordionID}}" folded_icon="foldedIcon" unfolded_icon="unfoldedIcon"\
                                   caption="caption" frozen="frozen" open="open"\
                                   editable="captionEditable">\
                            <rdk_basic_selector style="width: 100%;border:0" label_field="labelField" track_item_by="{{trackItemBy}}"\
                                multiple_select="multipleSelect" searchable="searchable"\
                                editable="selectorEditable" least="least"\
                                selected_items="selectedItems"\
                                data="data"\
                                change="basicSelectorChange"\
                                error="basicSelectorError"\
                                id="{{basicSelectorID}}">\
                            </rdk_basic_selector>\
                        </rdk_accordion>\
                    </div>',
                replace: true,
                scope:{
                    foldedIcon: '=?',
                    unfoldedIcon: '=?',
                    caption: '=?',
                    frozen: '=?',
                    open: '=?',
                    captionEditable: '=?',   

                    labelField: '=?',
                    multipleSelect: '=?',
                    searchable: '=?',
                    selectorEditable: '=?',
                    least: '=?',
                    selectedItems: '=?',
                    data: '=?',

                    id: '@?',
                    trackItemBy: '@?',

                    change: '&?',
                    error: '&?',
                    childChange: '&?'
                },
                controller: ['$scope', '$attrs', function(scope, iAttrs) {
                    scope.appScope = Utils.findAppScope(scope);

                    _init();

                    function _init(){
                        scope.foldedIcon = Utils.getValue(scope.foldedIcon, iAttrs.foldedIcon, "fa fa-angle-double-down");
                        scope.unfoldedIcon = Utils.getValue(scope.unfoldedIcon, iAttrs.unfoldedIcon, "fa fa-angle-double-up");
                        scope.caption = Utils.getValue(scope.caption, iAttrs.caption, "标题");
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
                    
                    if(scope.id){//必须写在controller
                        scope.basicSelectorID = Utils.createUniqueId();//如果外层有id，则内层自动生成惟一id
                        EventService.register(scope.id, EventTypes.SELECT, function(event, data){
                            EventService.broadcast(scope.basicSelectorID, EventTypes.SELECT, data);
                        });
                        EventService.register(scope.basicSelectorID, EventTypes.CHANGE, function(event, data){
                            EventService.broadcast(scope.id, EventTypes.CHANGE, data);
                        });

                        scope.accordionID = Utils.createUniqueId();
                        EventService.register(scope.id, EventTypes.OPEN, function(event, data){
                            EventService.broadcast(scope.accordionID, EventTypes.OPEN);
                        });
                        EventService.register(scope.id, EventTypes.CLOSE, function(event, data){
                            EventService.broadcast(scope.accordionID, EventTypes.CLOSE);
                        });
                        // EventService.register(scope.accordionID, EventTypes.CHANGE, function(event, data){
                        //     EventService.broadcast(scope.id, EventTypes.CHANGE, data);
                        // });
                    }

                    if(scope.change(scope)){
                        scope.basicSelectorChange = function(event, data){
                            scope.appScope[iAttrs.selectedItems] = data;
                            scope.change(scope)(event, data);
                        }
                    }
                    else{
                        scope.basicSelectorChange = function(event, data){
                            scope.appScope[iAttrs.selectedItems] = data;
                        }
                    }
                    if(scope.error(scope)){
                        scope.basicSelectorError = scope.error(scope);
                    }
                }],
                compile: function(tEle, tAttrs){
                    return{
                        post: _link
                    }
                }
            };

            function _link(scope, iEle, iAttrs, ctrl, transclude){

            }
        }])
    })
