(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Tree','css!base/css/tree'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', main];
    function main($scope) {
        $scope.treeData = [{
            node: [{
                key: "specialtopic",
                label: "专题",
                open: true,
            }, {
                node: [],
                key: "specialtopic",
                label: "总览",
            }],
            key: "e2e",
            label: "端到端定界定位",
            open: true,
        }, {
            node: [{
                node:[{
                    node: [],
                    key: "specialtopic",
                    label: "总览",
                }],
                key: "monitoring",
                label: "监控",
                open: true,
            },],
            key: "realtimeMonitor",
            label: "实时监控",
        }];
        $scope.setting = {
            view: {
                addHoverDom: addHoverDom,
                removeHoverDom: removeHoverDom,
                showLine: false,
                showIcon: false
            },
            check: {
                enable: true
            },
            edit: {
                enable: true,
                editNameSelectAll: true,
            },
            data: {
                simpleData: {
                    enable: true
                },
                key: {
                    children: 'node',
                    name: 'label'
                }
            }
        };
        function addHoverDom(treeId, treeNode) {
            var sObj = $("#" + treeNode.tId + "_span");
            if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
            if (treeNode.level < 2) {
                var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
                    + "' title='添加子节点' onfocus='this.blur();'></span>";
                sObj.after(addStr);
            }
            var btn = $("#addBtn_" + treeNode.tId);
            if (btn) btn.bind("click", function () {
                var resultKey = "a" + new Date().getTime()
                var zTree = rdk.mytree.tree;
                zTree.addNodes(treeNode, {key: resultKey, pid: treeNode.key, label: "新建子节点"});

                // treeDataAdd.push({key: resultKey, pid: treeNode.key, label: "新建子节点", rank: (treeNode.rank + 1)});

                var node = treeNode.node[treeNode.node.length - 1];
                //根据新的id找到新添加的节点
                return false
            });

            return false
        }
        function removeHoverDom(treeId, treeNode) {
            $("#addBtn_" + treeNode.tId).unbind().remove();
        }

    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();