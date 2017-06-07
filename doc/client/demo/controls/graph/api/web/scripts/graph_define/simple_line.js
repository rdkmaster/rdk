
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
    /*
    * 饼图联动，如：现在二级原因有7个，实际用的时间可以根据点击时获取的‘二级原因的名字’作为查询条件获得相应数据;
    * 从而7个js 可以只写一个了。
    *
    * */
    colors = ['#f99660','#a4bf6a','#8ac9b6','#54acd5','#bea5c8']
    var allData = [];
    var len = data.data.length;
    if (len) {
        for (var i = 0; i < len; i++) {
            allData[i] = {};
            allData[i].value = data.data[i].value;
            allData[i].name = data.data[i].name;
            allData[i].selected=i==0?true:false;
            allData[i].itemStyle = i==0?{normal: {color: colors[i],
                shadowColor:colors[i],
                shadowBlur: 12.5}}:{normal: {color: colors[i]}}
        }
    }
return {
     legend: {
        itemWidth: 12,
        itemHeight: 12,
        itemGap:10,
        top: 30,
        left: 'center',
        textStyle: {
            color: '#434343',
        },
        data: data.header
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    title: {
        text: "接入失败",
        x: 'center',//主题位置
        y: 'center',
        itemGap: 5,
        subtext: "一级原因",
        subtextStyle: {
            fontSize : 14
        }
    },
        series: [
    {   
        name: "接入失败<br/>一级原因",
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
        type:'pie',
        radius: ['45', '63'],
        center : ['50%', '55%'],
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