define(['angular', 'rd.services.DataSourceService','css!rd.styles.Area','css!rd.styles.Bootstrap'], function () {
    var areaApp = angular.module('rd.controls.AreaSelect', ['rd.services.DataSourceService']);
    areaApp.directive('rdkAreaSelect', ['Utils', 'DataSourceService', function (Utils, DataSourceService) {
        return {
            restrict: 'E',
            transclude: true,
            template: '<div class="rdk-area-contain" ng-mouseleave="vm.close()">\
                           <div class="rdk-area-input-wrap" ng-mouseenter="vm.openForHover()" ng-click="vm.openForClk()">\
                               <input  type="text" class="rdk-area-input" ng-model="vm.resultData" tabindex="1" readonly="true"  placeholder=""/>\
                               <i class="rdk-area-icon rdk-area-icon-down" ng-class="{\'rdk-area-icon-up\':vm.openArea}"></i>\
                           </div>\
                           <div  ng-show="vm.openArea">\
                               <ul class="nav nav-tabs">\
                                   <li ng-class="{active: vm.activeTab == 1}"><a ng-click="vm.activeTab = 1">省</a></li>\
                                   <li ng-show="!!vm.dsCitys.data.data.length" ng-class="{active: vm.activeTab == 2}"><a ng-click="vm.activeTab = 2">市</a></li>\
                                   <li ng-show="!!vm.dsAreas.data.data.length" ng-class="{active: vm.activeTab == 3}"><a ng-click="vm.activeTab = 3">区</a></li>\
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
                                           <li ng-click="vm.selectAllProOrCity(\'全省\')" class="test-all"><a>全省</a></li>\
                                           <li ng-repeat="city in vm.dsCitys.data.data">\
                                               <a ng-click="vm.clkCityNextLvOpen(city,1)" ng-class="{selected:vm.activeCurItemClass(city,1)}">{{city.name}}</a>\
                                           </li>\
                                       </ul>\
                                   </div>\
                                   <div class="tab-panel" ng-show="vm.activeTab == 3">\
                                       <ul>\
                                           <li ng-click="vm.selectAllProOrCity(\'全市\')" class="test-all"><a>全市</a></li>\
                                           <li ng-repeat="area in vm.dsAreas.data.data">\
                                               <a ng-click="vm.changeSelected(area,2)" ng-class="{selected:vm.activeCurItemClass(area,2)}">{{area.name}}</a>\
                                           </li>\
                                       </ul>\
                                   </div>\
                               </div>\
                           </div>\
                        </div>',
            replace: true,
            scope: {
                areaData:'=',
                resultType:'@?'
            },
            link:_link
        };

        function _link(scope) {
            //TODO:处理控件内部数据的国际化:省市区标签
            var vm = scope.vm = {
                openArea:false, //控件是否显示打开
                resultData:"", //返回结果，字符串
                userArr:[], //数组:保存用户选择的省市区对象
                activeTab:1 //默认激活选项卡:省
            };

            var _isSelect = false; //判断用户是否进行选择

            _init();

            vm.close = function(){
                if(_isSelect){ //在进行选择地区过程中锁住close事件
                    return;
                }
                vm.openArea=false;
            };
            vm.openForClk=function(){ //鼠标点击输入框控制地区选择框的显示
                if(_isSelect || !vm.openArea){
                    vm.openArea=!vm.openArea;
                    if(!vm.openArea){
                        _isSelect = false;
                        return;
                    }
                }
                _isSelect=true;
            };
            vm.openForHover=function(){ //鼠标悬浮输入框打开地区选择框
                vm.openArea=true;
                //_isSelect = false;
            };
            vm.changeSelected = function(item,index){ //选择地区项，结束当前地区选择
                !!item?vm.userArr[index]=item:[];
                _closeRdkArea(item,index);
            };
            vm.selectAllProOrCity = function(allName){ //选择全省或全市，结束当前地区选择
                if(allName=="全省"){
                    vm.userArr.splice(1,2); //删除市区
                    vm.activeTab=1;
                    !!vm.dsCitys.data?vm.dsCitys.data.data=[]:null;
                    !!vm.dsAreas.data?vm.dsAreas.data.data=[]:null;
                }else if(allName=="全市"){
                    vm.userArr.splice(2,1); //删除区
                    vm.activeTab=2;
                    !!vm.dsAreas.data?vm.dsAreas.data.data=[]:null;
                }
                _closeRdkArea();
            };

            //展开下一级 province-->city
            vm.clkProvinceNextLvOpen=function(province,index){
                _isSelect=true;
                vm.activeTab=2;
                var cityCondition = {
                    queryFlag:'city',
                    provinceId: province.ProID
                };
                vm.userArr[index]=province;
                !!vm.dsCitys && vm.dsCitys.query(cityCondition);
            };
            //展开下一级 city-->area
            vm.clkCityNextLvOpen=function(city,index){
                _isSelect=true;
                vm.activeTab=3;
                var cityCondition = {
                    queryFlag:'area',
                    cityId: city.CityID
                };
                vm.userArr[index]=city;
                !!vm.dsAreas && vm.dsAreas.query(cityCondition);
            };
            //激活已选择项的样式
            vm.activeCurItemClass = function (item,index){
                if(vm.userArr.length && vm.userArr[index]){
                    return vm.userArr[index].name == item.name;
                }
                else{
                    return false;
                }
            };
            //关闭选择框,返回选择结果信息
            function _closeRdkArea(){
                vm.openArea=false;
                _isSelect=false;
                vm.resultData="";
                angular.forEach(vm.userArr,function(item){
                    vm.resultData +=item.name+' / ';
                });
                vm.resultData = vm.resultData.substring(0,vm.resultData.length-3);
                if(scope.resultType=='string'){
                    scope.areaData=vm.resultData;
                }else{
                    scope.areaData=vm.userArr;
                }
                //tmpArr=copyArr(tmpArr,vm.userArr); //记录上次的选择的地区信息
                //_deleteAllDs();
            }
            //初始化
            function _init(){
                //创建省数据源
                var serviceUrl='app/libs/rdk/server/areaService';
                vm.dsProvinces = DataSourceService.create({
                    id: 'dsProvinces'+scope.$id,
                    url: serviceUrl
                });
                //创建市数据源
                vm.dsCitys = DataSourceService.create({
                    id: 'dsCitys'+scope.$id,
                    url: serviceUrl
                });
                //创建区数据源
                vm.dsAreas = DataSourceService.create({
                    id: 'dsAreas'+scope.$id,
                    url: serviceUrl
                });
                vm.dsProvinces.query();
            }
            //释放数据源或绑定变量
            function _deleteAllDs(){
                vm.dsProvinces.delete();
                vm.dsCitys.delete();
                vm.dsAreas.delete();
            }
        }
    }])
})