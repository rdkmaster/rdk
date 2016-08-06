describe("tests of  reverse function", function() {
	var mock, notify;
	beforeEach(module('rd.services.Utils'));
	beforeEach(function() {
	  mock = {alert: jasmine.createSpy()};

	  module(function($provide) {
		$provide.value('$window', mock);
	  });

	  inject(function($injector) {
		notify = $injector.get('Utils');
	  });
	});
    it('should have a method to check if the path is active', function() {
		
		expect("_abcd").toEqual(notify.camel2snake("Abcd"));   
		
	});
	it('should have a method to check if the path is active', function() {
		
		expect("ABcd").toEqual(notify.snake2camel("_a-bcd")); 
	
	});
	it('should have a method to check if the path is active', function() {
		
		expect("AB").toEqual(notify.snake2camel("_AB"));
		
	});
	it('should have a method to check if the path is active', function() {
		
		expect(false).toEqual(notify.likePromise(aa));     
		
	});

	it('should have a method to check if the path is active', function() {
		
        expect(true).toEqual(("http://www.jb51.net").startWith("http://www.jb51.net")); 
		
	});
	it('should have a method to check if the path is active', function() {
		
		expect(false).toEqual(("http://www.jb51.net").startWith(""));    
		
	});
	it('should have a method to check if the path is active', function() {
		
		expect(false).toEqual(("http://w w w.jb51.net").startWith("http://www.jb51.net"));  //
		
	});
	xit('should have a method to check if the path is active', function() {
		
		expect(notify.parseFromUrl("11111111,222")).toHaveBeenCalled();    
		
	});
	xit('should have a method to check if the path is active', function() {
		var funcName = "sksdk(123)";
		var scope="";
		expect("sksdk/23\u5934\u8854").toEqual(notify.findFunction(funcName,scope));   
	});

	function aa(){
	    //
	}
});
