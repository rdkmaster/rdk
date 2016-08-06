define('main', ['rd.controls.BasicSelector'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.BasicSelector']);
// 创建一个控制器
app.controller('myCtrl', ['$scope','EventService','EventTypes','$timeout', function(scope, EventService, EventTypes, $timeout) {
/******************************************************
     将应用的代码逻辑添加在这个匿名函数内部
******************************************************/

 /*测试写了不定义，3秒后定义*/
 // $timeout(function(){
 //    scope.testSelectedItems = [{id:1, label:"浙江省"}];
 //    scope.testAllItems = [
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
 // }, 3000);

    /*测试写了且定义，3秒后改值*/
    // scope.testAllItems = [
    //     { id: 0, label: "江苏省" },
    //     { id: 1, label: "浙江省" },
    //     { id: 2, label: "广东省" },
    //     { id: 3, label: "广西省" },
    //     { id: 4, label: "河北省" },
    //     { id: 5, label: "河南省" },
    //     { id: 6, label: "湖北省" },
    //     { id: 7, label: "湖南省" },
    //     { id: 8, label: "新疆省" },
    //     { id: 9, label: "四川省" }
    // ];
    // $timeout(function(){
    //     console.log(scope.testSelectedItems);//外面拿到里面的
    //     scope.testSelectedItems = [{ id: 2, label: "广东省" }];
    //     scope.testAllItems = [
    //         { id: 0, label: "江苏省" },
    //         { id: 1, label: "浙江省" },
    //         { id: 2, label: "广东省" },
    //         { id: 3, label: "广西省" }
    //     ];
    // }, 3000);

    // scope.changeHandler = function(event, data){
    //     console.log(scope.testSelectedItems);
    //     console.log(scope.data);
    // }

    /*测试cityDS.result，3秒后改值*/
    // scope.testSelectedItems = [ {id: 10, label: "北京" },{ id: 1, label: "浙江省" }];
    scope.cityDS = {result: [
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
    ]};

    // $timeout(function(){
    //     console.log(scope.testSelectedItems);//外面拿到里面的
    //     scope.cityDS = {result: [
    //         { id: 5, label: "河南省" },
    //         { id: 6, label: "湖北省" },
    //         { id: 7, label: "湖南省" },
    //         { id: 8, label: "新疆省" },
    //         { id: 9, label: "四川省" }
    //     ]};
    //     $timeout(function(){
    //         console.log(scope.testSelectedItems);
    //     }, 0);
    // }, 3000);

    /*事件测试*/
    // $timeout(function(){
    //     // EventService.broadcast('testID', EventTypes.SELECT);
    //     EventService.broadcast('testID', EventTypes.SELECT, 'all');
    //     // EventService.broadcast('testID', EventTypes.SELECT, [{ id: 5, label: "河南省" },{ id: 6, label: "湖北省" }]);
    //     $timeout(function(){
    //         console.log(scope.testSelectedItems);
    //     },0);
    // },3000);

    // scope.resHandler = function(val){
    //     var reg = /^\d{1,10}$/;
    //     if(reg.test(val)){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // }
    scope.resHandler = '^\\d{1,10}$';
}

]);
});
