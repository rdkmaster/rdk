
// underscore 是一个开源库，提供了丰富的高性能的对数组，集合等的操作
// api 手册：http://learningcn.com/underscore
// 为了少加载不必要的代码，默认是不引入 underscore 的，需要用到的话
// 将define所在中的'underscore'的注释去掉即可。即改为
//        define(['underscore'], function() {
//           ...
//        });

define([], function() {

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
    colors = ['#d78989','#efa59d','#f0c163','#fce5be']
    var allData = [];
    var len = data.data.length;
    if (len) {
        for (var i = 0; i < len; i++) {
            allData[i] = {};
            allData[i].value = data.data[i].value;
            allData[i].name = data.data[i].name;
            allData[i].itemStyle = {normal: {color: colors[i]}}
        }
    }
return {
 legend: {
        itemWidth: 12,
        itemHeight: 12,
        itemGap:10,
        top: 10,
        left: 30,
        selectedMode: false,
        textStyle: {
            color: '#434343',
            fontSize: 12,
        },
        data:  data.header
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    title: {
        text: '容量问题',
        itemGap: 5,
        subtext: "二级原因",
        x: '20%',//主题位置
        y: '42%',
        textStyle : {
            color:'#333',
            fontFamily : '微软雅黑',
            fontSize : 14,
            fontWeight:'normal'
        },
        subtextStyle: {
            color:'#333',
            fontFamily : '微软雅黑',
            fontSize : 14,
            fontWeight:'normal'
        }
    },
        series: [
    {   
        name: "容量问题<br/>二级原因",
        label : {
            normal: {
                show: false,
                 textStyle: {
                    color:'#000',
                    fontSize : 14,
                },
                formatter : function (params){
                    return  params.name+'\n'+params.value + '%'
                }
            }
        },
        itemStyle: {
            normal: {
                borderColor: '#fff',
                borderWidth: 1,
            }
        },
        type:'pie',
        radius: ['45', '63'],
        center : ['30%', '50%'],
        avoidLabelOverlap: false,
        hoverAnimation:false,
        labelLine: {
            normal: {
                show: false
            }
        },
        data:allData
    }]
};

}});