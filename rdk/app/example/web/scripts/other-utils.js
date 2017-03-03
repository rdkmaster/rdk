//这个文件定义了当前应用的功能函数，可以把常用的函数定义在这里方便复用。
(function() {
    var imports = [
    ];

    define(/*fix-from*/application.import(imports)/*fix-to*/, function() {
        application.initImports(imports, arguments);

        //=================== 在这里开始编写本文件的第一行代码 ========================

    
        function otherFunc() {
            console.log('this is a function defined in other-utils.js');
        }
        
        return {
            otherFunc: otherFunc
        }


        //=================== 在这里结束本文件的最后一行代码 ========================
    });
})();