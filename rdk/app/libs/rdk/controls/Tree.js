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
                    editable: '=?',
                    checkable: '=?',
                    data: '=',
                    click: '&?',
                    doubleClick: '&?',
                    remove: '&?',
                    rename: '&?',
                    collapse: '&?',
                    expand: '&?',
                    editname: '&?',
                    unselect: '&?',
                    check: '&?',
                    draggable: '@?'
                },
                controller: ['$scope', function(scope) {
                    //把控制器暴露给app
                    Utils.publishController(scope.id, this);
                }],
                replace: true,
                template: '<div><ul id="__unique_id__" class="ztree"></ul></div>',
                compile: function(element, attrs) {
                    Utils.bindDataSource(attrs, 'data');
                    return {
                        post: function(scope, iElement, iAttrs, controller) {
                            scope.draggable = Utils.isTrue(iAttrs.draggable);
                            scope.checkable = Utils.isTrue(iAttrs.checkable);
                            scope.editable = Utils.isTrue(iAttrs.editable);
                            scope.unselectOnBlur = Utils.isTrue(iAttrs.unselectOnBlur);                            
                            if (!scope.setting) {
                                scope.setting = _defaultSetting(scope);
                            }

                            var rebornID = Utils.rebornUniqueId(iElement);
                            _updateTree(rebornID, scope);

                            scope.$watch('data', function(newVal, oldVal) {
                                if (newVal == oldVal) {
                                    return;
                                }
                                _updateTree(rebornID, scope);
                            }, true);

                            scope.$watch('setting', function(newVal, oldVal) {
                                if(!newVal.check){
                                    newVal.check = _defaultSetting(scope).check;
                                }
                                if(!newVal.callback){
                                    newVal.callback = _defaultSetting(scope).callback;
                                }
                                if(!newVal.view){
                                    newVal.view = _defaultSetting(scope).view;
                                }
                                if(!newVal.edit){
                                    newVal.edit = _defaultSetting(scope).edit;
                                }
                                if (newVal == oldVal) {
                                    return;
                                }
                                _updateTree(rebornID, scope);
                            }, true);

                            scope.$watch('editable', function(newVal, oldVal) {
                                if (!scope.setting || !scope.setting.edit) {
                                    return;
                                }
                                scope.setting.edit.enable = scope.editable;
                            });

                            scope.$watch('checkable', function(newVal, oldVal) {
                                if (!scope.setting || !scope.setting.check) {
                                    return;
                                }
                                scope.setting.check.enable = scope.checkable;
                            });

                        
                            if(!!scope.unselectOnBlur){
                                $(document).on("click", "*", function() {
                                    var nodes = scope.tree.getSelectedNodes();
                                    if(nodes.length>0){
                                        scope.tree.cancelSelectedNode();
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
                        onDblClick: on_dblclick,
                        beforeDrag: before_drag,
                        beforeRename: before_rename,
                        beforeRemove: before_remove,
                        beforeCollapse: before_collapse,
                        beforeExpand: before_expand,
                        beforeEditName: before_editName,
                        onCheck: on_check 
                    },
                    edit: {
                        enable: scope.editable || true
                    },
                    view: {
                        fontCss: null
                    }
                };
                return setObj;

                function _handler(event, treeId, treeNode) {
                    event.stopPropagation();
                    if (!!scope.id) {
                        EventService.broadcast(scope.id, EventTypes.CLICK, treeNode);
                    }
                    var fn = scope.click(scope);
                    if(!!fn){
                        return fn(event, treeNode);
                    }else{
                        return true;
                    } 
                }

                function on_dblclick(event, treeId, treeNode) {
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

                function before_drag(treeId, treeNode) {
                    return eval(scope.draggable)
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

                function on_check(event, treeId, treeNode) { 
                    if (!!scope.id) {
                        EventService.broadcast(scope.id, EventTypes.CHECK, treeNode); 
                    }
                    var fn = scope.check(scope);
                    if(!!fn){
                        return fn(event, treeNode);
                    }else{
                        return true;
                    }
                } 
            }

            function _updateTree(rebornID, scope) {
                var setting = scope.setting;
                var treeData = scope.data;
                if (!setting || !treeData) {
                    return;
                }
                $.fn.zTree.init($("#" + rebornID), setting, treeData);
                if (!scope.tree) {
                    scope.tree = $.fn.zTree.getZTreeObj(rebornID);
                    if (scope.id) {
                        //把ztree的方法暴露出去
                        rdk[scope.id].tree = scope.tree;
                    }
                }
            }
        }
    ]);

});
