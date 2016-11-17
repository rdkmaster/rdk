(function() {
    //在这里配置所有需要下载的文件，只有这个列表中的项目才会被浏览器下载
    //隆重推荐把需要下载的文件一一配置在这里，这样RDK才可以完成自动压缩和合并
    //写在页面的head中的文件无法被自动压缩和合并，从而导致页面打开变慢
    var downloadDependency = [
        //所有路径中的 base 都会被替换成本页面html文件所在路径
        //注意：非绝对路径的条目不能加 .js 扩展名，绝对路径的条目则必须加扩展名
        'base/template/sample_module',

        //带有 alias 属性的条目，可以通过 ctx.utils 来访问
        { url: 'base/scripts/utils', alias: 'utils' },
        { url: 'base/scripts/i18n',  alias: 'i18n'  },

        //css类型的文件需要加 css! 的前缀，是否需要扩展名的规则和 js 文件规则一致
        'css!base/css/style.css',

        //这类 rd. 开头的条目是RDK预定义好的控件路径别名
        'rd.controls.Module'
    ];

    //在这里把页面需要用到的 Angular module 一一列出来，包括所需的第三方 module
    //RDK定义的 Angular module 会被自动加入，无需再次添加
    var requiredComponents = [ ];

    //downloadDependency 中带有 alias 的条目的返回值会被保存在这个对象中
    //可通过 ctx.alias 的方式引用到这些下载项的结果
    var ctx = {};

    //controllerDefination 定义了本应用的根控制器，它是所有子控制器的祖先
    //这个数组遵循Angular依赖注入的规则，简单的讲，把Angular和RDK提供的服务名填在数组中
    //然后在 main 函数的参数列表中，按照顺序填上一个同名的形参就才能使用这些服务
    //详细的依赖注入规则解释和例子，请参考这里 http://docs.ngnice.com/guide/di
    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {
        //应用内部初始化，一般不需要修改，也请保持这2行代码在main函数的最开始
        ctx.i18n.$init(scope);
        ctx.helper.initDataSourceService(DataSourceService);

        //=================== 在这里开始写本应用的第一行代码 ========================

        ctx.utils.hello('RDK example');

        scope.loadModule = function() {
            rdk.myModule.loadModule({initData: 'initData...initData...initData...'});
            scope.moduleLoaded = true;
        }

        scope.destroyModule = function() {
            rdk.myModule.destroyModule();
            scope.moduleLoaded = false;
        }

        scope.sayHello = function() {
            console.log(rdk.myModule.child.publicData);
            rdk.myModule.child.hello('RDK example');
        }

        //=================== 在这里结束本应用的最后一行代码 ========================
    };

    //==========================================================================
    //                   从这里开始的代码请不要随意修改
    //==========================================================================
    
    require.config({paths:{helper: '/rdk/app/modules/rdk_app_helpers'}});
    downloadDependency.push('blockUI');
    downloadDependency.push({ url: 'helper', alias: 'helper' });
    define(/*fix-from*/application.getDownloads(downloadDependency)/*fix-to*/, start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(application.getComponents(requiredComponents, downloadDependency));
        rdk.$ngModule.controller('RootController', controllerDefination);
        rdk.$ngModule.config(['blockUIConfig', function(blockUIConfig) {
            // blockUI默认只要有ajax请求在进行，就会自动启动，阻止页面响应鼠标事件
            // 使用下面代码可以阻止自动模式，启用手动模式
            // blockUIConfig.autoBlock=false
            // 然后在需要阻止页面相应鼠标事件的时候，使用下面代码
            // blockUI.start();
            // 在需要继续相应页面相应鼠标事件的时候，使用下面代码
            // blockUI.stop();

            // blockUI的详细用法参考 https://github.com/McNull/angular-block-ui
            blockUIConfig.template = '<div class="block-ui-message-container">'
                + application.loadingImage + '</div>';
        }]);
    };
})();