define('main', ['application','rd.attributes.Scroll'], function (application) {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.attributes.Scroll']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope', 'DataSourceService', function (scope,DataSourceService) {
        /************************ panel demo test data start ************************/
        application.initDataSourceService(DataSourceService);
        scope.upload = function (argument) {
        	var formData=new FormData();
        	var url = "/rdk/service/common/upload";
		    formData.append("file",$("#myfile")[0].files[0]);
        	DataSourceService.firmData(url, formData);
        }

    }]);

});

