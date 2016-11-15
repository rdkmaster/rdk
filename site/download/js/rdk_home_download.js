$(document).ready(function() {  
	var allSpan = $("#nov > li > span");
	var iframe = $('#iframe');
	var download_develop = $("#download_develop");
	var download_run = $("#download_run");
	var init = 'v2.3.2';
	allSpan.each(function(){
		$(this).click(function(){
			$(this).css('color', '#5A5A5A');
			$(this).parent().siblings('li').find('span').css('color', '#08c');
			var href = $(this).attr("href");
		    $.ajax({
		    	url: href,
		    	type: "get",
		    	dataType: "text",
		    	success: function(data, textStatus){
		    		iframe.empty();
		    		iframe.append(data);
		    	}
		    })
			download_develop.attr("src", href);
			download_run.attr("src", href);
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
