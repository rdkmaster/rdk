    define(['angular', 'css!rd.styles.Tree','rd.services.EventService','ztree'], function() {
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
                    draggable: '@?',

                    setting: '=?',
                    editable: '=?',
                    checkable: '=?',
                    data: '=',

                    click: '&?',
                    doubleClick: '&?',
                    check: '&?',
                    rename: '&?',
                    beforeRemove: '&?',
                    beforeRename: '&?',
                    beforeCollapse: '&?',
                    beforeExpand: '&?',
                    beforeEditName: '&?',
                },
                controller: ['$scope', function(scope) {
                    //把控制器暴露给app
                    Utils.publish(scope.id, this);
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
                        onClick: on_click,
                        onDblClick: on_dblclick,
                        onCheck: on_check,
                        onRename: on_rename,

                        beforeDrag: before_drag,
                        beforeRename: before_rename,
                        beforeRemove: before_remove,
                        beforeCollapse: before_collapse,
                        beforeExpand: before_expand,
                        beforeEditName: before_editName,
                    },
                    edit: {
                        enable: scope.editable || true
                    },
                    view: {
                        fontCss: null,
                        showLine: false
                    }
                };
                return setObj;

                function on_click(event, treeId, treeNode) {
                    event.stopPropagation();
                    return EventService.raiseControlEvent(scope, EventTypes.CLICK, treeNode, true);
                }

                function on_dblclick(event, treeId, treeNode) {
                    return EventService.raiseControlEvent(scope, EventTypes.DOUBLE_CLICK, treeNode, true);
                }

                function on_check(event, treeId, treeNode) {
                    return EventService.raiseControlEvent(scope, EventTypes.CHECK, treeNode, true);
                }

                function on_rename(event, treeId, treeNode) {
                    return EventService.raiseControlEvent(scope, EventTypes.RENAME, treeNode, true);
                }

                function before_expand(treeId, treeNode) {
                    return EventService.raiseControlEvent(scope, EventTypes.BEFORE_EXPAND, treeNode, true);
                }

                function before_collapse(treeId, treeNode) {
                    return EventService.raiseControlEvent(scope, EventTypes.BEFORE_COLLAPSE, treeNode, true);
                }

                function before_rename(treeId, treeNode, newName, isCancel) {
                    return EventService.raiseControlEvent(scope, EventTypes.BEFORE_RENAME,
                        {treeNode: treeNode, newName: newName, isCancel: isCancel}, true);
                }

                function before_remove(treeId, treeNode) {
                    return EventService.raiseControlEvent(scope, EventTypes.BEFORE_REMOVE, treeNode, true);
                }  

                function before_editName(treeId, treeNode) {
                    return EventService.raiseControlEvent(scope, EventTypes.BEFORE_EDIT_NAME, treeNode, true);
                } 

                function before_drag(treeId, treeNode) {
                    return eval(scope.draggable);
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
