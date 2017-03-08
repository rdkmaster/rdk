define(['angular', 'jquery', 'rd.core', 'css!rd.styles.ListSelector',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap','rd.attributes.Scroll'
], function() {
    var listSelectorApp = angular.module('rd.controls.ListSelector', ['rd.core','rd.attributes.Scroll']);
    listSelectorApp.directive('rdkListSelector', ['EventService', 'Utils', 'EventTypes', '$timeout', '$compile',
        function(EventService, Utils, EventTypes, $timeout, $compile) {
            var scopeDefine={
                data: '=',
                caption:'@?',
                labelField: '=?',
                selectedItems: '=?',
                icon:'@?',
                defaultOption:"@?",
                size:"@?"
            };
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="rdk-list-selector-module">\
                                <div class="rdk-dropdown-toggle" ng-click="toggle($event)" tabindex="0" ng-class="{\'open\':openStatus}">\
                                    <span ng-if="!!caption">{{caption}}</span>\
                                    <p class="select-input">{{inputVal}}</p>\
                                    <i ng-if="icon!==\'false\'" ng-class="icon" class="rdk-dropdown-icon" aria-hidden="true"></i>\
                                    <div class="rdk-selector-content rdk-scroll" ng-show="openStatus">\
                                        <ul rdk-scroll>\
                                            <li ng-if="!!defaultOption" ng-click="selectItem(defaultOption)"><a ng-class="{selected:activeSelectedItem(defaultOption)}">{{defaultOption}}</a></li>\
                                            <li ng-repeat="item in data track by $index" on-finish-render="listSelectorRender"\
                                                ng-click="selectItem(item)">\
                                                <a ng-class="{selected:activeSelectedItem(item)}">{{showData(item)}}</a>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            </div>',
                scope: scopeDefine,
                link: _link

            };
            function _link(scope, iEle, iAttrs, ctrl, transclude) {
                scope.icon = Utils.getValue(scope.icon, iAttrs.icon, "fa fa-angle-down");
                scope.size = Utils.getValue(scope.size, iAttrs.size, 0);
                scope.selectedItems =Utils.getValue(scope.selectedItems, []);
                scope.inputVal = Utils.getValue(scope.defaultOption, iAttrs.defaultOption, null);
                scope.$watch("selectedItems",function(newVal){
                    scope.inputVal = _handleDate(newVal[0]);
                },true);
                if(!!scope.size){
                    scope.$watch("data",_setHeight);
                }
                scope.$watch('openStatus', function(newVal) {
                    $(document).unbind('mouseup', _hideDropdown);
                    if (newVal) {
                        $(document).mouseup(_hideDropdown);
                    }
                }, false);
                scope.selectItem = function(item){
                    scope.inputVal = _handleDate(item);
                    scope.selectedItems[0] = item;
                };
                scope.toggle = function(){
                    scope.openStatus =! scope.openStatus;
                };
                scope.showData = _handleDate;
                scope.activeSelectedItem = function(item){
                    return angular.equals(scope.selectedItems[0],item);
                };
                function _handleDate(item){
                    if (angular.isObject(item)){
                        return item[iAttrs.labelField]
                    }
                    return item
                }
                function _setHeight(){
                    var contentDom = iEle[0].querySelector(".rdk-selector-content");
                    var itemsUlDom = contentDom.querySelector("ul");
                    var itemsLlDom = contentDom.querySelector("li");
                    var itemHeight = Utils.getSize(contentDom,itemsLlDom).height;
                    var size = parseInt(scope.size);
                    if(!angular.isNumber(size)){
                        throw "size property must be an integer!"
                    }
                    var calculHeight =itemHeight*size;
                    var totalHeight = scope.data.length * itemHeight;
                    if(totalHeight > calculHeight){
                        itemsUlDom.style.height = calculHeight + 'px'
                    }else{
                        itemsUlDom.style.height = totalHeight + 'px'
                    }
                }
                function _hideDropdown(e){
                    if(!$(iEle).is(e.target) && $(iEle).has(e.target).length === 0) {
                        $timeout(function() {
                            scope.openStatus = false;
                        }, 0)
                    }
                }
            }
        }
    ]);
});
