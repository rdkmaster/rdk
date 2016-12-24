({
    baseUrl:"../../libs/rdk/",
    name: "rdk",
    out: "main.min.js",
    mainConfigFile : "../../libs/rdk/mainconfig.js",
    findNestedDependencies : true,
    separateCSS: true,
    paths: {
        base: 'd:\\Code\\rdk\\rdk\\app\\example\\web\\',
        helper: 'd:\\Code\\rdk\\rdk\\app\\modules\\rdk_app_helpers',
        main: 'd:\\Code\\rdk\\rdk\\app\\example\\web\\scripts\\main'
    },

    //放开这些注释，那将只合并文件而不压缩，可通过这个方法来调试合并后但未被压缩的代码
    // uglify2: {
    //     output: {
    //         beautify: true
    //     },
    //     compress: {
    //         sequences: false,
    //         global_defs: {
    //             DEBUG: false
    //         }
    //     },
    //     warnings: true,
    //     mangle: false
    // },
})