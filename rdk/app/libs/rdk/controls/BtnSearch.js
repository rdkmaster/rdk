define(['rd.core', 'css!rd.styles.BtnSearch'
], function() {
    var btnSearchApp = angular.module('rd.controls.BtnSearch', ['rd.core']);
    btnSearchApp.directive('rdkBtnSearch', ['EventService', 'Utils', 'EventTypes', '$timeout', '$compile',
        function(EventService, Utils, EventTypes, $timeout, $compile) {
            return {
                restrict: 'E',
                replace: true,
                template:'<button ng-click="clickQuery()" class="buttonClass" type="button"></button>',
                scope:{
                    clickQuery: '&?'
                },
                link: function(scope,ele, attr) {
                    var html=ele.val();
                    ele.html(html);
                }
            };
        }
    ])
});
