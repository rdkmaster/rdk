define('main', ['rd.controls.Scroller'], function() {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.controls.Scroller']);
// 创建一个控制器
app.controller('myCtrl', ['$scope', '$timeout', function(scope, $timeout) {
                      scope.images=[{src:'img/img1.png',title:'Pic 1'},{src:'img/img2.jpg',title:'Pic 2'},{src:'img/img3.jpg',title:'Pic 3'},{src:'img/img4.png',title:'Pic 4'},{src:'img/img5.png',title:'Pic 5'}]; 
                      

   
}

]);
});
