
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
    function getBrowserInfo(){//只做了谷歌和火狐的兼容性
        var agent = navigator.userAgent.toLowerCase() ;
        if(agent.indexOf("firefox") > 0){
            return -10;
        }else{
            return -15;
        }
    }
    var a='1';
return {
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: '',//坐标轴指示器配置项
        },
        formatter: function (params){
            return params[1].name + '<br/>'
                   + params[1].seriesName + ' : ' + params[1].value 
                 
        }
    
    },
    grid:{
        left:100,
        right:100,
        top:60,
        },
    calculable : true,
    xAxis : [
        {  
            type : 'value',
            splitNumber:4,
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
				inside:true,
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
            length:3,//刻度长短设置
            lineStyle:{
                 color:'#54acd5',
              }
           },               
        }
        
    ],
    series : [
        {
            name: data.rowDescriptor[0],
            type:'bar',  
            barGap:'-100%',
            itemStyle : { 
                normal: {
                    // label : {show: false, position: 'top'},
                    barBorderColor:'#54acd5',
                    opacity:0.2,
                    color:'#54acd5',
                    barBorderRadius: 5
                },
                emphasis: {
                    // label : {show: false, position: 'top'},
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
            name: data.rowDescriptor[1],
            animation:true,
            type:'bar',
            label : {
                normal: {
                    show: true,
                    position: ['92%',getBrowserInfo()],
                    textStyle:{
                        fontSize:12,
                        color:"#54acd5"
                    }
                }
            },
            barGap:'-100%',
            itemStyle : { 
                normal: {
                    barBorderColor:'#54acd5',
                    color:'#54acd5',
                    barBorderRadius: 5
                },
                emphasis: {
                    barBorderColor:'#54acd5',
                    color:'#54acd5',
                    barBorderRadius: 5
                }
            },
            barWidth:10,
            data:data.data[1]
        }
    ]
};

}});