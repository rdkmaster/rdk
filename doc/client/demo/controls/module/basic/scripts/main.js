define('main', ['rd.controls.Module', 'sample_module'], function() {
    rdk.$injectDependency('rd.controls.Module');
    // 创建一个控制器
    rdk.$app.controller('rdk_ctrl', ['$scope', function(scope) {
        scope.data = 'rdk_module';
    }]);
});
