define(['angular'], function() {
    var nodeModule = angular.module("rd.services.NodeService", []);
    nodeModule.service('NodeService', function() {
        var _nodePool = {};
        this.addScope = function(nodeId, scope) {
            _nodePool[nodeId] = scope;
        }
        this.getScope = function(nodeId) {
            return _nodePool[nodeId];
        }
    });

});
