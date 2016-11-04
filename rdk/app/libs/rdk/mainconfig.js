require.config({
    //下载依赖超时时间，0为不超时
    waitSeconds: 30,
    paths: rdk.$mergePaths({
        "angular": "/rdk/app/libs/angular/angular",
        "angualr-translate": "/rdk/app/libs/angular/angular-translate.min",
        "angular-translate-static": "/rdk/app/libs/angular/angular-translate-loader-static-files.min",
        "ui.codemirror": "/rdk/app/libs/angular/ui-codemirror",
        "ui.router": "/rdk/app/libs/angular/angular-ui-router",
        "blockUI": "/rdk/app/libs/angular/angular-block-ui.min",
        "angular-bootstrap-progressbar":"/rdk/app/libs/angular/angular.bootstap.progressbar",
        "ngProgress":"/rdk/app/libs/angular/ngprogress",

        "codemirror-core": "/rdk/app/libs/codemirror/codemirror",
        "codemirror-css": "/rdk/app/libs/codemirror/codemirror",
        "codemirror-mode": "/rdk/app/libs/codemirror/mode/javascript",

        "ztree": "/rdk/app/libs/ztree/jquery.ztree.all-3.5",
        "echarts": "/rdk/app/libs/echarts/echarts3.min",
        "echarts3": "/rdk/app/libs/echarts/echarts3.min",
        "jquery": "/rdk/app/libs/jquery/jquery-1.11.3.min",
        "jquery-ui": "/rdk/app/libs/jquery-ui/js/jquery-ui.min",
        "bootstrap": "/rdk/app/libs/bootstrap/js/bootstrap",
        "bootstrap-datepicker": "/rdk/app/libs/bootstrap-datepicker/js/bootstrap-datetimepicker",
        "bootstrap-datepicker-i18":"/rdk/app/libs/bootstrap-datepicker/js/bootstrap-datetimepicker.zh-CN",
        "bootstrap-select": "/rdk/app/libs/bootstrap-select/bootstrap-select.min",
        "underscore": "/rdk/app/libs/underscore/underscore-1.8.3",
        "jquery-headfix":"/rdk/app/libs/jquery-headfix/jquery.stickyheader",
        "jquery-freezeheader":"/rdk/app/libs/jquery-freezeheader/jquery.freezeheader",
        "jquery-gesture":"/rdk/app/libs/jquery-ext/jquery.gesture",
        "throttle-debounce" : '/rdk/app/libs/jquery-headfix/jquery.ba-throttle-debounce.min',
        "perfect-scrollbar" : '/rdk/app/libs/perfect-scrollbar/perfect-scrollbar',

        "rd.attributes.ds": "/rdk/app/libs/rdk/attributes/ds",
        "rd.attributes.modal": "/rdk/app/libs/rdk/attributes/modal",
        "rd.attributes.Scroll": "/rdk/app/libs/rdk/attributes/Scroll",
        
        "rd.containers.Accordion": "/rdk/app/libs/rdk/containers/Accordion",
        "rd.containers.Accordions": "/rdk/app/libs/rdk/containers/Accordions",
        "rd.containers.ButtonGroup": "/rdk/app/libs/rdk/containers/ButtonGroup",
        "rd.containers.GraphGroup": "/rdk/app/libs/rdk/containers/GraphGroup",
        "rd.containers.Panel": "/rdk/app/libs/rdk/containers/Panel",

        "rd.containers.Tab": "/rdk/app/libs/rdk/containers/Tab",
        "rd.controls.Alert": "/rdk/app/libs/rdk/controls/Alert",
        "rd.controls.AreaSelect": "/rdk/app/libs/rdk/controls/AreaSelect",
        "rd.controls.BasicSelector": "/rdk/app/libs/rdk/controls/BasicSelector",
        "rd.controls.Bullet": "/rdk/app/libs/rdk/controls/Bullet",
        "rd.controls.Button":"/rdk/app/libs/rdk/controls/Button",
        "rd.controls.ComboSelect": "/rdk/app/libs/rdk/controls/ComboSelect",
        "rd.controls.FoldSelector": "/rdk/app/libs/rdk/controls/FoldSelector",
        "rd.controls.Graph": "/rdk/app/libs/rdk/controls/Graph",
        "rd.controls.Input": "/rdk/app/libs/rdk/controls/Input",
        "rd.controls.Map": "/rdk/app/libs/rdk/controls/Map",
        "rd.controls.Module": "/rdk/app/libs/rdk/controls/Module",
        "rd.controls.PieGraph": "/rdk/app/libs/rdk/controls/PieGraph",
        "rd.controls.ProgressBar": "/rdk/app/libs/rdk/controls/ProgressBar",
        "rd.controls.ScoreIndicator": "/rdk/app/libs/rdk/controls/ScoreIndicator", 
        "rd.controls.Scroller": "/rdk/app/libs/rdk/controls/Scroller",
        "rd.controls.Selector": "/rdk/app/libs/rdk/controls/Selector",
        "rd.controls.SingleIndicator": "/rdk/app/libs/rdk/controls/SingleIndicator",
        "rd.controls.Table": "/rdk/app/libs/rdk/controls/Table",
        "rd.controls.TabSelect": "/rdk/app/libs/rdk/controls/TabSelect",
        "rd.controls.TabSelector": "/rdk/app/libs/rdk/controls/TabSelector",
        "rd.controls.Time": "/rdk/app/libs/rdk/controls/Time",
        "rd.controls.Tree": "/rdk/app/libs/rdk/controls/Tree", 
        
        "rd.services.Alert": "/rdk/app/libs/rdk/services/Alert",
        "rd.services.DataSourceService": "/rdk/app/libs/rdk/services/DataSourceService",
        "rd.services.EventService": "/rdk/app/libs/rdk/services/EventService",
        "rd.services.I18nService": "/rdk/app/libs/rdk/services/I18nService",
        "rd.services.NodeService": "/rdk/app/libs/rdk/services/NodeService",
        "rd.services.Utils": "/rdk/app/libs/rdk/services/Utils",

        "rd.styles.Accordion": "/rdk/app/libs/rdk/containers/assets/rdk-accordion-style",
        "rd.styles.Alert": "/rdk/app/libs/rdk/services/assets/rdk-Alert-style",
        "rd.styles.Area": "/rdk/app/libs/rdk/controls/assets/rdk-area-style",
        "rd.styles.BasicSelector": "/rdk/app/libs/rdk/controls/assets/rdk-basicselector-style",
        "rd.styles.Bootstrap": "/rdk/app/libs/bootstrap/css/bootstrap.min",
        "rd.styles.Bullet": "/rdk/app/libs/rdk/controls/assets/rdk-bullet-style",
        "rd.styles.Button": "/rdk/app/libs/rdk/controls/assets/rdk-button-style",
        "rd.styles.ButtonGroup": "/rdk/app/libs/rdk/containers/assets/rdk-buttongroup-separator-style",
        "rd.styles.ComboSelect": "/rdk/app/libs/rdk/controls/assets/rdk-comboselect-style",
        "rd.styles.FontAwesome": "/rdk/app/libs/font-awesome-4.3.0/css/font-awesome",
        "rd.styles.Graph": "/rdk/app/libs/rdk/controls/assets/rdk-graph-style",
        "rd.styles.Panel": "/rdk/app/libs/rdk/containers/assets/rdk-panel-style",
        "rd.styles.ProgressBar": "/rdk/app/libs/rdk/controls/assets/rdk-progressbar-style",
        "rd.styles.ScoreIndicator": "/rdk/app/libs/rdk/controls/assets/rdk-scoreindicator-style",
        "rd.styles.Scroller": "/rdk/app/libs/rdk/controls/assets/rdk-scroller-style",
        "rd.styles.Scroll": "/rdk/app/libs/rdk/attributes/assets/perfect-scrollbar-style",
        "rd.styles.SingleIndicator": "/rdk/app/libs/rdk/controls/assets/rdk-singleindicator-style",
        "rd.styles.Tab": "/rdk/app/libs/rdk/containers/assets/rdk-tab-style",
        "rd.styles.Table": "/rdk/app/libs/rdk/controls/assets/rdk-table-style",
        "rd.styles.TabSelect": "/rdk/app/libs/rdk/controls/assets/rdk-tabselect-style",
        "rd.styles.TabSelector": "/rdk/app/libs/rdk/controls/assets/rdk-tabselector-style",
        "rd.styles.Time": "/rdk/app/libs/rdk/controls/assets/rdk-time-style",

        "rd.modules.i18n": "/rdk/app/libs/rdk/modules/I18nModule",
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
        "blockUI" :{
            deps : ['angular','css!/rdk/app/libs/angular/angular-block-ui','jquery'],
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
            deps: ['css!/rdk/app/libs/ztree/css/zTreeStyle/zTreeStyle'],
            exports: "ztree",
        },
        "jquery-ui": {
            deps: ["css!/rdk/app/libs/jquery-ui/css/jquery-ui.min"],
            exports: "jquery-ui"
        },
        "bootstrap-datepicker": {
            deps: ["css!/rdk/app/libs/bootstrap-datepicker/css/bootstrap-datetimepicker.min"],
            exports: "bootstrap-datepicker"
        },
        "bootstrap-datepicker-i18":{
            deps: ["bootstrap-datepicker"],
            exports: "bootstrap-datepicker-i18"
        },
        "bootstrap-select": {
            deps: ["css!/rdk/app/libs/bootstrap-select/bootstrap-select.min"],
            exports: "bootstrap-select"
        },
        "bootstrap": {
            deps: ["css!/rdk/app/libs/bootstrap/css/bootstrap.min"],
            exports: "bootstrap"
        },
        "angular-bootstrap-progressbar":{
             deps: ["angular"],
             exports: "angular-bootstrap-progressbar"
        },
        "ngProgress":{
            deps: ["angular","css!/rdk/app/libs/angular/ngprogress"],
            exports: "ngProgress"
        }
    },
    map: {
        '*': {
            'css': '/rdk/app/libs/requirejs/requirecss/css.js',
            'rest': '/rdk/app/libs/requirejs/requirerest/rest.js',
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
