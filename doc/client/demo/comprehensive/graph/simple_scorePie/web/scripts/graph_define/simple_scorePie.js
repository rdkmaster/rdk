
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
    var inner_color,//内圆颜色
        outer_color;//外环颜色
    inner_color=data.data[0]>=90?'rgb(85,202,140)':(data.data[0]>=80&&data.data[0]<90)?'rgb(84,172,213)':(data.data[0]>=70&&data.data[0]<80)?'rgb(249,150,96)':(data.data[0]<70)?'rgb(236,109,109)':'#dedede';
    outer_color=data.data[0]>=90?'rgba(85,202,140,.2)':(data.data[0]>=80&&data.data[0]<90)?'rgba(84,172,213,.2)':(data.data[0]>=70&&data.data[0]<80)?'rgba(249,150,96,.2)':(data.data[0]<70)?'rgba(236,109,109,.2)':'#dedede';
    var labelTop = {
        normal: {
            color: outer_color,
            label: {
                show: true,
                position: 'center',
                formatter: '{b}',
                textStyle: {
                    baseline: 'top',
                    fontFamily: 'arial',
                    fontSize:30,
                    color:'#fff',
                    fontWeight:'bold'
                }
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: outer_color
        }
    };
    //中间显示
    var labelFromatter = {
        normal: {
            label: {
                // formatter: function(params) {
                //     return 100 - params.value
                // },
                position: 'center',
                textStyle: {
                    baseline: 'bottom',
                    color: '#333',
                    fontFamily: 'Arial'
                }
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: outer_color
        }
    }

    var labelBottom = {
        normal: {
            label: {
                show: true,
                position: 'center',
                textStyle: {
                    fontSize:14,
                    color:'#fff',
                    fontFamily:'微软雅黑'
                }
            },
            labelLine: {
                show: false
            }
            
        }
    };

    //饼图的点击label
    var placeHolderStyle = {
        normal: {
            color: inner_color,
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: inner_color,
            labelLine: {
                show: false
            }
        }
    };
return{
    series: [{
        type: 'pie',
        radius: ['45','50'],
        itemStyle: labelFromatter,
        minAngle:0,
        data: [{
            name: data.data[0]==0?'0':data.data[0],
            value: 100,
            itemStyle: labelTop
        },
        {
            name: '综合得分',
            value: 0,
            itemStyle: labelBottom
        }]
    },
    //点击
    {
        name: '点击环',
        clickable: false,
        type: 'pie',
        hoverAnimation: false,
        radius: ['0', '45'],
        minAngle: 0,
        data: [{
            name: "",
            value: 100,
            itemStyle: placeHolderStyle
        }]
    }
    ]
};
                

}});