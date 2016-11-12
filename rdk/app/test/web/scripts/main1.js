console.log('ffffffffffffffff')
define(['/rdk/app/libs/rdk/system/rdk.js'], function(rdk) {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
    require(['/rdk/app/modules/rdk_app_helpers.js', 'i18n', 'a', 'rd.controls.Module', '../template/sample_module'], function(helper, i18n) {
        rdk.$injectDependency(['rd.controls.Module']);
        rdk.$ngModule.controller('RootController', ['$scope', 'DataSourceService', function(scope, DataSourceService) {
            i18n.$init(scope);
            helper.initDataSourceService(DataSourceService);
            console.log('RootController.............')

            scope.loadModule = function() {
                rdk.myModule.loadModule({initData: 'initData...initData...initData...'});
                scope.moduleLoaded = true;
            }

            scope.destroyModule = function() {
                rdk.myModule.destroyModule();
                scope.moduleLoaded = false;
            }

            scope.sayHello = function() {
                console.log(rdk.myModule.child.publicData);
                rdk.myModule.child.hello('RDK example');
            }
        }]);
        rdk.$start();
    })
});