//模板控制器需要把模板用到的依赖添加到依赖列表中，这样模块代码更加内聚，方便使用
define(['rd.controls.Time'], function() {
    rdk.$injectDependency('rd.controls.Time');

    //创建一个子控制器
    rdk.$app.controller('SampleModuleController', ['$scope',
    function(scope) {
        console.log('SampleModule controller is running..........');

        //只有定义在this上的方法才能发布给外部。
        this.hello = function(msg) {
            alert('hello ' + msg);
        }

        //只有定义在this上的属性才能发布给外部。
        this.someData = 'some data defined in the SampleModule controller...'
    }]);
});
