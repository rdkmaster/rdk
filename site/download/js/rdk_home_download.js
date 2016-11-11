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
			href = "manual.md";
		}
		var url = href.slice(0,href.indexOf(".")) + ".7z";
		window.open(url,"_blank");
	}) ;
})