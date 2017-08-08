define(["app-basic", "mainconfig"], function() {
    require(["rest!/rdk/app/common/theme"] , function(theme) {
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

        function _injectDependency(list) {
            angular.forEach(list, function(dep) {
                dep = dep.trim();
                if (rdk.$ngModule.requires.indexOf(dep) == -1) {
                    rdk.$ngModule.requires.push(dep);
                }
            });
        }

        function _start() {
            /*
             * 初始化应用入口
             */
            var appScript;
            application.version = '0.0.0';
            for (var i = 0; i < document.scripts.length; i++) {
                var s = document.scripts[i];
                var src = s.getAttribute('src');
                if (src && src.match(/libs\/requirejs\/require.js$/)) {
                    application.version = s.getAttribute('app-version');
                    application.version = application.version ? application.version : '0.0.0';
                    appScript = s.getAttribute('rdk-app');
                    appScript += (application.version != '0.0.0' ? '-' + application.version : '');
                }
            };
            if (appScript) {
                if (appScript[0] != '/') {
                    //非绝对路径时，给拼成绝对路径
                    appScript = application.base + '/' + appScript;
                }

                require.config({
                    paths: {
                        "base": application.base,
                        "main": appScript
                    }
                });
                console.log('starting rdk app from "' + appScript + '" ...');
            }

            console.log('IMPORTANT: rdk_app created!');
            rdk.$ngModule = angular.module("rdk_app", []);
            require(["main"], _onSuccess, _onError);
        }

        _setupLoading();

        //为了避免在非压缩环境下重复下载 loading.css 而玩的一个小技巧。
        //实际上r.js直接无视这个if，也就是说r.js在执行时，这两个require都会被扫描到并执行
        //同时r.js会无视重复的依赖，所以最终效果就是 'angular', 'jquery', 'css!../rdk/css/loading'
        //这3个依赖都会被r.js找到，从而达到在压缩环境下有loading，非压缩环境下无loading的目的
        if (window.hasOwnProperty('angular')) {
            require(['angular', 'jquery', 'css!../rdk/css/loading', theme], _start);
        } else {
            require(['angular', 'jquery', theme], _start);
        }

        window.rdk = {};
        window.rdk.$start = _start;
        // window.rdk.$mergePaths = _mergePaths;
        window.rdk.$injectDependency = _injectDependency;
        //在 _start() 中初始化
        window.rdk.$ngModule = undefined;
    });
});

//由于js文件被压缩后， angular 会很快被定义
//而js在未被压缩时， angular 要在rdk.js被下载之后才定义
//因此通过这个方式来判定当前是否是在压缩环境
window.hasOwnProperty('angular') && require(['rdk']);



