(function(){
	return function(request,script){
		return [
			{
				"header":["姓名","职位","薪资","入职日期","部门","其他"],
		  		"field" :["name","position","salary","start_date","office","extn"],
		   		"data" :[
				    ["Adison","employeer","$5000","2016/05/10","data","1001"],
				    ["John","employeer","$6000","2016/05/11","data","1002"],
				    ["Tomase","employeer","$5500","2016/05/10","data","1001"],
				    ["Arivl","employeer","$7000","2016/05/11","data","1002"],
				    ["Andy","employeer","$6000","2016/05/10","data","1001"],
				    ["Irol","employeer","$5900","2016/05/11","data","1002"]
			   ]
			},
			{
				"header":["姓名","职位","薪资","入职日期","部门","其他"],
		  		"field" :["name","position","salary","start_date","office","extn"],
		   		"data" :[
				    ["Adison","employeer","$5000","2015/05/10","data","1001"],
				    ["John","employeer","$6000","2015/05/11","data","1002"],
				    ["Tomase","employeer","$5500","2015/05/10","data","1001"],
				    ["Arivl","employeer","$7000","2015/05/11","data","1002"],
				    ["Andy","employeer","$6000","2015/05/10","data","1001"],
				    ["Irol","employeer","$5900","2015/05/11","data","1002"]
			   ]
			}
		];
	}
})();