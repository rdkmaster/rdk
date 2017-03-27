(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.AreaSelect', 'rd.controls.ComboSelect','rd.controls.TimeSelect','css!base/css/demo',
        'rd.controls.ComboSelect', 'rd.controls.BasicSelector','rd.controls.ListSelector','rd.controls.Button',
        'rd.containers.Accordion', 'css!base/css/menu','rd.attributes.theme', 'rd.controls.Icon','rd.controls.Time'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService','EventTypes','$timeout', main];
    function main(scope,EventService,EventTypes,$timeout) {
        <!-- 导航主题二(软银) -->
        //地区设置初始值
        scope.vmaxArea={
            province:{name:"广东",code:"1"},
            city:{name:"深圳",code:"2"},
            area:{name:"南山区",code:"3"}
        };
        //时间配置
        scope.granularitySet={
            value: 'now',
            granularity: "month",
            selectGranularity:true,
            startDate:"2016-01-1 13:30", //可选的开始时间，类型字符串/Date对象
            //endDate:"now"  //可选的结束时间，类型字符串/Date对象
        };

        $timeout(function(){
            EventService.broadcast('comboID', EventTypes.CHANGE, scope.granularitySet.value);
        },0);
        EventService.register('selectorID', EventTypes.CHANGE, function(event, data){
            scope.comboOpenStatus=false;
            EventService.broadcast('comboID', EventTypes.CHANGE, data);
        });

        //frequency下拉框
        scope.frequencyDate=[
            "All Frequency",
            "一项这么长长长。。。。。。。。",
            "LTETDD",
            "LTEFDD",
            "[1]2120.0(100)",
            "[2]2120.0(100)",
            "[3]2120.0(100)",
            "[4]2120.0(100)",
            "[5]2120.0(100)",
            "[6]2120.0(100)",
            "[7]2120.0(100)",
            "[8]2120.0(100)",
            "[9]2120.0(100)",
            "[11]2120.0(100)",
            "[12]2120.0(100)",
            "[13]2120.0(100)",
            "[14]2120.0(100)"
        ];
        scope.frequencySelected=[];
        scope.frequencySelected[0]=scope.frequencyDate[0];

        //加载KPI模块
        scope.loadmKPI = function() {
            rdk.mKPI.loadModule({}, './template/menu.html');
        };

        <!-- 导航主题一(默认) -->
        scope.loadmKPI2 = function() {
            rdk.mKPI2.loadModule({}, './template/menu.html');
        };
        scope.timeSetting={

            value: '2016-03-04 14:00',
            selectGranularity: true,
            granularity: "hour",
            granularityItems: [{
                label: "15分钟",
                value: "quarter",
                gap: "inweek"
            }, {
                label: "小时",
                value: "hour",
                gap: "2d"
            }, {
                label: "天",
                value: "date",
                gap: "inmonth"
            }, {
                label: "周",
                value: "week",
                gap: "inmonth"
            },{
                label: "月",
                value: "month",
                gap: "inyear"
            }]
        };
        scope.frequencyDate2=[
            "All Frequency",
            "一项这么长长长。。。。。。。。",
            "LTETDD",
            "LTEFDD",
            "[1]2120.0(100)",
            "[2]2120.0(100)",
            "[3]2120.0(100)",
            "[4]2120.0(100)",
            "[5]2120.0(100)",
            "[6]2120.0(100)",
            "[7]2120.0(100)",
            "[8]2120.0(100)",
            "[9]2120.0(100)",
            "[11]2120.0(100)",
            "[12]2120.0(100)",
            "[13]2120.0(100)",
            "[14]2120.0(100)"
        ];

    }
    var mKPIControllerDefination = ['$scope', 'EventService', 'EventTypes', 'Data', '$timeout', mKPImain];
    function mKPImain(scope, EventService, EventTypes, Data, $timeout) {
        scope.combOpen = false;
        scope.items = Data.data;
        scope.basicMultiple = false;
        scope.Open=false;
        var selectedLists=[];
        scope.myFunc = function(searchVal) {//过滤
            var len = Data.data.length;
            var rateArrs=[];
            for(var i=0;i<len;i++){
                var lens=Data.data[i].subTopic.length;
                var item = {};
                var rateArr=[];
                for(var j=0; j<lens;j++) {
                    var subLabel=Data.data[i].subTopic[j].label;
                    if(subLabel.indexOf(searchVal) != -1){
                        item.topic=Data.data[i].topic;
                        rateArr.push(Data.data[i].subTopic[j]);
                        item.subTopic=rateArr;
                        item.highLight=selectedLists
                    }
                }
                if(item.subTopic && item.subTopic.length!=0){
                    rateArrs.push(item);
                }
            }
            scope.items=rateArrs;
        };
        scope.selected2string = function(selected, context) {
            var label='';
            var len = scope.items.length;
            if(scope.basicMultiple===true) {//多选
                selectedLists=[];
                for(var j=0;j<len;j++){
                    selectedLists=selectedLists.concat(scope.items[j].highLight)
                }
                angular.forEach(selectedLists,function(labelVal){
                    if(label==""){
                        label=labelVal.label
                    }else {
                        label += ',' + labelVal.label;
                    }
                })
            }else{//单选
                label=selected[0].label;
                selectedLists=[];
                selectedLists.push(selected[0]);
                var len = scope.items.length;
                for(var i=0 ;i<len;i++){
                    scope.items[i].highLight=selectedLists
                }
                scope.combOpen = false;
            }
            EventService.broadcast('comboID@'+scope.$moduleId, EventTypes.CHANGE, label);
        };
        EventService.register('comboID@'+scope.$moduleId,EventTypes.CLEAR, function(){
            var len=scope.items.length;
            selectedLists=[];
            for(var i=0;i<len;i++){
                scope.items[i].highLight=[];
            }
        });

        EventService.register(scope.$moduleId, 'ready', function() {
            _initKpiFn();
            scope.$watch('combOpen',  function(newValue) {
                var inputDom = document.getElementById("input@"+scope.$moduleId);
                if(newValue===true){
                    $timeout(function(){
                        scope.Open=true;
                        !!inputDom && inputDom.focus();
                    })
                }else{
                    !!inputDom && inputDom.blur();//兼容IE11
                    scope.Open=false;
                }
            });
        });
        function _initKpiFn(){
            var _initKpiVal = "";
            for(var i=0,len = scope.items.length;i<len;i++){
                for(var j=0;j<scope.items[i].highLight.length;j++)
                {
                    _initKpiVal += scope.items[i].highLight[j].label;
                }
            }
            EventService.broadcast('comboID@'+scope.$moduleId, EventTypes.CHANGE, _initKpiVal);
        }
    }

    rdk.$ngModule.service("Data",function(){
        return {
            data: [
                {
                    id:1,
                    topic:"Indicator",
                    subTopic:[
                        {label: "RSRP", groupId:1},
                        {label: "NeighborRSQR", groupId:1},
                        {label: "RSQR", groupId:1},
                        {label: "AFSSFWQ", groupId:2},
                        {label: "AGXZZXC", groupId:3},
                        {label: "FWRQWRQWD", groupId:4},
                        {label: "BASDSDW", groupId:5}
                    ],
                    highLight: [{label: "RSRP", groupId:1}]
                },
                {
                    id:2,
                    topic:"排序字段",
                    subTopic:[{
                        label: "江苏省",
                        groupId:2
                    }, {
                        label: "浙江省",
                        groupId:2
                    }, {
                        label: "河南省",
                        groupId:2
                    }],
                    highLight: []
                },
                {
                    id:3,
                    topic: "短消息",
                    subTopic: [{
                        label: '10',
                        groupId:3
                    }, {
                        label: "南江省",
                        groupId:3
                    }, {
                        label: '5',
                        groupId:3
                    },{
                        label: '15',
                        groupId:3
                    }, {
                        label: "南省",
                        groupId:3
                    }, {
                        label: '150',
                        groupId:3
                    },{
                        label: '20',
                        groupId:3
                    }],
                    highLight: []
                }
            ]
        }
    });
    var controllerName = 'DemoController';
    var mKPIControllerName = 'mKPIController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
        rdk.$ngModule.controller(mKPIControllerName, mKPIControllerDefination);
    }
})();