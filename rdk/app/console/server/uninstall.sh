#!/bin/bash
#set -x

appname=$1
docker_ips=$2
root_path=$(cd "$(dirname "$0")"; pwd)
cd $root_path

app_path=$(cd ../../;cd $appname; pwd)
log_path="../../../proc/logs/shellExecute.log"
log_path_back="../../../proc/logs/shellExecute.log1"


function EXPECT_DELETE(){
	 host=$1
	 username=$2
	 password=$3
	 dst_path=$4
/usr/bin/expect <<EOF
set timeout 3
spawn ssh-keygen -R $host

if [ ${dst_path} != "/" ] && [[ ${dst_path} != "~" ]] && [[ ${dst_path} != "." ]] && [[ ${dst_path} != "./" ]]; then 
spawn ssh -t ${username}@${host} "rm -rf ${dst_path}"
expect {
        "*(yes/no)*"           { send "yes\r"; exp_continue}
        "*assword:*"           { send "$password\r"}
        "*Permission\ denied*" { send_user "[exec echo "\nError: Password is wrong\n"]"; exit 2}
        timeout                {exit 2}
}
expect eof
fi
EOF
    return $?
}

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

function MAIN(){

    CLEAN_LOG
    echo "************************************uninstall*****************************************"  >> $log_path
    echo "[info] $(date "+%Y-%m-%d %H-%M-%S"), uninstall start, docker_ips :${docker_ips} , app_path :${app_path} "  >> $log_path
    arr=$(echo $docker_ips|tr "," "\n")
    for ip_port in $arr
    do
      ip=${ip_port%:*}
      EXPECT_DELETE $ip admin admin $app_path
      ret=$? 
      if [ $ret -ne 0 ];then
      {
      	echo "[error] $(date "+%Y-%m-%d %H-%M-%S"), docker_ip :${ip}, app_path :${app_path} , uninstalled is failed, retcode is ${ret}!!!"  >> $log_path
        exit 2
      }
      fi
      echo "[info] $(date "+%Y-%m-%d %H-%M-%S"), docker_ip :${ip}, app_path :${app_path} , uninstalled success"  >> $log_path
      echo -e "\n\r"
    done
}

MAIN 