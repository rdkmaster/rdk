define('main', ['angular', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector','rd.services.EventService'], function() {
    var app = angular.module('rdk_app', [
        'rd.controls.ComboSelect',
        'rd.controls.BasicSelector',
        'rd.services.EventService'
    ]);

    app.controller('myCtrl', ['$scope', 'BasicSelector','EventService','EventTypes', function(scope, BasicSelector,EventService,EventTypes) {
        scope.allItems = [{id: 0,label: "江苏省"}, {id: 1,label: "浙江省"}, {id: 2,label: "河南省"}, {id: 3,label: "湖北省"}];
        scope.allCitys = [{id: 0,label: "成都市"}, {id: 1,label: "自贡市"}, {id: 2,label: "泸州市"}, {id: 3,label: "遂宁市"}];
        scope.selected2string = function(selected, context, index) {
            return BasicSelector.selected2string(selected, 'label');
        }
        EventService.register('id_selector', EventTypes.CHANGE, function(event, data) {
                var datacity=data[0].label;
                if(datacity!=undefined){
                    switch(datacity){
                        case "成都市":
                            scope.allAreas = [{id: 0,label: "锦江区"}, {id: 1,label: "青羊区"}, {id: 2,label: "金牛区"}, {id: 3,label: "金牛区"}];
                            break;
                        case "自贡市":
                            scope.allAreas = [{id: 0,label: "过来区"}, {id: 1,label: "过去区"}, {id: 2,label: "大年区"}, {id: 3,label: "人杰区"}];
                            break;
                        case "泸州市":
                            scope.allAreas = [{id: 0,label: "铁皮区"}, {id: 1,label: "树林区"}, {id: 2,label: "草原区"}, {id: 3,label: "金牛区"}];
                            break;
                        case "遂宁市":
                            scope.allAreas = [{id: 0,label: "锦江区"}, {id: 1,label: "青羊区"}, {id: 2,label: "十字区"}, {id: 3,label: "基面区"}];
                            break;    
                    }
                }
            });

    }]);
});
       