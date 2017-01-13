require.config({
    //下载依赖超时时间，0为不超时
    waitSeconds: 30,
    paths: {
        "angular": "../angular/angular",
        "ui.router": "../angular/angular-ui-router",
        "blockUI": "../angular/angular-block-ui.min",
        "angular-bootstrap-progressbar":"../angular/angular.bootstap.progressbar",
        "ngProgress":"../angular/ngprogress",
        "adminlte":"../AdminLTE-2.3.7/js/app",
        "gsap": "../animate/js/TweenMax.min",
        "ztree": "../ztree/jquery.ztree.all-3.5",
        "ztree-exhide": "../ztree/jquery.ztree.exhide-3.5.min",
        "echarts": "../echarts/echarts3.min",
        "echarts3": "../echarts/echarts3.min",
        "echarts.dataTool": "../echarts/dataTool",
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
        "rd.attributes.theme": "../rdk/attributes/theme",

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
        "rd.controls.Editor": "../rdk/controls/Editor",
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

        "rd.services.PopupService": "../rdk/services/PopupService",
        "rd.services.Alert": "../rdk/services/Alert",
        "rd.services.DataSourceService": "../rdk/services/DataSourceService",
        "rd.services.EventService": "../rdk/services/EventService",
        "rd.services.I18nService": "../rdk/services/I18nService",
        "rd.services.NodeService": "../rdk/services/NodeService",
        "rd.services.Utils": "../rdk/services/Utils",

        "rd.styles.Bootstrap": "../bootstrap/css/bootstrap.min",
        "rd.styles.FontAwesome": "../font-awesome-4.3.0/css/font-awesome",

        "rdk.theme.zte-blue":"css/theme/zte-blue/zte-blue",
        "rdk.theme.default":"css/theme/default/default",

        "rd.modules.i18n": "../rdk/modules/I18nModule",
    },
    //这个配置是你在引入依赖的时候的包名
    shim: {
        "angular": {
            exports: "angular"
        },
		"adminlte": {
            deps: ["css!../AdminLTE-2.3.7/css/AdminLTE.min","css!../AdminLTE-2.3.7/css/skins/_all-skins.min","jquery"],
            exports: "adminlte"
        },
        "blockUI" :{
            deps : ['angular','css!../angular/angular-block-ui','jquery'],
            exports: "blockUI"
        },
        "throttle-debounce":{
            deps : ['jquery'],
            exports: "throttle-debounce"
        },
        "jquery-gesture":{
            deps : ['jquery'],
            exports: "jquery-gesture"
        },
        "jquery-headfix" :{
            deps : ['throttle-debounce'],
            exports: "jquery-headfix"
        },
        "jquery-freezeheader" :{
            deps : ['jquery'],
            exports: "jquery-freezeheader"
        },
        "jquery-ui": {
            deps: ["css!../jquery-ui/css/jquery-ui.min"],
            exports: "jquery-ui"
        },
        "ztree": {
            deps: ['css!../ztree/css/zTreeStyle/zTreeStyle'],
            exports: "ztree",
        },
        "ztree-exhide": {
            deps: ['css!../ztree/css/zTreeStyle/zTreeStyle','ztree'],
            exports: "ztree",
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
        },
        "gsap":{
            deps: ["jquery"],
            exports: "gsap"
        }
    },
    map: {
        '*': {
            'css': 'requirejs-plugins/requirecss/css',
            'rest': 'requirejs-plugins/requirerest/rest',
        }
    }
});