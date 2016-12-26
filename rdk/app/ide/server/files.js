(function() {
	function _get(request) {
		if (!request || !request.path) {
			return [];
		}
		var files = file.list(request.path, request.pattern, request.recursive);
		if (!request.needContent) {
			return files;
		}

		var result = [];
		_.each(files, function(filename) {
			result.push({
				file: filename,
				content: file.readString(filename)
			})
		});
		return result;
	}
	
	function _put(request) {
		var result = [];
		var files = request.files;
		if (!files) {
			return result;
		}

		_.each(files, function(content, filename) {
			if (file.save(filename, content)) {
				result.push(filename);
			}
		});
		return result;
	}
	
	function _post(request) {

	}
	
	function _del(request) {

	}

	return {
		get: _get,
		put: _put,
		post: _post,
		delete: _del,
	}
})();