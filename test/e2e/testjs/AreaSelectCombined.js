'use strict';
describe("test area_selector combined",function(){
	it('area-select test scene 1 : only select province',function(){
		browser.get("test/e2e/testee/area/web/combined.html")
		.then(function(){
			browser.waitForAngular();
			browser.sleep(2000);
		});
		var input = element(by.css(".scene1 .combo-content .form-control"));//获得combo下input框，也是点击和显示选中值的element
		//area selector待选择的省列表lis
		var provinceList=element.all(by.css(".scene1 .rdk-combo-select-module .rdk-area-contain .tab-panel ul li a"));
		expect(provinceList.count()).toBe(34); // 期望待选择的省数量应该为34个
		provinceList.each(function(item){
			input.click().then(function(){
				var itemText = item.getText();
				item.click().then(function(){
					// 遍历点击每个省后验证结果
					expect(input.getAttribute("title")).toBe(itemText);
				});
			});
		});
	});

	it('area-select test scene 2 : select province ,city and area',function(){
		browser.get("test/e2e/testee/area/web/combined.html")
		.then(function(){
			browser.waitForAngular();
			browser.sleep(2000);
		});
		var input = element(by.css(".scene2 .combo-content .form-control"));//获得combo下input框，也是点击和显示选中值的element
		input.click();
		browser.sleep(1000);
		//area selector待选择的省列表provinceList
		var provinceList=element.all(by.css(".scene2 .rdk-combo-select-module .rdk-area-contain div[class$=tab-panel] ul li a"));
		provinceList.count().then(function(provinceCount){
			var provItemRandom = parseInt(Math.random()*provinceCount);
			var provinceItem = provinceList.get(provItemRandom);
			provinceItem.getText().then(function(provinceName){
				provinceItem.click().then(function(){
					var cityList=element.all(by.css(".scene2 .rdk-combo-select-module .rdk-area-contain div[class$=tab-panel] ul li a"));
					cityList.count().then(function(cityCount){
						var cityItemRandom = parseInt(Math.random()*(cityCount-1))+1;
						var cityItem = cityList.get(cityItemRandom);
						cityItem.getText().then(function(cityName){
							cityItem.click().then(function(){
								var areaList=element.all(by.css(".scene2 .rdk-combo-select-module .rdk-area-contain div[class$=tab-panel] ul li a"));
								areaList.count().then(function(areaCount){
									var areaItemRandom = parseInt(Math.random()*(areaCount-1))+1;
									var areaItem = areaList.get(areaItemRandom);
									areaItem.getText().then(function(areaName){
										areaItem.click().then(function(){
											var result = provinceName + " | " + cityName + " | " + areaName;
											// 验证选择到区时的结果是否正确
											expect(input.getAttribute("title")).toBe(result);
										})
									})
								});
							})
						});
					});
				});
			});
		});
	});

	it('area-select test scene 3 : select province ,city',function(){
		browser.get("test/e2e/testee/area/web/combined.html")
		.then(function(){
			browser.waitForAngular();
			browser.sleep(2000);
		});
		var input = element(by.css(".scene3 .combo-content .form-control"));//获得combo下input框，也是点击和显示选中值的element
		input.click();
		browser.sleep(1000);
		var provinceList=element.all(by.css(".scene3 .rdk-combo-select-module .rdk-area-contain div[class$=ng-scope] ul li a"));
		provinceList.count().then(function(provinceCount){
			var provItemRandom = parseInt(Math.random()*provinceCount);
			var provinceItem = provinceList.get(provItemRandom);
			provinceItem.getText().then(function(provinceName){
				provinceItem.click().then(function(){
					var cityList=element.all(by.css(".scene3 .rdk-combo-select-module .rdk-area-contain div[class$=tab-panel] ul li a"));
					cityList.count().then(function(cityCount){
						var cityItemRandom = parseInt(Math.random()*(cityCount-1))+1;
						var cityItem = cityList.get(cityItemRandom);
						cityItem.getText().then(function(cityName){
							cityItem.click().then(function(){
								var result = provinceName + " | " + cityName;
								expect(input.getAttribute("title")).toBe(result);
							});
						});
					});
				});
			});
		});
	});

	it('area-select test scene 4 :only select city,province is freezed',function(){
		browser.get("test/e2e/testee/area/web/combined.html")
			.then(function(){
				browser.waitForAngular();
				browser.sleep(2000);
			});
		var input = element(by.css(".scene4 .combo-content .form-control"));//获得combo下input框，也是点击和显示选中值的element
		input.click();
		var cityList=element.all(by.css(".scene4 .rdk-combo-select-module .rdk-area-contain div[class$=tab-panel] ul li a"));
		var cityItem = cityList.get(3);
		var cityName = cityItem.getText();
		cityItem.click().then(function(){
			expect(input.getAttribute("title")).toBe(cityName);
		})
	});

	//验证选择全省时的结果是否正确
	it('area-select test scene 5 : Select special labels for the province',function(){
		browser.get("test/e2e/testee/area/web/combined.html")
		.then(function(){
			browser.waitForAngular();
			browser.sleep(2000);
		});
		var input = element(by.css(".scene2 .combo-content .form-control"));//获得combo下input框，也是点击和显示选中值的element
		input.click();
		var provinceList=element.all(by.css(".scene2 .rdk-combo-select-module .rdk-area-contain div[class$=tab-panel] ul li a"));
		var provinceItem = provinceList.get(3);
		var provinceName = provinceItem.getText();
		provinceItem.click().then(function(){
			var cityList=element.all(by.css(".scene2 .rdk-combo-select-module .rdk-area-contain div[class$=tab-panel] ul li a"));
			var cityItem = cityList.get(0);
			var cityName = cityItem.getText();
			browser.sleep(1000);
			expect(cityName).toBe("全省");
			cityItem.click().then(function(){
				expect(input.getAttribute("title")).toBe(provinceName);
			})
		});
	});

	// 验证选择全市时的结果是否正确
	it('area-select test scene 6 : Select special labels for the city',function(){
		browser.get("test/e2e/testee/area/web/combined.html")
		.then(function(){
			browser.waitForAngular();
			browser.sleep(2000);
		});
		var input = element(by.css(".scene2 .combo-content .form-control"));//获得combo下input框，也是点击和显示选中值的element
		input.click();
		var provinceList=element.all(by.css(".scene2 .rdk-combo-select-module .rdk-area-contain div[class$=tab-panel] ul li a"));
		provinceList.count().then(function(provinceCount){
			var provItemRandom = parseInt(Math.random()*provinceCount);
			var provinceItem = provinceList.get(provItemRandom);
			provinceItem.getText().then(function(provinceName){
				provinceItem.click().then(function(){
					var cityList=element.all(by.css(".scene2 .rdk-combo-select-module .rdk-area-contain div[class$=tab-panel] ul li a"));
					cityList.count().then(function(cityCount){
						var cityItemRandom = parseInt(Math.random()*(cityCount-1))+1;
						var cityItem = cityList.get(cityItemRandom);
						cityItem.getText().then(function(cityName){
							cityItem.click().then(function(){
								var areaList=element.all(by.css(".scene2 .rdk-combo-select-module .rdk-area-contain div[class$=tab-panel] ul li a"));
								var areaItem = areaList.get(0);
								areaItem.getText().then(function(areaName){
									expect(areaName).toBe("全市");
									areaItem.click().then(function(){
										expect(input.getAttribute("title")).toBe(provinceName + " | " + cityName);
									})
								});
							})
						});
					});
				});
			});
		});
	});
});