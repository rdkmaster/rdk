
//sample_module是在paths中定义的控制器url的别名，放在define函数中就可以让RDK去下载这个文件。
//类似的，rd.controls.Module是rdk_module的别名，由RDK预定义好，
//放在define函数中，好让RDK也去下载rdk_module的定义文件。
define('main', ['rd.controls.Editor'], function() {
    //注入'rd.controls.Module'的依赖，在index.html中，只用到了rdk_module控件，
    //因此这里只需要注入对这个控件的依赖就好，模块内部的依赖由定义module的时候去声明
    //这样代码就有更好的内聚性。
    rdk.$injectDependency(['rd.controls.Editor']);

    // 创建主控制器，主控制器所有所有子控制器的共同祖先。
    // 子控制器可以直接访问这个控制器中的方法和属性
    rdk.$ngModule.controller('rdk_ctrl', ['$scope', function(scope) {
        // 注意到module2在定义的时候，没有给initData属性，因此module2在访问data属性的时候，
        // 实际上是使用了这里的data属性。这是因为这个data属性被定义在所有module的父控制器中。
        // 相反的，module1由于通过initData自定义了一个data属性，RDK会优先读取自子控制器中的
        // data属性的值。
        // 这个过程和OOP的继承非常类似。
        scope.code = '\
<html>\n\
    <head>\n\
        <link rel="stylesheet" href="mystyle.css">\n\
        <script src="myscript.js"></script>\n\
    </head>\n\
    <type>\n\
    .body {\n\
        font-size: 14px;\n\
    }\n\
    </type>\n\
    <script>\n\
        function func(a, b, c) {\n\
            alert(a, b, c);\n\
        }\n\
    </script>\n\
</html>';

    }]);
});
