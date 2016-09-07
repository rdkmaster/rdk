/**
 * Created by 6396000843 on 2016/9/1.
 */

define([], function() {

    return function(data, context, GraphService, attributes) {

        return {
            title : { text: '网页分析', subtext: '纯属虚构' },
            tooltip : { trigger: 'axis' },
            legend: { data: ['网页响应成功率', '网页下载速率'] },
            xAxis : [{
                type : 'category', boundaryGap : true,
                data : GraphService.column(data.data, 0)
            }],
            yAxis : [
                {
                    type : 'value', name: '网页响应成功率', position: 'left',
                    axisLabel: { formatter: '{value}%' }
                },
                {
                    type : 'value', name: '网页下载速率', position: 'right',
                    axisLabel: { formatter: '{value} bps' }
                }
            ],
            series : [
                {
                    name: '网页响应成功率', yAxisIndex: 0,
                    data: GraphService.column(data.data, 2), type:'line'
                },
                {
                    name: '网页下载速率', yAxisIndex: 1,
                    data: GraphService.column(data.data, 3), type:'bar'
                },
            ]
        };

    }});