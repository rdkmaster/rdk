
require.config({
    paths: {
        "sample_module": '/doc/client/demo/controls/module/basic/template/sample_module',
    }
});

define('main', ['rd.controls.Module', 'sample_module'], function() {
    rdk.$injectDependency('rd.controls.Module');
    // 创建一个控制器
    rdk.$app.controller('rdk_ctrl', ['$scope', function(scope) {
        scope.data = 'rdk_module';
        scope.myid = 'themoduleid'
        scope.click= function() {
            console.log(rdk[scope.myid].someData)
            rdk[scope.myid].hello('aaa');
        }
        scope.click1= function() {
            rdk.mymod.doSomething();
        }
    }]);

    rdk.$app.controller('my_ctrl', ['$scope', function(scope) {
        // this.doSomething = function() {
            console.log(scope.$parent.click);
        // }
    }]);
});
