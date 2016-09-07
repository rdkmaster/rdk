define('main', ['application', 'utils', 'i18n', 'blockUI','rd.controls.Time', 'rd.controls.ComboSelect','rd.controls.Table','rd.controls.Graph', 'rd.controls.BasicSelector', 'rd.containers.Tab', 'rd.containers.Accordion','rd.containers.Panel'],
function(application, utils, i18n) {

// 创建一个RDK的应用
var app = angular.module("rdk_app", ['rd.core', 'blockUI','rd.controls.Time', 'rd.controls.ComboSelect','rd.controls.Table','rd.controls.Graph', 'rd.controls.BasicSelector', 'rd.containers.Tab', 'rd.containers.Accordion','rd.containers.Panel']);
app.config(['blockUIConfig', function(blockUIConfig) {
    // blockUI默认只要有ajax请求在进行，就会自动启动，阻止页面响应鼠标事件
    // 使用下面代码可以阻止自动模式，启用手动模式
    // blockUIConfig.autoBlock=false
    // 然后在需要阻止页面相应鼠标事件的时候，使用下面代码
    // blockUI.start();
    // 在需要继续相应页面相应鼠标事件的时候，使用下面代码
    // blockUI.stop();

    // blockUI的详细用法参考 https://github.com/McNull/angular-block-ui
    blockUIConfig.template = '<div class="block-ui-message-container">\
                                  <img src="images/loding.gif" />\
                              </div>';
}]);

// 创建一个控制器
app.controller('rdk_ctrl', ['$scope', 'DataSourceService', 'blockUI', 'EventService',
function(scope, DSService, blockUI, EventService) {
i18n.$init(scope);

application.initDataSourceService(DSService);
/************************ 应用的代码逻辑开始 ************************/
$(document).ready(function(){
    console.log(2);
    console.log($("#flip"));
    $("#flip").click(function(){
       // console.log(11);
       // $("#panel").slideUp("slow");
    });
});
    scope.clkShowPanel=function(){
        console.log(13);
        //$("#panel").slideToggle("slow");
        scope.flag=!scope.flag;

    }
    scope.flag=false;scope.flag2=true;

EventService.register('myGraph', 'click', function(event, item) {
    alert(item.seriesName + ' = ' + item.value);
});
    utils.hello('rdk');
    scope.timeSetting = {
        value: ['now-2h', 'now'],
        selectGranularity: true,
        granularity: "hour",
        granularityItems: [{
            label: "15分钟",
            value: "quarter"
        }, {
            label: "小时",
            value: "hour"
        }, {
            label: "天",
            value: "date"
        }, {
            label: "月",
            value: "month"
        }]
    }

    scope.citys = [
        {id: 1, name: '南京2'},
        {id: 2, name: '扬州22'},
        {id: 3, name: '苏州1'},
        {id: 4, name: '镇江1'},
    ]

    scope.selected2string2 = function(selected, context, index) {
        var selectedCitys = '';
        console.log(selected)
        angular.forEach(selected, function(city) {
            selectedCitys += city.name + ' ';
        });
        return selectedCitys;
    }

    scope.cityProcessor = function(rawCitys) {
        var citys = [];
        angular.forEach(rawCitys.data, function(item) {
            citys.push({id: item[0], name: item[1]});
        });
        //必须把转换后的数据返回
        return citys;
    }
    scope.showResult = false;
    scope.search = function() {
        //由于服务端需要的是选中城市id列表，因此需要先处理一下选中的城市
        var citys = [];
        angular.forEach(scope.selectedCitys, function(city) {
            citys.push(city.id);
        });

        var ds = DSService.get('dsWebAnalysis');
/*        var condition = {
            beginTime: scope.timeSetting.value[0],
            endTime: scope.timeSetting.value[1],
            citys: citys
        }*/
        var condition = {
            beginTime: scope.timeSetting.value[0],
            endTime: scope.timeSetting.value[1],
            citys: citys,
            paging: {
                //一页的记录数
                pageSize:20
            }
        }
        console.log(condition);
        ds.query(condition);
        scope.showResult = true;
    }
    scope.setting = {
        "columnDefs": [
            {
                title : "详情",
                render : '<a ng-click="appScope.click(item)" href="javascript:void(0)">查看</a>'
            }
        ]
    }

    scope.click = function(item) {
        console.log(item);
        var txt = '日期：' + item.clttime + '\n' +
            '城市名：' + item.cityname + '\n' +
            '网页响应成功率：' + item.webrspsuccrate + '\n' +
            '网页下载速率：' + item.webdownloadrate + '\n' +
            '网页响应时延：' + item.webrspdelay;
        alert(txt);
    }

    /************************ my work ************************/
    scope.cityItems = [{
        label: "江苏省"
    }, {
        label: "浙江省"
    }, {
        label: "河南省"
    }, {
        label: "湖北省"
    }];

    scope.selectedItems = [{
        label: "江苏省"
    }];

    scope.rdkSelector = "Selector控件";
    scope.accordionData = {};
    scope.accordionData.header = ["一级原因", "原因名称1", "原因名称2", "原因名称3"];
    scope.accordionData.field = ["name", "position", "salary", "start_date"];
    scope.accordionData.data = [
        [
            "次数",
            "890",
            "890",
            "890"
        ],
        [
            "占比",
            "90%",
            "90%",
            "90%"
        ]
    ];

    scope.accordionData2 = {};
    scope.accordionData2.header = ["指标", "无线接通率", "掉线率", "切换成功率", "重定向占比", "影响用户数"];
    scope.accordionData2.field = ["name", "position", "salary", "start_date", "start_date", "start_date"];
    scope.accordionData2.data = [
        [
            "23",
            "89%",
            "3%",
            "86%",
            "86%",
            "58"
        ],
        [
            "23",
            "89%",
            "3%",
            "86%",
            "86%",
            "58"
        ],
        [
            "23",
            "89%",
            "3%",
            "86%",
            "86%",
            "58"
        ],
        [
            "23",
            "89%",
            "3%",
            "86%",
            "86%",
            "58"
        ],
        [
            "23",
            "89%",
            "3%",
            "86%",
            "86%",
            "58"
        ]
    ];

    scope.settingPanel = {
        "columnDefs" :[
            {
                targets : 0,
                width : "16%"
            },{
                targets : 1,
                width : "14%",
                class : "text-align"
            },{
                targets : 2,
                width : "18%",
                class : "text-align"
            },{
                targets : 3,
                width : "14%"
            },{
                targets : 4,
                width : "18%"
            },{
                targets : 5,
                width : "19%",
                class : "col-detail"
            }
        ]
    };

    scope.panelData = {};
    scope.panelData.header = ["IMSI", "掉话载频", "掉话时的扇区导频强度(db)", "问题归类", "问题二级归类", "问题描述"];
    scope.panelData.field = ["name", "position", "salary", "start_date1", "start_date2", "start_date3"];
    scope.panelData.data = [
        [
            "460030300493599",
            "20",
            "102",
            "设备问题",
            "反向干扰",
            "在52号BSC,CI为阿三嘎斯阿三哥萨克规划按时给你",
        ],
        [
            "460030300493599",
            "20",
            "102",
            "设备问题",
            "反向干扰",
            "在52号BSC,CI为阿三嘎斯阿三哥萨克规划按时给你",
        ],
        [
            "460030300493599",
            "20",
            "102",
            "设备问题",
            "反向干扰",
            "在52号BSC,CI为阿三嘎斯阿三哥萨克规划按时给你",
        ],
        [
            "460030300493599",
            "20",
            "102",
            "设备问题",
            "反向干扰",
            "在52号BSC,CI为阿三嘎斯阿三哥萨克规划按时给你",
        ],
        [
            "460030300493599",
            "20",
            "102",
            "设备问题",
            "反向干扰",
            "在52号BSC,CI为阿三嘎斯阿三哥萨克规划按时给你",
        ],
        [
            "460030300493599",
            "20",
            "102",
            "设备问题",
            "反向干扰",
            "在52号BSC,CI为阿三嘎斯阿三哥萨克规划按时给你",
        ],
        [
            "460030300493599",
            "20",
            "102",
            "设备问题",
            "反向干扰",
            "在52号BSC,CI为阿三嘎斯阿三哥萨克规划按时给你",
        ]
    ];
/************************ 应用的代码逻辑结束 ************************/
}]);

/********************************************************************
          应用如果将代码写在此处，可能会导致双向绑定失效
                需要手工调用 scope.$apply() 函数
          若非有特别的需要，否则请不要将代码放在这个区域
 ********************************************************************/

});

/********************************************************************
                       这个区域不要添加任何代码
 ********************************************************************/
