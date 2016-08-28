require.config({
    paths: {
        "directives": "/doc/tools/doc_js/directives",
    }
});

define('main', ["directives" ], function() {
    angular.module("rdk_app", [ 'rd.demo.Directives' ]);
});
