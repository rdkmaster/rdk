//sample_module是在paths中定义的控制器url的别名，放在define函数中就可以让RDK去下载这个文件。
//类似的，rd.controls.Module是rdk_module的别名，由RDK预定义好，
//放在define函数中，好让RDK也去下载rdk_module的定义文件。
define('main', ['rd.controls.Module','searchModule','login','signout','parent','child'], function() {
    //注入'rd.controls.Module'的依赖，在index.html中，只用到了rdk_module控件，
    //因此这里只需要注入对这个控件的依赖就好，模块内部的依赖由定义module的时候去声明
    //这样代码就有更好的内聚性。
    rdk.$injectDependency('rd.controls.Module');

    // 创建主控制器，主控制器所有所有子控制器的共同祖先。
    // 子控制器可以直接访问这个控制器中的方法和属性
    rdk.$app.controller('rdk_ctrl', ['$scope','EventService','EventTypes', '$timeout',
    function(scope,EventService,EventTypes,timeout) {
        EventService.register("firstModule",EventTypes.READY,function(event,data){
            scope.ready=event.name;
        });
        EventService.register('firstModule',EventTypes.LOADING,function(event,data){
            scope.loading=event.name;
        });
        EventService.register('firstModule',EventTypes.DESTROY,function(event,data){
            scope.destroy=event.name;
        });
        //按需加载
        //mymodule是rdk_module节点的id属性值。
        //传递给loadModule函数的第一个参数是该模块的initData，
        //这个对象中的所有属性都会被拷贝到新模块的控制器作用域中
        //如果新模块未定义任何控制器，则initData将被无视。
        scope.loadSearchModule=function(){
            rdk.firstModule.loadModule();
        }
        scope.destroySearchModule=function(){
            rdk.firstModule.destroyModule();
        }
        //
        scope.loadLoginModule=function(){
            rdk.secondModule.loadModule();
        }
        scope.destroyLoginModule=function(){
            rdk.secondModule.destroyModule();
        }
        var hasChild=false;
        function _console(child){
            if(hasChild){
                console.log(child);
                scope.sayhello=child;
            }
            return ;
        }
        scope.loadSignOut=function(){
            rdk.thirdModule.loadModule();
            //因为存在默认1000ms的等待延时，若要使用子模板的属性必须在这个时间之后
            //需要使用ng内置的定时器$timeout
            timeout(function(){
                var obj=rdk.thirdModule.child;
                hasChild=true;
                _console(obj.sayHello());
            },1000);
        }
        scope.destroySignOut=function(){
            rdk.thirdModule.destroyModule();
        }
        //模板嵌套
        scope.loadModule=function(){
            rdk.myModule.loadModule();
        }
        scope.destroyModule=function(){
            rdk.myModule.destroyModule();
        }
    }]);
});
