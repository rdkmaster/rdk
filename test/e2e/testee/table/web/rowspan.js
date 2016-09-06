define('main', ['application', 'rd.controls.Table'],
    function(application) {
        // 创建一个RDK的应用
        var app = angular.module("rdk_app", ['rd.core', 'rd.controls.Table']);
        // 创建一个控制器
        app.controller('rdk_ctrl', ['$scope', 'EventTypes', 'EventService',
            function(scope, EventTypes, EventService) {

                /************************ 应用的代码逻辑开始 ************************/
                //rowSpan
                scope.rowSpanSetting = {
                    "columnDefs": [{
                        targets: 0,
                        group: true,
                        editable: true
                    }, {
                        targets: "position",
                        group: function(rowspans, filedName, filterData) {
                            console.log(rowspans);
                            console.log(filedName);
                            console.log(filterData);
                            return rowspans;
                        }
                    }, {
                        targets: "salary",
                        group: true,
                        editable: true
                    }, {
                        targets: 3,
                        editable: true
                    }]
                }


                EventService.register('rowSpan', EventTypes.CHANGE, function(event, data) {
                    scope.changeData = data;
                });

                scope.rowSpanData = {};
                scope.rowSpanData.header = ["姓名", "职位", "薪资", "入职日期", "部门", "其他"];
                scope.rowSpanData.field = ["name", "position", "salary", "start_date", "office", "extn"];
                scope.rowSpanData.data = [
                    [
                        "Tiger Nixon",
                        "System Architect",
                        "$320,900",
                        "2011/04/25",
                        "Edinburgh",
                        "5421"
                    ],
                    [
                        "Tiger Nixon",
                        "System Architect",
                        "$320,800",
                        "2011/06/25",
                        "Edinburgh1",
                        "54211"
                    ],
                    [
                        "Tiger Nixon",
                        "System Architect",
                        "$320,800",
                        "2011/04/25",
                        "Edinburgh",
                        "5421"
                    ],
                    [
                        "Garrett Winters",
                        "Accountant",
                        "$170,750",
                        "2011/07/25",
                        "Tokyo",
                        "8422"
                    ],
                    [
                        "Garrett Winters",
                        "Accountant",
                        "$170,750",
                        "2011/06/25",
                        "Tokyo1",
                        "84221"
                    ]
                ];

                /************************ 应用的代码逻辑结束 ************************/
            }
        ])

        /********************************************************************
                  应用如果将代码写在此处，可能会导致双向绑定失效
                        需要手工调用 scope.$apply() 函数
                  若非有特别的需要，否则请不要将代码放在这个区域
         ********************************************************************/

    });

/********************************************************************
                       这个区域不要添加任何代码
 ********************************************************************/
