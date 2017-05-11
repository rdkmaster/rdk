// underscore 是一个开源库，提供了丰富的高性能的对数组，集合等的操作
// api 手册：http://learningcn.com/underscore
// 为了少加载不必要的代码，默认是不引入 underscore 的，需要用到的话
// 将define所在中的'underscore'的注释去掉即可。即改为
//        define(['underscore'], function() {
//           ...
//        });

define(['echarts'], function (echarts) {

// data 是Graph的输入数据。
// 使用data参数时，请务必保持只读
// 除非你很清楚你需要对data做什么，并且了解AngularJS的digest循环机制
// 否则请不要增删改data的任何属性，这会引起digest死循环

// context 是生成图形定义的辅助数据，默认值是应用的scope。
// 在生成复杂图形的时候，仅靠data本身不足以生成一个图形定义
// 此时就需要用到这个对象来辅助

// GraphService 是一个函数集，主要提供了对二维数组的常用操作

// attributes 是当前Graph所在的html节点的所有属性集。也是一种辅助数据。
    return function (data, context, GraphService, attributes) {
        var allData = [];
        var len = data.data[0].length;
        if (data.data[0].length) {
            for (var i = 0; i < len; i++) {
                allData[i] = {};
                allData[i].value = data.data[0][i];
                allData[i].itemStyle = {
                    normal: {
                        color: data.data[0][i] > 95 ? "#98e2a6" : data.data[0][i] > 90 ? "#9ad0e2" : data.data[0][i] > 80 ?
                            "#f7e685" : data.data[0][i] > 70 ? "#f6c88a" : "#ff8e74"
                    }
                }
            }
        }
        return {
            title: {
                text: '各市得分排名',
                left: "center",
                top: 20,
                textStyle: {
                    color: '#434343',
                    fontSize: 12
                }
            },
            calculable: true,
            grid: {
                left: 90,
                right: 60,
                top: 60
            },
            xAxis: [
                {
                    type: 'value',
                    splitNumber: 4,
                    axisLine: {
                        show: false
                    },
                    splitLine: {//出网格线
                        show: false
                    },
                    axisLabel: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    splitLine: {
                        show: false
                    },
                    boundaryGap: true,
                    type: 'category',
                    scale: false,
                    axisLabel: {
                        textStyle: {
                            color: '#434343'//刻度标签样式
                        }

                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {//坐标轴刻度相关设置
                        show: false
                    },
                    data: data.header
                }
            ],
            series: [
                {
                    name: 'bar',
                    type: 'bar',
                    stack: "总量",
                    silent: true,
                    animation: false,//关闭动漫
                    barWidth: '10px',
                    data: allData

                },
                {
                    name: 'bar6',
                    type: 'bar',
                    stack: "总量",
                    silent: true,
                    animation: false,//关闭动漫
                    label: {//图形数据显示位置
                        normal: {
                            show: true, position: ['100%', -5],
                            textStyle: {
                                color: "#585858"
                            },
                            formatter: function (params) {
                                return "  " + (100 - params.value)
                            }
                        },
                    },
                    itemStyle: {//图形边框设置，如边框大小，圆角，填充着色
                        normal: {
                            color: "#dedede"
                        }
                    },
                    barWidth: '10px',//条形宽度
                    data: [100 - data.data[0][0], 100 - data.data[0][1], 100 - data.data[0][2], 100 - data.data[0][3], 100 - data.data[0][4], 100 - data.data[0][5]]
                }

            ]
        };

    }
});