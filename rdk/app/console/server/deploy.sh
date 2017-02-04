#!/bin/bash
#set -x

sourceFile=$1
appName=$2
docker_ips=$3

srcipt_path=$(cd "$(dirname "$0")"; pwd)
cd $srcipt_path
web_upload_dir=$(cd ../../../../rdk/upload_files/; pwd)
src_file="/home/$sourceFile"
rdk_app_path="/home/rdk/app/"

log_path="../../../proc/logs/shellExecute.log"
log_path_back="../../../proc/logs/shellExecute.log1"

function EXPECT_SCP(){
    local src_file=$1
    local dst_ip=$2
    local dst_passwd=$3
    local web_upload_dir=$4
/usr/bin/expect <<EOF
set timeout 3
spawn ssh-keygen -R $dst_ip
spawn scp -r $src_file admin@$dst_ip:$web_upload_dir
expect {
        "(yes/no)?" {send "yes\r"; exp_continue}
        "$dst_ip's password:" {send "$dst_passwd\r"}
        "Permission denied" { send_user "[exec echo "\nError: Password is wrong\n"]"; exit}
         timeout            {exit 2}
}
expect eof
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
   echo "************************************deploy*****************************************"  >> $log_path
   echo "[info] $(date "+%Y-%m-%d %H-%M-%S"), deploy start, docker_ips :${docker_ips} , sourceFile :${sourceFile} ,appName: ${appName}"  >> $log_path
   unzip -d $web_upload_dir $src_file
   rm -rf $src_file
   echo "[info] $(date "+%Y-%m-%d %H-%M-%S"), unzip src_file :${src_file},dst_dir :$web_upload_dir is success " >> $log_path
   arr=$(echo $docker_ips|tr "," "\n")
   web_upload_file=$(cd $web_upload_dir;cd $appName; pwd)

   for ip_port in $arr
   do
      ip=${ip_port%:*}
      EXPECT_SCP $web_upload_file $ip admin $rdk_app_path
      if [ $? -ne 0 ];then
      {
         echo "[error] $(date "+%Y-%m-%d %H-%M-%S"),  dispatch to docker_ip :${ip} failed  when use expect_scp !!! , websourcefile :${web_upload_file} ,serverdstpath:${rdk_app_path}"  >> $log_path
        exit 2
      }
      fi
      echo "[info] $(date "+%Y-%m-%d %H-%M-%S"),  dispatch to docker_ip :${ip} successed : websourcefile :${web_upload_file} ,serverdstpath:${rdk_app_path}"  >> $log_path
      echo -e "\n\r"

      urlold=`echo '{"param":{"appName":$appName},"app":"console"}' | tr -d '\n' | xxd -plain | sed 's/\(..\)/%\1/g'`
      urlnew=`echo ${urlold}|tr -d ' '`
      curl http://$ip:5812/rdk/service/app/console/server/init?p=${urlnew}

   done

}

MAIN 
