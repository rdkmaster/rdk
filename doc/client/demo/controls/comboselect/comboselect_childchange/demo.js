(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var downloadDependency = [
        'angular', 'rd.controls.ComboSelect', 'rd.controls.BasicSelector', 'rd.containers.Accordion'
    ];
    var requiredComponents = [ ], ctx = {};
    var controllerDefination = ['$scope', main];
    function main(scope ) {
        scope.cityItems = [{
            id: 0,
            label: "江苏省"
        }, {
            id: 1,
            label: "浙江省"
        }, {
            id: 2,
            label: "河南省"
        }, {
            id: 3,
            label: "湖北省"
        }];

        scope.TOPItems = [{
            label: '10'
        }, {
            label: '20'
        }, {
            label: '50'
        }];

        scope.SortItems = [{
            label: '升序'
        }, {
            label: '降序'
        }, {
            label: '非法值'
        }];

        scope.sort_param = '';
        scope.top_param = '';

        scope.getSelectedParam = function(data, context, index) {
            if (index == 1) {
                scope.sort_param = 'sort:' + context[2].data[0].label + ';';
            } else if (index == 2) {
                scope.top_param = 'TOP:' + context[1].data[0].label + ';';
            }
            scope.selectedParamStr = scope.sort_param + scope.top_param;
            return scope.selectedParamStr;
        }

        scope.getSelectedCity = function(selected, context, index) {
            if (index >= 2) {
                return RDKConst.STOP_PROPAGATIOIN;
            } else {
                scope.city_param = 'city：' + BasicSelector.selected2string(selected, 'label', '-');
            }
            scope.selectedParamStr = scope.sort_param + scope.top_param + scope.city_param;
            return scope.selectedParamStr;
        }
    }

    var controllerName = 'DemoController';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller(controllerName, controllerDefination);
    }
})();