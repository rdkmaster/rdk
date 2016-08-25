(function(){
    return function(request,script){
        return {
            rowDescriptor: ['最高气温', '最低气温','平均气温'],
            header: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            data: [
                [11, 13, 15, 18, 15, 12, 10],
                [1, 4, 6, 4, 9, 6, 3],
                [6,8.5,10.5,11,12,9,6.5]
            ]
        }
    }
})()