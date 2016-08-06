define(['angualr-translate','angular-translate-static'], function() {
    var i18nModule = angular.module("rd.services.I18nService", ['pascalprecht.translate']);

    i18nModule.provider('I18n', ['$translateProvider', function($translateProvider) {
        this.init = function(prefix, defaultLanguage) {
            $translateProvider.useStaticFilesLoader({
                prefix: prefix,
                suffix: '.properties',
                $http: {
                    transformResponse: function(data, headersGetter, status) {
                        return simpleJavaPropertiesReader(data.split('\n'));
                    }
                }
            });
            var simpleJavaPropertiesReader = function(lines) {
                var result = {};
                var patterns = [
                    /^\s*([^=:\s]+)\s*[:|=]\s*(.*)\s*$/
                ];
                var quotePattern = /^"(.*)"$/;
                for (var i = 0; i < lines.length; i++) {
                    for (var j = 0; j < patterns.length; j++) {
                        var match = lines[i].match(patterns[j]);
                        if (match && match[0] && match[0].length > 0) {
                            var key = match[1],
                                value = match[2];
                            if (value && value.length > 0) {
                                var quoteMatch = value.match(quotePattern);
                                if (quoteMatch && quoteMatch[0] && quoteMatch[0].length) {
                                    value = quoteMatch[1];
                                }
                            }
                            result[key] = value;
                            break;
                        }
                    }
                }
                return result;
            };

            $translateProvider.useSanitizeValueStrategy('escaped');
            $translateProvider.preferredLanguage(defaultLanguage);
        }

        this.$get = function() {
            var service = {

            };
            return service;
        }
    }]);
});
