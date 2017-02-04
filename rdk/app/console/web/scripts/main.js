define('main', ['rd.attributes.Scroll'], function () {
// 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.attributes.Scroll','rd.core']);
// 创建一个控制器
    app.controller('myCtrl', ['$scope','DataSourceService','EventService','EventTypes', function (scope,DataSourceService,EventService,EventTypes) {
        /************************ panel demo test data start ************************/


		
        function onSuccess(path) {
			alert('文件上传成功，可通过这个url引用它\n' + path);
            scope.filepath=path;
        }

        function onError() {
            alert('文件上传失败，最大尺寸20M！');
        }

        scope.upload = function () {
            var formData = new FormData();
            formData.append("file",$("#myfile")[0].files[0]);
            DataSourceService.upload(formData, onSuccess, onError);
        }
		
		
		 
		var ds = DataSourceService.create('deploy_response', '/rdk/service/app/console/server/deploy?p=$data$');
		ds.conditionProcessor = function(condition){
		     
			return condition
		}
		ds.updateMethod = 'get';
		scope.deploy = function () {
			var queryStr =  {}
			var subStr = {}
			subStr["sourceFile"] = scope.filepath
			subStr["appName"] = "lwexample"
			
			queryStr["param"]=subStr
			queryStr["app"]="console"
			
			var configDelData = {};
			configDelData["data"] = encodeURIComponent(JSON.stringify(queryStr));
		
			ds.query(configDelData);
		}

    }]);

});

