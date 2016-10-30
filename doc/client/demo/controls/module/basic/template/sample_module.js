define(['rd.controls.Time'], function() {
    rdk.$injectDependency('rd.controls.Time');
    rdk.$app.controller('SampleModule', ['$scope', 'Utils', 'EventTypes', function(scope, Utils, EventTypes) {
        console.log('SampleModule controller is running..........');

        var thisController = this;
        scope.$on(EventTypes.READY, function() {
            Utils.publish(rdk[scope.$moduleId], thisController);
        });
        this.hello = function(msg) {
            alert('hello ' + msg)
        }

        this.someData= 'ffffffffff'
    }]);
});
