define('main', ['application', 'blockUI','rd.controls.Table','rd.attributes.Scroll', 'rd.containers.Tab', 'rd.containers.Accordion'],
    function(application) {
// 创建一个RDK的应用
        var app = angular.module("rdk_app", ['rd.core', 'blockUI','rd.controls.Table','rd.attributes.Scroll', 'rd.containers.Tab', 'rd.containers.Accordion']);
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
                        //setTimeout(function(){
                        //    $(".tab_wrap").find(".rdk-tab-content").hide();
                        //},1000);
                    }else{
                        $(".tab_wrap").find(".content").removeClass("content-hiddan");
                        //setTimeout(function(){
                        //    $(".tab_wrap").find(".rdk-tab-content").show();
                        //},1000);
                    }
                };
                /************************ accordion test data end ************************/
            }]);
    });


