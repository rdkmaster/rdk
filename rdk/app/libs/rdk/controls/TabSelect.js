define(['angular', 'jquery', 'rd.core', 'css!rd.styles.TabSelect',
    'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap'], function(){
    	var tabSelectApp = angular.module('rd.controls.TabSelect',['rd.core']);
    	tabSelectApp.directive('rdkTabSelect', ['Utils', 'BasicSelector', function (Utils, BasicSelector) {
    		return {
    			restrict: 'E',
    			template: 
	    			'<div class="rdk-tabselect-module">\
		    			<rdk_combo_select caption="caption" open="open" child_change="childBasicSelectorChanged">\
		    				<rdk_tab_selector selected_items="selectedItems" track_item_by="{{trackItemBy}}" label_field="labelField" \
                                node_field="nodeField" data="data"></rdk_tab_selector>\
		    			</rdk_combo_select>\
	    			</div>',
    			replace: true,
    			scope:{
                    caption: '=?',
                    open: '=?',

                    nodeField: '=?',
                    labelField: '=?',
                    trackItemBy: '@?',
                    multipleSelect: '=?',
                    searchable: '=?',
                    editable: '=?',

    				data: "=?",
                    selectedItems: "=?",

    				childChange: "&?"
    			},
	            controller: ['$scope', '$attrs', function(scope, attrs) {
                    Utils.onChildChange(scope, scope.childChange(scope));
	            }],
	            compile: function(tEle, tAttrs) {
	                Utils.bindDataSource(tAttrs, 'data');
	                return {
	                    post: _link
	                }
	            }
    		};

    		function _link(scope, iEle, iAttrs, ctrl, transclude) {

                _init();

                function _init() {
                    scope.caption = Utils.getValue(scope.caption, iAttrs.caption, '标题');
                    scope.open = Utils.isTrue(iAttrs.open, false);

                    scope.nodeField = Utils.getValue(scope.nodeField, iAttrs.nodeField, 'node');               
                    scope.labelField = Utils.getValue(scope.labelField, iAttrs.labelField, 'label');
                    scope.trackItemBy = Utils.getValue(scope.trackItemBy, iAttrs.trackItemBy, scope.labelField);
                    scope.multipleSelect = Utils.isTrue(iAttrs.multipleSelect, true);
                    scope.searchable = Utils.isTrue(iAttrs.searchable, false);
                    scope.editable = Utils.isTrue(iAttrs.editable, false);
                }

                scope.childBasicSelectorChanged = function(data, context) {
                    return BasicSelector.selected2string(data);
                };
    		}
    	}])
    });