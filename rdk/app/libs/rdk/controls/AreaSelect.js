define(['angular', 'rd.services.DataSourceService','css!rd.styles.Area','css!rd.styles.Bootstrap', 'rd.services.EventService'], function () {
    var areaModule = angular.module('rd.controls.AreaSelect', ['rd.services.DataSourceService', 'rd.services.EventService']);
    areaModule.run(["$templateCache", function($templateCache) {
        $templateCache.put("province.html",
            '<div class="rdk-area-contain">\
                <ul class="nav nav-tabs">\
                    <li ng-class="{active: vm.activeTab == 1}"><a ng-click="vm.activeTab = 1">{{vm.userArr[0].name || setting.label[0] || "省"}}</a></li>\
                </ul>\
                <div class="tab-content tab-bordered">\
                    <div class="tab-panel" ng-show="vm.activeTab == 1">\
                        <ul>\
                            <li ng-repeat="province in vm.dsProvinces.data.data">\
                                <a ng-click="vm.changeSelected(province,0)" ng-class="{selected:vm.activeCurItemClass(province,0)}">{{province.name}}</a>\
                            </li>\
                        </ul>\
                    </div>\
                </div>\
            </div>'
        );
        $templateCache.put("city.html",
            '<div class="rdk-area-contain">\
                <ul class="nav nav-tabs">\
                    <li ng-if="!setting.disabled" ng-class="{active: vm.activeTab == 1}"><a ng-click="vm.activeTab = 1">{{vm.userArr[0].name || setting.label[0] || "省"}}</a></li>\
                    <li ng-show="!!vm.dsCitys.data.data.length" ng-class="{active: vm.activeTab == 2}"><a ng-click="vm.activeTab = 2">{{vm.userArr[1].name || setting.label[1] || "市"}}</a></li>\
                </ul>\
                <div class="tab-content tab-bordered">\
                    <div class="tab-panel" ng-show="vm.activeTab == 1" ng-if="!setting.disabled">\
                        <ul>\
                            <li ng-repeat="province in vm.dsProvinces.data.data">\
                                <a ng-click="vm.clkProvinceNextLvOpen(province,0)" ng-class="{selected:vm.activeCurItemClass(province,0)}">{{province.name}}</a>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class="tab-panel" ng-show="vm.activeTab == 2">\
                        <ul>\
                            <li ng-if="isAll" ng-click="vm.selectAllProOrCity(\'全省\',\'lockCity\')" class="test-all"><a>全省</a></li>\
                            <li ng-repeat="city in vm.dsCitys.data.data">\
                                <a ng-click="vm.changeSelected(city,1)" ng-class="{selected:vm.activeCurItemClass(city,1)}">{{city.name}}</a>\
                            </li>\
                        </ul>\
                    </div>\
                </div>\
            </div>'
        );
        $templateCache.put("common.html",
            '<div class="rdk-area-contain">\
                <ul class="nav nav-tabs">\
                    <li ng-class="{active: vm.activeTab == 1}"><a ng-click="vm.activeTab = 1">{{vm.userArr[0].name || setting.label[0] || "省"}}</a></li>\
                    <li ng-show="!!vm.dsCitys.data.data.length" ng-class="{active: vm.activeTab == 2}"><a ng-click="vm.activeTab = 2">{{vm.userArr[1].name || setting.label[1] || "市"}}</a></li>\
                    <li ng-show="!!vm.dsAreas.data.data.length" ng-class="{active: vm.activeTab == 3}"><a ng-click="vm.activeTab = 3">{{vm.userArr[2].name || setting.label[2] || "区"}}</a></li>\
                </ul>\
                <div class="tab-content tab-bordered">\
                    <div class="tab-panel" ng-show="vm.activeTab == 1">\
                        <ul>\
                            <li ng-repeat="province in vm.dsProvinces.data.data">\
                                <a ng-click="vm.clkProvinceNextLvOpen(province,0)" ng-class="{selected:vm.activeCurItemClass(province,0)}">{{province.name}}</a>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class="tab-panel" ng-show="vm.activeTab == 2">\
                        <ul>\
                            <li ng-if="isAll" ng-click="vm.selectAllProOrCity(\'全省\')" class="test-all"><a>全省</a></li>\
                            <li ng-repeat="city in vm.dsCitys.data.data">\
                                <a ng-click="vm.clkCityNextLvOpen(city,1)" ng-class="{selected:vm.activeCurItemClass(city,1)}">{{city.name}}</a>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class="tab-panel" ng-show="vm.activeTab == 3">\
                        <ul>\
                            <li ng-if="isAll" ng-click="vm.selectAllProOrCity(\'全市\')" class="test-all"><a>全市</a></li>\
                            <li ng-repeat="area in vm.dsAreas.data.data">\
                                <a ng-click="vm.changeSelected(area,2)" ng-class="{selected:vm.activeCurItemClass(area,2)}">{{area.name}}</a>\
                            </li>\
                        </ul>\
                    </div>\
                </div>\
           </div>'
        )
    }]);
    areaModule.directive('rdkAreaSelect', ['DataSourceService','EventService', 'Utils', function (DataSourceService,EventService,Utils) {
        var templates = {
            "province":"province.html",
            "city":"city.html"
        };
        return {
            restrict: 'E',
            templateUrl: function(elem, attr){
                if(attr.granularity){
                    return templates[attr.granularity];
                }else{
                    return "common.html"
                }
            },
            replace: true,
            scope: {
                resultType:'@?',
                callback:'&?',
                setting:"=?"
            },
            require:'^?rdkComboSelect',
            link:_link
        };

        function _link(scope,tElement,tAttrs,comboSelectCtrl) {
            //TODO:处理控件内部数据的国际化:省市区标签
            var vm = scope.vm = {
                resultData:"", //返回结果，字符串
                userArr:[], //数组:保存用户选择的省市区对象
                activeTab:1 //默认激活选项卡:省
            };
            var _hasOver=true; //选择是否结束标志
            var _hasDefaultReady = false; //读取默认地区数据是否完成
            var allProvinceTip=''; //提示"全省"
            //默认在选择项里显示：全省，全市标签
            scope.isAll = scope.setting && angular.isDefined(scope.setting.isAll) ? scope.setting.isAll : true;

            _init();

            vm.changeSelected = function(item,index){ //选择地区项，结束当前地区选择
                !!item?vm.userArr[index]=item:[];
                allProvinceTip='';
                _closeRdkArea(item,index);
            };
            vm.selectAllProOrCity = function(allName,lock){ //选择全省或全市，结束当前地区选择
                if(allName=="全省"){
                    vm.userArr.splice(1,2); //删除市区
                    if(lock=="lockCity" && scope.setting.disabled){
                        vm.activeTab=2;
                        allProvinceTip=allName;
                    }else{
                        vm.activeTab=1;
                        !!vm.dsCitys.data?vm.dsCitys.data.data=[]:null;
                        !!vm.dsAreas.data?vm.dsAreas.data.data=[]:null;
                    }
                }else if(allName=="全市"){
                    vm.userArr.splice(2,1); //删除区
                    vm.activeTab=2;
                    !!vm.dsAreas.data?vm.dsAreas.data.data=[]:null;
                }
                _closeRdkArea();
            };

            //展开下一级 province-->city
            vm.clkProvinceNextLvOpen=function(province,index){
                comboSelectCtrl.lockCloseShow();
                _queryCityByProvince(province);
                if(vm.userArr[index] && vm.userArr[index]!=province)
                {
                    vm.userArr.splice(1,2); //删除市区
                    !!vm.dsAreas.data?vm.dsAreas.data.data=[]:null;
                }
                vm.userArr[index]=province;
                vm.activeTab=2;
                _hasOver=false;
            };
            //展开下一级 city-->area
            vm.clkCityNextLvOpen=function(city,index){
                comboSelectCtrl.lockCloseShow();
                _queryAreaByCity(city);
                if(vm.userArr[index] && vm.userArr[index]!=city)
                {
                    vm.userArr.splice(2,1); //删除区
                }
                vm.userArr[index]=city;
                vm.activeTab=3;
                _hasOver=false;
            };
            //激活已选择项的样式
            vm.activeCurItemClass = function (item,index){
                if(vm.userArr.length && vm.userArr[index]){
                    return angular.equals(vm.userArr[index],item);
                }
                else{
                    return false;
                }
            };
            //关闭选择框,返回选择结果信息
            function _closeRdkArea(){
                comboSelectCtrl.changeOpenStatus();
                _hasOver=true;
                areaDataHandle();
                if(tAttrs.callback){  //如果有回调则执行
                    EventService.broadcast("CallBackId"+scope.$id, "areaCallBack");
                }
            }
            //初始化获取所需数据源
            function _init(){
                if(!tAttrs.dsProvince || !tAttrs.dsCity || !tAttrs.dsArea){
                    console.error("rdk-area-select require ds undefined!")
                }
                vm.dsProvinces = DataSourceService.get(tAttrs.dsProvince);
                vm.dsProvinces.resultHandler=_provincesResultHandler;
                vm.dsCitys = DataSourceService.get(tAttrs.dsCity);
                vm.dsCitys.resultHandler=_citysResultHandler;
                vm.dsAreas = DataSourceService.get(tAttrs.dsArea);
                vm.dsAreas.resultHandler=_areasResultHandler;
                //注册回调事件
                if(tAttrs.callback){
                    EventService.register("CallBackId"+scope.$id, "areaCallBack", scope.callback);
                }
                //初始化直接查询出所有省份
                vm.dsProvinces.query();
            }

            function _initDefaultAreaData(){  //初始化地区默认数据
                var defaultProvince;
                if(vm.dsProvinces.data && scope.setting.defaultData.province){
                    defaultProvince = queryDataByName(vm.dsProvinces.data.data,scope.setting.defaultData.province);
                    vm.userArr[0]=defaultProvince;
                    if(tAttrs.granularity=="province"){
                        areaDataHandle();
                        vm.activeTab=1;
                    }else if(tAttrs.granularity=="city")
                    {
                        if(scope.setting.disabled)
                        {
                            defaultProvince.disabled=scope.setting.disabled;
                        }
                        _queryCityByProvince(defaultProvince);
                        vm.activeTab=2;
                    }else{
                        _queryCityByProvince(defaultProvince);
                        vm.activeTab=3;
                    }
                }
            }

            function areaDataHandle(){  //处理选择结果，更新视图显示及返回数据结果
                if(!_hasOver){
                    return
                }
                vm.resultData="";
                angular.forEach(vm.userArr,function(item){
                    if(!item.disabled){
                        vm.resultData +=item.name+' | ';
                    }else{
                        comboSelectCtrl.setCaption(item.name);
                    }
                });
                vm.resultData = vm.resultData.substring(0,vm.resultData.length-3);
                comboSelectCtrl.onChildChange(vm.resultData+allProvinceTip);
                var appScope = Utils.findAppScope(scope);
                if(scope.resultType=='string'){
                    appScope[tAttrs.areaData]=vm.resultData;
                }else{
                    var returnObj = {
                        province:null,
                        city:null,
                        area:null
                    };
                    returnObj.province=vm.userArr[0];
                    returnObj.city=vm.userArr[1];
                    returnObj.area=vm.userArr[2];
                    appScope[tAttrs.areaData]=returnObj;
                    returnObj=null;
                }
                _hasDefaultReady=true;
            }

            function _provincesResultHandler(){
                if(_hasDefaultReady || !scope.setting || !scope.setting.defaultData){
                    return
                }
                _initDefaultAreaData();
            }
            function _citysResultHandler(){
                if(_hasDefaultReady || !scope.setting || !scope.setting.defaultData){
                    return
                }
                var defaultCity;
                if(vm.dsCitys.data && scope.setting.defaultData.city){
                    defaultCity = queryDataByName(vm.dsCitys.data.data,scope.setting.defaultData.city);
                    vm.userArr[1]=defaultCity;
                    if(tAttrs.granularity!="city"){
                        _queryAreaByCity(defaultCity);
                    }else{
                        areaDataHandle();
                    }
                }
            }
            function _areasResultHandler(){
                if(_hasDefaultReady || !scope.setting || !scope.setting.defaultData){
                    return
                }
                var defaultArea;
                if(vm.dsAreas.data && scope.setting.defaultData.area) {
                    defaultArea = queryDataByName(vm.dsAreas.data.data, scope.setting.defaultData.area);
                    vm.userArr[2] = defaultArea;
                    areaDataHandle();
                }
            }
            function queryDataByName(dataArr,initObj){
                var result;
                angular.forEach(dataArr,function(data){
                    if(data.name==initObj.name || data.name.indexOf(initObj.name) !=-1){
                        result=data;
                        return;
                    }
                });
                return result;
            }
            function _queryCityByProvince(province){
                var cityCondition = {
                    provinceId: province.ProID
                };
                !!vm.dsCitys && vm.dsCitys.query(cityCondition);
            }
            function _queryAreaByCity(city){
                var areaCondition = {
                    cityId: city.CityID
                };
                !!vm.dsAreas && vm.dsAreas.query(areaCondition);
            }
        }
    }])
})