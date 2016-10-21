define('main', ['application','rd.controls.AreaSelect', 'rd.controls.ComboSelect','rd.containers.Panel'], function (application) {
// 创建一个RDK的应用
  var app = angular.module("rdk_app", ['rd.core','rd.controls.AreaSelect', 'rd.controls.ComboSelect','rd.containers.Panel']);
// 创建一个控制器

  app.controller('rdk_ctrl', ['$scope', 'DataSourceService', 'EventService', 'EventTypes', function (scope, DataSourceService,EventService, EventTypes,$timeout) {
    application.initDataSourceService(DataSourceService);
    /************************ panel demo test data start ************************/
    scope.defaultData={
      province:{name:"广东",code:"1"},
      city:{name:"深圳",code:"2"},
      area:{name:"南山区",code:"3"}
    };

  }]);

});

