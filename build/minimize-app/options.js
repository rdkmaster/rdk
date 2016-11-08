({
    baseUrl:"D:/Code/rdk/rdk/app/libs/rdk",
    name: "rdk",
    out: "main.min.js",
    mainConfigFile : "D:/Code/rdk/rdk/app/libs/rdk/mainconfig.js",
    findNestedDependencies : true,
    separateCSS: true,
    paths: {
    	base: 'D:/Code/rdk/rdk/app/example/web',
    	main: 'D:/Code/rdk/rdk/app/example/web/scripts/main'
    }
})
//node /rdk/app/libs/requirejs/r.js -o min-options.js