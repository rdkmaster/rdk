
/**
 * requirejs的rest插件，支持以GET方法require一个rest服务
 */
(function () {
    'use strict';

    define(['module'], function (module) {
        var masterConfig = module.config ? module.config() : {};

        return {
            version: '1.0.1',
            /**
             * Called when a dependency needs to be loaded.
             */
            load: function (restUrl, req, onLoad, config) {
                try {
                    if (!window.XMLHttpRequest) {
                        console.error("no window.XMLHttpRequest supported!");
                        onLoad();
                        return;
                    };

                    var http = new window.XMLHttpRequest();
                    http.open("GET", req.toUrl(restUrl));
                    var ct = config.contentType ? config.contentType : "application/json";
                    http.setRequestHeader("Content-Type", ct);
                    http.onreadystatechange = function() {
                        if(http.readyState == 4 && http.status == 200) {
                            onLoad(http.responseText);
                        }

                        console.log('http.readyState=' + http.readyState)
                        if (http.status == 404) {
                            console.error("rest quest error, status=" + http.status
                                + ", status text=" + http.statusText);
                            onLoad();
                        }
                    };
                    http.send(document);
                } catch(e) {
                    console.log('require rest plugin: not in browser, i will not continue!!')
                    onLoad();
                }
            }
        };
    });
}());
