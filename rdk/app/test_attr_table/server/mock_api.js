function matrix(sql){
	if(sql==='select dim_city from dim_region'){
		return {
			header:['cityid','citylabel'],
			field:['编号','城市'],
			data:[
			{id:1,label:"南京"},
			{id:2,label:"苏州"},
			{id:3,label:"常州"},
			{id:4,label:"无锡"}
			]
		}
	}else if(sql==='select dim_province from dim_region'){
		return {
			"title1":[
				{"id":1,"label":"江苏"},
				{"id":2,"label":"广东"},
				{"id":3,"label":"湖北"},
				{"id":4,"label":"广西"}
			]
		}
	}else if(sql==='selectdim_name,dim_position,dim_salary,'+
        	'dim_start_date,dim_office,dim_exth'+
        	'from dim_workers'){
		return {
		  "header":["姓名","职位","薪资","入职日期","部门","其他"],
		  "field" :["name","position","salary","start_date","office","extn"],
		   "data" :[
			    ["aaa","employeer","$5000","2016/05/10","data","1001"],
			    ["bbb","employeer","$5000","2016/05/11","data","1002"],
			    ["ccc","employeer","$5000","2016/05/10","data","1001"],
			    ["ddd","employeer","$5000","2016/05/11","data","1002"],
			    ["eee","employeer","$5000","2016/05/10","data","1001"],
			    ["fff","employeer","$5000","2016/05/11","data","1002"],
			    ["ggg","employeer","$5000","2016/05/10","data","1001"],
			    ["hhh","employeer","$5000","2016/05/11","data","1002"],
			    ["jjj","employeer","$5000","2016/05/10","data","1001"],
			    ["kkk","employeer","$5000","2016/05/11","data","1002"],
			    ["lll","employeer","$5000","2016/05/10","data","1001"],
			    ["mmm","employeer","$5000","2016/05/11","data","1002"]
		   ]
		}
	}
	else if(sql==='select ds_accordion from dim_accordion'){
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
		]
	}else if(sql==='select tab_items from dim_tab_select'){
		return {
		    "classes": [ {"label": "省"}, {"label": "市"}, {"label": "区"}, {"label": "苑"} ],
		    "items": [
		        {
		            "label": "江苏省",
		            "items": [
		                {
		                    "label": "南京市",
		                    "items": [
		                        {
		                            "label": "雨花区",
		                            "items": [
		                                {
		                                    "label": "银杏山庄",
		                                    "items": []
		                                },
		                                {
		                                    "label": "翠岭银河",
		                                    "items": []
		                                },
		                                {
		                                    "label": "银杏山庄",
		                                    "items": []
		                                },
		                                {
		                                    "label": "翠岭银河",
		                                    "items": []
		                                },
		                                {
		                                    "label": "银杏山庄",
		                                    "items": []
		                                },
		                                {
		                                    "label": "翠岭银河",
		                                    "items": []
		                                },
		                                {
		                                    "label": "银杏山庄",
		                                    "items": []
		                                },
		                                {
		                                    "label": "翠岭银河",
		                                    "items": []
		                                },
		                                {
		                                    "label": "银杏山庄",
		                                    "items": []
		                                },
		                                {
		                                    "label": "翠岭银河",
		                                    "items": []
		                                },
		                                {
		                                    "label": "银杏山庄",
		                                    "items": []
		                                },
		                                {
		                                    "label": "翠岭银河",
		                                    "items": []
		                                }
		                            ]
		                        },
		                        {
		                            "label": "江宁区",
		                            "items": [
		                                {
		                                    "label": "文鼎雅苑",
		                                    "items": []
		                                },
		                                {
		                                    "label": "文鼎雅苑2",
		                                    "items": []
		                                }
		                            ]
		                        }
		                    ]
		                },
		                {
		                    "label": "苏州市",
		                    "items": [
		                        {
		                            "label": "吴中区",
		                            "items": [
		                                {
		                                    "label": "灵岩山庄",
		                                    "items": []
		                                },
		                                {
		                                    "label": "天平山庄",
		                                    "items": []
		                                }
		                            ]
		                        },
		                        {
		                            "label": "金阊区",
		                            "items": [
		                                {
		                                    "label": "文鼎雅苑",
		                                    "items": []
		                                },
		                                {
		                                    "label": "文鼎雅苑2",
		                                    "items": []
		                                },
		                                {
		                                    "label": "文鼎雅苑2",
		                                    "items": []
		                                },
		                                {
		                                    "label": "文鼎雅苑2",
		                                    "items": []
		                                }
		                            ]
		                        }
		                    ]
		                }
		            ]
		        },
		        {
		            "label": "浙江省",
		            "items": [
		                {
		                    "label": "宁波市",
		                    "items": []
		                },
		                {
		                    "label": "杭州市",
		                    "items": []
		                }
		            ]
		        }   
		    ]
		}
	}else if(sql==='select fold_items from dim_fold_select'){
		return [
			{ "id": 0, "label": "江苏省" },
			{ "id": 1, "label": "浙江省" },
			{ "id": 2, "label": "广东省" },
			{ "id": 3, "label": "广西省" },
			{ "id": 4, "label": "河北省" },
			{ "id": 5, "label": "河南省" },
			{ "id": 6, "label": "湖北省" },
			{ "id": 7, "label": "湖南省" },
			{ "id": 8, "label": "新疆省" },
			{ "id": 9, "label": "四川省" }
		]
	}else if(sql==='select cityid,cityname from dim_city'){
		return {
			header:['cityid','cityname'],
			field:['编号','城市'],
			data:[
				{
				    value:1,
					label:"南京"
				},
				{
					value:2,
					label:"扬州"
				},
				{
					value:3,
					label:"苏州"
				}
			]
		}
	}else if(sql==='select web_framework from framework'){
		return [
			{value:1,label:"nodejs"},
			{value:2,label:"angularjs"},
			{value:3,label:"reactjs"},
			{value:4,label:"bootstrap"}
		]
	}
}