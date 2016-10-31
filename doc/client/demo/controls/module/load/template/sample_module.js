require.config({
    paths: {
        //需要把可能用到的控制器全部定义好，并添加到define函数的依赖列表中
        "new-module1": '/doc/client/demo/controls/module/load/template/new-module1',
        "new-module2": '/doc/client/demo/controls/module/load/template/new-module2',
    }
});


define(['new-module1', 'new-module2'], function() {
    //创建一个子控制器
    rdk.$app.controller('SampleModuleController', ['$scope', function(scope) {
        console.log('SampleModule controller is running..........');
        //只有定义在this上的属性才能发布给外部。
        scope.someData = 'some data defined in the SampleModule controller...';

        //界面是的控件的初始化数据
        scope.moduleUrl = 'template/new-module1.html';
        scope.moduleCtrl = 'NewModuleController2';
        scope.initData = 'init data.......';

        scope.load = function() {
            //先销毁才能再加载
            rdk.newModule.destroyModule();
            rdk.newModule.loadModule({myData: scope.initData}, scope.moduleUrl, scope.moduleCtrl);
        }
    }]);
});
