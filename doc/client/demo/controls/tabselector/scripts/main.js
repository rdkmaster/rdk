define('main', ['angular', 'rd.controls.TabSelector', 'rd.controls.BasicSelector'], function(){
	var myApp = angular.module('rdk_app', [
	        'rd.controls.TabSelector',
	        'rd.controls.BasicSelector'
	    ]);

	myApp.controller('tabselectorCtrl', ['$scope', 'RDKConst', 'BasicSelector', function (scope, RDKConst, BasicSelector) {
		
		scope.tabselectorData = {
			"classes": [{"label": "省"}, {"label": "市"}, {"label": "小区组"}, {"label": "小区"}],
			"dim": [{
				"label": "江苏省",
				"value": "1",
				"longitude": "144",
				"latitude": "144",
				"dim":[
				{
					"label": "南京市",
					"value": "11",
					"longitude": "144",
					"latitude": "144",
					"dim": [
					{
						"label": "雨花区",
						"value": "111",
						"longitude": "1144",
						"latitude": "1144",
						"dim": [
						{
							"label": "银杏山庄",
							"value": "1112",
							"longitude": "11144",
							"latitude": "11144"
						},
						{
							"label": "文鼎雅苑",
							"value": "1113",
							"longitude": "11244",
							"latitude": "11244"
						}
						]
					},
					{
						"label": "江宁区",
						"value": "112",
						"longitude": "1244",
						"latitude": "1244",                
						"dim": [
						{
							"label": "九龙湖",
							"value": "1121",
							"longitude": "12144",
							"latitude": "12144"                     
						},
						{
							"label": "东山镇",
							"value": "1122",
							"longitude": "12244",
							"latitude": "12244"                   
						}
						]
					},
					{
						"label": "鼓楼区",
						"value": "113",
						"longitude": "11344",
						"latitude": "11344"
					}
					]
				},
				{
					"label": "苏州市",
					"value": "12",
					"longitude": "244",
					"latitude": "244",            
					"dim": [
					{
						"label": "金阊区",
						"value": "121",
						"longitude": "2144",
						"latitude": "2144" 
					},
					{
						"label": "吴中区",
						"value": "122",
						"longitude": "2244",
						"latitude": "2244",
						"dim": [
						{
							"label": "灵岩山",
							"value": "1221",
							"longitude": "12144",
							"latitude": "12144"                     
						},
						{
							"label": "天平山",
							"value": "1222",
							"longitude": "12244",
							"latitude": "12244"                   
						}                                
						]
					}
					]
				},
				]            
			},
			{
				"label": "浙江省",
				"value": "2",
				"longitude": "144",
				"latitude": "144",
				"dim":[
				{
					"label": "杭州市",
					"value": "23",
					"longitude": "344",
					"latitude": "344"
				}
				]            
			}
			]
		}		
	
		scope.trackItemByVal = "value";
		scope.selItems = [
		// {"label": "江苏省","value": "1"},
		// {"label": "浙江省","value": "2"},
		// {"label": "南京市","value": "11"},
		// {"label": "苏州市","value": "12"},
		// {"label": "雨花区","value": "111"},
		{"label": "江宁区","value": "112"},
		// {"label": "鼓楼区","value": "113"},
		// {"label": "银杏山庄","value": "1112"},
		// {"label": "文鼎雅苑","value": "1113"},
		// {"label": "九龙湖","value": "1121"},
		// {"label": "东山镇","value": "1122"},
		// {"label": "杭州市","value": "23"},
		];
	}])
});