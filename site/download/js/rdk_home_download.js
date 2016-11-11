$(document).ready(function () {
	var allSpan = $("#nov > li > span");
	var iframe = $('iframe');
	var download = $("#download");
	allSpan.each(function(){
		console.log("1");
		$(this).click(function(){
			var href = $(this).attr("href");
			iframe.attr("src", href);
			download.attr("src", href);
		});
	});
	download.click(function(){
		var href = $(this).attr("src");
		if(!href){
			href = "v2.3.2-beta";
		}
		var url = "rdk-develop-environment" + href.slice(href.indexOf("v")+1,href.indexOf("/")) + ".zip";
		window.open(url,"_blank");
	}) ;
})