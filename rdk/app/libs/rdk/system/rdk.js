define(['./application.js', './mainconfig.js', '../../angular/angular.js', '../../jquery/jquery-1.11.3.min.js'], function(application) {

    var bodyHTML = undefined;
    var hasReady = false;

    function _init() {
        try {
            (window || document);
        } catch(e) {
            console.error('not in browser, i will not continue!!');
            return;
        }

        var evt = document.createEvent('Event');
        evt.initEvent('app_loaded', false, false);
        document.body.dispatchEvent(evt);
        hasReady = true;

        angular.module('rd.core', [
            'rd.services.DataSourceService', 'rd.services.EventService',
            'rd.services.Utils', 'rd.attributes.ds'
        ]);
        rdk.$ngModule = angular.module("rdk_app", []);
        rdk.$ngModule.config(['$provide', function($provide) {
            $provide.decorator('$controller', ['$delegate', function($delegate) {
                return function(constructor, locals, later, indent) {
                    if (typeof constructor === 'string' && locals.$scope) {
                        locals.$scope._rdk_controllerName = constructor;
                    }
                    return $delegate(constructor, locals, later, indent);
                };
            }]);
        }]);

    }

    function _onError(error) {
        console.error('ERROR: load main.js error, detail: ' + error);
    }

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
            oLoading.className = oLoading.className + " rdk-loader";
            loading = oLoading.outerHTML;
            oLoading.parentNode.removeChild(oLoading);
        } else {
            loading = '<div class="rdk-loader">' + application.loadingImage + '</div>';
        }

        bodyHTML = document.body.innerHTML;
        document.body.innerHTML = loading;
        _removeClass(document.body, 'rdk-loading');
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
        console.log('starting rdk app.....');
        angular.bootstrap(document, ["rdk_app"]);
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

    function _injectDependency(list) {
        angular.forEach(list, function(dep) {
            dep = dep.trim();
            if (rdk.$ngModule.requires.indexOf(dep) == -1) {
                rdk.$ngModule.requires.push(dep);
            }
        });
    }


    window.application = application;
    window.rdk = {};
    window.rdk.$start = _start;
    window.rdk.$injectDependency = _injectDependency;
    window.rdk.$ngModule = undefined;
    _init();
    return window.rdk;
});