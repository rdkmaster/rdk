(function() {

    return function(request, script) {
		function getAllData() {
			return [
				['南京'],
				['苏州'],
				['常州'],
				['南京'],
				['镇江'],
				['深圳'],
				['广州'],
				['杭州'],
			];
		}
		var alldata = getAllData();
		var pageSize = request.paging.pageSize;//7
		var pageNum = Math.ceil(alldata.length/pageSize);
		var currentPage=request.paging.currentPage;//1
		var data = [];
		for(var i=(currentPage-1)*pageSize;i<currentPage*pageSize&&i<alldata.length;i++){
			data.push(alldata[i]);
		}
		return {
			header: ['cityname'],
			field: ['cityname'],
			data: data,
			paging: {
				totalPageNum: pageNum,
				pageSize: pageSize,
				totalRecord: alldata.length,
				currentPage:currentPage
			}
		}

    }
})();
