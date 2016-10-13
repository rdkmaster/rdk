angular.module('App',[]).controller("myCtr",function($scope){
    scope=$scope;
    //
    scope.rdkMembers=['陈旭','顾姗','徐荔','刘伟','杜峰','高鹏','孙国辛','何建洋','黄海宁'];
    scope.lastRdkMembers=['陈旭','顾姗','徐荔','刘伟','杜峰','高鹏'];
    //拖放
    scope.allowDrop=function(e){
        e.preventDefault();
    }
    scope.drop=function(e){
        e.preventDefault();
        var data=e.dataTransfer.getData("Text");
        e.target.appendChild(document.getElementById(data));
    }
    scope.drag=function(e){
        e.dataTransfer.setData("Text",e.target.id);
    }
})