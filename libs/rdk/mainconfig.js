require.config({
    paths: {
        "angular": "../angular/angular",

        "ui-codemirror": "../angular/ui-codemirror",
        "codemirror-core": "../codemirror/codemirror",
        "codemirror-css": "../codemirror/codemirror",
        "codemirror-mode": "../codemirror/mode/javascript",

        "ztree": "../ztree/jquery.ztree.all-3.5",
        "echarts": "../echarts/echarts-all",
        "echarts3": "../echarts/echarts3.common.min",
        "echarts3_src": "../echarts/echarts3",
        "jquery": "../jquery/jquery-1.11.3.min",
        "jquery-ui":"../jquery-ui/js/jquery-ui.min",
        "bootstrap" :"../bootstrap/js/bootstrap",
        "bootstrap-datepicker" :"../bootstrap-datepicker/js/bootstrap-datetimepicker",
        "bootstrap-select" : "../bootstrap-select/bootstrap-select.min",
        "angualr-translate": "../angular/angular-translate.min",
        "angular-translate-static": "../angular/angular-translate-loader-static-files.min",
        "underscore": "../underscore/underscore-1.8.3",
        
        "rd.attributes.ds": "../rdk/attributes/ds",
        "rd.attributes.modal": "../rdk/attributes/modal",
        "rd.containers.Accordion": "../rdk/containers/Accordion",
        "rd.containers.Accordions": "../rdk/containers/Accordions",
        "rd.containers.GraphGroup": "../rdk/containers/GraphGroup",
        "rd.containers.Tab": "../rdk/containers/Tab",
        "rd.controls.Bullet": "../rdk/controls/Bullet",
        "rd.controls.ComboSelect": "../rdk/controls/ComboSelect",
        "rd.controls.Selector": "../rdk/controls/Selector",
        "rd.controls.FoldSelector": "../rdk/controls/FoldSelector",
        "rd.controls.BasicSelector": "../rdk/controls/BasicSelector",
        "rd.controls.GIS": "../rdk/controls/GIS",
        "rd.controls.Graph": "../rdk/controls/Graph",
        "rd.controls.Input": "../rdk/controls/Input",
        "rd.controls.PieGraph": "../rdk/controls/PieGraph",
        "rd.controls.Table": "../rdk/controls/Table",
        "rd.controls.TabSelect": "../rdk/controls/TabSelect",
        "rd.controls.TabSelector": "../rdk/controls/TabSelector",
        "rd.controls.Time": "../rdk/controls/Time",
        "rd.controls.ProgressBar": "../rdk/controls/ProgressBar",
        "rd.controls.Alert": "../rdk/controls/Alert",
        "rd.services.DataSourceService": "../rdk/services/DataSourceService",
        "rd.services.EventService": "../rdk/services/EventService",
        "rd.services.I18nService": "../rdk/services/I18nService",
        "rd.services.NodeService": "../rdk/services/NodeService",
        "rd.services.Utils": "../rdk/services/Utils",

        "rd.styles.BasicSelector": "../rdk/controls/assets/rdk-basicselector-style",
        "rd.styles.ComboSelect": "../rdk/controls/assets/rdk-comboselect-style",
        "rd.styles.Accordion": "../rdk/containers/assets/rdk-accordion-style",
        "rd.styles.TabSelector": "../rdk/controls/assets/rdk-tabselector-style",
        "rd.styles.TabSelect": "../rdk/controls/assets/rdk-tabselect-style",
        "rd.styles.Global": "../rdk/controls/assets/rdk-global",
        "rd.styles.Graph": "../rdk/controls/assets/rdk-graph-style",
        "rd.styles.Table": "../rdk/controls/assets/rdk-table-style",
        "rd.styles.Time": "../rdk/controls/assets/rdk-time-style",
        "rd.styles.ProgressBar": "../rdk/controls/assets/rdk-progressbar-style",

        "rd.styles.FontAwesome": "../font-awesome-4.3.0/css/font-awesome",
        "rd.styles.Bootstrap": "../bootstrap/css/bootstrap.min",
    },
    //这个配置是你在引入依赖的时候的包名
    shim: {
        "angular": {
            exports: "angular"
        },
        // "ui-codemirror": {
        //     deps: ['codemirror', 'css!codemirror'],
        //     exports: "ui-codemirror",
        // },
        "ztree": {
            deps: ['css!../ztree/css/zTreeStyle/zTreeStyle', 'css!../ztree/css/globalStyle'],
            exports: "ztree",
        },
        "jquery-ui":{
            deps:["css!../jquery-ui/css/jquery-ui.min"],
            exports:"jquery-ui"
        },
        "bootstrap-datepicker":{
            deps:["css!../bootstrap-datepicker/css/bootstrap-datetimepicker.min"],
            exports:"bootstrap-datepicker"
        },
        "bootstrap-select":{
            deps:["css!../bootstrap-select/bootstrap-select.min"],
            exports:"bootstrap-select"
        },
        "bootstrap" :{
            deps :["css!../bootstrap/css/bootstrap.min"],
            exports:"bootstrap"
        }
    },
    map: {
        '*': {
            'css': '../requirejs/requirecss/css'
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

