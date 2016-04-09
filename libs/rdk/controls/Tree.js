define(['angular', 'rd.services.EventService','ztree'], function() {
    var menuTreeApp = angular.module("rd.controls.Tree", [
        'rd.services.EventService'
    ]);
    menuTreeApp.directive('rdkTree', ['EventService', 'Utils',
        function(EventService, Utils) {
            return {
                restrict: 'E',
                scope: {
                    id: '@',
                    nodeField: '@?',
                    labelField: '@?',
                    setting: '=?',
                    draggable: '=?',
                    checkable: '=?',
                    data: '='
                },
                replace: true,
                template: '<div><ul id="__unique_id__" class="ztree"></ul></div>',
                compile: function(element, attrs) {

                    return {
                        post: function(scope, iElement, iAttrs, controller) {
                            scope.checkable = Utils.isTrue(iAttrs.checkable);
                            scope.draggable = Utils.isTrue(iAttrs.draggable);

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
                                if (!scope.setting) {
                                    return;
                                }
                                scope.setting.edit.enable = scope.draggable;
                            });

                            scope.$watch('checkable', function(newVal, oldVal) {
                                if (!scope.setting) {
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
                        onClick: _handler,
                        onDblClick: _handler,
                        beforeClick: _beforeClick,
                        beforeDrag: _beforeDrag
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
                    if (!!scope.id) {
                        EventService.broadcast(scope.id, event.type, treeNode);
                    }
                    event.treeId = scope.id;
                    event.name = event.type;
                    if (scope.rdkClick && event.type == 'click') {
                        scope.rdkClick(event, treeNode);
                    } else if (scope.rdkDoubleClick && event.type == 'dblclick') {
                        scope.rdkDoubleClick(event, treeNode);
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
