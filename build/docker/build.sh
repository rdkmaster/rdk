role=$1
echo "run sshd service"
nohup /usr/sbin/sshd > myout.file 2>&1 &
cd /home/rdk_version
echo "unzip rdk-server"
unzip -o rdk-runtime-environment*.zip -d /home
cp -r /home/rdk-runtime-environment/rdk  /home
cd /home/rdk/app/console/server
if [ $role = 'slave' ] ;then
    rm -rf  application.properties
   touch application.properties
   echo "role = slave" >application.properties
fi

if [ $role = 'console' ] ;then
    rm -rf  application.properties
   touch application.properties
   echo "role = console" >application.properties
   cd /home/tools/nginx
   sh stop.sh
   sh run.sh
fi
cd /home/rdk
chmod -R 777 app

key="#ActiveMQ.ip"
filepath="/home/rdk/proc/conf/rdk.cfg"
prefix="ActiveMQ.ip = "
content=$prefix$OPENPALETTE_ACTIVEMQ_WS_PORT
line=`sed -n "/$key/=" $filepath`
sed -i "${line}c $content" $filepath

cd proc/bin
sh shutdown.sh
sh run.sh > /dev/null