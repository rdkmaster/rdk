(function() {
    return {
        run: function() {
            log('initializing extension config for vmax....');
            // 项目有需要初始化的额外配置信息可以填写在这里，可以创建新的配置项，也没有覆盖已有的配置项
            // 例如下面这行代码将覆盖默认的数据源的jdbc url
            // java.Config.set(JSON.stringify({db: {default: {url: 'the new jdbc url'}}}));
            // 在rest服务的js代码中，可以通过java.Config.get('db.default.url')来获取对应的配置项
        }
    }

    function readProperties(configFile, key) {
        var FileInputStream = Java.type('java.io.FileInputStream');
        var Properties = Java.type('java.util.Properties');
        var prop = new Properties();
        try {
            prop.load(new FileInputStream(configFile));
        } catch(e) {
            Log.error('read properties file error! file=' + configFile + ', error=' + e);
            return;
        }
        return prop.get(key);
    }
})();

