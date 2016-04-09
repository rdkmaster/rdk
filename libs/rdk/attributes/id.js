var module = angular.module('rd.attributes.id', ['rd.services.EventService']);

module.directive('id', ['EventService', 'Utils', 'Helper', function(EventService, Utils, Helper) {
    function findNGRepeat(node, result) {
        if (!node || !node.localName || node.getAttribute("ngApp")) {
            return;
        }
        if (node.getAttribute("ng-repeat") || node.getAttribute('ng_repeat') || node.getAttribute('x-ng-repeat')) {
            //AngularJS还有其他的写法，后续再补充
            result.push(node);
        }
        return findNGRepeat(node.parentNode, result);
    };

    return {
        restrict:'A',
        link:function(scope, iElement, iAttrs) {
            var ngRepeats = [];
            findNGRepeat(iElement[0], ngRepeats);
            if (ngRepeats.length == 0) {
                //不处于ngRepeat的控制范围就不管了。
                return;
            }

            var pattern = '';
            for(var i = 0; i < ngRepeats.length; i++) {
                //从后往前拼
                pattern = '$index}}' + pattern;
                for (var j = 0; j < i; j++) {
                    pattern = '$parent.' + pattern;
                }
                pattern = '_{{' + pattern;
            }

            var oldId = iElement[0].getAttribute('id');
            var newId = Utils.compile(scope, oldId + pattern);
            iElement[0].setAttribute('id', newId);
            Helper.addSubId(newId);

            Utils.onReady(function() {
                var events = EventService.getRegisteredEvents(oldId);
                angular.forEach(events, function(evtInfo, key) {
                    angular.forEach(evtInfo.cbs, function(cb, key) {
                        if (cb !== Helper.callback) {
                            console.log('registering newid=' + newId + ', eventType='+evtInfo.eventType)
                            EventService.register(newId, evtInfo.eventType, cb);
                        }
                        if (!EventService.hasEvent(oldId, evtInfo.eventType, Helper.callback)) {
                            console.log('registering oldId=' + oldId + ', eventType='+evtInfo.eventType)
                            EventService.register(oldId, evtInfo.eventType, Helper.callback);
                        }
                    });
                });
            });
        }
    };
}]);

module.service('Helper', ['EventService', function(EventService) {
    var newIdList = [];

    this.addSubId = function(id) {
        if (newIdList.indexOf(id) == -1) {
            newIdList.push(id);
        }
    }

    this.callback = function(event, data) {
        angular.forEach(newIdList, function(newId, key) {
            console.log('Helper.callback newId=' + newId + ', eventType='+event.name);
            EventService.broadcast(newId, event.name, data);
        });
    }
}]);
