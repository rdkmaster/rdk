if (process.argv[2] == '-cmd') {
    console.log('用下面这个命令来给rdk可能修改的文件增加版本号：')
    console.log('    node add-version-info.js -v 2.3.x.yyy -c attributes,controls,containers,services');
    console.log('    其中2.3.x.yyy是rdk当前的代码版本，x是rdk当前真实版本号，yyy可以用补丁编号（或者是任意递增数字）');
    process.exit(0);
}

//先执行一下公共的add-version-info
require(`${__dirname}/../../../../doc/tools/add-version-info/add-version-info.js`);

var fs = require('fs');

var content = fs.readFileSync(`${__dirname}/rdk.js`).toString();
fs.writeFileSync(`${__dirname}/rdk.js`, content.replace("mainconfig", "mainconfig-" + args.v));

content = fs.readFileSync(`${__dirname}/mainconfig.js`).toString();
fs.unlinkSync(`${__dirname}/mainconfig.js`);
fs.writeFileSync(`${__dirname}/mainconfig-${args.v}.js`,
    content.replace(/"(rd\.(attributes|containers|controls|services)\.\w+?)":\s*"(.+?)"\s*,/g, `"$1": "$3-${args.v}",`));

console.log('=================================================================================')
console.log('添加版本信息成功！');
console.log('在git-bash中，执行下面这个命令可以清理这个目录下的垃圾文件')
console.log('rm -fr attributes controls containers services mainconfig-' + args.v +
    '.js; git checkout attributes controls containers services mainconfig.js rdk.js');