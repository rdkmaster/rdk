rdk = (function() {

    function _onSuccess() {
        angular.module('rd.core', [
            'rd.services.DataSourceService', 'rd.services.EventService',
            'rd.services.Utils', 'rd.attributes.ds'
        ]);

        angular.module("rdk_app").config(['$provide',function($provide) {
            $provide.decorator('$controller', ['$delegate',function($delegate) {
                return function(constructor, locals, later, indent) {
                    if (typeof constructor === 'string') {
                        locals.$scope._rdk_controllerName = constructor;
                    }
                    return $delegate(constructor, locals, later, indent);
                };
            }]);
        }]);
        angular.bootstrap(document, ["rdk_app"]);
    }

    function _onError() {
    }

    function _start() {

        /*
         * 初始化应用入口
         */
        var appScript;
        for (var i = 0; i < document.scripts.length; i++) {
            var s = document.scripts[i];
            var src = s.getAttribute('src');
            if (src && src.match(/libs\/requirejs\/require.js$/)) {
                appScript = s.getAttribute('rdk-app');
            }
        };
        if (!appScript) {
            appScript = '../../scripts/main';
        }

        require.config({
            paths:{
               "main" : appScript
            }
        });

        console.log('starting rdk app from "' + appScript + '" ...');

         require(["./mainconfig"], function() {
            require(["angular", "main"], _onSuccess, _onError);
        });
    }

    return {
        version: "v1.1.0",
        start: _start,
    }
})();
rdk.start();