
// underscore 是一个开源库，提供了丰富的高性能的对数组，集合等的操作
// api 手册：http://learningcn.com/underscore
// 为了少加载不必要的代码，默认是不引入 underscore 的，需要用到的话
// 将define所在中的'underscore'的注释去掉即可。即改为
//        define(['underscore'], function() {
//           ...
//        });

define([/*  'underscore'   */'echarts'], function(echarts) {

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
    var household_america_2012 = 113616229;
    var obama_budget_2012 = data.obama_budget_2012;
    formatUtil = echarts.format;

    function buildData(mode, originList) {
        var out = [];

        for (var i = 0; i < originList.length; i++) {
            var node = originList[i];
            var newNode = out[i] = cloneNodeInfo(node);
            var value = newNode.value;

            if (!newNode) {
                continue;
            }

            // Calculate amount per household.
            value[3] = value[0] / household_america_2012;

            // if mode === 0 and mode === 2 do nothing
            if (mode === 1) {
                // Set 'Change from 2010' to value[0].
                var tmp = value[1];
                value[1] = value[0];
                value[0] = tmp;
            }

            if (node.children) {
                newNode.children = buildData(mode, node.children);
            }
        }

        return out;
    }

    function cloneNodeInfo(node) {
        if (!node) {
            return;
        }

        var newNode = {};
        newNode.name = node.name;
        newNode.id = node.id;
        newNode.discretion = node.discretion;
        newNode.value = (node.value || []).slice();
        return newNode;
    }

    function getLevelOption(mode) {
        return [
            {
                color: mode === 2
                    ? [
                        '#c23531', '#314656', '#61a0a8', '#dd8668',
                        '#91c7ae', '#6e7074', '#61a0a8', '#bda29a',
                        '#44525d', '#c4ccd3'
                    ]
                    : null,
                colorMappingBy: 'id',
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        gapWidth: 3
                    }
                }
            },
            {
                colorAlpha: mode === 2
                    ? [0.5, 1] : null,
                itemStyle: {
                    normal: {
                        gapWidth: 1
                    }
                }
            }
        ];
    }

    function isValidNumber(num) {
        return num != null && isFinite(num);
    }

    function getTooltipFormatter(mode) {
        var amountIndex = mode === 1 ? 1 : 0;
        var amountIndex2011 = mode === 1 ? 0 : 1;

        return function (info) {
            var value = info.value;

            var amount = value[amountIndex];
            amount = isValidNumber(amount)
                ? formatUtil.addCommas(amount * 1000) + '$'
                : '-';

            var amount2011 = value[amountIndex2011];
            amount2011 = isValidNumber(amount2011)
                ? formatUtil.addCommas(amount2011 * 1000) + '$'
                : '-';

            var perHousehold = value[3];
            perHousehold = isValidNumber(perHousehold)
                ? formatUtil.addCommas((+perHousehold.toFixed(4)) * 1000) + '$'
                : '-';

            var change = value[2];
            change = isValidNumber(change)
                ? change.toFixed(2) + '%'
                : '-';

            return [
                '<div class="tooltip-title">' + formatUtil.encodeHTML(info.name) + '</div>',
                '2012 Amount: &nbsp;&nbsp;' + amount + '<br>',
                'Per Household: &nbsp;&nbsp;' + perHousehold + '<br>',
                '2011 Amount: &nbsp;&nbsp;' + amount2011 + '<br>',
                'Change From 2011: &nbsp;&nbsp;' + change
            ].join('');
        };
    }

    function createSeriesCommon() {
        return {
            type: 'treemap',
            label: {
                show: true,
                formatter: "{b}",
                normal: {
                    textStyle: {
                        ellipsis: true
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: 'black'
                }
            },
            levels: getLevelOption(0)
        };
    }

    
    var modes = ['2012Budget', '2011Budget', 'Growth'];

return {
    title: {
            left: 'center',
            text: 'How $3.7 Trillion is Spent',
            subtext: 'Obama’s 2012 Budget Proposal'
        },

        legend: {
            data: modes,
            selectedMode: 'single',
            top: 50,
            itemGap: 5
        },

        tooltip: {
            formatter: getTooltipFormatter(0)
        },

        series: modes.map(function (mode, idx) {
            var seriesOpt = createSeriesCommon();
            seriesOpt.name = mode;
            seriesOpt.top = 80;
            seriesOpt.visualDimension = idx === 2 ? 2 : null;
            seriesOpt.data = buildData(idx, obama_budget_2012);
            seriesOpt.levels = getLevelOption(idx);
            return seriesOpt;
        })
};

}});