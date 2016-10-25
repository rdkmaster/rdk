//有新的下载请追加到数组后面
define(['application', 'utils', 'i18n'], function(application, utils, i18n) {

window.mainController = 
        ['$scope', 'DataSourceService', 'blockUI',
function(  scope,   DataSourceService,   blockUI) {
    i18n.$init(scope);
    application.initDataSourceService(DataSourceService);
    /************************ 应用的代码逻辑开始 ************************/

      utils.hello('rdk');


    /************************ 应用的代码逻辑结束 ************************/
  }]
});
