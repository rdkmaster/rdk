(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Table', 'rd.services.Alert', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector',
        'css!base/custom'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'Alert','DataSourceService','$timeout', main];
    function main($scope, Alert, DataSourceService,$timeout) {
        var arr=[],arrData=[];
        $scope.setting = {
            "columnDefs" :[
                {
                    title : function(data, target) {
                        $scope.allItems=[];
                        var total = []
                        var j = 0;
                        for(var i=0;i< arrData.length;i++){//去重，得出下拉的列
                            if(total.indexOf(arrData[i][target]) === -1){
                                total.push(arrData[i][target]);
                                $scope.allItems[j]={};
                                $scope.allItems[j].id=j;
                                $scope.allItems[j].label= arrData[i][target]
                                j++;
                            }
                        }
                        return '<div class="userDefined"  >你好<i class="iconfont iconfont-e92a pticon colorGray" ></i>\
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
                        for(var i=0;i< arrData.length;i++){//去重，得出下拉的列
                            if(total.indexOf(arrData[i][target]) === -1){
                                total.push(arrData[i][target]);
                                $scope.allItem[j]={};
                                $scope.allItem[j].id=j;
                                $scope.allItem[j].label= arrData[i][target]
                                j++;
                            }
                        }
                        return '<div  class="userDefined" >你好<i class="iconfont iconfont-e92a pticon colorGray"></i>\
                                <div  class="selectorContent clhide">\
                        <rdk_basic_selector data="allItem" selected_items="allSelecte" multiple_select="true" searchable="false" editable="false" change="selectorChanged"><span>{{item.label}}</span>\
                        </rdk_basic_selector>\
                        </div></div>'
                    },
                    targets : 2,
                    sortable: true
                },
                {
                    targets : 5,
                    sortable: true,
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
                    width: 320,
                    render : '<a ng-click="appScope.click(item)" href="javascript:void(0)">点击</a>'
                }
            ]
        };
        function controlIcon(ele){
            ele.each(function(){
                if(!!$(this).find(".selected-item").length){
                    $(this).prev().removeClass("colorGray");
                }else{
                    $(this).prev().addClass("colorGray");
                }
            })
        }
        $timeout(function(){//弹出框开关及过滤图标亮灭
            $('.wrapper').scroll(function(event){
                if(!!$(".selectorContent:not(.clhide)").length) {
                    $(".selectorContent").addClass("clhide");
                    controlIcon($(".selectorContent"))
                }
            });

            $(document).scroll(function(event){
                if(!!$(".selectorContent:not(.clhide)").length) {
                    $(".selectorContent").addClass("clhide");
                    controlIcon($(".selectorContent"))
                }
            });
            $(".pticon").click(function(e){
                if($(this).next().is($(".clhide"))){
                    $(".selectorContent").addClass("clhide");
                    $(this).next().css({
                        "top": ($(this).offset().top+15-$(document).scrollTop()) + "px",
                        "left": ($(this).offset().left+10-$(document).scrollLeft()) + "px"
                    });
                    $(this).next().removeClass("clhide");
                    controlIcon($(".selectorContent"));
                    $(this).removeClass("colorGray");
                }else{
                    $(".selectorContent").addClass("clhide");
                    $(this).next().addClass("clhide");
                    if(!!$(this).next().find(".selected-item").length){
                        $(this).removeClass("colorGray");
                    }else{
                        $(this).addClass("colorGray");
                    }
                }
                return false
            })
        },500);
        $(document).mousedown(function(e) {//点击任何弹出框外的地方可关闭弹出框
            var mySelect = $(".userDefined");
            if(!mySelect.is(e.target) && mySelect.has(e.target).length === 0) {
                if($(".selectorContent:not(.clhide)").length && !$(".selectorContent:not(.clhide)").find(".selected-item").length){
                    $(".selectorContent:not(.clhide)").prev().addClass("colorGray")
                }
                $(".selectorContent").addClass("clhide");
            }
        });
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
        $scope.selectorChanged = function(context,selected ) {
            ben =[$scope.allSelecte,$scope.allSelected];//这里有两个下拉过滤列，定义了两数组，过多的话建议用循环做；
                                                        // $scope.setting中定义的过滤列可以用循环做，可以定义一个数组列的位置,如这里为[1,2]
            arr=[];
            for(var i = 0;i<ben.length;i++){
                arr[i] = []
               for(var t = 0;t<ben[i].length;t++){
                   arr[i][t] = ben[i][t].label;
               }
            }
            var ds = DataSourceService.get('ds_table');
            var condition = {};
            ds.query(condition)
        }
        $scope.tableProcessor=function(data) {
            arrData=JSON.parse(JSON.stringify(data.data))
            if (!!arr.length) {
                for(var i = 0;i<arr.length;i++){
                    data.data = flter(data.data, arr[i])
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