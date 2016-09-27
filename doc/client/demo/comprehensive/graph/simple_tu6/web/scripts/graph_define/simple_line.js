
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
     // legend: {
     //    data: ['bar', 'bar2', 'bar3', 'bar4','bar4','bar5','bar6'],
     //    align: 'left',
     //    left: 10
     // },
    calculable : true,
    grid:{
        left:90,
        right:60,
        top:60,
        // show:true,
        // borderWidth:1
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
            boundaryGap:true,
            type : 'category',
            scale:false,
            axisLabel:{
                // show: false,
              textStyle :{
                  color:'#000'//刻度标签样式
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
                length:5,//刻度长短设置
            },
            data :data.header
        }
    ],
    series : [
         {
            name:'bar',
            type:'bar',
            stack:"总量",
            animation:false,//关闭动漫
            itemStyle: {
                normal: {
                    color:data.data[0][0]>95 ? "#98e2a6" : data.data[0][0]>90 ? "#9ad0e2" : data.data[0][0]>80 ? 
                    "#f7e685" : data.data[0][0]>70 ? "#f6c88a" : "#ff8e74",
                    label : {//图形数据显示位置
                        show: true, position: ['100%', -5],
                    },
                    barBorderRadius: 0
                }
            },
             barWidth:'10px',
             data: data.data[0]
          
        },
        {
            name:'bar2',
            type:'bar',
            stack:"总量",
            itemStyle: {//图形边框设置，如边框大小，圆角，填充着色
                normal: {
                    color:data.data[1][1]>95 ? "#98e2a6" : data.data[1][1]>90 ? "#9ad0e2" : data.data[1][1]>80 ? 
                    "#f7e685" : data.data[1][1]>70 ? "#f6c88a" : "#ff8e74",
                    label : {//图形数据显示位置
                        show: true, position: ['100%', -5],
                    },
                    barBorderRadius: 0
                }
            },
            barWidth:'10px',//条形宽度
            
            data:data.data[1]
        },
        {
            name:'bar3',
            type:'bar',
            stack:"总量",
            itemStyle: {//图形边框设置，如边框大小，圆角，填充着色
                normal: {
                    color:data.data[2][2]>95 ? "#98e2a6" : data.data[2][2]>90 ? "#9ad0e2" : data.data[2][2]>80 ? 
                    "#f7e685" : data.data[2][2]>70 ? "#f6c88a" : "#ff8e74",
                    label : {//图形数据显示位置
                        show: true, position: ['100%', -5],
                    },
                    barBorderRadius: 0
                }
            },
            barWidth:'10px',//条形宽度
             data:data.data[2]
        },
        {
            name:'bar4',
            type:'bar',
            stack:"总量",
            itemStyle: {//图形边框设置，如边框大小，圆角，填充着色
                normal: {
                    color:data.data[3][3]>95 ? "#98e2a6" : data.data[3][3]>90 ? "#9ad0e2" : data.data[3][3]>80 ? 
                    "#f7e685" : data.data[3][3]>70 ? "#f6c88a" : "#ff8e74",
                    label : {//图形数据显示位置
                        show: true, position: ['100%', -5],
                    },
                    barBorderRadius: 0
                }
            },
            barWidth:'10px',//条形宽度
            
             data:data.data[3]
        },
        {
            name:'bar5',
            type:'bar',
            stack:"总量",
            itemStyle: {//图形边框设置，如边框大小，圆角，填充着色
                normal: {
                    color:data.data[4][4]>95 ? "#98e2a6" : data.data[4][4]>90 ? "#9ad0e2" : data.data[4][4]>80 ? 
                    "#f7e685" : data.data[4][4]>70 ? "#f6c88a" : "#ff8e74",
                    label : {//图形数据显示位置
                        show: true, position: ['100%', -5],
                    },
                    barBorderRadius: 0
                }
            },
            barWidth:'10px',//条形宽度
            
             data:data.data[4]
        },
        {
            name:'bar6',
            type:'bar',
            stack:"总量",
            itemStyle: {//图形边框设置，如边框大小，圆角，填充着色
                normal: {
                   color:data.data[5][5]>95 ? "#98e2a6" : data.data[5][5]>90 ? "#9ad0e2" : data.data[5][5]>80 ? 
                    "#f7e685" : data.data[5][5]>70 ? "#f6c88a" : "#ff8e74",
                    label : {//图形数据显示位置
                        show: true, position: ['100%', -5],
                    },
                    barBorderRadius: 0
                }
            },
            barWidth:'10px',//条形宽度
             data:data.data[5]
        },
        {
            name:'bar6',
            type:'bar',
            stack:"总量",
            itemStyle: {//图形边框设置，如边框大小，圆角，填充着色
                normal: {
                   color:"#dedede",
                    label : {//图形数据显示位置
                        show: true, position: ['100%', -5],
                        formatter: function(params){
                            console.log(params)
                        }
                    },
                    barBorderRadius: 0
                }
            },
            barWidth:'10px',//条形宽度
            data:[100-data.data[0][0] , 100-data.data[1][1] , 100-data.data[2][2] , 100-data.data[3][3] , 100-data.data[4][4] , 100-data.data[5][5]]
        }
        
    ]
};

}});