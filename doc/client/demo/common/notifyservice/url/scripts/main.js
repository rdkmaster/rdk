
require.config({
    paths: {
        //给sample_module的控制器url定义一个别名
        "sample_module": '/doc/client/demo/common/notifyservice/url/template/sample_module'
    }
});

define('main', ['rd.controls.Module', 'rd.services.NotifyService', 'sample_module'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.NotifyService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'NotifyService', function(scope, Utils, $compile, NotifyService) {
        
        var moduleID;

        scope.load = function(){
            var sampleUrl = '/doc/client/demo/common/notifyservice/url/template/sample_module.html';
            var initData = {myData: 'load module manually...'};
            var option = {
                position: 'right',
                type: 'url',
                initData: initData
            };
            moduleID = NotifyService.notify({title: 'my first notify', message: sampleUrl}, option);
        };

        scope.destroyHandler = function(){
            rdk[moduleID].child.destroy();
            NotifyService.removeNotify(moduleID);
        }
    }]);
});
