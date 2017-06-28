(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table', 'rd.services.Alert', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector',
        'css!base/custom'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'Alert','DataSourceService','$timeout', main];
    function main($scope, Alert, DataSourceService,$timeout) {
        var arr=[],arrData=[],numTarget=null;
        $scope.sizeColor = true;
        $scope.setting = {
            "columnDefs" :[
                {
                    title : function(data, target) {
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
                        return '<div class="userDefined"  >你好<i class="iconfont iconfont-e92a pticon" ng-class="{colorGray:!allSelected.length}" ng-click="selectorShow('+target+',$event)"></i>\
                                <div  class="selectorContent clhide">\
                        <rdk_basic_selector data="allItems" selected_items="allSelected" multiple_select="true" searchable="false" editable="false" change="selectorChanged"><span>{{item.label}}</span>\
                        </rdk_basic_selector>\
                        </div></div>'
                    },
                    targets : 1,
                    sortable: true
                },
                {
                    title : function(data, target) {
                        $scope.allItem=[];
                        var total = []
                        var j = 0;
                        for(var i=0;i< arrData.length;i++){
                            if(total.indexOf(arrData[i][target]) === -1){
                                total.push(arrData[i][target]);
                                $scope.allItem[j]={};
                                $scope.allItem[j].id=j;
                                $scope.allItem[j].label= arrData[i][target]
                                j++;
                            }
                        }
                        return '<div  class="userDefined" >你好<i class="iconfont iconfont-e92a pticon" ng-class="{colorGray:!allSelecte.length}" ng-click="selectorShow('+target+',$event)"></i>\
                                <div  class="selectorContent clhide">\
                        <rdk_basic_selector data="allItem" selected_items="allSelecte" multiple_select="true" searchable="false" editable="false" change="selectorChanged"><span>{{item.label}}</span>\
                        </rdk_basic_selector>\
                        </div></div>'
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
        $scope.selectorShow = function(target,event){
            $scope.selectShow = !$scope.selectShow;
            $scope.selectSho = true;

        }
        $timeout(function(){
            $(".pticon").click(function(e){
                if($(this).next().is($(".clhide"))){
                    $(".selectorContent").addClass("clhide")
                    $(this).next().removeClass("clhide")
                }else{
                    $(".selectorContent").addClass("clhide")  ;
                    $(this).next().addClass("clhide")
                }

            })
        },1000)
        $(document).mouseup(function(e) {//点击关闭过滤弹出框
            var mySelect = $(".userDefined");
            if(!mySelect.is(e.target) && mySelect.has(e.target).length === 0) {
                $(".selectorContent").addClass("clhide");
            }
        });
        $scope.arritems = [$scope.allSelecte,$scope.allSelected]
        function flter(items,item){//过滤
            if(item.length===0) return items;
            var objective = []
            for(var j=0;j<items.length;j++){
                for(var i=0;i<item.length;i++){
                    if(items[j].indexOf(item[i])!==-1){
                        objective.push(items[j]);
                        break;
                    }
                }
            }
            return objective
        }
        $scope.selectorChanged = function(context,selected ,index) {
            $scope.sizeColor=!!selected.length ? false:true;
            arr = [],arr[0]=[],arr[1]=[];
            for(var i = 0;i<$scope.allSelecte.length;i++){
                    arr[0][i]=$scope.allSelecte[i].label;
            }
            for(var i = 0;i<$scope.allSelected.length;i++){
                arr[1][i]=$scope.allSelected[i].label;
            }
            var ds = DataSourceService.get('ds_table');
            var condition = {};
            ds.query(condition)
        }
        $scope.tableProcessor=function(data) {
            arrData=JSON.parse(JSON.stringify(data.data))
            if (!!arr.length) {
                for(var i = 0;i<arr.length;i++){
                    data.data = flter(data.data, arr[i], numTarget)
                }
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