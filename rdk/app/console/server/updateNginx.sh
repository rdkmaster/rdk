#!/bin/bash

# ***************************************************************************
#  usage: ./updateNginx.sh "docker_ips"  "/home/tools/nginx-1.4.7/conf/nginx.conf"
# ***************************************************************************

docker_ips=$1
filepath=$2

root_path=$(cd "$(dirname "$0")"; pwd)
cd $root_path

log_path="../../../proc/logs/shellExecute.log"
log_path_back="../../../proc/logs/shellExecute.log1"


function CLEAN_LOG()
{
	declare -i FILESIZE LIMIT
	FILESIZE=0
	FILESIZE=`stat -c%s  ${log_path}`
	LIMIT=104857600 #100M Bytes
    if [ $FILESIZE -gt $LIMIT ]
    then
    	rm -rf ${log_path_back}
    	mv ${log_path}  ${log_path_back}
    fi	

}


function replace()
{
   CLEAN_LOG
   
   echo "************************************updatenginx*****************************************"  >> $log_path
   echo "[info] $(date "+%Y-%m-%d %H-%M-%S"), update nginx docker_ips: $docker_ips" >> $log_path

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

#paramter is two
if [ "$#" -lt 1 ] ; then
    echo "[info] $(date "+%Y-%m-%d %H-%M-%S"), parameter less than 1" >> $log_path
        exit 2
fi

replace
nohup /home/tools/nginx/stop.sh;/home/tools/nginx/run.sh &