xdescribe("tests of addScope function", function() {
	var mock;
    var	I18nProvider;
	var translateProvider;
	beforeEach(module('rd.services.I18nService'));
	beforeEach(function() {
	  mock = {alert: jasmine.createSpy()};

	  module(function($provide) {
	   $provide.value('$translateProvider', mock);
      });

	  inject(function($injector) {
		I18nProvider = $injector.get('I18n');
	  });
	  
	  inject(function($injector) {   
		//translateProvider = $injector.get('$translateProvider');
	  });
	  
	});
	
	var prefix,defaultLanguage;
	
	it('Access the init function', function(){		
	   spyOn(I18nProvider, 'init').and.callThrough();
 	   //I18nProvider.init(prefix,defaultLanguage);
	   //expect(I18nProvider.init).toBeDefined();
	   //var instance = new translateProvider();
       //var provider = instance.init(prefix,defaultLanguage);
	   //console.log("22222"+provider);  
       console.log("11111"+I18nProvider);   
	   //expect(translateProvider.init(prefix,defaultLanguage)).toBeDefined();
	});

});
