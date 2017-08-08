
var fs = require('fs');

var args = normalizeArgs(process.argv.slice(2));
console.log('code home:  ' + args.c);
console.log('version:    ' + args.v);
console.log('extensions: ' + args.e);
console.log('excludes:   ' + args.x);
var reFileMatcher = new RegExp(args.e.join('|').replace(/(\w+)/g, '(\\.$1$)'), 'i');

console.log('-------------------------------------------');
processFiles(args.c)

function processFiles(dir) {
    var files = fs.readdirSync(dir);
    files.forEach(file => {
        var path = `${dir}/${file}`;
        var stat = fs.lstatSync(path);
        if (stat.isDirectory()) {
            processFiles(path);
        } else if (args.x.indexOf(file) == -1 && file.match(reFileMatcher)) {
            console.log('renamming: ' + path);

            var newFile = path.replace(/(.+)(\.\w+?)$/i, '$1-' + args.v + '$2');
            fs.rename(path, newFile)
        }
    })
}

function normalizeArgs(argv) {
    var res = {v: '0.0.0', c: ''};
    for (var i = 0; i < argv.length; i++) {
        var arg = argv[i];
        var match = arg.match(/-(\w+)/);
        if (!match) {
            continue;
        }
        var prop = match[1];
        res[prop] = argv[i+1];
    };
    res.e = res.e ? res.e.split(/\s*,\s*/g) : ['js', 'html', 'css'];
    res.x = res.x ? res.x.split(/\s*,\s*/g) : ['index.html'];
    if (!res.v || !res.c) {
        printUsageAndExit('version(-v) and code home(-c) is required!');
    }
    if (!fs.existsSync(res.c)) {
        printUsageAndExit('code home[' + res.c + '] do not exist!');
    }
    if (!fs.lstatSync(res.c).isDirectory()) {
        printUsageAndExit('code home[' + res.c + '] need to be a directory!');
    }
    res.c = res.c.match(/[\\\/]\s*$/) ? res.c.substring(0, res.c.length-1) : res.c;
    return res;
}

function printUsageAndExit(msg) {
    console.log(msg);
    console.log();
    console.log('Usage:');
    console.log('  add-version-info -v version -c code-home [-e extensions] [-x excludes]');
    process.exit(1);
}
