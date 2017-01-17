'use strict';
xdescribe('time Self Demos',function(){
    // 选择时间点
    it('单时间控件点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self.html");
        var input=element.all(by.css(".demo1 input")).get(0);
        var time=element(by.css(".demo1 p"));
        var date=element.all(by.css(".datetimepicker")).get(0); 
        var days=element.all(by.css(".datetimepicker-days tbody tr:first-child td")).get(3)
        input.click();
        days.click();
        time.getText().then(function(txt){
            expect(txt).toBe("2014-07-30");
        });
    });

    it('单时间控件限制时间点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self1.html");
        var input=element.all(by.css(".demo2 input")).get(0);
        var time=element(by.css(".demo2 p"));
        var days=element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(3)"));
        input.click();
        days.click();
        time.getText().then(function(txt){
            expect(txt).toBe("2015-01-01");
        });
    });

    it('单时间控件可选时间粒度点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self4.html");
        var timeOne = element(by.css(".demo4 input:first-child"));
        var select = element(by.css(".demo4 button"));
        var option = element(by.css(".demo4 ul.dropdown-menu>li:nth-child(1)"));
        select.click();
        browser.sleep(300);
        option.click();

        var timeOneMinutes = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-minutes thead tr .switch"));
        var timeOneHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var ontHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var ontMinutes = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));
        timeOne.click();

        timeOneMinutes.click();
        timeOneHours.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        ontHours.click();
        ontMinutes.click();
        var time=element(by.css(".demo4 p"));
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-02 00:00");
        });
    });

    it('双时间控件点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self2.html");
        var time=element(by.css(".demo3 p"));
        var timeOne = element(by.css(".demo3 input:first-child"));
        var timeTwo = element(by.css(".demo3 input:nth-child(3)"));
        var timeOneMinutes = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-minutes thead tr .switch"));
        var timeOneHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var ontYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var ontMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var ontDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var ontHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var ontMinutes = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));

        timeOne.click();
        timeOneMinutes.click();
        timeOneHours.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        ontYears.click();
        ontMonths.click();
        ontDays.click();
        ontHours.click();
        ontMinutes.click();

        var timeTwoMinutes = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-minutes thead tr .switch"));
        var timeTwoHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours thead tr .switch"));
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var twoHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var twoMinutes = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));
   
        timeTwo.click();
        timeTwoMinutes.click();
        timeTwoHours.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        twoHours.click();
        twoMinutes.click();

        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 00:00 2010-01-01 00:00");
        });
    });

    it('双时间插件选择粒度后点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self2.html");
        var select = element(by.css(".demo3 .btn-group"));
        var option = element(by.css(".demo3 .btn-group>div>ul>li:nth-child(2)"));
        select.click();
        browser.sleep(300);
        option.click();
        
        var time = element(by.css(".demo3 p"));
        var timeOne = element(by.css(".demo3 input:first-child"));
        var timeTwo = element(by.css(".demo3 input:nth-child(3)"));
        var timeOneHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var oneHours = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));

        timeOne.click();

        timeOneHours.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        oneHours.click();
        var timeTwoHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours thead tr .switch"));
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var twoHours = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));

        timeTwo.click();
        timeTwoHours.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        twoHours.click();
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 00:00 2010-01-01 00:00");
        });
    });

    it('双时间插件选择粒度后点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self2.html");
        var select = element(by.css(".demo3 .btn-group"));
        var selectDays = element(by.css(".demo3 .btn-group>div>ul>li:nth-child(3)"));
        
        var time = element(by.css(".demo3 p"));
        var timeOne = element(by.css(".demo3 input:first-child"));
        var timeTwo = element(by.css(".demo3 input:nth-child(3)"));

        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var ontYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var ontMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var ontDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));


        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
   
        select.click();
        selectDays.click();

        timeOne.click();

        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        ontYears.click();
        ontMonths.click();
        ontDays.click();

        timeTwo.click();

        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();

        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 2010-01-01");
        });
    });

    it('双时间插件选择粒度后点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self2.html");
        var select = element(by.css(".demo3 .btn-group"));
        var option = element(by.css(".demo3 .btn-group>div>ul>li:nth-child(4)"));
        select.click();
        browser.sleep(300);
        option.click();
        
        var time = element(by.css(".demo3 p"));
        var timeOne = element(by.css(".demo3 input:first-child"));
        var timeTwo = element(by.css(".demo3 input:nth-child(3)"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var oneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeOne.click();

        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        oneDays.click();
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));

        timeTwo.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        twoDays.click();
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010第01周 2010第01周");
        });
    });
    
    it('双时间插件选择粒度后点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self2.html");
        var select = element(by.css(".demo3 .btn-group"));
        var option = element(by.css(".demo3 .btn-group>div>ul>li:nth-child(5)"));
        select.click();
        browser.sleep(400);
        option.click();
        
        var time = element(by.css(".demo3 p"));
        var timeOne = element(by.css(".demo3 input:first-child"));
        var timeTwo = element(by.css(".demo3 input:nth-child(3)"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var oneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var oneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));

        timeOne.click();

        timeOneMonths.click();
        timeOneYears.click();

        oneYears.click();
        oneMonths.click();
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));

        timeTwo.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        twoMonths.click();
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01 2010-01");
        });
    });
    
    it('点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self3.html");
        var time = element(by.css(".demo4 p"));
        var timeOne = element(by.css(".demo4 input:first-child"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var ontYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var ontMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var ontDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
   
        timeOne.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        ontYears.click();
        ontMonths.click();
        ontDays.click();

     
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 2010-01-04");
        });
    });

    it('点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self3.html");
        var select = element(by.css(".demo4 .btn-group"));
        var option = element(by.css(".demo4 .btn-group>div>ul>li:first-child"));
        
        var time = element(by.css(".demo4 p"));
        var timeOne = element(by.css(".demo4 input:first-child"));
        var timeTwo = element(by.css(".demo4 input:nth-child(3)"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var ontYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var ontMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var ontDays = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));


        var timeTwoDays = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
   
        select.click();
        browser.sleep(300);
        option.click();

        timeOne.click();
        timeOneDays.click();
        timeOneMonths.click();
        timeOneYears.click();

        ontYears.click();
        ontMonths.click();
        ontDays.click();

        timeTwo.click();
        timeTwoDays.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01-01 2010-01-04");
        });
    });

    it('点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self3.html");
        browser.sleep(500);
        //粒度选择周
        var select = element(by.css(".demo4 .btn-group"));
        select.click();
        browser.sleep(300);
        var option = element(by.css(".demo4 .btn-group>div>ul>li:nth-child(2)"));
        option.click();
        browser.sleep(300);
        //打开开始时间选择的面板
        var beginTimeItem = element(by.css(".demo4 input:first-child"));
        beginTimeItem.click();
        browser.sleep(300);
        //最终显示面板内容是年份
        var timeOneDays = element.all(by.css(".datetimepicker-days thead tr .switch"));
        expect(timeOneDays.get(1).getText()).toBe('八月 2016');
        timeOneDays.get(1).click();
        browser.sleep(300);
        var timeOneMonths = element.all(by.css(".datetimepicker-months thead tr .switch"));
        timeOneMonths.get(1).click();
        browser.sleep(300);
        //面板就绪 选择2010 01周 2010 03周
        var Years = element.all(by.css(".datetimepicker-years"));
        Years.get(1).all(by.css(".table-condensed tbody td span")).get(1).click();
        browser.sleep(300);
        //1月
        var oneMonths = element.all(by.css(".datetimepicker-months"));
        oneMonths.get(1).all(by.css(".table-condensed tbody td span")).get(0).click();
        browser.sleep(300);
        //2号
        var day2=element.all(by.css(".datetimepicker-days")).get(1);
        day2 = day2.all(by.css("tbody tr")).get(0);
        day2 = day2.all(by.css("td")).get(6);
        day2.click();
        browser.sleep(3000);
        //打开结束时间的面板
        var endTimeItem = element(by.css(".demo4 input.endTime"))
        endTimeItem.click();
        browser.sleep(300);
        //最终显示到年份的面板
        var timeTwoDays = element.all(by.css(".datetimepicker-days thead tr .switch"));
        expect(timeTwoDays.get(0).getText()).toBe("八月 2016");
        timeOneDays.get(0).click();
        browser.sleep(300);
        var timeTwoMonths = element.all(by.css(".datetimepicker-months thead tr .switch"));
        timeTwoMonths.get(0).click();
        browser.sleep(300);
        //面板就绪 选择2016 03周
        Years.get(0).all(by.css(".table-condensed tbody td span")).get(7).click();
        browser.sleep(300);
        //一月
        oneMonths.get(0).all(by.css(".table-condensed tbody td span")).get(0).click();
        browser.sleep(0);
        //11号
        var day11 = element.all(by.css(".datetimepicker-days")).get(0);
        day11 = day11.all(by.css("tbody tr")).get(2);
        day11 = day11.all(by.css("td")).get(1);
        day11.click();
        browser.sleep(300);
        var time = element(by.css(".demo4 p"));
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010第01周 2016第03周");
        });
    });

    it('点击选择时间点是否正确',function(){
        browser.get("test/e2e/testee/time/web/self3.html");
        var select = element(by.css(".demo4 .btn-group"));
        var option = element(by.css(".demo4 .btn-group>div>ul>li:nth-child(3)"));
        
        var time = element(by.css(".demo4 p"));
        select.click();
        browser.sleep(400);
        option.click();

        var timeOne = element(by.css(".demo4 input:first-child"));
        var timeTwo = element(by.css(".demo4 input:nth-child(3)"));

        var timeOneMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years thead tr .switch"));

        var ontYears = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var ontMonths = element(by.css(".datetimepicker:nth-child(5)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));


        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(6)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
   
        timeOne.click();
        timeOneMonths.click();
        timeOneYears.click();

        ontYears.click();
        ontMonths.click();

        timeTwo.click();
        timeTwoMonths.click();
        timeTwoYears.click();

        twoYears.click();
        
        time.getText().then(function(txt){
            expect(txt).toBe("2010-01 2010-03");
        });
    });
});