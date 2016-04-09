var app = angular.module("myApp", [
    'rd.basic',
    'rd.controls.TabSelect',
    'ui.codemirror'
]);
app.controller('ctrl', ['$scope', 'DataSourceService', 'EventService', 'EventTypes',
    function(scope, DSService, EventService, EventTypes) {

        


        scope.clickHandler = function(event, data) {
            console.log(data);
            console.log(event);
        }

        scope.myDataProcessor = function(dataBuffer) {
            console.log("!!!!! myDataProcessor !!!!!!!")
            return dataBuffer;
        }

        /*demo1*/

        //当设置id时，里头会抛对象。这里捕捉
        EventService.register('id_tab_select', EventTypes.ITEM_SELECTED, function(event, data){
            scope.tab_selected_data = data;//JSON.stringify(data);
        });

        //当设置id时，里面会抛open/close
        EventService.register('id_tab_select', EventTypes.CHANGE, function(event, data){
            if(data){
                console.log('Accept inner open.');
            }
            else{
                console.log('Accept inner close.');
            }          
        });

        /*demo2*/
        EventService.register('id_tab_select_2', EventTypes.ITEM_SELECTED, function(event, data){
            scope.tab_selected_data_2 = data;//JSON.stringify(data);
        });

        setTimeout(function(){
            EventService.broadcast('id_tab_select_2', EventTypes.OPEN, {});
            // EventService.broadcast('id_tab_select_2', EventTypes.CLOSE, {});
        },2000);
    }
]);
