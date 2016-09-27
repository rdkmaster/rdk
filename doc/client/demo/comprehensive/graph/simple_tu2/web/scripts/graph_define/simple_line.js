
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
    tooltip : {
        trigger: 'axis',
    },
    title:{
        text:'掉话排行',
        textAlign:'left',
        top:20,
        textStyle:{
            fontSize:12,
            fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
            fontWeight: 'normal',
            color: '#008fd4' 
        },
        left:70,
    },
    grid:{
        left:100,
        right:100,
        top:60,
		show:true,
        borderWidth:1
        },
    legend: {
        data: data.rowDescriptor,
        top:20,
        right:100,
        inactiveColor: "#bbb",
        textStyle:{
            color:'#333',
            fontSize:12,
            fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
            fontWeight: 'normal'
        },
        itemWidth:20,//设置icon长高
        itemHeight:10
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : true,
			position:'bottom',
            axisLabel:{
                interval:4,//类轴网格设置
                textStyle: { 
                        fontSize:10,
                        fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
                        fontWeight: 'normal',
                        color: '#666' 
                }       
            },
			axisLine: {//轴线设置
				show:true,
                lineStyle: {
                    color: '#cccccc',
                }
            },  
            splitLine:{//网格相关设置
                show: true,
                interval:0,
                lineStyle:{
                color:"#e5e5e5"
                }

           },
            data : data.header
        },
		
    ],
    yAxis : [
        {
             // name: '掉话次数',
             nameTextStyle:{
                color:'#54acd5',
                fontSize:10,
                fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
                fontWeight: 'normal',
            },
			axisLabel : {
				//show:true,
				textStyle: { 
					fontSize:10,
					fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
					fontWeight: 'normal',
					color: '#54acd5',
                },
                formatter: function(params){
                    return  params.toFixed(1)==0 ? "" : params.toFixed(1)
				}             
			},
            max:"dataMax",
            splitLine: {show:false},// 是否现示网格
            type : 'value',
            // splitNumber:4,
             axisLine: {
                show:true,
                lineStyle: {
                    color: '#54acd5'
                }
            }
        },
        {   
            // name: '掉话率(%)',
            type : 'value',
            max:"dataMax",
			splitLine: {show:false},
            position:'right',
            axisLabel : {//标签名样式
				textStyle: { 
					fontSize:10,
					fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
					fontWeight: 'normal',
					color: '#f99660' 
				},
                formatter: function(params){
                        return  params.toFixed(1)==0 ? "" : params.toFixed(1)
                    }             
			},
            nameTextStyle:{
               color:'#f99660',
               fontStyle:'10px'
             },
            axisLine: {
                lineStyle: {
                    color: '#f99660',
                }
            },  
        }
    ],
    series : [
        {
            name: data.rowDescriptor[0],animation:true,
            data: data.data[0],showAllSymbol :true,
            legendHoverLink:false,
			itemStyle : { 
                    normal: {
                        label : {show: false, position: 'top'},
                        barBorderColor:'#54acd5',
                        color:'#54acd5',
                        barBorderRadius: 0
                    }
                },
            barCategoryGap:'15%',//控制条形柱间的间距
            type:'bar'
        },
        {
            name: data.rowDescriptor[1],animation:true,
            symbolSize:[5,5],
			itemStyle : { 
                normal: {
                    color:'#f99660',
                }
            },
            data: data.data[1],showAllSymbol :true,
            hoverAnimation:false,
            type:'line'
        }
    ]
};

}});