application = (function() {
    return {
        loadingImage: '<img src="data:image/gif;base64, ' +
        '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' +
        'Fy9ftKJKnUq1qtWrWLNq3cq1q9evYMOKrRoIADs=' + 
        '" alt="loading..." style="width:60px;height:60px"/>',
        base: (function() {
            var match = location.pathname.match(/^(.*)\//);
            return match[1];
        })(),
        getDownloads: function(downloads) {
            var list = [];
            for (var i = 0; i < downloads.length; i++) {
                var item = downloads[i];
                var url;
                if (item.hasOwnProperty('url')) {
                    url = item.url;
                } else {
                    url = item;
                }
                list.push(url);
            }
            return list;
        },
        getComponents: function(components, downloads) {
            //自动将下载列表中的 "rd." 开头的模块名加入到Angular的依赖列表总
            var compList = components.concat('blockUI');
            for (var i = 0; i < downloads.length; i++) {
                var item = downloads[i];
                var compName = item.hasOwnProperty('url') ? item.url : item;
                if (compName.match(/^\s*rd\..*/)) {
                    compList.push(compName);
                }
            }
            return compList;
        },
        initContext: function(ctx, values, downloads) {
            for (var i = 0; i < downloads.length; i++) {
                var item = downloads[i];
                if (!item.hasOwnProperty('url')) {
                    continue;
                }
                ctx[item.alias] = values[i];
            }
        }
    }
})();

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
                    if (typeof constructor === 'string' && locals.$scope) {
                        locals.$scope._rdk_controllerName = constructor;
                    }
                    return $delegate(constructor, locals, later, indent);
                };
            }]);
        }]);

        console.log('starting rdk app.....');
        angular.bootstrap(document, ["rdk_app"]);
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
        try {
            (window || document);
        } catch(e) {
            console.error('not in browser, i will not continue!!');
            return;
        }
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
                    "base": application.base,
                    "main": application.base + '/' + appScript
                }
            });
            console.log('starting rdk app from "' + appScript + '" ...');
        }

        require(["./mainconfig"], function() {
            require(["jquery", "angular"] , function() {
                console.log('IMPORTANT: rdk_app created!');
                rdk.$ngModule = angular.module("rdk_app", []);
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

    function _injectDependency(list) {
        angular.forEach(list, function(dep) {
            dep = dep.trim();
            if (rdk.$ngModule.requires.indexOf(dep) == -1) {
                rdk.$ngModule.requires.push(dep);
            }
        });
    }

    return {
        $start: _start,
        $mergePaths: _mergePaths,
        $injectDependency: _injectDependency,
        $ngModule: undefined, //在 _start() 中初始化
    }
})();
rdk.$start();
