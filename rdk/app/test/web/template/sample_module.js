define(['utils', 'rd.controls.Button'], function(utils) {
    rdk.$injectDependency(['rd.controls.Button']);
    rdk.$ngModule.controller('SampleModuleController', ['$scope', function(scope) {
        console.log('SampleModule controller is running..........');

        //只有定义在this上的方法才能发布给外部。
        this.hello = function(msg) {
            alert('scope.i18n.hello.st(msg)');
        }
        //只有定义在this上的属性才能发布给外部。
        this.publicData = 'this is some public data defined in the SampleModule controller';

        //定义在scope上的属性才可以被html模板访问
        scope.someData = 'some data defined in the SampleModule controller...';

        //定义在scope上的函数才可以被html模板访问
        scope.openExample = function() {
            window.open('/doc/client/demo/controls/module/complex_load/index.html','_blank');
        }
    }]);
});