define(['angular', 'rd.core', 'jquery', 'rd.controls.Module', 'rd.services.PopupService', 'css!rd.styles.FontAwesome', 'css!rd.styles.Bootstrap', 'css!rd.styles.MenuService'], 
  function(){
    var menuModule = angular.module('rd.services.MenuService', ['rd.controls.Module', 'rd.services.PopupService']);
    menuModule.controller('MenuController', ['$scope', 'MenuService', 'PopupService', 'EventService', 'EventTypes','Utils', function (scope, MenuService, PopupService, EventService, EventTypes,Utils){
      
      scope.selectedMenu = '';

      scope.showSubMenu = function(event){
        var $target = $(event.target);
        $target.css({ 'cursor': 'pointer' });
        var subMenu = $target.find('ul');     
        var tWidth = $target.outerWidth();

        if(subMenu.length>0){
          $('.rdk_menu').parents('.ui-dialog-content').css({'overflow': 'visible'});
          $('.rdk_menu').parents('.ui-dialog').css({'overflow': 'visible'});

          subMenu.css({
            'left': tWidth,
          }).show();
          //x方向进行边界检测
          if(Utils.offsetCheckX(subMenu[0])){
            subMenu.css({
              'left': -tWidth,
            })
          }
        }
      };

      scope.selectItem = function(event, item){
        event.stopPropagation();
        scope.selectedMenu = item.label;
        var retMenuModuleID = $('#menuID').find('.ui-dialog-content').attr('id');//界面弹出菜单永远只有一个menuID
        EventService.broadcast(retMenuModuleID, EventTypes.SELECT, item.label);
		EventService.broadcast(retMenuModuleID, EventTypes.CLICK, item);
        MenuService.destroyMenu();
      };

      scope.hideSubMenu = function(event){
        $(event.target).find('ul').hide();
      }
  }]);

  menuModule.service('MenuService', ['$rootScope','EventService', 'EventTypes', 'Utils', '$compile', 'PopupService', '$timeout', 
    function($rootScope, EventService, EventTypes, Utils, $compile, PopupService, $timeout) {

      /**
       *
       * @param menuConfig
       * [
       {label: 'menu item 1', event: 'menu_item_1'},
       {label: 'menu item 2', event: 'menu_item_2'},
       {label: 'memu item 3', list: [
          {label: 'submenu item 1', event: 'sub_menu_item_1'},
          {label: 'submenu item 2', event: 'sub_menu_item_2'}
       ]},
       ]
       * @param position
       * {x: 1212, y: 1212}：在屏幕的绝对位置x,y上弹出菜单
       一个dom节点/dom id：在给定的dom节点中心弹出菜单   ---> {relateTo: dom对象, hoffset: 1212, voffset: 1212}
       字符串常量mouse：在鼠标所在位置弹出菜单
       */

      this.destroyMenu = destroyMenu;

      this.addMenu = function(menuConfig, position, event) {

        //event参数并非一定需要从外部参数传递
        if (position === 'mouse') {
          event = event || window.event || arguments.callee.caller.arguments[0];
        }
        else if(typeof position === 'string') {
          if (!document.getElementById(position)) {
            console.warn('您的网页中没有该节点（节点id：'+position+'）');
            return;
          }
        }
        else if(typeof position === 'object') {
          if (position.relateTo &&
              typeof position.hoffset !== 'undefined'&&
              typeof position.voffset !== 'undefined' &&
              !document.getElementById(position.relateTo))
          {
            console.warn('您的网页中没有该节点（节点id：'+position.relateTo+'）');
            return;
          }
        }

        /*已有则destroy*/
        destroyMenu();

        /*弹出menu*/
        position = adjustPosition(position, event);
        var menuOption = {
          'showTitle': false,
          'width': 150,
          'modal': false,
          'x': position.x,
          'y': position.y,
          'controller': 'MenuController',
          'id': 'menuID'
        };
        var menuHTML =
            '<div class="rdk_menu" >\
                <ul class="list-group" id="Rdk_Menu" > \
                    <li class="list-group-item" ng-repeat="item in menuConfig" ng-mouseover="showSubMenu($event)" \
                        ng-mouseleave="hideSubMenu($event)" ng-click="selectItem($event, item)"\
                        ng-class="{true:\'active\', false:\'\'}[item.label === selectedMenu]">\
                        <span>{{item.label}}</span><i class="icon fa fa-chevron-right" ng-if="item.list !== undefined"></i>\
                        <ul ng-if="item.list !== undefined" class="rdk_sub_menu" >\
                            <li class="list-group-item" ng-click="selectItem($event, subItem)"\
                                ng-class="{true:\'active\', false:\'\'}[subItem.label === selectedMenu]"\
                                ng-repeat="subItem in item.list" ><span>{{subItem.label}}</span></li>\
                        </ul>\
                    </li> \
                </ul>\
            </div>';
        menuModuleID = PopupService.popup(menuHTML, {menuConfig: menuConfig}, menuOption);

        /*空白处单击*/
        $(document).mouseup(hideMenu);

        EventService.register(menuModuleID, EventTypes.READY, menuModuleReady);
        function menuModuleReady(){
          $timeout(function(){
            var menuModuleWidget = PopupService.widget(menuModuleID);
            //检测边界，重新调整menu position
            if(Utils.offsetCheckX(menuModuleWidget[0])){
              menuModuleWidget[0].style.left=document.documentElement.clientWidth - menuModuleWidget[0].offsetWidth + 'px';
              menuModuleWidget[0].style.top=parseInt(menuModuleWidget[0].style.top)+ 10 + 'px';
            }
          }, 0)
        }

        $timeout(function(){
          $('.rdk_menu').parents('.ui-dialog').css({'border': 'none'});
        }, 200)

        return menuModuleID;
      }

      function destroyMenu(menuModuleID) {
        if(!menuModuleID){
          menuModuleID = $('.rdk_menu').parents('.ui-dialog-content').attr('id');
        }
        $(document).off("mouseup", hideMenu);
        PopupService.removePopup(menuModuleID);
      }

      function hideMenu(e) {
          var myMenu = document.querySelector('.rdk_menu');
          if(!$(myMenu).is(e.target) && $(myMenu).has(e.target).length === 0){
            destroyMenu();
          }
      }

      function adjustPosition (position, event) {
        if (!position) return;
        var pos = angular.isString(position) ? position : angular.extend({}, position);
        var wOffx = 0, wOffy = 0, bodyWidth = $(window).width(), bodyHeight = $(window).height();
        if (pos === 'mouse') {
          pos = {
            x: event.pageX || event.clientX,
            y: event.pageY || event.clientY
          };
        } else if (typeof pos === 'object' && pos.relateTo) {
          var dom = $('#' + pos.relateTo)
          var domOffset = dom.offset(), domWidth = dom.outerWidth(),
            domHeight = dom.outerHeight();
          pos = {
            x: domOffset.left + pos.hoffset + domWidth/2,
            y: domOffset.top + pos.voffset + domHeight/2
          }
        }
        pos.x = pos.x > 0? pos.x: 0;
        pos.y = pos.y > 0? pos.y: 0;

        if ((wOffx = bodyWidth - (pos.x + $('#Rdk_Menu').outerWidth())) < 0) {
          pos.x = bodyWidth - $('#Rdk_Menu').outerWidth();
        }
        if ((wOffy = bodyHeight - (pos.y + $('#Rdk_Menu').outerHeight())) < 0) {
          pos.y = bodyHeight - $('#Rdk_Menu').outerHeight();
        }
        return pos;
      }
    }
  ]);
});






