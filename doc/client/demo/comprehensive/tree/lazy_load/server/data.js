(function() {
    return function(req) {
        log(req);
        if (req.hasOwnProperty('key')) {
            //返回懒加载的节点
            var key = req.key;
            return [
                {key: key + '1', name: 'name' + key + '1', isParent: true},
                {key: key + '2', name: 'name' + key + '2', isParent: true},
            ]
        } else {
            //返回根节点数据
            return [
                {key: '1', name: 'n1', isParent: true},
                {key: '2', name: 'n2', isParent: true},
                {key: '3', name: 'n3', isParent: true},
                {key: '4', name: 'n4', isParent: true},
            ]
        }
    }
})();



