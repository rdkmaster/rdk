define('main', ['rd.controls.Table'], function() {
    // 创建一个RDK的应用
    var app = angular.module("rdk_app", ['rd.controls.Table','rd.core']);
    // 创建一个控制器
    app.controller('myCtrl', ['$scope', function($scope) {

    	// $scope.setting = {
    	// 	scrollX: true
    	// } 

        $scope.setting = {
            "columnDefs" :[
                {
                    targets : 0,
                    sortas: "string",
                    sortable: true
                },{
                    targets : "extn",
                    sortable: true,
                    sortas: "int",
                    sort: function(a, b){
                        if(parseInt(a, 10) < parseInt(b, 10)){
                            return -1;
                        }
                        else {
                            return 1;
                        }
                    }
                },{
                    targets : 3,
                    sortas: "date",
                    sortable: true
                }

            ]
        }
        
    }]);
});
