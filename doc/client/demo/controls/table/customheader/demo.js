(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table', 'rd.services.Alert', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector',
        'css!base/custom'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'Alert','DataSourceService','$timeout', main];
    function main($scope, Alert, DataSourceService, $timeout) {
        var arr=[],arrData=[],numTarget;
        $scope.sizeColor = true;
        $timeout(function(){
            console.log($scope.ds_table.header)
        },0)
        $scope.setting = {
            "columnDefs" :[
                {
                    title : function(data, target) {
                        console.log($scope)
                        $scope.allItems=[];
                        var total = []
                        var j = 0;
                        for(var i=0;i< arrData.length;i++){
                            if(total.indexOf(arrData[i][target]) === -1){
                                total.push(arrData[i][target]);
                                $scope.allItems[j]={};
                                $scope.allItems[j].id=j;
                                $scope.allItems[j].label= arrData[i][target]
                                j++;
                            }
                        }
                        return '<div style="position: absolute;top:6px;right: 2px;width: 100%;text-align: center;margin-top:0" >你好<i class="iconfont iconfont-e92a pticon" ng-class="{colorGray:sizeColor}" ng-click="selectorShow(1)"></i>\
                                <div ng-show="selectShow" class="selectorContent">\
                        <rdk_basic_selector data="allItems" selected_items="allSelected" multiple_select="true" searchable="false" editable="false" change="selectorChanged"><span>{{item.label}}</span>\
                        </rdk_basic_selector>\
                        </div></div>'
                    },
                    targets : 1,
                    sortable: true
                },
                {
                    title : function(data, target) {
                        $scope.data=data.data;
                        return '<span>'+data.header[target]+'</span>\
                                <select ng-change="titleExtraSelecteHandler(titleExtraSelected)"\
                                        ng-model="titleExtraSelected"\
                                        ng-options="item[2] as item[2]  for item in data">\
                                    <option value="">-- choose an item --</option>\
                                </select>'
                    },
                    targets : 2,
                    sortable: true
                },
                {
                    title : function(data, target) {
                        $scope.data=data.data;
                        return '<span>自定义列and自定义表头</span>\
                                <select ng-change="titleExtraSelecteHandler(titleExtraSelected)"\
                                        ng-model="titleExtraSelected"\
                                        ng-options="item[2] as item[2]  for item in data">\
                                    <option value="">-- choose an item --</option>\
                        </select>'
                    },
                    render : '<a ng-click="appScope.click(item)" href="javascript:void(0)">点击</a>'
                }
            ]
        };
        $scope.selectShow = false;
        $scope.selectorShow = function(target){
            numTarget = target;
            $scope.selectShow = !$scope.selectShow;
            $scope.selectSho = false;

        }
        function flter(items,item,target){//过滤
            var objective = [], residue= []
            for(var j=0;j<item.length;j++){
                for(var i=0;i<items.length;i++){
                    if(items[i][target].indexOf(item[j])!==-1){
                        objective.push(items[i])
                    }
                }
            }
            return objective
        }
        $scope.selectorChanged = function(context,selected ,index) {
            $scope.sizeColor=!!selected.length ? false:true;
            arr=[]
            for(var i = 0;i<selected.length;i++){
                arr.push(selected[i].label);
            }
            var ds = DataSourceService.get('ds_table');
            var condition = {};
            ds.query(condition)
        }
        $scope.tableProcessor=function(data) {
            console.log(data)
            arrData=JSON.parse(JSON.stringify(data.data))
            if (!!arr.length) {
                data.data = flter(data.data, arr, numTarget)
            }
            return data
        }
        $scope.click = function(item) {
            //弹出选择栏，重填value
            Alert.scope = $scope;
            Alert.confirm("自定义editorRenderer，弹出演示", "提示框");
        };
        //titleOptions的数据结构根据自身业务逻辑来定
        //变化后的处理逻辑
        $scope.titleExtraSelecteHandler = function(selected) {
            alert("你选择了"+selected);
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