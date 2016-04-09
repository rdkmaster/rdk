
define(function() {
// 使用data参数时，请务必保持只读
// 除非你很清楚你需要对data做什么，并且了解AngularJS的digest循环机制
// 否则请不要增删改data的任何属性，这会引起digest死循环

// context 是
return function(data, context, GraphService, attributes) {

return {
    title : {
        text: '未来一周气温变化',
        subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data: data.rowDescriptor
    },
    xAxis : [
        {
            type : 'category', boundaryGap : false,
            data : data.header
        }
    ],
    yAxis : [
        {
            type : 'value', axisLabel : { formatter: '{value} °C' }
        }
    ],
    series : [
        {
            name: data.rowDescriptor[0],
            data: data.data[0],
            type:'line'
        },
        {
            name: data.rowDescriptor[1],
            data: data.data[1],
            type:'line'
        }
    ]
};

}});