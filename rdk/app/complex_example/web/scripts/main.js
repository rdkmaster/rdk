define('main', ['blockUI', 'main_ctrl', 'ctrl1', 'ctrl2'],
function() {
// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.core', 'blockUI']);
app.config(['blockUIConfig', function(blockUIConfig) {
    // blockUI默认只要有ajax请求在进行，就会自动启动，阻止页面响应鼠标事件
    // 使用下面代码可以阻止自动模式，启用手动模式
    // blockUIConfig.autoBlock=false
    // 然后在需要阻止页面相应鼠标事件的时候，使用下面代码
    // blockUI.start();
    // 在需要继续相应页面相应鼠标事件的时候，使用下面代码
    // blockUI.stop();

    // blockUI的详细用法参考 https://github.com/McNull/angular-block-ui
    blockUIConfig.template = '<div class="block-ui-message-container">\
                                  <img src="images/loding.gif" />\
                              </div>';
}]);

// 创建控制器
// 从ng-controller属性添加的层次关系上看，rdk_ctrl是app的根控制器，ctrl1和ctrl2是2个兄弟控制器，
// 并且这2个控制器有共同的父级rdk_ctrl。这样的关系造成了ctrl1和ctrl2可以直接访问父级rdk_ctrl中
// 的任何属性和方法。
app.controller('rdk_ctrl', mainController);
app.controller('ctrl1', controller1);
app.controller('ctrl2', controller2);



});

/********************************************************************
                       这个区域不要添加任何代码
 ********************************************************************/
