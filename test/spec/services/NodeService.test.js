describe("tests of addScope function", function() {
	var mock, notify;
	beforeEach(module('rd.services.NodeService'));
	beforeEach(function() {
	  mock = {alert: jasmine.createSpy()};

	  module(function($provide) {
		$provide.value('$window', mock);
	  });

	  inject(function($injector) {
		notify = $injector.get('NodeService');
	  });
	});
    it('should have a method to check if the method is active', function() {
	    var nodeId = 1;
		var scope="";
		expect(undefined).toEqual(notify.addScope(nodeId,scope)); 
//		expect(notify.addScope(nodeId,scope)).toBeUndefined();
        expect("").toEqual(notify.getScope(nodeId,scope)); 		
		
		});
});
