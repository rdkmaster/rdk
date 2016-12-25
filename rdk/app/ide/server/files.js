(function() {
	return function(request) {
		log(request.path);
		if (!request || !request.path) {
			return [];
		}
		log(file.web());
		var path = request.path;
		log('['+request.pattern+']');
		var files = file.list(request.path, request.pattern, request.recursive);
		return files;
	}
})();