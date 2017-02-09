(function() {
    // 在这里配置所有需要下载的文件，只有这个列表中的项目才会被浏览器下载
    // 隆重推荐把需要下载的文件一一配置在这里，这样RDK才可以完成自动压缩和合并
    // 写在页面的head中的文件无法被自动压缩和合并，从而导致页面打开变慢
    var imports = [
        // 所有路径中的 base 都会被替换成本页面html文件所在路径
        // 注意：所有的url都不能加 .js 扩展名
        'base/template/sample_module',

        // 带有 alias 属性的条目，在main函数中，可通过 imports.<alias> 来使用
        { url: 'base/scripts/utils', alias: 'utils' },
        { url: 'base/scripts/i18n',  alias: 'i18n'  },

        // css类型的文件需要加 css! 的前缀，注意url上不能加 .css 扩展名
        'css!base/css/style',

        // 这类 rd. 开头的条目是RDK预定义好的控件url别名
        'rd.controls.Module'
    ];

    // 在这里把页面需要用到的第三方  Angular module 一一列在此变量中。这里一般留空就好。
    var extraModules = [ ];

    // controllerDefination 定义了本应用的根控制器，它是所有子控制器的祖先
    // 这个数组遵循Angular依赖注入的规则，简单的讲，把Angular和RDK提供的服务名填在数组中
    // 然后在 main 函数的参数列表中，按照顺序填上一个同名的形参就才能使用这些服务
    // 详细的依赖注入规则解释和例子，请参考这里 http://docs.ngnice.com/guide/di
    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {
        // 应用内部初始化，一般不需要修改，也请保持这2行代码在main函数的最开始
        imports.i18n.$init(scope); //初始化页面国际化信息，无需国际化的页面请删除这一行
        imports.helper.v2.$init(DataSourceService);

        //                              关于 scope 变量
        // 
        // 这里的 scope 是一个非常特殊的变量，在Angular术语中，称之为作用域，它是Angular解析
        // html中各种变量/函数的上下文，因此凡是在html中用到的变量/函数都必须定义在 scope 上
        // 反过来，只要在html中用不到的变量/函数，那就绝不要定义在 scope 上！
        // 定义在 scope 上的变量/函数，都是全局的，不必要的全局变量/函数会给后续代码维护带来
        // 各种不必要的麻烦。请记住，一个全局变量就是一个坑！变量的作用范围越小越好。
        // 
        // scope 在Angular中非常复杂，但它的使用原则却是难以置信的简单，记住前面所讲的就够了。
        //
        // 这里有一篇中文文章可帮助理解 scope: http://docs.ngnice.com/guide/scope
        // 不过看不懂也没关系，只要记住这小段对 scope 描述的文字就好，一点都不影响开发。
        // 

        //=================== 在这里开始编写本应用的第一行代码 ========================

        scope.exampleVersion = 'v2.0.3';

        // 这里演示了调用 scripts/utils.js 的返回值
        imports.utils.hello('RDK example ' + scope.exampleVersion);

        scope.conProc = function(condition) {
            return {toWho: 'rdk', extra: 'good luck...'};
        }

        scope.loadModule = function() {
            // 调用 rdk_module 的方法，详情请参阅这里
            // http://10.9.233.35:8080/doc/#client/controls/module/module.md#loadModule()
            rdk.myModule.loadModule({initData: 'initData...initData...initData...'});
            scope.moduleLoaded = true;
        }

        scope.destroyModule = function() {
            // 调用 rdk_module 的方法，详情请参阅这里
            // http://10.9.233.35:8080/doc/#client/controls/module/module.md#destroyModule()
            rdk.myModule.destroyModule();
            scope.moduleLoaded = false;
        }

        scope.sayHello = function() {
            // 关于 child 属性，请参阅这里
            // http://10.9.233.35:8080/doc/#client/controls/module/module.md#child
            //下面2行代码演示了直接访问 sample_module.js 中的数据和函数
            console.log(rdk.myModule.child.publicData);
            rdk.myModule.child.hello('RDK example');
        }


        //=================== 在这里结束本应用的最后一行代码 ========================
    };

    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    
    require.config({paths:{helper: '/rdk/app/modules/rdk_app_helpers'}});
    imports.push({ url: 'blockUI', alias: 'blockUI' });
    imports.push({ url: 'helper', alias: 'helper' });
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller('RootController', controllerDefination);
        rdk.$ngModule.config(['blockUIConfig', function(blockUIConfig) {
            // blockUI默认只要有ajax请求在进行，就会自动启动，阻止页面响应鼠标事件
            // 使用下面代码可以启用手动模式
            // blockUIConfig.autoBlock=false
            // 然后在需要阻止页面相应鼠标事件的时候，使用下面代码
            // imports.blockUI.start();
            // 在需要继续相应页面相应鼠标事件的时候，使用下面代码
            // imports.blockUI.stop();

            // blockUI的详细用法参考 https://github.com/McNull/angular-block-ui
            blockUIConfig.template = '<div class="block-ui-message-container">'
                + application.loadingImage + '</div>';
        }]);
    };
})();