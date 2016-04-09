require.config({
    paths: {
        "directives": "/doc/utils/directives",
    }
});

define(["directives" ], function() {
    angular.module("rdk_app", [ 'rd.demo.Directives' ]);
});
