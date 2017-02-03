#!/bin/sh

basepath=$(cd `dirname $0`; pwd)
cd $basepath/..

echo "=================================================" >> $basepath/update.log
echo "updating... time: `date`" >> $basepath/update.log

# pull code.....
nodePid=`ps gaux | grep tools/node-linux-x64 | grep -v grep | awk '{print $2}'`
if [ ! "$nodePid" = "" ]; then
	kill -9 $nodePid
fi
git checkout rdk/proc/conf/rdk.cfg         >> $basepath/update.log
git checkout tools/http_server/config.json >> $basepath/update.log
git checkout master                        >> $basepath/update.log
git pull                                   >> $basepath/update.log

# remove upload_files
rm -fr $basepath/../rdk/upload_files
# remove temp demo files
rm -fr $basepath/../doc/client/demo/tmp

# restart rdk...
cd rdk/proc/bin
sh ./shutdown.sh > /dev/null

cd $basepath/..
# web listen 80 port
sed -i 's/\b8080\b/80/g' rdk/proc/conf/rdk.cfg

sh start.sh > /dev/null

