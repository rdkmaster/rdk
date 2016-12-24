define(['angular', 'rd.core', 'jquery-ui', 'rd.controls.Module',
  'css!rd.styles.FontAwesome',
  'css!rd.styles.Bootstrap',
  'css!rd.styles.MenuService'], function(){
  var menuModule = angular.module('rd.services.MenuService', ['rd.controls.Module']);
  rdk.$ngModule.controller('MenuController', ['$scope', function (scope){
    scope.selectedMenu = ''
    scope.showSubMenu = function (event) {
      var $target = $(event.target);
      var subMenu = $target.find('ul');
      var tWidth = $target.outerWidth();
      if(subMenu.length>0){
        subMenu.css({
          position: 'absolute',
          left: tWidth,
          top: 0
        }).show();
      }
    };
    scope.selectItem = function (event, label) {
      event.stopPropagation();
      scope.selectedMenu = label;
    };
    scope.hideSubMenu = function (event) {
      $(event.target).find('ul').hide();
      console.log('hideSubMenu')
    }
  }]);
  menuModule.service('MenuService', ['$rootScope','EventService',
    'EventTypes', 'Utils', '$compile', '$timeout',
    function($rootScope, EventService, EventTypes, Utils, $compile, $timeout) {

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
      this.addMenu = function (menuConfig, position, event) {

        if (position === 'mouse') {
            if (!event) {
              console.warn('您需要添加$event参数，否则将无法得到鼠标位置');
              return;
            }
          } else if(typeof position === 'string'){
            if (!document.getElementById(position)) {
              console.warn('您的网页中没有该节点（节点id：'+position+'）');
              return;
            }
          } else if(typeof position === 'object'){
            if (position.relateTo &&
              typeof position.hoffset !== 'undefined'&&
              typeof position.voffset !== 'undefined' &&
              !document.getElementById(position.relateTo)) {
              console.warn('您的网页中没有该节点（节点id：'+position.relateTo+'）');
              return;
            }
          }
        var menus = $('.rdk-module_menu'),i= 0;
        for(i,mLen=menus.length; i< mLen; i++) {
          destroyMenu(menus[i].id);
        }

        var  menuModuleID = Utils.createUniqueId('menuModule_');

        var menuHTML = '<div class="rdk_menu" >\
        <ul class="list-group" id="Rdk_Menu" > \
          <li  class="list-group-item" ng-repeat="item in menuConfig" ng-mouseover="showSubMenu($event)" \
          ng-mouseleave="hideSubMenu($event)" ng-click="selectItem($event, item.label)"\
          ng-class="{true:\'active\', false:\'\'}[item.label === selectedMenu]">\
            <span>{{item.label}}</span><i class="icon fa fa-chevron-right" ng-if="item.list !== undefined"></i>\
            <ul ng-if="item.list !== undefined" class="rdk_sub_menu" >\
            <li class="list-group-item" ng-click="selectItem($event, subItem.label)"\
            ng-class="{true:\'active\', false:\'\'}[subItem.label === selectedMenu]"\
            ng-repeat="subItem in item.list" ><span>{{subItem.label}}</span></li>\
            </ul>\
          </li> \
          </ul></div>';

        var moduleFractionStr = '<rdk_module class="rdk-module_menu"></rdk_module>';
        var moduleHtml = $(moduleFractionStr);

        moduleHtml.attr('id', menuModuleID);
        $(document.body).append(moduleHtml);

        $compile($('#'+menuModuleID))($rootScope.$$childHead);

        rdk[menuModuleID].loadModule('', menuHTML, 'MenuController');

        setTimeout(function(){
          adjustPosition (position, event);
        }, 200);

        return menuModuleID;
     }

      function destroyMenu(menuModuleID) {
        if (document.getElementById(menuModuleID)) {
          $('#'+menuModuleID).remove();
          rdk[menuModuleID].destroyModule();
          delete rdk[menuModuleID];
        }
      }

      this.destroyMenu = destroyMenu

      function adjustPosition (pos, event) {
        var wOffx = 0, wOffy = 0, bodyWidth = $(window).width(), bodyHeight = $(window).height();
        if (pos === 'mouse') {
          pos = {
            x: event.pageX,
            y: event.pageY
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
        $('#Rdk_Menu').css({
          position: 'absolute',
          left: pos.x,
          top: pos.y
        });
      }

    }
  ]);
});






