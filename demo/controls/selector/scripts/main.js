define('main', ['rd.controls.Selector','rd.controls.BasicSelector', 'rd.containers.Accordion', 'rd.controls.FoldSelector'], function() {
var app = angular.module("rdk_app", ['rd.controls.Selector','rd.controls.BasicSelector', 'rd.containers.Accordion', 'rd.controls.FoldSelector']);
    app.controller('myCtrl', ['$scope','$timeout','EventService','EventTypes', function(scope, $timeout, EventService, EventTypes){

            scope.selectorID = "selectorID";

            scope.groupData = {"title1": [{id: 0, label: "江苏省"},{id: 1, label: "浙江省"}],
                              "title2": [{id: 2, label: "广东省"},{id: 3, label: "广西省"},{id: 4, label: "河北省"},{id: 5, label: "河南省"}]};

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

            scope.groupByFun = function(item){
                if(item.id < 3){
                    return 'theme1';
                }
                else if(item.id < 5){
                    return 'theme2';
                }
                else{
                    return 'theme3';
                }
            }

            scope.selectedGroupByFun = function(item){
                if(item.id < 2){
                    return 'title1';
                }
                else{
                    return 'title2';
                }
            }

            scope.groupSelectedItems = {"title1": [{id: 0, label: "江苏省"},{id: 1, label: "浙江省"}],
                                        "title2": [{id: 2, label: "广东省"}]};

            // scope.selectedItems = [
            //     {id: 1, label: "浙江省"},
            //     {id: 3, label: "广西省"},
            //     {id: 5, label: "河南省"}
            // ];//根据同一个groupBy

            scope.changeHandler = function(event, data){
                console.log('call changeHandler');//某个变化后被选中的元素
            }

            scope.dimHandler = function(event, data){
                scope.dimSelectedItems = data;
            }

            $timeout(function(){
                scope.dimSelectedItems = [
                    {id: 1, label: "浙江省"},
                    {id: 3, label: "广西省"},
                    {id: 5, label: "河南省"}
                ];//根据同一个groupBy
                EventService.broadcast("selectorID", EventTypes.OPEN);
            },3000);
        }
    ]);
});
