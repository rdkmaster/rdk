//先执行一下公共的add-version-info
require(`${__dirname}/../../../../doc/tools/add-version-info/add-version-info.js`);

var fs = require('fs');

var content = fs.readFileSync(`${__dirname}/rdk.js`).toString();
fs.writeFileSync(`${__dirname}/rdk.js`, content.replace("mainconfig", "mainconfig-" + args.v));

content = fs.readFileSync(`${__dirname}/mainconfig.js`).toString();
fs.unlinkSync(`${__dirname}/mainconfig.js`);
fs.writeFileSync(`${__dirname}/mainconfig-${args.v}.js`,
    content.replace(/"(rd\.(attributes|containers|controls|services)\.\w+?)":\s*"(.+?)"\s*,/g, `"$1": "$3-${args.v}",`));

