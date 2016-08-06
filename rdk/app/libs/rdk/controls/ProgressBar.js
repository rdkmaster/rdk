define(['angular', 'jquery-ui','jquery', 'rd.core', 'css!rd.styles.ProgressBar',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function(){
    var progressBarApp = angular.module('rd.controls.ProgressBar', ['rd.core']);
    progressBarApp.directive('rdkProgressBar', ['Utils', function (Utils) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                id: '@?',
                waiting: '@?',
                interval: '@?'
            },
            controller: ['$scope', function(scope) {

            }],
            template:
                '<div class="rdk-progressbar-module">\
                    <span class="progress-render">Loading...</span>\
                </div>',
            compile: function(tEle, tAttrs) {
                return {
                    post: _link
                }
            }
        };

        function _link(scope, iEle, iAttrs, ctrl, transclude){
            _init();
            setTimeout(_progress, scope.waiting);

            function _init(){
                scope.waiting = scope.waiting || 0;
                scope.interval = scope.interval || 500;

                //注册
                $(iEle).progressbar({
                    value: false,
                    change: function(){
                        $(iEle[0].childNodes[1]).text($(iEle).progressbar("value") + "%" );
                    },
                    complete: function(){
                        $(iEle[0].childNodes[1]).text( "Complete!" );
                    }
                });
            }

            function _progress(){
                var percent = $(iEle).progressbar("value") || 0;
                $(iEle).progressbar("value", percent+1);
                if(percent < 99){
                    setTimeout(_progress, scope.interval);
                }
            }
        }
    }])
});