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

        scope.load = function() {
            rdk.newModule.load({myData: 'init data....'}, 'template/new-module1.html', 'NewModuleController1');
        }
    }]);
});
