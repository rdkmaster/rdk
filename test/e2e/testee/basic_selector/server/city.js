(function(){
    return function(request,script){
        return {
            header:['cityid','cityname'],
            field:['编号','城市'],
            data:[
              {id:0,label:"南京"},
              {id:1,label:"苏州"},
              {id:2,label:"南通"},
              {id:3,label:"泰州"},
              {id:4,label:"上海"},
              {id:5,label:"广州"}
            ]
        };
    }
})()