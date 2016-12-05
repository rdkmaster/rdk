
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

return {
    calculable : true,
    grid:{
        left:16,
        right:30,
        top:15,
        bottom:0
        },
    xAxis : [
        {  
            type : 'value',
            splitNumber:4,
            axisLine:{
                show: false,
            },
            splitLine:{//出网格线
　　　　            show:false
　　        },
            axisTick:{//坐标轴刻度相关设置
                show: false,
            },
            axisLabel:{
                show: false,
            },
        }
    ],
    yAxis : [
        {
            splitLine:{
　　　　        show:false
　　        },
            inverse:true,
            show:false,
            boundaryGap:true,
            type : 'category',
            scale:false,
            axisLabel:{
              textStyle :{
                  color:'#434343'//刻度标签样式
              } 
            },
             axisLine:{
                show: false,
                lineStyle:{
                    color:'#ff7c27' //刻度样式
                }
            } ,
            axisTick:{//坐标轴刻度相关设置
                show: false,         
            },
            data :data.header
        }
    ],
    series : [
        {
            name:'bar1',
            type:'bar',
            silent: true,
            itemStyle: {//图形边框设置，如边框大小，圆角，填充着色
                normal: {
                    color: "#ddeef7",
                    barBorderRadius: 5,
                },
                emphasis: {
                    color: "#ddeef7",
                    barBorderRadius: 5,
                }
            },
            barWidth:10,//条形宽度
            data:[100 , 100 , 100 , 100 , 100 , 100,100 ]
        },
         {
            name:'bar',
            type:'bar',
            silent: true,
            barGap:'-100%',
            animation:false,//关闭动画
            label : {//图形数据显示位置
                normal: {
                    show: true, position:[145 , -3] ,
                    textStyle: {
                        color: "#434343",
                        fontSize:12,
                        fontFamily:'微软雅黑'

                    },
                    formatter: "{c}"

                   
                },
            },
            itemStyle: {
                normal: {
                    color:'#54acd5',
                    barBorderRadius:5
                },
                emphasis: {color: '#54acd5'}
            },
             barWidth:10,
             data: data.data
        },
    ]
};

}});