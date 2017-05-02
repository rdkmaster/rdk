
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
    var sampleColors = ["#54acd5","#f99660","#a4bf6a","#ec6d6d","#f7b913","#8ac9b6","#bea5c8","#01c5c2","#a17660"];
    var vmaxColors = ['#41addc', '#bea5c8', '#85c56c', '#f99660', '#ffc20e', '#ec6d6d', '#8ac9b6', '#585eaa', '#b22c46', '#96582a'];
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    var  colors = GetRequest().vmax==3.0?vmaxColors:sampleColors;
    return {
        title: {
            text: '预数据虚线图'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (name) {
                if(name[0].value==""){
                    name[0].value=name[1].value
                }
                return name[0].name+"<br/>"+name[0].seriesName+":" + name[0].value
            }
        },
        grid:{
            left:45,
            right:45,
            top:60
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel:{//标签设置
                textStyle:{
                    color:"#666",
                    fontSize:12,
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
            data: data.header
        },
        yAxis: {
            type: 'value',
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
            axisLine: {
                show : true,
                lineStyle : {
                    color: '#ccc',
                    width : 1
                }
            }
        },
        series: [
            {
                name:data.rowDescriptor,
                type:'line',
                itemStyle:{normal:{color:colors[0]}},
                lineStyle:{normal:{color:colors[0]}},
                smooth:false,symbolSize:[5,5],
                data:data.data[0]
            },
            {
                name:'联盟广告',
                type:'line',
                lineStyle:{normal:{type:'dashed',color:colors[0]}},
                itemStyle:{normal:{color:colors[0]}},
                smooth:false,symbolSize:[5,5],
                data:data.data[1]
            }
        ]
    };
}});