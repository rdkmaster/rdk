$(document).ready(function() {  
	var allSpan = $("#nov > li > span");
	var iframe = $('#iframe');
	var download_develop = $("#download_develop");
	var download_run = $("#download_run");
	var init = $('#nov li:first-child span').text();
	var hrefInit = $('#nov li:first-child span').attr("href");
	var hrefText = hrefInit.slice(hrefInit.indexOf("/")+1);
	var textNub = hrefText.slice(hrefText.indexOf("v")+1,hrefText.indexOf("/"));
	$.ajax({
    	url: hrefInit,
    	type: "get",
    	dataType: "text",
    	success: function(data, textStatus){
    		iframe.append(data);
    	}
    });
    download_develop.text('下载' + textNub + '开发包');
    download_run.text('下载' + textNub + '运行包');



	allSpan.each(function(){
		$(this).click(function(){
			$(this).css({'color':'#fff',"background-color":"#98bf21"});
			$(this).parent().siblings('li').find('span').css({"color":"#08c","background-color":"#fff"});
			var href = $(this).attr("href");
		    $.ajax({
		    	url: href,
		    	type: "get",
		    	dataType: "text",
		    	success: function(data, textStatus){
		    		iframe.empty();
		    		iframe.append(data);
		    	}
		    });

			download_develop.attr("src", href);
			download_run.attr("src", href);
			var hrefText = href.slice(href.indexOf("/")+1);
			var textNub = hrefText.slice(hrefText.indexOf("v")+1,hrefText.indexOf("/"));
			download_develop.text('下载' + textNub + '开发包');
   			download_run.text('下载' + textNub + '运行包');

		});
	});



	download_develop.click(function(){
		var href = $(this).attr("src");
		if(!href){
			href = "version/"+ init +"/CHANGELOG";
		}
		var edition = href.slice(href.indexOf("/")+1);
		var url = "version/rdk-develop-environment" + edition.slice(edition.indexOf("v")+1,edition.indexOf("/")) + ".zip";
		window.open(url,"_blank");
	}) ;


	download_run.click(function(){
		var href = $(this).attr("src");
		if(!href){
			href = "version/"+ init +"/CHANGELOG";
		}
		var edition = href.slice(href.indexOf("/")+1);
		var url = "version/rdk-runtime-environment" + edition.slice(edition.indexOf("v")+1,edition.indexOf("/")) + ".zip";
		window.open(url,"_blank");
	}) ;
});  