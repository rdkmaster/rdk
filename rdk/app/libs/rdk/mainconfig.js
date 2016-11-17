require.config({
    //下载依赖超时时间，0为不超时
    waitSeconds: 30,
    paths: {
        "angular": "../../libs/angular/angular",
        "angualr-translate": "../../libs/angular/angular-translate.min",
        "angular-translate-static": "../../libs/angular/angular-translate-loader-static-files.min",
        "ui.codemirror": "../../libs/angular/ui-codemirror",
        "ui.router": "../../libs/angular/angular-ui-router",
        "blockUI": "../../libs/angular/angular-block-ui.min",
        "angular-bootstrap-progressbar":"../../libs/angular/angular.bootstap.progressbar",
        "ngProgress":"../../libs/angular/ngprogress",

        "codemirror-core": "../../libs/codemirror/codemirror",
        "codemirror-css": "../../libs/codemirror/codemirror",
        "codemirror-mode": "../../libs/codemirror/mode/javascript",

        "ztree": "../../libs/ztree/jquery.ztree.all-3.5",
        "echarts": "../../libs/echarts/echarts3.min",
        "echarts3": "../../libs/echarts/echarts3.min",
        "jquery": "../../libs/jquery/jquery-1.11.3.min",
        "jquery-ui": "../../libs/jquery-ui/js/jquery-ui.min",
        "bootstrap": "../../libs/bootstrap/js/bootstrap",
        "bootstrap-datepicker": "../../libs/bootstrap-datepicker/js/bootstrap-datetimepicker",
        "bootstrap-datepicker-i18":"../../libs/bootstrap-datepicker/js/bootstrap-datetimepicker.zh-CN",
        "bootstrap-select": "../../libs/bootstrap-select/bootstrap-select.min",
        "underscore": "../../libs/underscore/underscore-1.8.3",
        "jquery-headfix":"../../libs/jquery-headfix/jquery.stickyheader",
        "jquery-freezeheader":"../../libs/jquery-freezeheader/jquery.freezeheader",
        "jquery-gesture":"../../libs/jquery-ext/jquery.gesture",
        "throttle-debounce" : '../../libs/jquery-headfix/jquery.ba-throttle-debounce.min',
        "perfect-scrollbar" : '../../libs/perfect-scrollbar/perfect-scrollbar',

        "rd.attributes.ds": "../../libs/rdk/attributes/ds",
        "rd.attributes.modal": "../../libs/rdk/attributes/modal",
        "rd.attributes.Scroll": "../../libs/rdk/attributes/Scroll",
        
        "rd.containers.Accordion": "../../libs/rdk/containers/Accordion",
        "rd.containers.Accordions": "../../libs/rdk/containers/Accordions",
        "rd.containers.ButtonGroup": "../../libs/rdk/containers/ButtonGroup",
        "rd.containers.GraphGroup": "../../libs/rdk/containers/GraphGroup",
        "rd.containers.Panel": "../../libs/rdk/containers/Panel",

        "rd.containers.Tab": "../../libs/rdk/containers/Tab",
        "rd.controls.Alert": "../../libs/rdk/controls/Alert",
        "rd.controls.AreaSelect": "../../libs/rdk/controls/AreaSelect",
        "rd.controls.BasicSelector": "../../libs/rdk/controls/BasicSelector",
        "rd.controls.Bullet": "../../libs/rdk/controls/Bullet",
        "rd.controls.Button":"../../libs/rdk/controls/Button",
        "rd.controls.ComboSelect": "../../libs/rdk/controls/ComboSelect",
        "rd.controls.FoldSelector": "../../libs/rdk/controls/FoldSelector",
        "rd.controls.Graph": "../../libs/rdk/controls/Graph",
        "rd.controls.Input": "../../libs/rdk/controls/Input",
        "rd.controls.Map": "../../libs/rdk/controls/Map",
        "rd.controls.Module": "../../libs/rdk/controls/Module",
        "rd.controls.PieGraph": "../../libs/rdk/controls/PieGraph",
        "rd.controls.ProgressBar": "../../libs/rdk/controls/ProgressBar",
        "rd.controls.ScoreIndicator": "../../libs/rdk/controls/ScoreIndicator", 
        "rd.controls.Scroller": "../../libs/rdk/controls/Scroller",
        "rd.controls.Selector": "../../libs/rdk/controls/Selector",
        "rd.controls.SingleIndicator": "../../libs/rdk/controls/SingleIndicator",
        "rd.controls.Table": "../../libs/rdk/controls/Table",
        "rd.controls.TabSelect": "../../libs/rdk/controls/TabSelect",
        "rd.controls.TabSelector": "../../libs/rdk/controls/TabSelector",
        "rd.controls.Time": "../../libs/rdk/controls/Time",
        "rd.controls.Tree": "../../libs/rdk/controls/Tree", 
        
        "rd.services.Alert": "../../libs/rdk/services/Alert",
        "rd.services.DataSourceService": "../../libs/rdk/services/DataSourceService",
        "rd.services.EventService": "../../libs/rdk/services/EventService",
        "rd.services.I18nService": "../../libs/rdk/services/I18nService",
        "rd.services.NodeService": "../../libs/rdk/services/NodeService",
        "rd.services.Utils": "../../libs/rdk/services/Utils",

        "rd.styles.Accordion": "../../libs/rdk/containers/assets/rdk-accordion-style",
        "rd.styles.Alert": "../../libs/rdk/services/assets/rdk-Alert-style",
        "rd.styles.Area": "../../libs/rdk/controls/assets/rdk-area-style",
        "rd.styles.BasicSelector": "../../libs/rdk/controls/assets/rdk-basicselector-style",
        "rd.styles.Bootstrap": "../../libs/bootstrap/css/bootstrap.min",
        "rd.styles.Bullet": "../../libs/rdk/controls/assets/rdk-bullet-style",
        "rd.styles.Button": "../../libs/rdk/controls/assets/rdk-button-style",
        "rd.styles.ButtonGroup": "../../libs/rdk/containers/assets/rdk-buttongroup-separator-style",
        "rd.styles.ComboSelect": "../../libs/rdk/controls/assets/rdk-comboselect-style",
        "rd.styles.FontAwesome": "../../libs/font-awesome-4.3.0/css/font-awesome",
        "rd.styles.Graph": "../../libs/rdk/controls/assets/rdk-graph-style",
        "rd.styles.Panel": "../../libs/rdk/containers/assets/rdk-panel-style",
        "rd.styles.ProgressBar": "../../libs/rdk/controls/assets/rdk-progressbar-style",
        "rd.styles.ScoreIndicator": "../../libs/rdk/controls/assets/rdk-scoreindicator-style",
        "rd.styles.Scroller": "../../libs/rdk/controls/assets/rdk-scroller-style",
        "rd.styles.Scroll": "../../libs/rdk/attributes/assets/perfect-scrollbar-style",
        "rd.styles.SingleIndicator": "../../libs/rdk/controls/assets/rdk-singleindicator-style",
        "rd.styles.Tab": "../../libs/rdk/containers/assets/rdk-tab-style",
        "rd.styles.Table": "../../libs/rdk/controls/assets/rdk-table-style",
        "rd.styles.TabSelect": "../../libs/rdk/controls/assets/rdk-tabselect-style",
        "rd.styles.TabSelector": "../../libs/rdk/controls/assets/rdk-tabselector-style",
        "rd.styles.Time": "../../libs/rdk/controls/assets/rdk-time-style",

        "rd.modules.i18n": "../../libs/rdk/modules/I18nModule",
    },
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
        "blockUI" :{
            deps : ['angular','css!../../libs/angular/angular-block-ui','jquery'],
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
            deps: ['css!../../libs/ztree/css/zTreeStyle/zTreeStyle'],
            exports: "ztree",
        },
        "jquery-ui": {
            deps: ["css!../../libs/jquery-ui/css/jquery-ui.min"],
            exports: "jquery-ui"
        },
        "bootstrap-datepicker": {
            deps: ["css!../../libs/bootstrap-datepicker/css/bootstrap-datetimepicker.min"],
            exports: "bootstrap-datepicker"
        },
        "bootstrap-datepicker-i18":{
            deps: ["bootstrap-datepicker"],
            exports: "bootstrap-datepicker-i18"
        },
        "bootstrap-select": {
            deps: ["css!../../libs/bootstrap-select/bootstrap-select.min"],
            exports: "bootstrap-select"
        },
        "bootstrap": {
            deps: ["css!../../libs/bootstrap/css/bootstrap.min"],
            exports: "bootstrap"
        },
        "angular-bootstrap-progressbar":{
             deps: ["angular"],
             exports: "angular-bootstrap-progressbar"
        },
        "ngProgress":{
            deps: ["angular","css!../../libs/angular/ngprogress"],
            exports: "ngProgress"
        }
    },
    map: {
        '*': {
            'css': 'requirejs-plugins/requirecss/css',
            'rest': 'requirejs-plugins/requirerest/rest',
        }
    }
});

/*
 * 自定义基础模块
 */
// RDK核心功能
define('rd.core', [
    'rd.services.DataSourceService', 'rd.services.EventService',
    'rd.services.Utils', 'rd.attributes.ds'
]);
