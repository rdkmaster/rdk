// underscore 是一个开源库，提供了丰富的高性能的对数组，集合等的操作
// api 手册：http://learningcn.com/underscore
// 为了少加载不必要的代码，默认是不引入 underscore 的，需要用到的话
// 将define所在中的'underscore'的注释去掉即可。即改为
//        define(['underscore'], function() {
//           ...
//        });

define([ /*  'underscore'   */ ], function() {

    // data 是Graph的输入数据。
    // 使用data参数时，请务必保持只读
    // 除非你很清楚你需要对data做什么，并且了解AngularJS的digest循环机制
    // 否则请不要增删改data的任何属性，这会引起digest死循环

    // context 是生成图形定义的辅助数据，默认值是应用的scope。
    // 在生成复杂图形的时候，仅靠data本身不足以生成一个图形定义
    // 此时就需要用到这个对象来辅助

    // GraphService 是一个函数集，主要提供了对二维数组的常用操作

    // attributes 是当前Graph所在的html节点的所有属性集。也是一种辅助数据。
    return function(data, context, GraphService, attributes, map) {
        if(!map.type) {
            return {
                series: [{}]
            } 
        }
        
        var mapDef = {
            visualMap: {
                pieces: [
                    { min: 86, max: 100, color: "#9bd6f4" },
                    { min: 76, max: 85, color: "#ffefa1" },
                    { min: 60, max: 75, color: "#f7a945" },
                    { min: 0, max: 59, color: "#ff634b" }
                ],
                type: 'piecewise',
                left: 'right',
                align: 'left',
                textStyle: {
                    color: '#e9e8eb'
                }
            },
            series: [{
                type: 'map',
                map: map.type,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data :data,
            }]
        }

        if(context.markPointData){
            mapDef.series[0].markPoint = {
                    symbol:'pin',
                    symbolSize:'50',
                    itemStyle : {
                        normal:{
                            color:'red'
                        }
                    },                  
                    label:{
                        normal:{
                            show:true
                        }
                    },                 
                    data : context.markPointData
            };
        }

        return mapDef;
    }
});
