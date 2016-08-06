
define('main', ['rd.containers.Accordion', 'rd.controls.BasicSelector'], function() {


    var app = angular.module("rdk_app", ['rd.containers.Accordion', 'rd.controls.BasicSelector']);
    
    app.controller('myCtrl', ['$scope', 'EventService', 'EventTypes', 'Utils', '$timeout',
        function(scope, EventService, EventTypes, Utils, $timeout) {

            scope.accordionOpenable = false;

            scope.allItems = [
                { id: 0, label: "江苏省" },
                { id: 1, label: "浙江省" },
                { id: 2, label: "广东省" },
                { id: 3, label: "广西省" },
                { id: 4, label: "河北省" },
                { id: 5, label: "河南省" },
                { id: 6, label: "湖北省" },
                { id: 7, label: "湖南省" },
                { id: 8, label: "新疆省" },
                { id: 9, label: "四川省" }
            ];

            scope.basicSelectedItems_1 = [
                { id: 3, label: "广西省" },
                { id: 7, label: "湖南省" },
                { id: 4, label: "河北省" }
            ];

            scope.changeHandler = function(event, data){
                console.log("changeHandler in");
            }

            EventService.register('testID', EventTypes.CHANGE, function(event, data){
                console.log(data);
            });

            EventService.broadcast('testID', EventTypes.SELECT, scope.basicSelectedItems_1);

            EventService.broadcast('accordionID', EventTypes.OPEN);
                     
            //多层transclude时，由于作用域变化，从双绑对象取值，需要借助appScope
            // scope.changeHandler = function(event, data){
            //     console.log(event.appScope.basicSelectedItems);//各种被包时要这么取，这么改双绑
            //     $timeout(function(){
            //         event.appScope.basicSelectedItems = [{ id: 7, label: "湖南省" }];
            //     },3000);
            // }
            scope.testSelectedItems = [];
            $timeout(function(){
                scope.testSelectedItems = [
                    { id: 3, label: "广西省" }
                ];
                // console.log(scope.testSelectedItems);
            },3000);
        }
    ]);
});
