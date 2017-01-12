var Resource2 = Resource = {
    wind: {
        text: "Wind.js",
        scripts: [{
            text: "Wind.js 0.7.0",
            ident: "wind_070",
            url: ["/js/sandbox/wind.js/wind-core.js", "/js/sandbox/wind.js/wind-compiler.js", "/js/sandbox/wind.js/wind-builderbase.js", "/js/sandbox/wind.js/wind-async.js"]
        }]
    },
    bootstrap: {
        text: "Bootstrap",
        requires: ["jquery_172"],
        scripts: [{
            ident: "bootstrap_221",
            text: "Bootstrap v2.2.1",
            url: "/js/sandbox/bootstrap-2.2.1/js/bootstrap.min.js",
            style: "/js/sandbox/bootstrap-2.2.1/css/bootstrap.min.css"
        }]
    },
    yui: {
        text: "YUI",
        scripts: [{
            text: "YUI 3.3.0",
            ident: "yui_330",
            url: "/js/sandbox/yui/yui-3.3.0-min.js"
        },
        {
            text: "YUI 2.8.2",
            ident: "yui_282",
            url: "/js/sandbox/yui/yuiloader-2.8.2-min.js"
        }]
    },
    mootools: {
        text: "MooTools",
        scripts: [{
            ident: "mootools_145",
            text: "Mootools 1.4.5",
            ident: "mootools_145",
            url: "/js/sandbox/mootools/mootools-core-1.4.5-full-nocompat-yc.js"
        },
        {
            ident: "mootools_125",
            text: "Mootools 1.2.5",
            ident: "mootools_125",
            url: "/js/sandbox/mootools/mootools-1.2.5-core-yc.js"
        }]
    },
    prototype: {
        text: "Prototype",
        scripts: [{
            ident: "prototype_1710",
            text: "Prototype 1.7.1.0",
            url: "/js/sandbox/prototype/1.7.1.0/prototype.js"
        },
        {
            ident: "prototype_1700",
            text: "Prototype 1.7.0.0",
            url: "/js/sandbox/prototype/1.7.0.0/prototype.js"
        },
        {
            ident: "prototype_1610",
            text: "Prototype 1.6.1.0",
            url: "/js/sandbox/prototype/1.6.1.0/prototype.js"
        }]
    },
    jquery: {
        text: "jQuery",
        scripts: [{
            ident: "jquery_183",
            text: "jQuery 1.8.3",
            url: "/js/sandbox/jquery/jquery-1.8.3.min.js"
        },
        {
            ident: "jquery_182",
            text: "jQuery 1.8.2",
            url: "/js/sandbox/jquery/jquery-1.8.2.min.js"
        },
        {
            ident: "jquery_180",
            text: "jQuery 1.8.0",
            url: "/js/sandbox/jquery/jquery-1.8.0.min.js"
        },
        {
            ident: "jquery_172",
            text: "jQuery 1.7.2",
            url: "/js/sandbox/jquery/jquery-1.7.2.min.js"
        },
        {
            ident: "jquery_164",
            text: "jQuery 1.6.4",
            url: "/js/sandbox/jquery/jquery-1.6.4.min.js"
        },
        {
            ident: "jquery_151",
            text: "jQuery 1.5.1",
            url: "/js/sandbox/jquery/jquery-1.5.1.min.js"
        },
        {
            ident: "jquery_144",
            text: "jQuery 1.4.4",
            url: "/js/sandbox/jquery/jquery-1.4.4.min.js"
        }]
    },
    jqueryui: {
        text: "jQuery UI",
        requires: ["jquery_182"],
        scripts: [{
            ident: "jqueryui_191",
            text: "jQuery UI 1.9.1",
            url: "/js/sandbox/jquery-ui/1.9.1/js/jquery-ui-1.9.1.custom.min.js",
            style: "/js/sandbox/jquery-ui/1.9.1/css/smoothness/jquery-ui-1.9.1.custom.min.css"
        }]
    },
    jquerymobile: {
        text: "jQuery Mobile",
        requires: ["jquery_182"],
        scripts: [{
            ident: "jquerymobile_120",
            text: "jQuery Mobile 1.2.0",
            url: "/js/sandbox/jquery-mobile/jquery.mobile-1.2.0/jquery.mobile-1.2.0.min.js",
            style: "/js/sandbox/jquery-mobile/jquery.mobile-1.2.0/jquery.mobile-1.2.0.css"
        },
        {
            ident: "jquerymobile_111",
            text: "jQuery Mobile 1.1.1",
            url: "/js/sandbox/jquery-mobile/jquery.mobile-1.1.1/jquery.mobile-1.1.1.min.js",
            style: "/js/sandbox/jquery-mobile/jquery.mobile-1.1.1/jquery.mobile-1.1.1.css"
        },
        {
            ident: "jquerymobile_101",
            text: "jQuery Mobile 1.0.1",
            url: "/js/sandbox/jquery-mobile/jquery.mobile-1.0.1/jquery.mobile-1.0.1.min.js",
            style: "/js/sandbox/jquery-mobile/jquery.mobile-1.0.1/jquery.mobile-1.0.1.css"
        }]
    },
    dojo: {
        text: "Dojo",
        scripts: [{
            ident: "dojo_181",
            text: "Dojo 1.8.1",
            url: "/js/sandbox/dojo/dojo-1.8.1.min.js"
        },
        {
            ident: "dojo_180",
            text: "Dojo 1.8.0",
            url: "/js/sandbox/dojo/dojo-1.8.0.min.js"
        },
        {
            ident: "dojo_160",
            text: "Dojo 1.6.0",
            url: "/js/sandbox/dojo/dojo-1.6.0.min.js"
        },
        {
            ident: "dojo_141",
            text: "Dojo 1.4.1",
            url: "/js/sandbox/dojo/dojo-1.4.1.min.js"
        }]
    },
    jqueryplugins: {
        text: "jQuery 插件",
        scripts: [{
            ident: "jqueryplugins1_jquery_cookie_13",
            text: "jQuery cookie",
            url: "/js/sandbox/jquery-plugins/jquery.cookie-1.3.js",
            requires: ["jquery_182"]
        },
        {
            ident: "jqueryplugins2_jqueryform_282",
            text: "jQuery forms 2.8.2",
            url: "/js/sandbox/jquery-plugins/jquery.form-2.82.js",
            requires: ["jquery_182"]
        },
        {
            ident: "jqueryplugins3_jquery_cookies_220",
            text: "jQuery cookies 2.2.0",
            url: "/js/sandbox/jquery-plugins/jquery.cookies.2.2.0.min.js",
            requires: ["jquery_182"]
        },
        {
            ident: "jqueryplugins4_jquery_validity_120",
            text: "jQuery validity 1.2.0",
            url: "/js/sandbox/jquery-plugins/jquery-validity/jQuery.validity.min.js",
            style: "/js/sandbox/jquery-plugins/jquery-validity/jquery.validity.css",
            requires: ["jquery_182"]
        },
        {
            ident: "jqueryplugins5_jquery_uploadify_32",
            text: "jQuery uploadify 3.2",
            url: "/js/sandbox/jquery-plugins/uploadify/jquery.uploadify.min.js",
            style: "/js/sandbox/jquery-plugins/uploadify/uploadify.css",
            requires: ["jquery_182"]
        },
        {
            ident: "jqueryplugins6_jquery_jqgrid_441",
            text: "jQuery jqGrid 4.4.1",
            url: "/js/sandbox/jquery-plugins/jqGrid/js/jquery.jqGrid.min.js",
            style: "/js/sandbox/jquery-plugins/jqGrid/css/ui.jqgrid.css",
            requires: ["jquery_182"]
        },
        {
            ident: "jqueryplugins7_jquery_colorbox_132",
            text: "jQuery ColorBox 1.3.2",
            url: "/js/sandbox/jquery-plugins/jquery.colorbox-min.js",
            requires: ["jquery_182"]
        },
        {
            ident: "jqueryplugins8_fancybox_213",
            text: "jQuery fancyBox 2.1.3",
            url: "/js/sandbox/jquery-plugins/fancybox/jquery.fancybox.pack.js",
            style: "/js/sandbox/jquery-plugins/fancybox/jquery.fancybox.css",
            requires: ["jquery_182"]
        },
        {
            ident: "jqueryplugins9_jquery_rotate_22",
            text: "jQuery Rotate 2.2",
            url: "/js/sandbox/jquery-plugins/jQueryRotate.2.2.js",
            requires: ["jquery_182"]
        }]
    },
    jqmobi: {
        text: "jqMobi",
        scripts: [{
            text: "jqMobi.min.js",
            ident: "jqmobi_min",
            url: "/js/sandbox/jqmobi/jq.mobi.min.js",
            style: "/js/sandbox/jqmobi/icons.css"
        },
        {
            text: "jq.ui.min.js",
            ident: "jqmobi1_ui",
            requires: ["jqmobi_min"],
            url: "/js/sandbox/jqmobi/jq.ui.min.js",
            style: "/js/sandbox/jqmobi/jq.ui.css"
        },
        {
            text: "jq.popup.js",
            ident: "jqmobi2_ui",
            requires: ["jqmobi_min"],
            url: "/js/sandbox/jqmobi/plugins/jq.popup.js",
            style: "/js/sandbox/jqmobi/plugins/css/jq.popup.css"
        }]
    },
    others: {
        text: "Others",
        scripts: [{
            text: "DWZ UI 1.4.4",
            ident: "others_dwzui_144",
            url: "/js/sandbox/dwz-ria-1.4.4/js/dwz.min.js",
            style: ["/js/sandbox/dwz-ria-1.4.4/themes/css/core.css", "/js/sandbox/dwz-ria-1.4.4/themes/css/print.css", "/js/sandbox/dwz-ria-1.4.4/themes/css/ieHack.css", "/js/sandbox/dwz-ria-1.4.4/themes/css/login.css"]
        },
        {
            text: "zTree 3.4",
            ident: "others_ztree_34",
            url: "/js/sandbox/ztree-3.4/jquery.ztree.all-3.4.min.js",
            requires: ["jquery_182"]
        },
        {
            ident: "others_extjs_411a",
            text: "ExtJS 4.1.1a",
            url: "/js/sandbox/extjs/ext-all.js",
            style: "/js/sandbox/extjs/resources/css/ext-all.css"
        },
        {
            text: "Backbone 0.9.1",
            ident: "others_backbone_091",
            url: "/js/sandbox/other/backbone-min.js",
            requires: ["others_underscore_133"]
        },
        {
            ident: "others_coffeescript",
            text: "CoffeeScript",
            url: "/js/sandbox/other/coffee-script.js"
        },
        {
            ident: "others_es5_shim_124",
            text: "ES5 shim 1.2.4",
            url: "/js/sandbox/other/es5-shim.min.js"
        },
        {
            ident: "others_less_130",
            text: "Less 1.3.0",
            url: "/js/sandbox/other/less-1.3.0.min.js"
        },
        {
            ident: "others_modernizr_262",
            text: "Modernizr 2.6.2",
            url: "/js/sandbox/other/modernizr.min.js"
        },
        {
            ident: "others_processing_141",
            text: "Processing 1.4.1",
            url: "/js/sandbox/other/processing-1.4.1.min.js"
        },
        {
            ident: "others_raphael_210",
            text: "Raphael 2.1.0",
            url: "/js/sandbox/other/raphael-min.js"
        },
        {
            ident: "others_sammy_063",
            text: "Sammy 0.6.3",
            url: "/js/sandbox/other/sammy.min.js"
        },
        {
            ident: "others_jquery_easyui_131",
            text: "jQuery easy UI 1.3.1",
            url: "/js/sandbox/jquery-easyui/jquery.easyui.min.js",
            style: "/js/sandbox/jquery-easyui/themes/default/easyui.css"
        },
        {
            ident: "others_sencha_touch_2011",
            text: "Sencha Touch 2.0.1.1",
            url: "/js/sandbox/sencha-touch-2.0.1.1/sencha-touch.js",
            style: "/js/sandbox/sencha-touch-2.0.1.1/resources/css/sencha-touch.css"
        },
        {
            ident: "others_twitterlib",
            text: "TwitterLib",
            url: "/js/sandbox/other/twitterlib.min.js"
        },
        {
            ident: "others_underscore_133",
            text: "underscore 1.3.3",
            url: "/js/sandbox/other/underscore-min.js"
        },
        {
            ident: "others_zepto_10rc1",
            text: "Zepto 1.0rc1",
            url: "/js/sandbox/other/zepto.min.js"
        },
        {
            ident: "others_script_aculo_us_183",
            text: "script.aculo.us 1.8.3",
            url: "/js/sandbox/prototype/scriptaculous.js",
            requires: ["prototype_1710"]
        },
        {
            ident: "others_canvastext_041",
            text: "CanvasText-0.4.1",
            url: "/js/sandbox/other/CanvasText-0.4.1.js"
        },
        {
            ident: "others_jcanvascript_1518",
            text: "jCanvaScript-1.5.18",
            url: "/js/sandbox/other/jCanvaScript.1.5.18.min.js"
        },
        {
            ident: "others_jquery_html5_uploader",
            text: "jQuery HTML5 Uploader",
            url: "/js/sandbox/other/jquery.html5uploader.min.js",
            requires: ["jquery_183"]
        },
        {
            ident: "others_kinetic_v412",
            text: "kinetic-v4.1.2",
            url: "/js/sandbox/other/kinetic-v4.1.2.min.js"
        },
        {
            ident: "others_angular_103",
            text: "AngularJS-1.0.3",
            url: "/js/sandbox/other/angular.min.js"
        }]
    }
};