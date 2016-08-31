'use strict';
describe('Table Demos',function(){
    beforeEach(function(){
        browser.get('test/e2e/testee/time/web/self.html');
        browser.sleep(2000);
    });
    afterEach(function(){
    });
    // 选择时间点
    it('单时间控件点击选择时间点是否正确',function(){
        //直接输入点击显示结果
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

    it('但时间控件限制时间点击选择时间点是否正确',function(){
        //直接输入点击显示结果
        var input=element.all(by.css(".demo2 input")).get(0);
        var time=element(by.css(".demo2 p"));
        var days=element(by.css(".datetimepicker:nth-child(9)>.datetimepicker-days tbody tr:first-child td:nth-child(3)"));
        input.click();
        days.click();
        time.getText().then(function(txt){
            expect(txt).toBe("2015-01-01");
        });
    });

    it('双时间控件点击选择时间点是否正确',function(){
        //直接输入点击显示结果
        var time=element(by.css(".demo3 p"));
        var timeOne = element(by.css(".demo3 input:first-child"));
        var timeTwo = element(by.css(".demo3 input:nth-child(3)"));
        var timeOneMinutes = element(by.css(".datetimepicker:nth-child(10)>.datetimepicker-minutes thead tr .switch"));
        var timeOneHours = element(by.css(".datetimepicker:nth-child(10)>.datetimepicker-hours thead tr .switch"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(10)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(10)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(10)>.datetimepicker-years thead tr .switch"));

        var ontYears = element(by.css(".datetimepicker:nth-child(10)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var ontMonths = element(by.css(".datetimepicker:nth-child(10)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var ontDays = element(by.css(".datetimepicker:nth-child(10)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var ontHours = element(by.css(".datetimepicker:nth-child(10)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var ontMinutes = element(by.css(".datetimepicker:nth-child(10)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));


        var timeTwoMinutes = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-minutes thead tr .switch"));
        var timeTwoHours = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-hours thead tr .switch"));
        var timeTwoDays = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
        var twoHours = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-hours tbody tr:first-child td span:nth-child(1)"));
        var twoMinutes = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-minutes tbody tr:first-child td span:nth-child(1)"));
   

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
        //直接输入点击显示结果
        var select = element(by.css(".demo3 select"));
        var selectDays = element(by.css(".demo3 option:nth-child(3)"));
        
        var time = element(by.css(".demo3 p"));
        var timeOne = element(by.css(".demo3 input:first-child"));
        var timeTwo = element(by.css(".demo3 input:nth-child(3)"));

        var timeOneDays = element(by.css(".datetimepicker:nth-child(12)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(12)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(12)>.datetimepicker-years thead tr .switch"));

        var ontYears = element(by.css(".datetimepicker:nth-child(12)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var ontMonths = element(by.css(".datetimepicker:nth-child(12)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var ontDays = element(by.css(".datetimepicker:nth-child(12)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));


        var timeTwoDays = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var twoMonths = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var twoDays = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
   
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

    it('点击选择时间点是否正确',function(){
        //直接输入点击显示结果
        var time = element(by.css(".demo4 p"));
        var timeOne = element(by.css(".demo4 input:first-child"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-years thead tr .switch"));

        var ontYears = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var ontMonths = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var ontDays = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));
   
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
        //直接输入点击显示结果
        var select = element(by.css(".demo4 select"));
        var selectMinutes = element(by.css(".demo4 option:first-child"));
        
        var time = element(by.css(".demo4 p"));
        var timeOne = element(by.css(".demo4 input:first-child"));
        var timeTwo = element(by.css(".demo4 input:nth-child(3)"));
        var timeOneDays = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-days thead tr .switch"));
        var timeOneMonths = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-years thead tr .switch"));

        var ontYears = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var ontMonths = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));
        var ontDays = element(by.css(".datetimepicker:nth-child(11)>.datetimepicker-days tbody tr:first-child td:nth-child(6)"));


        var timeTwoDays = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-days thead tr .switch"));
        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
   
        select.click();
        selectMinutes.click();

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
        //直接输入点击显示结果
        var select = element(by.css(".demo4 select"));
        var selectMinutes = element(by.css(".demo4 option:nth-child(3)"));
        
        var time = element(by.css(".demo4 p"));
        select.click();
        selectMinutes.click();

        var timeOne = element(by.css(".demo4 input:first-child"));
        var timeTwo = element(by.css(".demo4 input:nth-child(3)"));

        var timeOneMonths = element(by.css(".datetimepicker:nth-child(12)>.datetimepicker-months thead tr .switch"));
        var timeOneYears = element(by.css(".datetimepicker:nth-child(12)>.datetimepicker-years thead tr .switch"));

        var ontYears = element(by.css(".datetimepicker:nth-child(12)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
        var ontMonths = element(by.css(".datetimepicker:nth-child(12)>.datetimepicker-months tbody tr:first-child td span:nth-child(1)"));


        var timeTwoMonths = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-months thead tr .switch"));
        var timeTwoYears = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-years thead tr .switch"));

        var twoYears = element(by.css(".datetimepicker:nth-child(13)>.datetimepicker-years tbody tr:first-child td span:nth-child(2)"));
   
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