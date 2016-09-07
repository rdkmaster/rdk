#!/bin/sh

basepath=$(cd `dirname $0`; pwd)
cd $basepath
. ./menu_cfg.ini

###菜单合并以及license鉴权
appUrl=${basepath##*rdk_server.war/}
appUrl=${appUrl%/web*}
appName='rdk_'${appUrl//'/'/'_'}
operId='rdk.'${appUrl//'/'/'.'}
operId=${operId//'_'/'.'}

rm -fr i18n menus
mkdir -p 'menus/'$appName
mkdir -p 'i18n/'

#生成 umain_menu.html
echo '<li>
    <a class="iframe" id="'$appName'_col1" parentID="'$menuKey'" hparentID="'$menuKey'"
    order="60" Horgroup="10" cacheNum="RMA" href="/rdk/'$appUrl'/web/index.html" iframeAutoScroll="auto"
    operation="'operation.$operId'" licenseid="'$operId.limit'" >  <i class="fa fa-comments">
        </i>
        <span id="'$appName'" name_i18n="com_zte_ums_ict_framework_ui_i18n_sideMenu">
        </span>
    </a>
</li>' > 'menus/'$appName'/'$appName'-umain_menu.html'

#生成 siderbar-umain_menu.html
echo '<li>
	<a class="iframe" id="vmaxsystem" parentID="vmaxsystem"
	order="10" cacheNum="vmaxsystem" shiftJS="null" operation="operation.dashboard" >
		<i class="fa fa-gear">
		</i>
		<span id="com_zte_com_vmaxsystem" name_i18n="com_zte_ums_ict_framework_ui_i18n_sideMenu"
		class="title">
		</span>
		<span class="selected">
		</span>
		<span class="arrow">
		</span>
	</a>
</li>
<script type="text/javascript" src="/web/newict/framework/zte/i18n/loadi18nApp_vmaxsystem.js">
</script>' > 'menus/'$appName'/'$appName'-siderbar-umain_menu.html'

#生成 MegaHorbar-umain_menu.html
echo '<script type="text/javascript" src="/web/newict/framework/zte/i18n/'$appName'.js">
</script>' > 'menus/'$appName'/'$appName'-MegaHorbar-umain_menu.html'

echo $appName'='$zhMenu3 > 'i18n/'$appName'-zh-CN.properties'
echo $appName'='$enMenu3 > 'i18n/'$appName'-en-US.properties'

echo 'function loadAppPropertiesSideMenu(lang){
	loadPropertiesSideMenu(lang, "'$appName'", "/web/newict/framework/zte/i18n/");
}
loadAppPropertiesSideMenu(lang);' > 'i18n/'$appName'.js'


if [[ "$1" = "" || "$1" = "no_merge" ]]; then
	cp -rf i18n  menus /home/netnumen/ems/ums-server/procs/ppus/web.ppu/web.pmu/web.ear/web.war/newict/framework/zte/
	
	if [ "$1" = "" ]; then
		cd /home/netnumen/ems/uif
		chmod +x mergeMenu.sh
		./mergeMenu.sh
	fi
fi

cd $basepath
rm -fr i18n menus

