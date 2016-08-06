define(['rd.modules.i18n'],
function(i18n) {
 
    //默认语言环境，在获取语言服务失败时使用
    var defaultLocale = 'en_US';

    return i18n.init(
		{
			"en_US": {
				table_searchBy: 'Search by',
				table_total: 'Total',
				table_records: 'Records',
				table_next: 'Next',
				table_prev: 'Prev'
			},
			"zh_CN": {
				table_searchBy: '在',
				table_total: '共',
				table_records: '条记录',
				table_next: '下一页',
				table_prev: '上一页'
			}
		}, defaultLocale);
});