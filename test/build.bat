rem 更改当前目录为批处理本身的目录
cd /d %~dp0
node ./node_modules/karma/bin/karma start
pause
