(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.ComboSelect', 'rd.controls.BasicSelector','css!rd.styles.IconFonts',
        'rd.containers.Accordion','rd.attributes.Scroll', 'css!base/css/menu'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope', 'EventService', 'EventTypes', 'Data', '$timeout', main];
    function main(scope, EventService, EventTypes, Data, $timeout) {
        scope.combOpen = false;
        scope.items = Data.data;
        scope.Open=false
        var selectedLists=[];
        for (var i = 0; i < scope.items.length; i++) {
            (function (i) {
                EventService.register('selector' + (i + 1), EventTypes.CHANGE, function (content, selected) {
                    if (scope.items[i].subTopic.length == selected.length) {
                        $(".Mselecter" + (i + 1)).addClass("seletor")
                    } else {
                        $(".Mselecter" + (i + 1)).removeClass("seletor")
                    }
                })
            })(i)
        }
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
        scope.selected2string = function(selected) {
            var label='';
            var len = scope.items.length;
            selectedLists=[];
            for(var j=0;j<len;j++){
                selectedLists=selectedLists.concat(scope.items[j].highLight)
            }
            angular.forEach(selectedLists,function(labelVal){
                label=Lfang(labelVal,label)
            })
        EventService.broadcast('comboID', EventTypes.CHANGE, label);
        };
        EventService.register('comboID',EventTypes.CLEAR, function(){
            var len=scope.items.length;
            selectedLists=[];
            for(var i=0;i<len;i++){
                if($(".seletor1"+(i+1))){$(".Mselecter"+(i+1)).removeClass("seletor")};
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
        //全选
        function Lfang(labelVal,label){
            if (label == "") {
                label = labelVal.label
            } else {
                label += ',' + labelVal.label;
            }
            return label
        }
        scope.fun=function(index,event) {
            var len = scope.items.length;
            var label = '';
            selectedLists = [];
            if (!$(event.target).hasClass('seletor')) {
                $(event.target).addClass( "seletor")
                for (var i = 0; i < len; i++) {
                    if (i == index) {
                        scope.items[i].highLight = scope.items[i].subTopic
                    }
                    selectedLists = selectedLists.concat(scope.items[i].highLight)
                }
            }else{
                $(event.target).removeClass("seletor");
                for (var i = 0; i < len; i++) {
                    if (i == index) {
                        scope.items[i].highLight =[];
                    }
                    selectedLists = selectedLists.concat(scope.items[i].highLight)
                }
            }
            angular.forEach(selectedLists, function (labelVal) {
                label=Lfang(labelVal,label)
            })
            EventService.broadcast('comboID', EventTypes.CHANGE, label);

        }
    }
    rdk.$ngModule.service("Data",function(){
        return {
            data: [
                {
                    id:'selector1',
                    topic:"省份",
                    subTopic:[{
                        label: "江省",
                    }, {
                        label: "江山省",
                    }, {
                        label: "河南",
                    }],
                    highLight: []
                },
                {
                    id:'selector2',
                    topic:"排序字段",
                    subTopic:[{
                        label: "江苏省",
                    }, {
                        label: "浙江省",
                    }, {
                        label: "河南省",
                    }],
                    highLight: []
                },
                {
                    id:'selector3',
                    topic: "短消息",
                    subTopic: [{
                        label: '10',
                    }, {
                        label: "南江省",
                    }, {
                        label: '5',
                    },{
                        label: '15',
                    }, {
                        label: "南省",
                    }, {
                        label: '150',
                    },{
                        label: '20',
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