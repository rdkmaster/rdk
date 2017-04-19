(function() {
    // 这些变量和函数的说明，请参考 rdk/app/example/web/scripts/main.js 的注释
    var imports = [
        'rd.controls.Steps','rd.controls.Button' , 'rd.controls.Icon','rd.controls.Module', 'rd.services.PopupService','css!base/css/demo'
    ];
    var extraModules = [ ];
    var controllerDefination = ['$scope','PopupService','EventService','EventTypes', main];
    function main(scope,PopupService,EventService,EventTypes) {

        var compareWindowOption = {
            effect: 'scale',
            id: 'compare',
            controller: 'CompareWindowCtrl',
            width:"330",
            modal: true,
            title:"Compare Configuration"
        };
        var sampleUrl = 'template/compare.html';
        scope.showCompareWindow = function($event){
            PopupService.popup(sampleUrl, compareWindowOption, compareWindowOption);
        };

    }

    var controllerCompareWindow = ['$scope','PopupService','EventService','EventTypes', compareWindow];
    function compareWindow(scope,PopupService,EventService,EventTypes) {
        var moduleID=scope.$moduleId;
        var moduleIDWidget;
        var compareWindowWidthStep1=scope.width;
        var compareWindowWidthStep2=600;

        //todo:READY事件里关闭弹出框后再弹出时获取widget会报错
        //EventService.register(moduleID, EventTypes.READY, compareWindowReady);
        //function compareWindowReady(){
        //    moduleIDWidget = PopupService.widget(moduleID);
        //}
        function getCompareWindowWidget(){
            return !!moduleIDWidget ? moduleIDWidget : PopupService.widget(moduleID);
        }
        scope.avtiveStepIndex=0;
        scope.steps=[
            {title:"Dimension"},
            {title:"Configuration"}
        ];
        scope.nextStepHandler = function(event,data) {
            moduleIDWidget = getCompareWindowWidget();
            if(scope.avtiveStepIndex>=scope.steps.length){
                return
            }
            scope.avtiveStepIndex++;
            if(scope.avtiveStepIndex==1){
                moduleIDWidget[0].style.width=compareWindowWidthStep2 + "px";
                centerFn(moduleIDWidget[0],compareWindowWidthStep1,compareWindowWidthStep2,1);
                scope.compareDiscretion="Add a window to configure its compare parameters";
            }
            leftChangeAnimate(moduleIDWidget[0]);
        };
        scope.backStepHandler = function(event,data) {
            moduleIDWidget = getCompareWindowWidget();
            scope.avtiveStepIndex--;
            if(scope.avtiveStepIndex==0){
                moduleIDWidget[0].style.width=compareWindowWidthStep1 + "px";
                centerFn(moduleIDWidget[0],compareWindowWidthStep1,compareWindowWidthStep2,-1);
                scope.compareDiscretion="Select a dimension to compare"
            }
            leftChangeAnimate(moduleIDWidget[0]);
        };
        scope.cancelStepHandler = function(event,data) {
            PopupService.removePopup(moduleID);
           // rdk[moduleID].child.destroy();
        };

        scope.compareDiscretion="Select a dimension to compare";

        function centerFn(element,width,targetWidth,direction){
            element.style.left=element.offsetLeft - (targetWidth-width)/2*direction + 'px';
        }
        function leftChangeAnimate(element){
            element.classList.add("left-animate");
            setTimeout(function(){
                element.classList.remove("left-animate");
            },500)
        }

        scope.selectItem = function(event){
            var e=event || window.event;
            var target = e.target || e.srcElement;
            while(!target.classList.contains("step-content-item") ){
                target = target.parentNode;
            }
            if(target.classList.contains("step-content-item")){
                target.classList.add("active-item")
            }
        }
        function _findParentScrollNode(node){
            while (node && !node.classList.contains("rdk-scroll") && node.nodeName!="BODY"){
                node=node.parentNode;
            }
            if(node.nodeName == "BODY"){
                return null
            }
            return node;
        }
    }
    var controllerName = 'DemoController';
    var controllerName2 = 'CompareWindowCtrl';
    //==========================================================================
    //                 从这里开始的代码、注释请不要随意修改
    //==========================================================================
    define(/*fix-from*/application.import(imports)/*fix-to*/, start);
    function start() {
        application.initImports(imports, arguments);
        rdk.$injectDependency(application.getComponents(extraModules, imports));
        rdk.$ngModule.controller(controllerName, controllerDefination);
        rdk.$ngModule.controller(controllerName2, controllerCompareWindow);
    }
})();