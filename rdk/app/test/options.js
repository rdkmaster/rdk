({
    //node -r D:\Code\rdk\build\minimize-app\mock.js /rdk/app/libs/requirejs/r.js -o options.js

    baseUrl:"d:/Codes/rdk/rdk/app/test/web/scripts/",
    name: "main1",
    out: "main.min.js",
    mainConfigFile : "D:/Codes/rdk/rdk/app/libs/rdk/system/mainconfig.js",
    findNestedDependencies : true,
    separateCSS: true,
})