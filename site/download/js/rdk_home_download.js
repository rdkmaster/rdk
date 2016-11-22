$(document).ready(function() {  
	var allSpan = $("#nov > li > span");
	var docField = $('#docField');
	var download_develop = $("#download_develop");
	var download_run = $("#download_run");
	
	selectVersion($('#nov li:first-child span'));

	allSpan.each(function(){
		$(this).click(function() {
			selectVersion($(this));
		});
	});

	download_develop.click(function() {
		download('rdk-develop-environment', $(this));
	});


	download_run.click(function(){
		download('rdk-runtime-environment', $(this));
	});

	function selectVersion(spanItem) {
		spanItem.parent().siblings('li').find('span').css({"color":"#08c","background-color":"#fff"});
		
		var version = spanItem.text();
		spanItem.css({'color':'#fff',"background-color":"#0088cc"});
		$.ajax({
			url: 'version/' + version + '/CHANGELOG',
			type: "get",
			dataType: "text",
			success: function(data, textStatus) {
				docField.empty();
				docField.append(data);
			}
		});
		download_develop.text('下载 ' + version + ' 开发包');
		download_run.text('下载 ' + version + ' 运行包');
	}

	function download(type, button) {
		var match = button.text().match(/\s+v(.+?)\s+/);
		if (!match) {
			alert('内部错误，找不到待下载的版本！');
			return;
		}
		var url = "version/" + type + match[1] + ".zip";
		window.open(url);
	}
}); 
