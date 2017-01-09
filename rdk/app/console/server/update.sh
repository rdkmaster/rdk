#!/bin/bash
#set -x

sourceFile=$1
appName=$2
docker_ips=$3

srcipt_path=$(cd "$(dirname "$0")"; pwd)
cd $srcipt_path
web_upload_dir=$(cd ../../../../rdk/upload_files/; pwd)
log_path="../../../proc/logs/shellExecute.log"
log_path_back="../../../proc/logs/shellExecute.log1"
src_file="/home/$sourceFile"
rdk_app_path="/home/rdk/app/"
app_backup_dir="../../../../rdk/app/backup/"
app_backup_name="${appName}_`date` '+%Y%m%d%H%M%S'"
app_backup_path=${app_backup_dir}${app_backup_name}

function EXPECT_SCP(){
    local src_file=$1
    local dst_ip=$2
    local dst_passwd=$3
    local web_upload_dir=$4
/usr/bin/expect <<EOF
set timeout -1
spawn ssh-keygen -R $dst_ip
spawn scp -r $src_file admin@$dst_ip:$web_upload_dir
expect {
        "(yes/no)?" {send "yes\r"; exp_continue}
        "$dst_ip's password:" {send "$dst_passwd\r"}
        "Permission denied" { send_user "[exec echo "\nError: Password is wrong\n"]"; exit}
}
expect eof
EOF
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
   echo "************************************deploy.js*****************************************"  >> $log_path
   echo "[info] `date`, update start, docker_ips :${docker_ips} , sourceFile :${sourceFile} ,appName: ${appName}"  >> $log_path

   mv $src_file $app_backup_dir$app_backup_name
   zip ${app_backup_path}.zip $app_backup_path
   rm -rf $app_backup_path
   declare -a name
   sh deploy.sh

}

MAIN