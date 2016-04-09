describe('tests of  EventService function', function() {
	/*定义所要测试服务的局部变量*/
	var EventSercie;
	var Utils;
	var rootScope;
	var scope;
	var ready = false;
	var _this;
	
	/*event事件的方法参数*/
	var dispatcher, eventType = 'click', callback, data;
	/*异步事件参数*/
	var _walkDomNode;

/*	beforeEach(function(done) {
		setTimeout(function() {
			eventRegisterVal = 0;
			done();
		}, 1);
	});*/

	/*beforeEach在每个it之前执行*/
	// beforeEach(module('rd.services.EventService', ['rd.services.Utils']));	/*加载模块:此种写法错误*/
	beforeEach(module('rd.services.EventService', 'rd.services.Utils'));	/*加载模块*/
	
	beforeEach(inject(function(_$rootScope_){	/*注入所要测试的服务*/
			scope = _$rootScope_.$new();
		})
	);

	beforeEach(
		inject(function($injector) {
    		EventSercie = $injector.get('EventService');
    		Utils = $injector.get('Utils');
    		rootScope =  $injector.get('$rootScope');
 	    })
	);

	// afterEach(function() {
	//     jasmine.clock().uninstall();
	// });

	/*测试init方法*/
	it('Access the init function', function(){
		spyOn(EventSercie, 'init').and.callThrough();
 	    EventSercie.init(scope);

		expect(EventSercie.init).toHaveBeenCalled();
	});


   /*测试register方法*/
	it('Access the register function', function() {
		spyOn(EventSercie, 'register').and.callThrough();
 	    EventSercie.register(dispatcher, eventType, callback);
		expect(EventSercie.register).toHaveBeenCalled();

		EventSercie.register(dispatcher, eventType, callback);
		expect(EventSercie.register.calls.count()).toEqual(2);
	});

 	/*测试broadcast方法*/
 	it('Access the broadcast function', function() {
		spyOn(EventSercie, 'broadcast').and.callThrough();    
		EventSercie.broadcast(dispatcher, eventType, data);

		expect(EventSercie.broadcast).toHaveBeenCalled();
 	});	


 	/*测试setTimeout：_walkDomNode*/
 	describe('The keys length of document is 3', function() {
 		var dom =	'<div>' +
			'<div on.get.event="handler">' + 
				'This is div' +
				'<div on.cause_class_all.click="handler"></div>'
			'</div>' +
			'<p on.post.event="handler">This is p</p>' +
		'</div>';

 		beforeEach(function() {
		    _walkDomNode = jasmine.createSpy('_walkDomNode');
		    jasmine.clock().install();

		    /*使用此方法需要引入jasmine-jquery.js库*/
		    setFixtures(dom);
	 	});

		afterEach(function() {
	    	jasmine.clock().uninstall();
		});

 		it('Test the _walkDomNode function with setTimeout', function() {
		    setTimeout(function() {
		      _walkDomNode(scope, dom);
		    }, 100);

		    expect(_walkDomNode).not.toHaveBeenCalled();
		    jasmine.clock().tick(101);
		    expect(_walkDomNode).toHaveBeenCalled();
		});
 	});

	describe('The keys length of document is 2', function() {
		var dom =	'<div>' +
			'<div on.get="handler">' + 
				'This is div' +
				'<div on.cause_class_all="handler"></div>'
			'</div>' +
			'<p on.post="handler">This is p</p>' +
		'</div>';

		 beforeEach(function() {
		    _walkDomNode = jasmine.createSpy('_walkDomNode');
		    jasmine.clock().install();

		    /*使用此方法需要引入jasmine-jquery.js库*/
		    setFixtures(dom);
	 	});

		afterEach(function() {
	    	jasmine.clock().uninstall();
		});		 

		it('Test the _walkDomNode function with setTimeout', function() {
		    setTimeout(function() {
		      _walkDomNode(scope, dom);
		    }, 100);

		    expect(_walkDomNode).not.toHaveBeenCalled();
		    jasmine.clock().tick(101);
		    expect(_walkDomNode).toHaveBeenCalled();
		});	
	});

	describe('The keys length of document is 4', function() {
 		var dom =	'<div>' +
			'<div on.get.event.handler="handler">' + 
				'This is div' +
				'<div on.cause_class_all.click.handler="handler"></div>'
			'</div>' +
			'<p on.post.event.handler="handler">This is p</p>' +
		'</div>';

		 beforeEach(function() {
		    _walkDomNode = jasmine.createSpy('_walkDomNode');
		    jasmine.clock().install();

		    /*使用此方法需要引入jasmine-jquery.js库*/
		    setFixtures(dom);
	 	});

		afterEach(function() {
	    	jasmine.clock().uninstall();
		});
		
		it('Test the _walkDomNode function with setTimeout', function() {
		    setTimeout(function() {
		      _walkDomNode(scope, dom);
		    }, 100);

		    expect(_walkDomNode).not.toHaveBeenCalled();
		    jasmine.clock().tick(101);
		    expect(_walkDomNode).toHaveBeenCalled();
		});	
	});


	/*为了确保init方法在register方法之前执行，将init方法放在beforeEach中，一定程度上解决了函数依赖关系*/
	describe('test register and broadcast function after init function', function() {
		beforeEach(function() {
			spyOn(EventSercie, 'init').and.callThrough();
 	    	EventSercie.init(scope);
		});

		it('test the register function again', function() {
			spyOn(EventSercie, 'register').and.callThrough();
	 	    EventSercie.register(dispatcher, eventType, callback);
			expect(EventSercie.register).toHaveBeenCalled();
		});

		it('test the broadcast function again', function() {
			spyOn(EventSercie, 'broadcast').and.callThrough();
		 	EventSercie.broadcast(eventType, {});
			expect(EventSercie.broadcast).toHaveBeenCalled();
		});
	});


	/*异步事件:事件注册回调函数*/
	describe('Asynchronous event', function() {
		it('register event', function() {

		});
	});


	/*异步事件:事件注册回调函数*/
	// describe('Asynchronous Spec', function() {
	// 	var eventRegisterVal;
	// 	var done = function(event, data) {
 //            if (dispatcher != '' && (dispatcher != data.dispatcher)) {
 //                return;
 //            }
 //            event.dispatcher = data.dispatcher;
 //            callback.call(_this.scope, event, data.userData);
 //        };

	// 	beforeEach(function(done) {
	// 		setTimeout(function() {
	// 			eventRegisterVal = 0;
	// 			done();
	// 		}, 1);
	// 	});	

	// 	it('Asynchronous event test', function(done) {
	// 	 	eventRegisterVal++;
	// 	    expect(eventRegisterVal).toBeGreaterThan(0);
	// 	    done();
	// 	});		
	// });
});
