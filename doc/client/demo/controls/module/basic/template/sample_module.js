//模板控制器需要把模板用到的依赖添加到依赖列表中，这样模块代码更加内聚，方便使用
define(['rd.controls.Time'], function() {
    rdk.$injectDependency('rd.controls.Time');

    //创建一个子控制器
    rdk.$app.controller('SampleModuleController', ['$scope', 'Utils', 'EventTypes',
    function(scope, Utils, EventTypes) {
        console.log('SampleModule controller is running..........');

        //这几行代码的作用是将本控制器中定义在this上的方法和属性发布出去，
        //这样外部就可以通过rdk.id.xxx的方式来使用本控制器上的方法和属性了
        //通过这个方法可以非常方便在模块间共享模块内部的属性和方法
        //可以参考main.js的 hello() 方法。
        var thisController = this;
        scope.$on(EventTypes.READY, function() {
            Utils.publish(rdk[scope.$moduleId], thisController);
        });

        //只有定义在this上的方法才能发布给外部。
        this.hello = function(msg) {
            alert('hello ' + msg);
        }

        //只有定义在this上的属性才能发布给外部。
        this.someData = 'some data defined in the SampleModule controller...'
    }]);
});
