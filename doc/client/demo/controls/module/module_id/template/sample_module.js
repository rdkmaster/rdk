define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('SampleModuleController', ['$scope', 'Utils', function(scope, Utils) {
        scope.load = function() {
            //mymodule是rdk_module节点的id属性值。
            //传递给loadModule函数的第一个参数是该模块的initData，
            //这个对象中的所有属性都会被拷贝到新模块的控制器作用域中
            //如果新模块未定义任何控制器，则initData将被无视。
            rdk['mymodule@' + scope.$moduleId].loadModule();
        }

        scope.destroy = function() {
            rdk['mymodule@' + scope.$moduleId].destroyModule();
        }
    }]);
});
