define('main', ['angular', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector', 'rd.containers.Accordion'], function() {
    var myApp = angular.module('rdk_app', [
        'rd.containers.Accordion',
        'rd.controls.ComboSelect',
        'rd.controls.BasicSelector'
    ]);
    
    myApp.controller('SubController', ['$scope',function(){

    }]);

    myApp.controller('myCtrl', ['$scope', 'RDKConst', 'BasicSelector', 'EventService', 'EventTypes', '$timeout',function(scope, RDKConst, BasicSelector, EventService, EventTypes, $timeout) {

        scope.selected2string = function(selected, context, index) {
            return BasicSelector.selected2string(selected, 'label', ', ');
        }

        scope.getOrderParam = function(data, context, index) {
            try {
                //使用index可以断定是context中哪个值发生了变化
                console.log('changed item index=' + index);
                if (index == 2 && data[0].label == '非法值') {
                    return RDKConst.STOP_PROPAGATIOIN;
                } else {
                    return '对结果进行 ' + context[2].data[0].label +
                        ' 排序后，取TOP' + context[1].data[0].label;
                }
            } catch (e) {
                return '系统初始化中，请稍候...';
            }
        }

        scope.changeHandler = function(event, data){
            var str = BasicSelector.selected2string(data, 'label', ', ');
            EventService.broadcast('comboSelectID', EventTypes.CHANGE, str);
        }

        /*combo反显str*/
        var str1 = BasicSelector.selected2string([{label: '10'}], 'label', ', ');
        var str2 = BasicSelector.selected2string([{label: '升序'}], 'label', ', ');
        scope.orderHandler = function(event, data){
            if(event.dispatcher == 'topID'){
                str1 = BasicSelector.selected2string(data, 'label', ', '); 
            }
            if(event.dispatcher == 'orderID'){
                str2 = BasicSelector.selected2string(data, 'label', ', ');
            }
            var str = '对结果进行 ' + str2 + ' 排序后，取TOP' + str1;
            EventService.broadcast('comboSelectID', EventTypes.CHANGE, str);
        }

        // /*测试写了不定义，3秒后定义*/
        // $timeout(function(){
        //     // scope.testSelectedItems = [{id:1, label:"浙江省"}];
        //     scope.testAllItems = [
        //            { id: 0, label: "江苏省" },
        //            { id: 1, label: "浙江省" },
        //            { id: 2, label: "广东省" },
        //            { id: 3, label: "广西省" },
        //            { id: 4, label: "河北省" },
        //            { id: 5, label: "河南省" },
        //            { id: 6, label: "湖北省" },
        //            { id: 7, label: "湖南省" },
        //            { id: 8, label: "新疆省" },
        //            { id: 9, label: "四川省" }
        //        ];
        //     $timeout(function(){
        //         console.log(scope.testSelectedItems);
        //     },0);
        // }, 3000);

        /*测试写了且定义，3秒后改值*/
        scope.testAllItems = [
            { id: 0, label: "江苏省" },
            { id: 1, label: "浙江省" },
            { id: 2, label: "广东省" },
            { id: 3, label: "广西省" },
            { id: 4, label: "河北省" },
            { id: 5, label: "河南省" },
            { id: 6, label: "湖北省" },
            { id: 7, label: "湖南省" },
            { id: 8, label: "新疆省" },
            { id: 9, label: "四川省" }
        ];
        $timeout(function(){
            console.log(scope.testSelectedItems);//外面拿到里面的
            scope.testSelectedItems = [{ id: 2, label: "广东省"}];
            // scope.testAllItems = [
            //     { id: 0, label: "江苏省" },
            //     { id: 1, label: "浙江省" },
            //     { id: 2, label: "广东省" },
            //     { id: 3, label: "广西省" }
            // ];
        }, 3000);

        scope.changeHandler = function(event, data){
            console.log(scope.testSelectedItems);
        }

    }]);
});
