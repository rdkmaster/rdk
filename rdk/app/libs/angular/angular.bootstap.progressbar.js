//"version": "2.0.2-SNAPSHOT",
angular.module('ui.bootstrap.progressbar', [])
.constant('uibProgressConfig', {
    animate: true,
    max: 100
})
.run(["$templateCache", function($templateCache) {
    $templateCache.put("uib/template/progressbar/bar.html",
    "<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" ng-transclude></div>\n" +
    "");
    $templateCache.put("uib/template/progressbar/progress.html",
    "<div class=\"progress\" ng-transclude aria-labelledby=\"{{::title}}\"></div>");
   $templateCache.put("uib/template/progressbar/progressbar.html",
    "<div class=\"progress\">\n" +
    "  <div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: (percent < 100 ? percent : 100) + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" aria-labelledby=\"{{::title}}\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}])
.controller('UibProgressController', ['$scope', '$attrs', 'uibProgressConfig', function($scope, $attrs, progressConfig) {
    var self = this,
        animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

    this.bars = [];
    $scope.max = getMaxOrDefault();

    this.addBar = function(bar, element, attrs) {
        if (!animate) {
            element.css({ 'transition': 'none' });
        }

        this.bars.push(bar);

        bar.max = getMaxOrDefault();
        bar.title = attrs && angular.isDefined(attrs.title) ? attrs.title : 'progressbar';

        bar.$watch('value', function(value) {
            bar.recalculatePercentage();
        });

        bar.recalculatePercentage = function() {
            var totalPercentage = self.bars.reduce(function(total, bar) {
                bar.percent = +(100 * bar.value / bar.max).toFixed(2);
                return total + bar.percent;
            }, 0);

            if (totalPercentage > 100) {
                bar.percent -= totalPercentage - 100;
            }
        };

        bar.$on('$destroy', function() {
            element = null;
            self.removeBar(bar);
        });
    };

    this.removeBar = function(bar) {
        this.bars.splice(this.bars.indexOf(bar), 1);
        this.bars.forEach(function(bar) {
            bar.recalculatePercentage();
        });
    };

    $scope.$watch('maxParam', function(maxParam) {
        self.bars.forEach(function(bar) {
            bar.max = getMaxOrDefault();
            bar.recalculatePercentage();
        });
    });

    function getMaxOrDefault() {
        return angular.isDefined($scope.maxParam) ? $scope.maxParam : progressConfig.max;
    }
}])

.directive('uibProgress', function() {
    return {
        replace: true,
        transclude: true,
        controller: 'UibProgressController',
        require: 'uibProgress',
        scope: {
            maxParam: '=?max'
        },
        templateUrl: 'uib/template/progressbar/progress.html'
    };
})

.directive('uibBar', function() {
    return {
        replace: true,
        transclude: true,
        require: '^uibProgress',
        scope: {
            value: '=',
            type: '@'
        },
        templateUrl: 'uib/template/progressbar/bar.html',
        link: function(scope, element, attrs, progressCtrl) {
            progressCtrl.addBar(scope, element, attrs);
        }
    };
})

.directive('uibProgressbar', function() {
    return {
        replace: true,
        transclude: true,
        controller: 'UibProgressController',
        scope: {
            value: '=',
            maxParam: '=?max',
            type: '@'
        },
        templateUrl: 'uib/template/progressbar/progressbar.html',
        link: function(scope, element, attrs, progressCtrl) {
            progressCtrl.addBar(scope, angular.element(element.children()[0]), { title: attrs.title });
        }
    };
});
