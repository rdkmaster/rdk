(function(){
	return function(request,script){
		require('$svr/mock_api.js');
		var res=matrix('select ds_accordion from dim_accordion');
		log("accordion_res",res);
		return res;
	}
})();