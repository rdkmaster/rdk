var app = angular.module("myApp", ['rd.basic', 'rd.controls.Graph']);
app.controller('ctrl', ['$scope', 'DataSourceService', 'EventService',
function(scope, DSService, EventService) {

scope.temperatureOption = {
    title : {
        text: '未来一周气温变化'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['最高气温','最低气温']
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'最高气温', type:'line',
            data:[11, 11, 15, 13, 12, 13, 10],
        },
        {
            name:'最低气温', type:'line',
            data:[1, -2, 2, 5, 3, 2, 0],
        }
    ]
}

}]);
