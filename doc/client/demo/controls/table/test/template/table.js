define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('TableModuleController', ['$scope', 'Utils', 'PopupService','EventService','EventTypes', 'DataSourceService',function(scope, Utils, PopupService,EventService,EventTypes,DataSourceService) {
        console.log('TableModuleController controller is running..........');
        scope.destroyHandler = function(){
            PopupService.removePopup(scope.$moduleId);
        }

        scope.setting = {
            "columnDefs" :[
                {
                    title : "编辑列",
                    render : '<a style="color:red" ng-click="appScope.click(item)">点击</a>'
                },{
                    title : "索引添加",
                    override : false,
                    render : "渲染内容"
                },{
                    targets:"position",
                    render:function(item){
                        if(item.position == "Accountant")
                            return "<p style='color:red'>"+item.position+"</p>";
                        else
                            return item.position;
                    }
                }
            ]
        }

        scope.data = {};
        scope.data.header = ["姓名", "职位", "薪资", "入职日期", "部门", "其他"];
        scope.data.field = ["name", "position", "salary", "start_date", "office", "extn"];
        scope.isSaveTemplate=true;

        var queryTemplateDs=DataSourceService.create({
            id:'queryTemplateDs',
            url:'mock.json',
            scope:scope,
            queryMethod:"get"
        });
        setTimeout(function(){queryTemplateDs.query()},200);
        EventService.register('queryTemplateDs',EventTypes.RESULT,function(event,data){
            scope.data.data = data.data;
        });
    }]);
});