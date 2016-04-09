define(['rd.services.DataSourceService'], function() {
    var dsModule = angular.module('rd.attributes.ds', ['rd.services.DataSourceService']);
    dsModule.directive('ds', ['DataSourceService', '$parse',
        function(DSService, $parse) {
            return {
                restrict: 'AE',
                // priority: 1000,
                link: function(scope, el, attrs) {
                    var ds = DSService.create(attrs);
                    if (ds) {
                        ds.scope = scope;
						scope[ds.id] = {};
                    }
                }
            };
        }
    ]);

})
