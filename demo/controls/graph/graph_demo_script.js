var app = angular.module("myApp", [
    'rd.attributes.ds',
    'rd.services.DataSourceService',
    'rd.services.EventService',
    'rd.services.NodeService',
    'rd.services.Utils',
    'rd.services.appScope',
    'rd.controls.Graph',
    'ui.codemirror'
]);
app.controller('ctrl', ['$scope', 'DataSourceService', 'EventService',
function(scope, DSService, EventService) {
    


    var scatterDS = DSService.create('service_num', '/demo/scatter');
    scatterDS.initContext = function(context) {
        //注入自己的repeat函数
        context.myRepeat = function(a, b, c, d) {
            return context.repeat(a, b, c,d);
        }
        return context;
    }
    scatterDS.query({});


    var rectDS = DSService.create('objectnum_clttime', '/demo/rectangular')
    rectDS.query({});

    scope.clickHandler = function(event, data) {
        console.log(data);
        console.log(event);
    }

    scope.myDataProcessor = function(dataBuffer) {
        console.log("!!!!! myDataProcessor !!!!!!!")
        return dataBuffer;
    }

    scope.getCode = function(id) {
        if(!scope.ds) return 
        return _json2string(scope.ds.data[id]);
    }

    scope.reisze = function() {
        EventService.broadcast('pie_graph', 'resize', {width: 800});
    }

    scope.json2string = function(data) {
        return _json2string(data);
    }

    function _json2string(json, indent) {
        if (!indent) {
            indent = '';
        }
        var res = '';
        if (angular.isArray(json)) {
            res += '[\n';
            angular.forEach(json, function(value, key) {
                res += indent + '  ' + _json2string(value, indent + '  ') + ',\n' ;
            })
            res = res.substring(0, res.length - 2) + '\n' + indent + ']'
        } else if (angular.isObject(json)) {
            res += '{\n';
            angular.forEach(json, function(value, key) {
                res += indent + '  "' + key + '": ' + _json2string(value, indent + '  ') + ',\n' ;
            })
            res = res.substring(0, res.length - 2) + '\n' + indent + '}'
        } else if (angular.isString(json)) {
            res = '"' + json + '"'
        } else {
            res = json
        }
        return res;
    }

    scope.editorOptions = {
        lineNumbers: true,
        lineWrapping: true,
        mode: 'javascript'
    };
}
]);
