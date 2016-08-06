(function() {
    return {
		"city" : "select city_id,city_name from dim_comm_city",
		"ne" : "select distinct ne_id,ne_name  from dim_ip_ne",
		"ci" : "select ci,ciname from dim_ci where city in ( #city# )"
     }
})();
