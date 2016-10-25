    define(['angular', 'rd.services.EventService','ztree'], function() {
    var menuTreeApp = angular.module("rd.controls.Tree", ['rd.core']);
    menuTreeApp.directive('rdkTree', ['EventService', 'EventTypes', 'Utils',
        function(EventService, EventTypes, Utils) {
            return {
                restrict: 'E',
                scope: {
                    id: '@',
                    nodeField: '@?',
                    labelField: '@?',
                    unselectOnBlur: '@?',
                    setting: '=?',
                    draggable: '=?',
                    checkable: '=?',
                    data: '=',
                    click: '&?',
                    doubleClick: '&?',
                    remove: '&?',
                    rename: '&?',
                    collapse: '&?',
                    expand: '&?',
                    editname: '&?',
                    unselect: '&?'
                },
                replace: true,
                template: '<div><ul id="__unique_id__" class="ztree"></ul></div>',
                compile: function(element, attrs) {
                    Utils.bindDataSource(attrs, 'data');
                    return {
                        post: function(scope, iElement, iAttrs, controller) {
                            scope.checkable = Utils.isTrue(iAttrs.checkable);
                            scope.draggable = Utils.isTrue(iAttrs.draggable);
                            scope.unselectOnBlur = Utils.isTrue(iAttrs.unselectOnBlur);

                            scope.rdkClick = Utils.findFunction(scope, iAttrs.rdkClick);
                            scope.rdkDoubleClick = Utils.findFunction(scope, iAttrs.rdkDoubleClick);
                            scope.rdkBeforeClick = Utils.findFunction(scope, iAttrs.rdkBeforeClick);
                            scope.rdkBeforeDrag = Utils.findFunction(scope, iAttrs.rdkBeforeDrag);

                            var rebornID = Utils.rebornUniqueId(iElement);
                            if (!scope.setting) {
                                scope.setting = _defaultSetting(scope);
                            }

                            _updateTree(rebornID, scope.setting, scope.data);

                            scope.$watch('data', function(newVal, oldVal) {
                                if (newVal == oldVal) {
                                    return;
                                }
                                _updateTree(rebornID, scope.setting, scope.data);
                            }, true);

                            scope.$watch('setting', function(newVal, oldVal) {
                                if (newVal == oldVal) {
                                    return;
                                }
                                _updateTree(rebornID, scope.setting, scope.data);
                            }, true);

                            scope.$watch('draggable', function(newVal, oldVal) {
                                if (!scope.setting || !scope.setting.edit) {
                                    return;
                                }
                                scope.setting.edit.enable = scope.draggable;
                            });

                            scope.$watch('checkable', function(newVal, oldVal) {
                                if (!scope.setting || !scope.setting.check) {
                                    return;
                                }
                                scope.setting.check.enable = scope.checkable;
                            });

                        
                            if(!!scope.unselectOnBlur){
                                $(document).on("click", "*", function(){
                                    var treeObj = $.fn.zTree.getZTreeObj(rebornID);
                                    var nodes = treeObj.getSelectedNodes();
                                    if(nodes.length>0){
                                        treeObj.cancelSelectedNode();
                                        if(!!scope.id){
                                            EventService.broadcast(scope.id, EventTypes.UNSELECT, nodes);
                                        }
                                        var fn = scope.unselect(scope);
                                        if(!!fn){
                                            return fn(event, nodes);
                                        }else{
                                            return true;
                                        } 
                                    }
                                });

                                $("#" + rebornID).click(function(){return false})
                            }
                            
                        }
                    }
                }
            }

            function _defaultSetting(scope) {
                var setObj = {
                    data: {
                        key: {
                            children: scope.nodeField || 'node',
                            name: scope.labelField || 'label'
                        }
                    },
                    check: {
                        enable: scope.checkable || true
                    },
                    callback: {
                        onClick: _handler,
                        onDblClick: _handler,
                        beforeClick: _beforeClick,
                        beforeDrag: _beforeDrag,
                        onDrop: _afterDrag,
                        beforeRename: before_rename,
                        beforeRemove: before_remove,
                        beforeCollapse: before_collapse,
                        beforeExpand: before_expand,
                        beforeEditName: before_editName
                    },
                    edit: {
                        enable: scope.draggable || true
                    },
                    view: {
                        fontCss: null
                    }
                };
                return setObj;

                function _handler(event, treeId, treeNode) {
                    event.treeId = scope.id;
                    event.name = event.type;
                    if (event.type == 'click') {
                        if (!!scope.id) {
                            EventService.broadcast(scope.id, EventTypes.CLICK, treeNode);
                        }
                        var fn = scope.click(scope);
                        if(!!fn){
                            return fn(event, treeNode);
                        }else{
                            return true;
                        } 
                    } else if (event.type == 'dblclick') {
                        if (!!scope.id) {
                            EventService.broadcast(scope.id, EventTypes.DOUBLE_CLICK, treeNode);
                        }
                        var fn = scope.doubleClick(scope);
                        if(!!fn){
                            return fn(event, treeNode);
                        }else{
                            return true;
                        }
                    }
                }

                function _beforeClick(treeId, treeNode, clickFlag) {
                    treeNode.clickFlag = clickFlag;
                    if (!!scope.id) {
                        EventService.broadcast(scope.id, 'before_click', treeNode);
                    }
                    if (scope.rdkBeforeClick) {
                        scope.rdkBeforeClick({ name: 'before_click', treeId: scope.id }, treeNode);
                    }
                }

                function _beforeDrag(treeId, treeNode, clickFlag) {
                    treeNode.clickFlag = clickFlag;
                    if (!!scope.id) {
                        EventService.broadcast(scope.id, 'before_drag', treeNode);
                    }
                    if (scope.rdkBeforeDrag) {
                        scope.rdkBeforeDrag({ name: 'before_drag', treeId: scope.id }, treeNode);
                    }
                }

                function _afterDrag(event, treeId, treeNodes, targetNode, moveType, isCopy){
                    var treeData = $.fn.zTree.getZTreeObj(treeId).getNodes();
                    if(scope.id){
                        EventService.broadcast(scope.id, EventTypes.CHANGE, treeData);
                    }
                }

                function before_expand(treeId, treeNode){
                    if (!!scope.id) {
                        EventService.broadcast(scope.id, EventTypes.BEFORE_EXPAND, treeNode);
                    }
                    var fn = scope.expand(scope);
                    if(!!fn){
                        return fn(event, treeNode);
                    }else{
                        return true;
                    }
                }

                function before_collapse(treeId, treeNode){
                    if (!!scope.id) {
                        EventService.broadcast(scope.id, EventTypes.BEFORE_COLLAPSE, treeNode);
                    }
                    var fn = scope.collapse(scope);
                    if(!!fn){
                        return fn(event, treeNode);
                    }else{
                        return true;
                    }
                }

                function before_rename(treeId, treeNode, newName, isCancel){
                    if (!!scope.id) {
                        EventService.broadcast(scope.id, EventTypes.BEFORE_RENAME, treeNode); 
                    }
                    var fn = scope.rename(scope);
                    if(!!fn){
                        return fn(event, treeNode);
                    }else{
                        return true;
                    }
                }

                function before_remove(treeId, treeNode) { 
                    if (!!scope.id) {
                        EventService.broadcast(scope.id, EventTypes.BEFORE_REMOVE, treeNode); 
                    }
                    var fn = scope.remove(scope);
                    if(!!fn){
                        return fn(event, treeNode);
                    }else{
                        return true;
                    }
                }  

                function before_editName(treeId, treeNode) { 
                    if (!!scope.id) {
                        EventService.broadcast(scope.id, EventTypes.BEFORE_EDITNAME, treeNode); 
                    }
                    var fn = scope.editname(scope);
                    if(!!fn){
                        return fn(event, treeNode);
                    }else{
                        return true;
                    }
                } 

                
            }

            function _updateTree(rebornID, setting, treeData) {
                if (!setting || !treeData) {
                    return;
                }
                $.fn.zTree.init($("#" + rebornID), setting, treeData);
            }
        }
    ]);

});
