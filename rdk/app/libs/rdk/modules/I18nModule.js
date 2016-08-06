define([], function() {

return {
    init: function(i18nProperties, locale) {
        console.log("rdk i18n module, locale=" + locale);

        String.prototype.st = String.prototype.substitute = substitute;

        try {
            var i18n = i18nProperties[locale];
        } catch (e) {
        }
        if (!i18n) {
            i18n = {};
        }
        i18n.$init = function(scope) { scope.i18n = i18n; }
        i18n.$locale = locale;

        //把多余的国际化信息清理掉，节约点内存
        clear(i18nProperties);

        return i18n;
    }
}

function substitute() {
    var val = this;
    for (var i = 0; i < arguments.length; i++) {
        val = val.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    }
    return val;
};

function clear(i18nProperties) {
    var props = [];
    for (var prop in i18nProperties) {
        props.push(prop);
    }
    for (var prop in props) {
        delete i18nProperties[prop];
    }
}

});