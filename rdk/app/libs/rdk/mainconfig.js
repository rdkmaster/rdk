require.config({
    //下载依赖超时时间，0为不超时
    waitSeconds: 30,
    paths: rdk.mergePaths({
        "angular": "../angular/angular",
        "angualr-translate": "../angular/angular-translate.min",
        "angular-translate-static": "../angular/angular-translate-loader-static-files.min",
        "ui.codemirror": "../angular/ui-codemirror",
        "ui.router": "../angular/angular-ui-router",
        "blockUI": "../angular/angular-block-ui.min",
        "angular-bootstrap-progressbar":"../angular/angular.bootstap.progressbar",
        "ngProgress":"../angular/ngprogress",

        "codemirror-core": "../codemirror/codemirror",
        "codemirror-css": "../codemirror/codemirror",
        "codemirror-mode": "../codemirror/mode/javascript",

        "ztree": "../ztree/jquery.ztree.all-3.5",
        "echarts": "../echarts/echarts3.min",
        "echarts3": "../echarts/echarts3.min",
        "jquery": "../jquery/jquery-1.11.3.min",
        "jquery-ui": "../jquery-ui/js/jquery-ui.min",
        "bootstrap": "../bootstrap/js/bootstrap",
        "bootstrap-datepicker": "../bootstrap-datepicker/js/bootstrap-datetimepicker",
        "bootstrap-datepicker-i18":"../bootstrap-datepicker/js/bootstrap-datetimepicker.zh-CN",
        "bootstrap-select": "../bootstrap-select/bootstrap-select.min",
        "underscore": "../underscore/underscore-1.8.3",
        "jquery-headfix":"../jquery-headfix/jquery.stickyheader",
        "jquery-freezeheader":"../jquery-freezeheader/jquery.freezeheader",
        "jquery-gesture":"../jquery-ext/jquery.gesture",
        "throttle-debounce" : '../jquery-headfix/jquery.ba-throttle-debounce.min',

        "rd.attributes.ds": "../rdk/attributes/ds",
        "rd.attributes.modal": "../rdk/attributes/modal",
        "rd.containers.Accordion": "../rdk/containers/Accordion",
        "rd.containers.Accordions": "../rdk/containers/Accordions",
        "rd.containers.GraphGroup": "../rdk/containers/GraphGroup",
		"rd.containers.ButtonGroup": "../rdk/containers/ButtonGroup",
        "rd.containers.Tab": "../rdk/containers/Tab",
        "rd.containers.Panel": "../rdk/containers/Panel",
        "rd.controls.Bullet": "../rdk/controls/Bullet",
        "rd.controls.ComboSelect": "../rdk/controls/ComboSelect",
        "rd.controls.Selector": "../rdk/controls/Selector",
        "rd.controls.FoldSelector": "../rdk/controls/FoldSelector",
        "rd.controls.BasicSelector": "../rdk/controls/BasicSelector",
        "rd.controls.Map": "../rdk/controls/Map",
        "rd.controls.Graph": "../rdk/controls/Graph",
        "rd.controls.Input": "../rdk/controls/Input",
        "rd.controls.PieGraph": "../rdk/controls/PieGraph",
        "rd.controls.Table": "../rdk/controls/Table",
        "rd.controls.TabSelect": "../rdk/controls/TabSelect",
        "rd.controls.TabSelector": "../rdk/controls/TabSelector",
        "rd.controls.Time": "../rdk/controls/Time",
        "rd.controls.Scroller": "../rdk/controls/Scroller",
        "rd.controls.ProgressBar": "../rdk/controls/ProgressBar",
        "rd.controls.Alert": "../rdk/controls/Alert",
        "rd.controls.Tree": "../rdk/controls/Tree",
        "rd.controls.BtnSearch":"../rdk/controls/BtnSearch",
        "rd.controls.SingleIndicator": "../rdk/controls/SingleIndicator",
        "rd.controls.ScoreIndicator": "../rdk/controls/ScoreIndicator",  
		"rd.controls.Separator": "../rdk/controls/Separator",  
        "rd.services.DataSourceService": "../rdk/services/DataSourceService",
        "rd.services.EventService": "../rdk/services/EventService",
        "rd.services.I18nService": "../rdk/services/I18nService",
        "rd.services.NodeService": "../rdk/services/NodeService",
        "rd.services.Utils": "../rdk/services/Utils",
        "rd.services.Alert": "../rdk/services/Alert",

        "rd.styles.Alert": "../rdk/services/assets/rdk-Alert-style",
        "rd.styles.BasicSelector": "../rdk/controls/assets/rdk-basicselector-style",
        "rd.styles.ComboSelect": "../rdk/controls/assets/rdk-comboselect-style",
        "rd.styles.Accordion": "../rdk/containers/assets/rdk-accordion-style",
        "rd.styles.TabSelector": "../rdk/controls/assets/rdk-tabselector-style",
        "rd.styles.TabSelect": "../rdk/controls/assets/rdk-tabselect-style",
        "rd.styles.Graph": "../rdk/controls/assets/rdk-graph-style",
        "rd.styles.Table": "../rdk/controls/assets/rdk-table-style",
        "rd.styles.Time": "../rdk/controls/assets/rdk-time-style",
        "rd.styles.ProgressBar": "../rdk/controls/assets/rdk-progressbar-style",
        "rd.styles.Bullet": "../rdk/controls/assets/rdk-bullet-style",
        "rd.styles.FontAwesome": "../font-awesome-4.3.0/css/font-awesome",
        "rd.styles.Bootstrap": "../bootstrap/css/bootstrap.min",
        "rd.styles.Panel": "../rdk/containers/assets/rdk-panel-style",
		"rd.styles.ButtonGroup": "../rdk/containers/assets/rdk-buttongroup-style",
        "rd.styles.Tab": "../rdk/containers/assets/rdk-tab-style",
        "rd.styles.Scroller": "../rdk/controls/assets/rdk-scroller-style",
        "rd.styles.SingleIndicator": "../rdk/controls/assets/rdk-singleindicator-style",
        "rd.styles.ScoreIndicator": "../rdk/controls/assets/rdk-scoreindicator-style",
        "rd.styles.BtnSearch": "../rdk/controls/assets/rdk-btnsearch-style", 
		"rd.styles.Separator": "../rdk/controls/assets/rdk-separator-style", 
        "rd.modules.i18n": "../rdk/modules/I18nModule",
    }),
    //这个配置是你在引入依赖的时候的包名
    shim: {
        "angular": {
            exports: "angular"
        },

        "angualr-translate" :{
            deps : ['angular'],
            exports: "angualr-translate"
        },

        "angular-translate-static":{
           deps : ['angular','angualr-translate'],
            exports: "angular-translate-static" 
        },
        // "ui-codemirror": {
        //     deps: ['codemirror', 'css!codemirror'],
        //     exports: "ui-codemirror",
        // },
        "blockUI" :{
            deps : ['angular','css!../angular/angular-block-ui','jquery'],
            exports: "blockUI"
        },
		"jquery-gesture":{
            deps : ['jquery'],
            exports: "jquery-gesture"
        },
        "throttle-debounce":{
            deps : ['jquery'],
            exports: "throttle-debounce"
        },
       "jquery-headfix" :{
            deps : ['throttle-debounce'],
            exports: "jquery-headfix"
       },
       "jquery-freezeheader" :{
            deps : ['jquery'],
            exports: "jquery-freezeheader"
       },
        "ztree": {
            deps: ['css!../ztree/css/zTreeStyle/zTreeStyle'],
            exports: "ztree",
        },
        "jquery-ui": {
            deps: ["css!../jquery-ui/css/jquery-ui.min"],
            exports: "jquery-ui"
        },
        "bootstrap-datepicker": {
            deps: ["css!../bootstrap-datepicker/css/bootstrap-datetimepicker.min"],
            exports: "bootstrap-datepicker"
        },
        "bootstrap-datepicker-i18":{
            deps: ["bootstrap-datepicker"],
            exports: "bootstrap-datepicker-i18"
        },
        "bootstrap-select": {
            deps: ["css!../bootstrap-select/bootstrap-select.min"],
            exports: "bootstrap-select"
        },
        "bootstrap": {
            deps: ["css!../bootstrap/css/bootstrap.min"],
            exports: "bootstrap"
        },
        "angular-bootstrap-progressbar":{
             deps: ["angular"],
             exports: "angular-bootstrap-progressbar"
        },
        "ngProgress":{
            deps: ["angular","css!../angular/ngprogress"],
            exports: "ngProgress"
        }
    },
    map: {
        '*': {
            'css': '../requirejs/requirecss/css',
            'rest': '../requirejs/requirerest/rest',
        }
    }
});

/*
 * 自定义基础模块
 */
// define('codemirror', ["ui-codemirror", "codemirror-core", "css!codemirror-css"]);
// RDK核心功能
define('rd.core', [
    'rd.services.DataSourceService', 'rd.services.EventService',
    'rd.services.Utils', 'rd.attributes.ds'
]);
