(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.ComboSelect', 'rd.controls.BasicSelector',
        'rd.containers.Accordion','rd.attributes.Scroll', 'css!base/css/menu'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', 'EventTypes', 'Data', '$timeout', main];
    function main(scope, EventService, EventTypes, Data, $timeout) {
        scope.combOpen = false;
        scope.items = Data.data;
        scope.Open=false;
        var label='';
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
        scope.selected2string = function(selected,f,g) {
            scope.combOpen=false;
            var len = scope.items.length;
            if(selected.length) {
                label = selected[0].label;
                selectedLists = [];
                selectedLists.push(selected[0]);
                for (var i = 0; i < len; i++) {
                    scope.items[i].highLight = selectedLists
                }
            }
            EventService.broadcast('comboID', EventTypes.CHANGE, label);

        };
        EventService.register('comboID',EventTypes.CLEAR, function(){
            var len=scope.items.length;
            selectedLists=[];
            for(var i=0;i<len;i++){
                scope.items[i].highLight=[];
            }
        });
        scope.$watch('combOpen',  function(newValue) {
            if(newValue===true){
                $timeout(function(){
                    scope.Open=true;
                    document.getElementById("input").focus()
                })
            }else{
                document.getElementById("input").blur();//兼容IE11
                scope.Open=false;
            }
        });
    }

    rdk.$ngModule.service("Data",function(){
        return {
            data: [
                {
                    id:1,
                    topic:"省份",
                    subTopic:[{
                        label: "江省",
                        groupId:1
                    }, {
                        label: "江山省",
                        groupId:1
                    }, {
                        label: "河南",
                        groupId:1
                    }],
                    highLight: []
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