
// underscore 是一个开源库，提供了丰富的高性能的对数组，集合等的操作
// api 手册：http://learningcn.com/underscore
// 为了少加载不必要的代码，默认是不引入 underscore 的，需要用到的话
// 将define所在中的'underscore'的注释去掉即可。即改为
//        define(['underscore'], function() {
//           ...
//        });

define([/*  'underscore'   */], function() {

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
    title : {
        text:"",
        textStyle: {
            fontSize: 12,
            fontWeight:'normal',
            color:'#666666',
            fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
        },
        x:1200,
        y: 20
        }, 
        grid:{
            x:130,
            y:60
        },
    calculable:false,
    
    xAxis : [
        {   
            type : 'value',
            splitLine: {show:false},
            position: 'bottom',
            max:"dataMax",
            axisLabel : {
               //show:true,
                textStyle: { 
                    fontSize:12,
                    fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
                    fontWeight: 'normal',
                    color: '#bbbbbb' 
                }             
            },
            axisTick:{//坐标轴刻度相关设置
                show:true,
				//inside:true,//刻度朝向，里外
                color:'#ddd',
                length:3,//刻度长短设置
                lineStyle:{
                     color:'#ddd',
                }
            },  
            axisLine: {
                show : true,
                lineStyle : {
                    color: '#ddd',
                    width : 1
                }
            }
        }
    ],
   yAxis : [
        {   
            type : 'category',
            name:"时延比例分布",
            nameGap:20,
            nameTextStyle:{
                fontSize:12,  
                fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
                fontWeight: 'normal',
                color: '#008fd4' 
            },
            splitLine: {show:false},
            data : data.header,
            boundaryGap :[0.01,0.01],
            axisLabel : {
                //show:true,
                textStyle: { 
                    fontSize:12,
                    fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
                    fontWeight: 'normal',
                    color: '#666' 
                }             
            },
            axisLine: {
                show : true,
                lineStyle : {
                    color: '#ddd',
                    width : 1
                }
            },
            axisTick:{//坐标轴刻度相关设置
            show:true,
             color:'#ddd',
            length:3,//刻度长短设置
            lineStyle:{
                 color:'#54acd5',
                }
            },               
        }
    ],
    series : [
        {
               
            type:'bar',  
            barGap:'-100%',
            itemStyle : { 
                normal: {
                    label : {show: false, position: 'top'},
                    barBorderColor:'#54acd5',
                    opacity:0.2,
                    color:'#54acd5',
                    barBorderRadius: 5
                },
                emphasis: {
                    label : {show: false, position: 'top'},
                    barBorderColor:'#54acd5',
                    opacity:0.2,
                    color:'#54acd5',
                    barBorderRadius: 5
                }
            },
       barWidth:10,
       data:data.data[0]
        },
        {
            type:'bar',
            stack: '总量',
            barGap:'-100%',
            itemStyle:{
                normal:{
                    barBorderColor:'rgba(0,0,0,0)',
                    color:'rgba(0,0,0,0)',
                    barBorderRadius: 5,
                    textStyle: {
                        align : 'right'
                    },
                emphasis: {
                    label : {show: false, position: 'top'},
                    barBorderColor:'#54acd5',
                    opacity:0.2,
                    color:'#54acd5',
                    barBorderRadius: 5
                }
                },
                
            },
            barWidth: 10,
          data:data.data[1]
         },
        {
            
            type:'bar',         
            stack: '总量',
            barGap:'-100%',
            animation:true,
            itemStyle : { 
                normal: {
                    label : {show: true, position: ['92%',-20]},
                    barBorderColor:'#54acd5',
                    color:'#54acd5',
                    barBorderRadius: 5
                     
                },
                emphasis: {
                    label : {show: true, position: ['92%',-20]},
                    barBorderColor:'#54acd5',
                    color:'#54acd5',
                    barBorderRadius: 5
                     
                },
            },
            barWidth:10,
            data:data.data[2]
        }
    ]
};

}});