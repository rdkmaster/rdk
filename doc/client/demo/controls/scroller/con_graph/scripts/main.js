define('main', ['rd.controls.Scroller','rd.controls.Graph'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Scroller','rd.controls.Graph']);
// 创建一个控制器
app.controller('myCtrl', ['$scope', '$timeout', function(scope, $timeout) {
    scope.images=[
		{   src:'img/img1.png',
			title:'Pic 1',
			graphData:{
				rowDescriptor: ['最高气温', '最低气温'],
				header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				data: [
					[15, 15, 15, 15, 15, 15, 15],
					[1, 4, 6, 4, 9, 6, 3]
				]
			}
		},
	    {src:'img/img2.jpg',title:'Pic 2',graphData:{
        rowDescriptor: ['最高气温', '最低气温'],
        header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        data: [
            [11, 13, 15, 18, 15, 12, 10],
            [5, 5, 5, 5, 5, 5, 5]
        ]
    }},
		{src:'img/img3.jpg',title:'Pic 3',graphData:{
        rowDescriptor: ['最高气温', '最低气温'],
        header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        data: [
            [15, 14, 13, 11, 13, 14, 15],
            [1, 4, 6, 4, 9, 6, 3]
        ]
    }},
		{src:'img/img4.png',title:'Pic 4',graphData:{
        rowDescriptor: ['最高气温', '最低气温'],
        header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        data: [
            [11, 15, 11, 15, 11, 15, 11],
            [1, 4, 6, 4, 9, 6, 3]
        ]
    }},
		{src:'img/img5.png',title:'Pic 5',graphData:{
        rowDescriptor: ['最高气温', '最低气温'],
        header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        data: [
            [11, 13, 15, 18, 15, 12, 10],
            [1, 4, 6, 4, 9, 6, 3]
        ]
    }}]; 
                      

   
}

]);
});
