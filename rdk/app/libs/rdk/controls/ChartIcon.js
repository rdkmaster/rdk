define(['angular', 'jquery','jquery-peity', 'rd.core'], function(){
    var chartIconApp = angular.module('rd.controls.ChartIcon', ['rd.core']);
    chartIconApp.provider('ChartIconConfig', function(){
        var $$options = {
            pie:{delimiter: null, fill: ["#8ed173", "#edffe5"], height: null, radius: 10, width: null},
            donut:{delimiter: null, fill: ["#ff9900", "#8ed173", "#ffd592"], height: null, innerRadius: null, radius: 8, width: null},
            line:{delimiter: ",", fill: "#edffe5", height: 20, max: null, min: 0, stroke: "#8ed173", strokeWidth: 1.5, width: 32},
            bar: {delimiter: ",", fill: ["#8ed173"], height: 20, max: null, min: 0, padding: 0.1, width: 32}
        };
        this.setOptions = function(options) {
            !!options && angular.extend($$options, options);
            $.fn.peity.defaults.pie = $$options.pie;
            $.fn.peity.defaults.donut = $$options.donut;
            $.fn.peity.defaults.line = $$options.line;
            $.fn.peity.defaults.bar = $$options.bar;
        };
        this.$get = function() {
            return {
                setOptions:this.setOptions
            };
        }
    });
    chartIconApp.run(['ChartIconConfig',function(ChartIconConfig){
        ChartIconConfig.setOptions();
    }]);
    chartIconApp.directive('rdkChartIcon', function factory() {
        var scopeDefine={
            chartType:"@",
            data:"=",
            chartOption:"=?"
        };
        return {
            restrict: 'E',
            template:"<div></div>",
            replace: true,
            scope: scopeDefine,
            link:_link
        };
        function _link(scope,element,attrs) {
            _renderChart();
            scope.$watch("data",function(newVal,oldVal){
                _renderChart();
            },true);

            function _renderChart(){
                element[0].innerHTML=_parseData(scope.data,scope.chartType);
                $(element[0]).peity(scope.chartType,scope.chartOption);
            }
            function _parseData(data,chartType){
                if(chartType ==="pie" && data.indexOf("%") != -1){
                    return data.replace("%","/100");
                }
                else if(angular.isArray(data))
                {
                    return data.join(",")
                }
                return data
            }
        }
    })
});