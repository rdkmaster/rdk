describe('Unit:Directives',function(){
    var $compile,$rootScope,$httpBackend;
	//加载应用
	beforeEach(module('rd.controls.Graph'));
	beforeEach(module('rd.attributes.bind_ds'));
//	beforeEach(function() {
//		var Utils,EventService,NodeService;
//		mock = {alert: jasmine.createSpy()};
//		module(function($provide) {
//		$provide.value('document', mock);
//		});
//	});
	beforeEach(inject(function(_$compile_, _$rootScope_,_$httpBackend_, _$q_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $compile = _$compile_;
      $rootScope = _$rootScope_;
	 
	  $httpBackend = _$httpBackend_;


       $httpBackend.when('GET', '/demo/combinedPie').respond(200,{"data":[["SGW负载问题","26","1","1"],
		["SGW非负载问题","17","2","1"],
		["APN对应的业务网关负载问题","16","1","2"],
		["APN对应的业务网关非负载问题","15","2","2"]
		],
		"header":["aggr_pl_lowthroughput_cn2.causeName","aggr_pl_lowthroughput_cn2.num","aggr_pl_lowthroughput_cn2.causeID","aggr_pl_lowthroughput_cn2.objectTypeID"],
		"rowDescriptor":[],
		"field":["causeName","num","causeID","objectTypeID"]});
		
       $httpBackend.when('GET', '/template/pie').respond(200,{
    "title" : {
        "text": "可以在vmax-graph节点上，使用tpl.title.text来修改为实际值", 
        "subtext": "可以在vmax-graph节点上，使用tpl.title.subtext来修改为实际值",
        "x":"center"
    },
    "tooltip" : {
        "trigger": "item",
        "formatter": "{a} <br/>{b} : {c} ({d}%)"
    },
    "legend": {
            "orient": "vertical", 
            "x": "left",
            "y": "30px",
            "data": "$ctx.column($ctx.data, 0)"
    },
    "calculable" : false,
    "series" : [
        {
            "name":"", 
            "type":"pie",
            "selectedMode": "single",
            "radius" : "55%",

            "x": "20%",
            "width": "40%",
            "funnelAlign": "right",
            "max": 1548,

            "itemStyle" : {
                "normal" : {
                    "label" : {
                        "position" : "inner"
                    },
                    "labelLine" : {
                        "show" : false
                    }
                }
            },

            "center": ["50%", "60%"],
            "data":"$ctx.repeat('$i', 0, '$ctx.data.length', {value:'$ctx.column($ctx.data, 1)[$i]', name:'$ctx.column($ctx.data, 0)[$i]'})"
        }
    ]
    });
	   } ));
	it('Replaces the element with the appropriate content', function() {
        // 编译一个HTML包含这个指令
        var element = $compile("<rdk-graph></rdk-graph>")($rootScope);
        // 开启所有监听, 所以范围表达式1将被评估
        $rootScope.$digest();
        // 检查元素包含编译模板化的内容
		console.log("11111"+element.html());
        expect(element.html().search('__unique_id__')).toEqual(9);    //从字符串的开始进行检索  <div id="echartID"></div>
    });
		
	describe('Unit:Directives',function(){
		var ds_combined;
		beforeEach(function() {
			inject(function($injector) {
				DSService = $injector.get('DataSourceService');
				EventService = $injector.get('EventService');
				 EventService.init($rootScope);
			});
			
			//创建数据源
			var id = 'aa', dataSources = '/demo/combinedPie', handlers = {};
			handlers.dataProcessor = function(data) {
				return data;
			};	
			spyOn(DSService, 'create').and.callThrough();
			ds_combined = DSService.create(id, dataSources, handlers);
		});
		
		it('check function', function() {
			// 进行绑定信息，并执行相应的方法(涉及attrs，style，id)
			element = angular.element("<rdk-graph bind-ds='aa' id='bb' style='width:1000px;height:800px'></rdk-graph>");
			angular.element(document.body).append(element);
			var element = $compile(element)($rootScope);  
			var dataBuffer,scope,attrs,data;			
			$rootScope.$digest();
		});
		
		it('Replaces the element with the appropriate content', function() {
			// 进行绑定信息,对构建数据进行查询
			element = angular.element("<rdk-graph bind-ds='aa' graph_template='/template/pie' itemHover='cc' style='width:1000px;height:800px'></rdk-graph>");
			angular.element(document.body).append(element);		
			var element = $compile(element)($rootScope); 
			EventService.broadcast('aa', "start_query", {});
			setTimeout(function(){
				$httpBackend.flush();    //在flush时候进行查询
			},4000);	
		});
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})