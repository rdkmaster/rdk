global.define = function(name, deps, callback) {
    deps = typeof name === 'string' ? deps : name;
    console.log(deps);
}

console.log(__filename);

global.requirejs = {
    config: function() {}
}

global.location = {
    pathname: '/rdk/app/example/web/index.html'
}
