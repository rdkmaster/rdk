require.config({
    paths: {
        //给sample_module的控制器url定义一个别名
        "sample_module": '/doc/client/demo/common/tooltip/url/scripts/template/sample_module'
    }
});

define('main', ['rd.attributes.Tooltip', 'sample_module'], function() {

    rdk.$injectDependency(['rd.attributes.Tooltip']);

    rdk.$ngModule.controller('myCtrl', ['$scope', 'Utils', '$compile', 'EventService', function(scope, Utils, $compile, EventService) {
         scope.content = '/doc/client/demo/common/tooltip/url/scripts/template/sample_module.html';

         EventService.register('test4confirm', 'yes', function(){
         	alert('yes!');
         });

         EventService.register('test4confirm', 'no', function(){
         	alert('no!');
         });
    }]);
});

