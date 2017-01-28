(function() {
    return function(req) {
        return {
            "rowDescriptor": ["最高气温", "最低气温"],
            "header": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            "data": [
                [11, 13, 15, 18, 15, 12, 10],
                [1, 4, 6, 4, 9, 6, 3],
            ],
            "pieName":['访问来源'],
            "source": [[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]]
        }
    }
})();



