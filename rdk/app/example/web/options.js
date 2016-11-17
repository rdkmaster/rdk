({
    //node -r D:\Code\rdk\build\minimize-app\mock.js /rdk/app/libs/requirejs/r.js -o options.js

    baseUrl:"../../libs/rdk/",
    name: "rdk",
    out: "scripts/main.min.js",
    mainConfigFile : "../../libs/rdk/mainconfig.js",
    findNestedDependencies : true,
    separateCSS: true,
    paths: {
        base: 'd:\\Codes\\rdk\\rdk\\app\\example\\web\\',
        helper: 'd:\\Codes\\rdk\\rdk\\app\\modules\\rdk_app_helpers',
        main: 'd:\\Codes\\rdk\\rdk\\app\\example\\web\\scripts\\main'
    },
    uglify2: {
        //Example of a specialized config. If you are fine
        //with the default options, no need to specify
        //any of these properties.
        output: {
            beautify: true
        },
        compress: {
            sequences: false,
            global_defs: {
                DEBUG: false
            }
        },
        warnings: true,
        mangle: false
    },
})