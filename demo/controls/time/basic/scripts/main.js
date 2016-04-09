define('main', ['rd.controls.Time'], function() {

    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Time']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope','$location','EventService', 'EventTypes', 'Utils', 'CommonUtil', 
        function(scope,$location,EventService, EventTypes, Utils, CommonUtil) {
        /******************************************************
             将应用的代码逻辑添加在这个匿名函数内部
        ******************************************************/
        endtime = new Date().Format('yyyy-MM-dd HH:mm:ss');
        begintime = new new Date().DateAdd('h', -2).Format('yyyy-MM-dd HH:mm:ss');
        //时间粒度设置
        scope.dateSet = {
            value: [begintime , endtime],
            selectGr: true,
            gr: "quarter",
            grItems: [{
                label: "15分钟",
                value: "quarter",
                gap: "inweek"
            }, {
                label: "小时",
                value: "hour",
                gap: "inweek"
            }, {
                label: "天",
                value: "date",
                gap: "inmonth"
            }, {
                label: "月",
                value: "month",
                gap: "inyear"
            }]
        };
    }]);
});
