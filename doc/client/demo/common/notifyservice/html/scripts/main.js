

define('main', ['rd.controls.Module', 'rd.services.NotifyService'], function() {

    rdk.$injectDependency(['rd.controls.Module', 'rd.services.NotifyService']);

    rdk.$ngModule.controller('rdk_ctrl', ['$scope', 'Utils', '$compile', 'NotifyService',
        function(scope, Utils, $compile, NotifyService) {
        
        var moduleID;

        scope.load = function(){
            var sampleUrl = '<button>Hello, web! </button><button>Hello, rdk!</button>';
            var option = {
                position: 'right',
                type: 'html'
            };
            moduleID = NotifyService.notify({title: 'my notify - html', message: sampleUrl}, option);
        };

        scope.destroyHandler = function(){
            rdk[moduleID].child.destroy();
            NotifyService.removeNotify(moduleID);
        }
    }]);
});
