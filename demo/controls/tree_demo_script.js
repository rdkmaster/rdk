var app = angular.module("treeApp", [
    'rd.basic',
    'rd.controls.Tree',
    'ui.codemirror'
]);
app.controller('treeControl', ['$scope', 'DataSourceService', 'EventService', '$timeout',
    function(scope, DSService, EventService, $timeout) {

        scope.treeData = [{
                node: [{
                    key: "specialtopic",
                    label: "专题",
                    open: true
                }, {
                    node: [],
                    key: "specialtopic",
                    label: "总览"
                }],
                key: "e2e",
                label: "端到端定界定位",
                open: true,
                icon: "../../libs/ztree/css/zTreeStyle/img/diy/1_open.png",
            }, {
                node: [{
                    key: "monitoring",
                    label: "监控",
                    open: true
                }, {
                    node: [],
                    key: "reasonconfig",
                    label: "原因配置"
                }],
                key: "realtimeMonitor",
                label: "实时监控",
                open: true,
                icon: "../../libs/ztree/css/zTreeStyle/img/diy/1_open.png",
            }]

        // 当html设置setting属性时使用
        scope.setting = {
            data: {
                key: {
                    children: "module",
                    name: "label"
                }
            },
            //事件调用
            callback: {
                onClick: _clickHandler,
                onDblClick: _doubleClickHandler,
                beforeClick: _beforeClickHandler,
                beforeDrag: _beforeDragHandler
            },
            // 拖拽功能
            edit: {
                enable: true,
            },
            //字体样式
            view: {
                fontCss: getFont,
            }
        };

        scope.dragMode = true;
        scope.toggleDraggable = function() {
            scope.dragMode = !scope.dragMode;
            console.log('scope.dragMode='+scope.dragMode);
        }

        scope.clickHandler = function(event, treeNode) {
            _clickHandler(event, '', treeNode);
        };

        scope.doubleClickHandler = function(event, treeNode) {
            _doubleClickHandler(event, '', treeNode);
        };

        function _clickHandler(event, treeId, treeNode) {
            console.log("click callback!" + treeNode.label);
        }

        function _doubleClickHandler(event, treeId, treeNode) {
            console.log("doubleclick callback!" + treeNode.label);
        }

        function _beforeClickHandler(treeId, treeNode, clickFlag){
            console.log("here is before click");
        }

        function _beforeDragHandler(treeId, treeNode){
            console.log("here is before drag");
        }

        function getFont(treeId, node) {
            return node.font ? node.font : {};
        }
    }
]);