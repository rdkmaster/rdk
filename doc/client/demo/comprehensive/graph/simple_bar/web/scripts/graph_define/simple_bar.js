
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

return{
    tooltip : {
        trigger: 'axis',
        position: function (point, params, dom, rect, size) {
            // 固定在顶部
            return [point[0], point[1]];
        }
    },
    legend: {
        data: ['hot', 'instrument','parallel','rader','simple','boxplots','bubblegraduent','funnelplot','mulberryfigure','rectangletree' ,
        'relationalgraph','simplebar','componentlayout','comprehensive','containers'],
        formatter: function (name) {
            return echarts.format.truncateText(name, 60, '14px Microsoft Yahei', '…');
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
        data: data.header
    },
    yAxis: {
        type: 'value',

    },
    series: [
        {
            name: 'hot',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            //label: {
            //    normal: {
            //        show: true,
            //        position: 'insideRight'
            //    }
            //},
            data: [120, 102, 201, 134, 190, 230, 120, 132, 181, 134, 90, 260, 192, 101, 184]
        },
        {
            name: 'instrument',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 240, 130, 132, 101, 194]
        },
        {
            name: 'parallel',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [220, 182, 191, 234, 290, 330, 310, 132, 234, 190, 130, 130, 132, 201, 234]
        },
        {
            name: 'rader',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [150, 212, 201, 154, 190, 130, 210, 132, 101, 194, 234, 190, 130, 201, 134]
        },
        {
            name: 'simple',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [150, 212, 201, 154, 190, 130, 210, 132, 101, 194, 234, 190, 130, 201, 134]
        },
        {
            name: 'bubblegraduent',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [220, 232, 201,234, 234, 190, 130, 132, 101, 234, 300, 230, 232, 201, 134]
        },
        {
            name: 'boxplots',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [220, 232, 201,234, 190, 130, 120, 234, 190, 130, 300, 230, 232, 201, 134]
        },
        {
            name: 'funnelplot',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [220, 232, 201,234, 190, 130, 120, 132, 101, 234, 300, 230, 232, 201, 134]
        },
        {
            name: 'mulberryfigure',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [220, 232, 234, 190, 130, 130, 120, 132, 101, 234, 300, 230, 232, 201, 134]
        },
        {
            name: 'rectangletree',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [220, 232, 201,234, 190, 234, 190, 130, 101, 234, 234, 190, 130, 201, 134]
        },
        {
            name: 'relationalgraph',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [220, 232, 201,234, 190, 130, 234, 190, 130,234, 300, 230, 232, 201, 134]
        },
        {
            name: 'simplebar',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [220, 232, 201,234, 190, 130, 120, 132, 101, 234, 190, 130, 232, 201, 134]
        },
        {
            name: 'componentlayout',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [220, 232, 201,234, 234, 190, 130, 132, 101, 234, 300, 230, 232, 201, 134]
        },
        {
            name: 'comprehensive',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [220, 232, 234, 190, 130, 130, 120, 132, 101, 234, 190, 130, 232, 201, 134]
        },
        {
            name: 'containers',
            type: 'bar',
            stack: '总量',
            barWidth:25,
            itemStyle:{normal:{barBorderRadius:0}},
            data: [220, 232, 201,234, 234, 190, 130, 132, 101, 234, 300, 234, 190, 130, 134]
        }
    ]
};


}});