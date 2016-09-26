
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
    attributes.$$element.on('click',function(){//饼图点击事件
        $('.pie_container span.pie_underline').css('background','#509cdc');
    });
    var color=null;//不同区域得分颜色
    color=data.data[0]>=95?'#98e2a6':(data.data[0]>=90&&data.data[0]<95)?'#9ad0e2':(data.data[0]>=80&&data.data[0]<90)?'#f7e685':(data.data[0]>=70&&data.data[0]<80)?'#f6c88a':data.data[0]<70?'#ff8e74':'#dedede';
    var labelTop = {
        normal: {
            color: color,
            label: {
                show: true,
                position: 'top',
                formatter: '{b}',
                textStyle: {
                    baseline: 'top',
                    fontFamily: '微软雅黑',
                    fontSize:14
                }
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: color
        }
    };
    //中间显示
    var labelFromatter = {
        normal: {
            label: {
                formatter: function(params) {
                    return 100 - params.value+'%'
                },
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
            color: 'rgba(0,0,0,0)'
        }
    }

    var labelBottom = {
        normal: {
            color: '#DEDEDE',
            label: {
                show: true,
                position: 'center',
                textStyle: {
                    fontSize:24
                }
            },
            labelLine: {
                show: false
            }
            
        },
        emphasis: {
            color: '#DEDEDE'
        }
    };

    //饼图的点击label
    var placeHolderStyle = {
        normal: {
            color: 'rgba(0,0,0,0)',
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };
return{
    series: [{
        type: 'pie',
        radius: ['31','34'],
        itemStyle: labelFromatter,
        minAngle:0,
        data: [{
            name: '',
            value: data.data[0],
            itemStyle: labelTop
        },
        {
            name: '',
            value: 100 - data.data[0],
            itemStyle: labelBottom
        }]
    },
    //点击
    {
        name: '点击环',
        clickable: true,
        type: 'pie',
        hoverAnimation: false,
        radius: ['0', '31'],
        minAngle: 0,
        data: [{
            name: "",
            value: 100,
            itemStyle: placeHolderStyle
        }]
    }]
};
                

}});