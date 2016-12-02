(function() {
    return function() {
        var configPath="../rdk/proc/conf/rdk.cfg";
        var properties=file.loadProperty(configPath);
        var theme = properties.getProperty("rdk.theme");
        return {
            theme:theme
        };
    }
})();

