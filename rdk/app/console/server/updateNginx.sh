#!/bin/bash

# ***************************************************************************
#  usage: ./updateNginx.sh "docker_ips"  "/home/tools/nginx-1.4.7/conf/nginx.conf"
# ***************************************************************************

docker_ips=$1
filepath=$2
echo "updateNginx docker_ips: $docker_ips" >> ./updateNginx_log.txt
function replace()
{
   key="upstream\ web_rdk_server_pool"
   prefix=" upstream web_rdk_server_pool {"
   suffix=" }"

   OLD_IFS="$IFS"
   IFS=","
   iplist=($docker_ips)
   IFS="$OLD_IFS"
   for sub in ${iplist[@]}
   do
       ip=$ip"server "$sub" weight=1;"
   done

   content=$prefix$ip$suffix

   line=`sed -n "/$key/=" $filepath`
   sed -i "${line}c $content" $filepath


}

#参数必须大于等于1个
if [ "$#" -lt 1 ] ; then
    echo "parameter less than 1 "
	exit 2
fi

replace
nohup /home/tools/nginx/stop.sh;/home/tools/nginx/run.sh &

