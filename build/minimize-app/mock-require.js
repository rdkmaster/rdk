global.define = function(name, deps, callback) {
    deps = typeof name === 'string' ? deps : name;
    global.dependencyArray = deps;
}

require.config = function() {}

global.location = {
    pathname: '/rdk/app/example/web/index.html'
}
