

define('main', ['rd.controls.Module', 'rd.services.NotifyService'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.NotifyService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'NotifyService', function(scope, Utils, $compile, NotifyService) {
        
        var moduleID1, moduleID2;

        scope.load1 = function(){
            var sampleUrl = 'hello, rdk1!!!!';

            moduleID1 = NotifyService.notify({title: 'My first notify', message: sampleUrl});

        };

        scope.load2 = function () {
            moduleID2 = NotifyService.notify({title: 'My second notify', message: "hello, rdk2!!!!"});
        };

        scope.destroyHandler = function(){
            rdk[moduleID1].child.destroy();
            NotifyService.removeNotify(moduleID1);

            rdk[moduleID2].child.destroy();
            NotifyService.removeNotify(moduleID2);
        }
    }]);
});
