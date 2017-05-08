
// underscore 是一个开源库，提供了丰富的高性能的对数组，集合等的操作
// api 手册：http://learningcn.com/underscore
// 为了少加载不必要的代码，默认是不引入 underscore 的，需要用到的话
// 将define所在中的'underscore'的注释去掉即可。即改为
//        define(['underscore'], function() {
//           ...
//        });

define(['echarts'], function(echarts) {

// data 是Graph的输入数据。
// 使用data参数时，请务必保持只读
// 除非你很清楚你需要对data做什么，并且了解AngularJS的digest循环机制
// 否则请不要增删改data的任何属性，这会引起digest死循环

// context 是生成图形定义的辅助数据，默认值是应用的scope。
// 在生成复杂图形的时候，仅靠data本身不足以生成一个图形定义
// 此时就需要用到这个对象来辅助

// GraphService 是一个函数集，主要提供了对二维数组的常用操作

// attributes 是当前Graph所在的html节点的所有属性集。也是一种辅助数据。
return function(data, context, GraphService, attributes) {
var allSeries=[],
    len = data.data.length;
    if(data.data.length){
        for(var i=0;i<len;i++){
            allSeries[i] = {};
            allSeries[i].name =data.header[i];
            allSeries[i].type = 'bar';
            allSeries[i].stack = '总量';
            allSeries[i].barWidth = 15;
            allSeries[i].itemStyle = {"normal":{"barBorderRadius":0}};
            allSeries[i].data = data.data[i]
        }
    }
return{
    tooltip : {
        trigger: 'axis',
        position: function (point, params, dom, rect, size) {
            // 固定在顶部
            return [point[0]+15, point[1]+15];
        }
    },
    legend: {
        data: ['hot', 'instrument','parallel','rader','simple','boxplots','bubblegraduent','funnelplot','mulberryfigure','rectangletree' ,
        'relationalgraph','simplebar','componentlayout','comprehensive','containers'],
        itemHeight:8,
        itemGap:8,
        width: '95%',
        itemWidth: 16,
        left:'center',
        formatter: function (name) {
            return echarts.format.truncateText(name, 50, '14px Microsoft Yahei', '…');
        },
        tooltip: {
            show: true
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
    },
    xAxis:  {
        type: 'category',
        axisLabel:{
            rotate:30,
            interval:0
        },
        data: ["2017.3.1","2017.3.2","2017.3.3","2017.3.4","2017.3.5","2017.3.6","2017.3.7","2017.3.8","2017.3.9","2017.3.10","2017.3.11","2017.3.12","2017.3.13","2017.3.14","2017.3.15"]
    },
    yAxis: {
        type: 'value',

    },
    series: allSeries
};
}});