require.config({
    //下载依赖超时时间，0为不超时
    waitSeconds: 30,
    paths: {
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
        "ztree-exhide": "../ztree/jquery.ztree.exhide-3.5.min",
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
        "perfect-scrollbar" : '../perfect-scrollbar/perfect-scrollbar',

        "rd.attributes.ds": "../rdk/attributes/ds",
        "rd.attributes.modal": "../rdk/attributes/modal",
        "rd.attributes.Scroll": "../rdk/attributes/Scroll",
        
        "rd.containers.Accordion": "../rdk/containers/Accordion",
        "rd.containers.Accordions": "../rdk/containers/Accordions",
        "rd.containers.ButtonGroup": "../rdk/containers/ButtonGroup",
        "rd.containers.GraphGroup": "../rdk/containers/GraphGroup",
        "rd.containers.Panel": "../rdk/containers/Panel",

        "rd.containers.Tab": "../rdk/containers/Tab",
        "rd.controls.Alert": "../rdk/controls/Alert",
        "rd.controls.AreaSelect": "../rdk/controls/AreaSelect",
        "rd.controls.BasicSelector": "../rdk/controls/BasicSelector",
        "rd.controls.Bullet": "../rdk/controls/Bullet",
        "rd.controls.Button":"../rdk/controls/Button",
        "rd.controls.ComboSelect": "../rdk/controls/ComboSelect",
        "rd.controls.FoldSelector": "../rdk/controls/FoldSelector",
        "rd.controls.Graph": "../rdk/controls/Graph",
        "rd.controls.Input": "../rdk/controls/Input",
        "rd.controls.Map": "../rdk/controls/Map",
        "rd.controls.Module": "../rdk/controls/Module",
        "rd.controls.PieGraph": "../rdk/controls/PieGraph",
        "rd.controls.ProgressBar": "../rdk/controls/ProgressBar",
        "rd.controls.ScoreIndicator": "../rdk/controls/ScoreIndicator", 
        "rd.controls.Scroller": "../rdk/controls/Scroller",
        "rd.controls.Selector": "../rdk/controls/Selector",
        "rd.controls.SingleIndicator": "../rdk/controls/SingleIndicator",
        "rd.controls.Table": "../rdk/controls/Table",
        "rd.controls.TabSelect": "../rdk/controls/TabSelect",
        "rd.controls.TabSelector": "../rdk/controls/TabSelector",
        "rd.controls.Time": "../rdk/controls/Time",
        "rd.controls.Tree": "../rdk/controls/Tree", 
        
        "rd.services.Alert": "../rdk/services/Alert",
        "rd.services.DataSourceService": "../rdk/services/DataSourceService",
        "rd.services.EventService": "../rdk/services/EventService",
        "rd.services.I18nService": "../rdk/services/I18nService",
        "rd.services.NodeService": "../rdk/services/NodeService",
        "rd.services.Utils": "../rdk/services/Utils",

        "rd.styles.Accordion": "../rdk/containers/assets/rdk-accordion-style",
        "rd.styles.Alert": "../rdk/services/assets/rdk-Alert-style",
        "rd.styles.Area": "../rdk/controls/assets/rdk-area-style",
        "rd.styles.BasicSelector": "../rdk/controls/assets/rdk-basicselector-style",
        "rd.styles.Bootstrap": "../bootstrap/css/bootstrap.min",
        "rd.styles.Bullet": "../rdk/controls/assets/rdk-bullet-style",
        "rd.styles.Button": "../rdk/controls/assets/rdk-button-style",
        "rd.styles.ButtonGroup": "../rdk/containers/assets/rdk-buttongroup-separator-style",
        "rd.styles.ComboSelect": "../rdk/controls/assets/rdk-comboselect-style",
        "rd.styles.FontAwesome": "../font-awesome-4.3.0/css/font-awesome",
        "rd.styles.Graph": "../rdk/controls/assets/rdk-graph-style",
        "rd.styles.Panel": "../rdk/containers/assets/rdk-panel-style",
        "rd.styles.ProgressBar": "../rdk/controls/assets/rdk-progressbar-style",
        "rd.styles.ScoreIndicator": "../rdk/controls/assets/rdk-scoreindicator-style",
        "rd.styles.Scroller": "../rdk/controls/assets/rdk-scroller-style",
        "rd.styles.Scroll": "../rdk/attributes/assets/perfect-scrollbar-style",
        "rd.styles.SingleIndicator": "../rdk/controls/assets/rdk-singleindicator-style",
        "rd.styles.Tab": "../rdk/containers/assets/rdk-tab-style",
        "rd.styles.Table": "../rdk/controls/assets/rdk-table-style",
        "rd.styles.TabSelect": "../rdk/controls/assets/rdk-tabselect-style",
        "rd.styles.TabSelector": "../rdk/controls/assets/rdk-tabselector-style",
        "rd.styles.Time": "../rdk/controls/assets/rdk-time-style",
        "rd.styles.Tree": "../rdk/controls/assets/rdk-tree-style",

        "rd.modules.i18n": "../rdk/modules/I18nModule",
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
        "ztree-exhide": {
            deps: ['css!../ztree/css/zTreeStyle/zTreeStyle','ztree'],
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
            'css': 'requirejs-plugins/requirecss/css',
            'rest': 'requirejs-plugins/requirerest/rest',
        }
    }
});

