(function() {
    //在这里配置所有需要下载的文件，只有这个列表中的项目才会被浏览器下载
    //隆重推荐把需要下载的文件一一配置在这里，这样RDK才可以完成自动压缩和合并
    //写在页面的head中的文件无法被自动压缩和合并，从而导致页面打开变慢
    var downloadDependency = [
        //所有路径中的 base 都会被替换成本页面html文件所在路径
        //注意：不采用绝对路径的条目不能加 .js 扩展名，采用绝对路径的条目必须加扩展名
        'base/template/sample_module',
        //带有 alias 属性的条目，可以通过 ctx.utils 来访问
        { url: 'base/scripts/utils', alias: 'utils' },
        //css类型的文件需要加 css! 的前缀，扩展名是否需要添加的规则和 js 文件一致
        'css!base/css/style.css',
        //这类 rd. 开头的条目是RDK预定义好的控件路径别名
        'rd.controls.Module', 
    ];

    //在这里把页面需要用到的使用控件的别名一一列举出来
    //未列举出别名的控件会由于浏览器不识别而无法正常工作
    var requiredComponents = [
        //RDK所有控件的别名与它们的路径别名相同
        'rd.controls.Module'
    ];

    //controllerDefination 定义了本应用的根控制器，它是所有子控制器的祖先
    //这个数组遵循Angular依赖注入的规则，简单的讲，把Angular和RDK提供的服务名填在数组中
    //然后在main函数的参数列表中，按照顺序填上一个同名的形参就可以使用这些服务了
    //详细的依赖注入规则解释和例子，请参考这里 http://docs.ngnice.com/guide/di
    var controllerDefination = ['$scope', 'DataSourceService', 'EventService', main];
    function main(scope, DataSourceService, EventService) {
        //RDK内部初始化，一般不需要修改，也请保持这行代码在main函数的第一行
        application.init(scope, DataSourceService);

        //=================== 在这里开始写本应用的第一行代码 ========================

        ctx.utils.hello('RDK example');

        scope.loadModule = function() {
            rdk.myModule.loadModule({initData: 'initData...initData...initData...initData...'});
            scope.moduleLoaded = true;
        }

        scope.destroyModule = function() {
            rdk.myModule.destroyModule();
            scope.moduleLoaded = false;
        }

        scope.sayHello = function() {
            console.log(rdk.myModule.child.publicData);
            rdk.myModule.child.hello('RDK example v2.0');
        }
        //=================== 在这里结束本应用的最后一行代码 ========================
    };

    //==========================================================================
    //                   从这里开始的代码请不要随意修改
    //==========================================================================
    
    window.application = { };
    application.init = function(scope, ds) {
        ctx.i18n.$init(scope);
        ctx.helpers.initDataSourceService(ds);
    };
    application.getBase = function() {
        try {
            if (!!global && !!global.base) {
                return global.base;
            }
        } catch(e) {
        }
        var match = location.pathname.match(/^(.*)\//);
        return match[1];
    }
    application.getDownloads = function(downloads) {
        var list = [];
        for (var i = 0; i < downloads.length; i++) {
            var item = downloads[i];
            var url;
            if (item.hasOwnProperty('url')) {
                url = item.url;
                item.index = i;
            } else {
                url = item;
            }
            list.push(url);
        }
        return list;
    }
    application.initContext = function(ctx, values, downloads) {
        for (var i = 0; i < downloads.length; i++) {
            var item = downloads[i];
            if (!item.hasOwnProperty('url')) {
                continue;
            }
            ctx[item.alias] = values[item.index];
        }
    }

    var ctx = {};
    require.config({ paths: { "base": application.getBase() }});
    downloadDependency.push({ url: '/rdk/app/modules/rdk_app_helpers.js', alias: 'helpers' });
    downloadDependency.push({ url: 'base/scripts/i18n', alias: 'i18n' });
    define('main', application.getDownloads(downloadDependency), start);
    function start() {
        application.initContext(ctx, arguments, downloadDependency);
        rdk.$injectDependency(requiredComponents);
        rdk.$app.controller('RootController', controllerDefination);
    };
})();