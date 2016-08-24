#! /bin/bash

#ZTE Corperation. RDK Dep.##############################
#    
#For make rdk_release versions including runtime environment
#and develop environment on linux machine
#########################################################
#Author:10165238  20160820 
#########################################################

###全局静态变量
cd "$(dirname "$0")"
pwdPath=`pwd`
##开发环境路径
DEV_ENV_DIR=./rdk_release/rdk-develop-environment
##运行环境路径
RUN_ENV_DIR=./rdk_release/rdk-runtime-environment
##RDK版本号
RDK_VERSION=`cat ../rdk/build.sbt |grep version|awk -F '=' '{print $2}'| grep -o "[^ ]\+\( \+[^ ]\+\)*"|sed 's/\"//g'`



###清理当前目录下版本
DEL_VERSION(){
    cd $pwdPath
	rm -rf rdk*.zip
}
###制作开发版本
MAKE_DEP_VERSION(){
  cd $pwdPath
  mkdir -p $DEV_ENV_DIR
  \cp -r ../[^b]* $DEV_ENV_DIR 
  MAKR_RDK_RELEASE rdk-develop-environment
}

###制作运行版本
MAKE_RUN_VERSION(){
  cd $pwdPath
  mkdir -p $RUN_ENV_DIR
  \cp ../start.sh $RUN_ENV_DIR
  \cp ../start.exe  $RUN_ENV_DIR
  mkdir $RUN_ENV_DIR/rdk
  \cp -r ../rdk/app/*  $RUN_ENV_DIR/rdk
  \cp -r ../rdk/proc/*  $RUN_ENV_DIR/rdk
  MAKR_RDK_RELEASE rdk-runtime-environment
}

###制作release zip包
MAKR_RDK_RELEASE(){
  filename=$1
  cd rdk_release
  #判断当前系统
  echo $JAVA_HOME|grep ":"
  if [ $? -eq 0 ] ;then
  ##windows环境
     echo "windows environment"
     "C:\Program Files\7-Zip\7z.exe" a $filename-$RDK_VERSION.zip $filename
  else
  ##linux环境
     zip -r $filename$RDK_VERSION.zip $filename
  fi

 
}

MAIN(){
  DEL_VERSION
  MAKE_DEP_VERSION
  MAKE_RUN_VERSION
  \cp rdk*.zip ../
  ###清理中间文件
  rm -rf rdk_release
}
MAIN








