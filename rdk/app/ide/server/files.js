(function() {
	return function(request) {
		if (!request || !request.path) {
			return [];
		}
		return file.list(request.path, request.pattern, request.recursive);
	}
})();