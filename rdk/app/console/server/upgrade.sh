#!/bin/bash
#set -x

sourcefile=$1
appname=$2
docker_ips=$3

srcipt_path=$(cd "$(dirname "$0")"; pwd)
cd $srcipt_path
web_upload_dir=$(cd ../../../../rdk/upload_files/; pwd)
app_backup_dir="../../rdk/app/backup/"
mkdir -p $app_backup_dir
app_backup_path="${app_backup_dir}${appname}_$(date "+%Y%m%d%H%M%S").zip"

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

function MAIN(){
   CLEAN_LOG
   echo "************************************update*****************************************"  >> $log_path
   echo "[info] $(date "+%Y-%m-%d %H-%M-%S"), update start, docker_ips :${docker_ips} , sourcefile :${sourcefile} ,appname: ${appname}"  >> $log_path

   (cd $web_upload_dir && zip -r ${app_backup_path} $appname  && cd $srcipt_path && rm -rf "$web_upload_dir$appname" )
   if [ $? -eq 0 ];then
   {
       echo "[info] $(date "+%Y-%m-%d %H-%M-%S"), old app file backuped at ${app_backup_path} success"  >> $log_path 
       sh deploy.sh $sourcefile $appname $docker_ips
       if [ $? -ne 0 ];then
       {
          echo "[error] $(date "+%Y-%m-%d %H-%M-%S"), app file update error when deploy,now start rollback!!!"  >> $log_path 
          sh uninstall.sh  $appname $docker_ips
          if [ $? -eq 0 ];then
          {
             echo "[info] $(date "+%Y-%m-%d %H-%M-%S"), new app file is delete success,and prepare re-install old app !!!"  >> $log_path 
             sh deploy.sh $app_backup_path $appname $docker_ips
          }
          else
          {
             echo "[error] $(date "+%Y-%m-%d %H-%M-%S"), new app file uninstall failed"  >> $log_path 
             exit 2
          }
          fi
       }
       else
       {
          echo "[info] $(date "+%Y-%m-%d %H-%M-%S"), update app file success !!!"  >> $log_path 
       }
       fi
   }
   else
   {
       echo "[error] $(date "+%Y-%m-%d %H-%M-%S"), old app file $web_upload_dir$appname backup failed,update is exit !!!"  >> $log_path 
       exit 2
   }
   fi   
}

MAIN