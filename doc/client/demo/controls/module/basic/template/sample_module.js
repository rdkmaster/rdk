define(['rd.controls.Time'], function() {
    rdk.$injectDependency('rd.controls.Time');
    rdk.$app.controller('SampleModule', ['$scope', function(scope) {
        console.log("!!!!!!!!! SampleModule controller !!!!!!!!!!");
        scope.data = 'ffffffff'
    }]);
});
