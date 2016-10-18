rdk = (function() {

    var bodyHTML = undefined;
    var hasReady = false;

    function _onSuccess() {
        if (bodyHTML !== undefined) {
            document.body.innerHTML = bodyHTML;
            bodyHTML = undefined;
        }

        var evt = document.createEvent('Event');
        evt.initEvent('app_loaded', false, false);
        document.body.dispatchEvent(evt);
        hasReady = true;

        angular.module('rd.core', [
            'rd.services.DataSourceService', 'rd.services.EventService',
            'rd.services.Utils', 'rd.attributes.ds'
        ]);

        angular.module("rdk_app").config(['$provide', function($provide) {
            $provide.decorator('$controller', ['$delegate', function($delegate) {
                return function(constructor, locals, later, indent) {
                    if (typeof constructor === 'string') {
                        locals.$scope._rdk_controllerName = constructor;
                    }
                    return $delegate(constructor, locals, later, indent);
                };
            }]);
        }]);

        console.log('starting rdk app.....');
        angular.bootstrap(document, ["rdk_app"]);
    }

    function _onError() {}

    function _setupLoading() {
        if (!document.body) {
            // 不知道为啥，有可能body属性是null
            console.warn('document.body has not ready...');
            window.onload = _setupLoading;
            return;
        }

		window.onload = undefined;
        if (hasReady) {
            return;
        }

        var loading;
        var oLoading = _findLoadingTag();
        if (oLoading) {
            oLoading.className = oLoading.className + " rdk_loading";
            loading = oLoading.outerHTML;
            oLoading.parentNode.removeChild(oLoading);
        } else {
            loading = '<div class="rdk_loading"><p>loading...<p/></div>';
        }

        bodyHTML = document.body.innerHTML;
        document.body.innerHTML = loading;
        _removeClass(document.body, 'rdk_main');
    }

    function _removeClass(element, className) {
        if (!element) {
            return;
        }
        var reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
        element.className = element.className.replace(reg, ""); 
    };

    function _findLoadingTag() {
        var tags = document.body.getElementsByTagName('*');
        for (var i = 0; i < tags.length; i++) {
            if (tags[i].localName == 'rdk_loading') {
                return tags[i];
            }
        }
    }

    function _start() {
        _setupLoading();

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
        if (appScript) {
            require.config({
                paths: {
                    "main": appScript
                }
            });
            console.log('starting rdk app from "' + appScript + '" ...');
        }


        require(["./mainconfig"], function() {
            require(["jquery", "angular"] , function() {
                require(["main"], _onSuccess, _onError);
            })
        });
    }

    function _mergePaths(paths) {
        if (!paths) {
            return paths;
        }
        try {
            var userPaths = require.s.contexts['_'].config.paths;
        } catch(e) {
            console.log('no original paths found!');
            return paths;
        }
        if (!userPaths) {
            return paths;
        }

        for (var path in paths) {
            if (userPaths.hasOwnProperty(path)) {
                console.warn('path config "' + path + '" is overriden, original value="' +
                    paths[path] + '", user value="' + userPaths[path] + '"');
                delete paths[path];
            }
        }
        return paths;
    }

    return {
        $start: _start,
        $mergePaths: _mergePaths,
    }
})();
rdk.$start();
