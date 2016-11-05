define(['rd.services.DataSourceService'], function() {
    var dsModule = angular.module('rd.attributes.ds', ['rd.services.DataSourceService']);
    dsModule.directive('ds', ['DataSourceService', 'Utils',
        function(DSService, Utils) {
            return {
                restrict: 'AE',
                // priority: 1000,
                link: function(scope, el, attrs) {
					var dsId = attrs.ds || attrs.id;
                    if (!dsId) {
						console.error('creating ds by DOM: invalid ds id!');
                        return;
                    }
                    var appScope = Utils.findAppScope(scope);
                    var ds = DSService.get(dsId);
                    if (!ds) {
                        var myAttr = {scope: appScope};
                        Utils.shallowCopy(attrs, myAttr);
                        ds = DSService.create(myAttr);
                    }
                    if (ds) {
                        ds.scope = appScope;
                        try {
                            var obj = eval('(' + (attrs.dsInitData || attrs.initData) + ')');
                        } catch (e) {
                            obj = attrs.dsInitData || attrs.initData;
                        }
                        obj = !!obj ? obj : {};
						ds.data = obj;
						appScope[ds.id] = obj;

                        appScope.$on('$destroy', function() {
                            DSService.remove(ds);
                        });
                    }
                }
            };
        }
    ]);

})
