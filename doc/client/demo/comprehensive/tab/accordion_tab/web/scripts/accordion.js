define('main', ['application', 'blockUI','rd.controls.Table', 'rd.containers.Tab', 'rd.containers.Accordion'],
    function(application) {
// 创建一个RDK的应用
        var app = angular.module("rdk_app", ['rd.core', 'blockUI','rd.controls.Table', 'rd.containers.Tab', 'rd.containers.Accordion']);
        app.config(['blockUIConfig', function(blockUIConfig) {
            // blockUI的详细用法参考 https://github.com/McNull/angular-block-ui
            blockUIConfig.template = '<div class="block-ui-message-container">\
                                  <img src="images/loding.gif" />\
                              </div>';
        }]);
// 创建一个控制器
        app.controller('rdk_ctrl', ['$scope', 'DataSourceService',
            function(scope, DSService,$timeout) {

                application.initDataSourceService(DSService);

                /************************ accordion demo test data start ************************/
                scope.btnStatus = true;//按钮初始状态标志
                scope.changeTabsStatus =function(){
                    scope.btnStatus=!scope.btnStatus;
                    //折叠收缩content的显示，TODO:控制器中不应该进行DOM操作。。
                    if(!scope.btnStatus){
                        $(".tab_wrap").find(".content").addClass("content-hiddan");
                    }else{
                        $(".tab_wrap").find(".content").removeClass("content-hiddan");
                    }
                }
                scope.accordionData = {};
                scope.accordionData.header = ["一级原因", "原因名称1", "原因名称2", "原因名称3"];
                scope.accordionData.field = ["name", "position", "salary", "start_date"];
                scope.accordionData.data = [
                    [
                        "次数",
                        "890",
                        "890",
                        "890"
                    ],
                    [
                        "占比",
                        "90%",
                        "90%",
                        "90%"
                    ]
                ];
                scope.accordionData2 = {};
                scope.accordionData2.header = ["指标", "无线接通率", "掉线率", "切换成功率", "重定向占比", "影响用户数"];
                scope.accordionData2.field = ["name", "position", "salary", "start_date", "start_date", "start_date"];
                scope.accordionData2.data = [
                    [
                        "23",
                        "89%",
                        "3%",
                        "86%",
                        "86%",
                        "58"
                    ],
                    [
                        "23",
                        "89%",
                        "3%",
                        "86%",
                        "86%",
                        "58"
                    ],
                    [
                        "23",
                        "89%",
                        "3%",
                        "86%",
                        "86%",
                        "58"
                    ],
                    [
                        "23",
                        "89%",
                        "3%",
                        "86%",
                        "86%",
                        "58"
                    ],
                    [
                        "23",
                        "89%",
                        "3%",
                        "86%",
                        "86%",
                        "58"
                    ]
                ];
                /************************ accordion test data end ************************/
            }]);
    });


