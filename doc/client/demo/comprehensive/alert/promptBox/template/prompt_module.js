define([], function() {
    //创建一个子控制器
    rdk.$ngModule.controller('SampleModuleController', ['$scope', 'Utils', 'PopupService',function(scope, Utils, PopupService) {
        scope.items=[
            {name: 'Lon.Lat',number:'104.038,66.307'},
            {name: 'Earfcn',number:'99536'},
            {name: 'MRNum',number:'3.234'},
            {name: 'CDTNum',number:'23.456'},
        ]
    }]);
});

