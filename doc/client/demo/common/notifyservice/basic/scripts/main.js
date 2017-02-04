

define('main', ['rd.controls.Module', 'rd.services.NotifyService'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.NotifyService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'NotifyService', function(scope, Utils, $compile, NotifyService) {
        
        var moduleID;

        scope.load = function(){
            var sampleUrl = 'hello, rdk!!!!';
            var option = {
                position: 'left'
            };
            moduleID = NotifyService.notify({title: 'my first notify', message: sampleUrl}, option);
        };

        scope.destroyHandler = function(){
            rdk[moduleID].child.destroy();
            NotifyService.removeNotify(moduleID);
        }
    }]);
});
