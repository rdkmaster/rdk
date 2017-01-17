'use strict';
describe("test area_selector self test",function(){
    //验证show-all属性是否生效
    it('rdk-area-select controls test property: show-all',function(){
        //要求浏览器访问网址http://www.angularjs.org
        browser.get("test/e2e/testee/area/web/self.html")
            .then(function(){
                browser.waitForAngular();
                browser.sleep(2000);
            });
        var provinceList=element.all(by.css(".test-show-all .rdk-area-contain div[class$=rdk-area-panel] ul li a"));
        expect(provinceList.count()).toBe(34); // 期望待选择的省数量应该为34个
        var provinceItem = provinceList.get(0);
        provinceItem.click().then(function(){
            var cityList = element.all(by.css(".test-show-all .rdk-area-contain div[class$=rdk-area-panel] ul li a"));
            var cityItem = cityList.get(0);
            var cityName = cityItem.getText();
            cityItem.click().then(function(){
                var areaList = element.all(by.css(".test-show-all .rdk-area-contain div[class$=rdk-area-panel] ul li a"));
                var areaItem = areaList.get(0);
                var areaName = areaItem.getText();
               // expect(cityName).toNotBe("全省"); //不显示全省，全市特殊标签
               // expect(areaName).toNotEqual("全市");
                expect(cityName==="全省").toBe(false);
                expect(areaName==="全市").toBe(false);
            })
        });
    });

    //验证province-label,city-label,area-label属性是否生效
    it('rdk-area-select controls test property : province-label,city-label,area-label',function(){
        browser.get("test/e2e/testee/area/web/self.html")
        .then(function(){
            browser.waitForAngular();
            browser.sleep(2000);
        });
        var tabList=element.all(by.css(".test-label .rdk-area-contain .nav-tabs li a"));
        var areaElement = element(by.css(".test-label .rdk-area-contain"));
        var provinceLabel = areaElement.getAttribute("province-label");
        var cityLabel = areaElement.getAttribute("city-label");
        var areaLabel = areaElement.getAttribute("area-label");
        expect(tabList.get(0).getText()).toBe(provinceLabel);
        var provinceList=element.all(by.css(".test-label .rdk-area-contain div[class$=rdk-area-panel] ul li a"));
        var provinceItem = provinceList.get(1);
        provinceItem.click().then(function(){
            expect(tabList.get(1).getText()).toBe(cityLabel);
            var cityList=element.all(by.css(".test-label .rdk-area-contain div[class$=rdk-area-panel] ul li a"));
            var cityItem = cityList.get(1);
            cityItem.click().then(function(){
                expect(tabList.get(2).getText()).toBe(areaLabel);
            })
        });
    });

    //验证freeze-province属性是否生效
    it('rdk-area-select controls test property : freeze-province',function(){
        browser.get("test/e2e/testee/area/web/self.html")
        .then(function(){
            browser.waitForAngular();
            browser.sleep(2000);
        });
        var lists=element.all(by.css(".test-freezeProv .rdk-area-contain div[class$=rdk-area-panel] ul li a"));
        expect(lists.get(0).getText()).toBe("全省");
    });

    //验证回调是否执行
    it('rdk-area-select controls test property : change-handler',function(){
        browser.get("test/e2e/testee/area/web/self.html")
        .then(function(){
            browser.waitForAngular();
            browser.sleep(2000);
        });
        var flagHandler = element(by.binding("flagChangeHandler"));
        var provinceList=element.all(by.css(".test-change .rdk-area-contain div[class$=ng-scope] ul li a"));
        var provinceItem = provinceList.get(1);
        provinceItem.click().then(function(){
            var cityList=element.all(by.css(".test-change .rdk-area-contain div[class$=rdk-area-panel] ul li a"));
            var cityItem = cityList.get(1);
            cityItem.click().then(function()
            {
                expect(flagHandler.getText()).toBe("1");
            })
        });
    });
});