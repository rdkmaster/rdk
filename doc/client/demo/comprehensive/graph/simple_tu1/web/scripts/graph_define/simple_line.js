
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
    var colors = ["#54acd5","#f99660","#a4bf6a","#ec6d6d","#f7b913","#8ac9b6","#bea5c8","#01c5c2","#a17660"];
return {
    color:colors,
    tooltip : {
        trigger: 'axis',
        position: function (point, params, dom) {
      // 固定在顶部
            return [point[0]+10, point[1]];
        }
    },
    legend: {
        data: data.rowDescriptor,
        itemWidth:25,//设置icon长高
        itemHeight:5,
        top:20,
        inactiveColor:"#bbb",
        textStyle:{
            color:"#333",
            fontSize:12,  
            fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
            fontWeight: 'normal'
        },
        itemGap:10,
         selected: {
            "语音感知": true,
            "数据感知": true,
            "业务体验": true,
            "网页浏览": false,
            "即时通讯": false,
            "社交媒体": false,
            "视频": false,
            "下载": false,
            "其他": false,
            "网络接入": false,
            }
    },
    grid:{
        left:100,
        right:100,
        top:60
    },
	calculable : true,
    xAxis : [
        {
            type : 'category', boundaryGap : false,
			axisLabel:{//标签设置
                interval:4,
                textStyle:{
                    color:"#666",
                    fontSize:10,  
                    fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
                    fontWeight: 'normal'
                }
            },
            axisLine: {//轴线设置
                    show : true,
                    lineStyle : {
                        color: '#ccc',
                        width : 1
                    }
                },
            splitLine:{//设置网格
                show: true,
                interval:0,
                lineStyle:{
                color:"#e5e5e5"
               }
           },
                       scale:true,
            data : data.header
        }
    ],
    yAxis : [
        {
            type : 'value',splitNumber:10,//不是类轴才会生效，设置网格多少
            splitLine:{//网格样式
                lineStyle:{
                    color:"#e5e5e5"
                }
            },
            axisLabel:{//标签设置
                interval:4,
                textStyle:{
                    color:"#666",
                    fontSize:10,  
                    fontFamily:'微软雅黑, Arial, Verdana, sans-serif',
                    fontWeight: 'normal'
                }
            },
            // splitArea:{//网格颜色
            //     show:true,
            //     areaStyle:{
            //         color:['red','green']
            //     }
            // },
            axisLine: {
                    show : true,
                    lineStyle : {
                        color: '#ccc',
                        width : 1
                }
           }
        }
    ],
    series : [
        {
            name: data.rowDescriptor[0],showAllSymbol:true,//是否显示所有的点
            animation:true,//出场动漫是否打开
            data: data.data[0],smooth:false,//是否平滑曲线连接
            symbolSize:[5,5],//转折点处样式大小
            hoverAnimation:false,
            type:'line'
        },
        {
            name: data.rowDescriptor[1],showAllSymbol :true,animation:true,
            data: data.data[1],smooth:false,symbolSize:[5,5],
            hoverAnimation:false,
            type:'line'
        },
		{
            name: data.rowDescriptor[2],showAllSymbol :true,animation:true,
            data: data.data[2],smooth:false,symbolSize:[5,5],
            hoverAnimation:false,
            type:'line'
        },
		{
            name: data.rowDescriptor[3],showAllSymbol :true,animation:true,
            data: data.data[3],smooth:false,symbolSize:[5,5],
            hoverAnimation:false,
            type:'line'
        },
		{
            name: data.rowDescriptor[4],showAllSymbol :true,animation:true,
            data: data.data[4],smooth:false,symbolSize:[5,5],
            hoverAnimation:false,
            type:'line'
        },
		{
            name: data.rowDescriptor[5],showAllSymbol :true,animation:true,
            data: data.data[5],smooth:false,symbolSize:[5,5],
            hoverAnimation:false,
            type:'line'
        },
		{
            name: data.rowDescriptor[6],showAllSymbol :true,animation:true,
            data: data.data[6],smooth:false,symbolSize:[5,5],
            hoverAnimation:false,
            type:'line'
        },
		{
            name: data.rowDescriptor[7],showAllSymbol :true,animation:true,
            data: data.data[7],smooth:false,symbolSize:[5,5],
            hoverAnimation:false,
            type:'line'
        },
		{
            name: data.rowDescriptor[8],showAllSymbol :true,animation:true,
            data: data.data[8],smooth:false,
            hoverAnimation:false,
            symbolSize:[5,5],
            type:'line'
        },
		{
            name: data.rowDescriptor[9],animation:true,
            data: data.data[9],
            symbolSize:[5,5],
            hoverAnimation:false,
			showAllSymbol :true,
            smooth:false,
            type:'line'
        }
    ]
};

}});