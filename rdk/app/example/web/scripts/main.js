function Application() {
    //在这里配置所有需要下载的文件，只有这个列表中的项目才会被浏览器下载
    //隆重推荐把需要下载的文件一一配置在这里，这样RDK才可以完成自动压缩和合并
    //写在页面的head中的文件无法被自动压缩和合并，从而导致页面打开变慢
    this.downloadDependency = [
        //所有路径中的 base 都会被替换成本页面html文件所在路径
        //注意这里的条目都不需要加 .js 扩展名
        'base/template/sample_module',
        //css类型的文件需要加 css! 的前缀
        'css!base/css/style.css',
        //这类 rd. 开头的条目是RDK预定义好的控件路径别名
        'rd.controls.Module', 
    ];

    //在这里把页面需要用到的使用控件的别名一一列举出来
    //未列举出别名的控件会由于浏览器不识别而无法正常工作
    //注：RDK所有控件的别名与它们的路径别名相同
    this.requiredComponents = ['rd.controls.Module'];

    //this.controllerDefination 定义了本应用的根控制器，它是所有子控制器的祖先
    //这个数组遵循Angular的依赖注入的规则，简单的讲，把Angular和RDK提供的服务名字填在这个数组中
    //然后在main函数的参数列表中，按照顺序填上一个同名的形参就可以使用这些服务了
    //详细的依赖注入规则解释和例子，请参考这里 http://docs.ngnice.com/guide/di
    this.controllerDefination = ['$scope', 'DataSourceService', main];
    function main(scope, DataSourceService) {
        //RDK内部初始化，一般不需要修改，也请保持这行代码在main函数的第一行
        application.init(scope, DataSourceService);

        //=================== 在这里开始写本应用的第一行代码 ========================

        scope.data = 'defined in the root controller';

        scope.hello = function() {
            //访问SampleModule中的数据。
            //每个模块都有一个child属性，值是当前模块所绑定的控制器一个实例。
            //如果当前模块未绑定控制器，则child属性的值为null
            console.log(rdk.module1.child.someData);

            //调用SampleModule中的方法
            rdk.module1.child.hello('module1');
        }
        
        //=================== 在这里结束本应用的最后一行代码 ========================
    };
};

//==========================================================================
//                   从这里开始的代码请不要随意修改
//==========================================================================
(window || global).application = new Application();
application.base = (function() {
    try {
        if (!!global && !!global.base) {
            return global.base;
        }
    } catch(e) {
    }
    var match = location.pathname.match(/^(.*)\//);
    return match[1];
})();
application.init = function(scope, ds) {
    this.i18n.$init(scope);
    this.helpers.initDataSourceService(ds);
};
application.getDownloads = function() {
    //我们需要引用这些下载条目返回的对象，所以需要将他们放在下载条目列表的前部
    //如果需要新增有返回值的下载条目，则请追加到数组的末尾，并修改start函数
    var extraItems = [
        '/rdk/app/modules/rdk_app_helpers.js',
        'base/scripts/i18n',
        'base/scripts/utils'
    ];
    return extraItems.concat(application.downloadDependency);
}

require.config({
    paths: { "base": application.base }
});
define('main', application.getDownloads(), start);
//start 函数的参数列表对应 extraItems 的下载条目的返回值
function start(helpers, i18n, utils) {
    application.helpers = helpers;
    application.i18n = i18n;
    application.utils = utils;
    rdk.$injectDependency(application.requiredComponents);
    rdk.$app.controller('RootController', application.controllerDefination);
};
