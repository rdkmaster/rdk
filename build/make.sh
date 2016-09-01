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

###默认在/home/rdk_git/目录下clone rdk版本
rdk_path=$1
##分支名
branch=$2
##sbt编译路径名
rdk_resource=$3

##开发环境路径
DEV_ENV_DIR=./rdk_release/rdk-develop-environment
##运行环境路径
RUN_ENV_DIR=./rdk_release/rdk-runtime-environment
##RDK版本号
dos2unix ../rdk/build.sbt
RDK_VERSION=`cat ../rdk/build.sbt |grep version|awk -F '=' '{print $2}'| grep -o "[^ ]\+\( \+[^ ]\+\)*"|sed 's/\"//g'|dos2unix`

USAGE() {
	echo "para1:rdk_path 用于clone git@gitlab.zte.com.cn:10045812/rdk.git的路径 default:/home/rdk_git"
	echo "para2:branch 用于rdk的git分支 default:master"
	echo "para3:rdk_resource 用于编译rdk后端的sbt git clone git@gitlab.zte.com.cn:10045812/rdk-resource.git default:/home/rdk_git/"
	echo "USAGE:"
	echo "  ./make.sh     -->para all use default values "
	echo "  ./make.sh \$rdk_path \$branch \$rdk_resource --> "
	echo " if you want rdk_path be the default value,the command may be ./make.sh \" \" \$branch \$rdk_resource,others the same"
}

BEF_COMPILE(){
if [ x"${rdk_path}" = x ] ;then
	rdk_path=/home/rdk_git/rdk 
fi
cd $rdk_path
git clone git@gitlab.zte.com.cn:10045812/rdk.git

###切换到设置的分支上，默认为master
cd $rdk_path
if [ "${branch}" != "" ] ; then
	git checkout -b ${branch} 
else
	git checkout -b master 
	
fi
##clone rdk编译依赖
if [ x"${rdk_resource}" = x ] ; then
    rdk_resource=/home/rdk_git/rdk-resource
fi
cd $rdk_resource
git clone git@gitlab.zte.com.cn:10045812/rdk-resource.git		

export JAVA_HOME=/home/rdk_git/rdk-resource/jdk
export PATH=$JAVA_HOME/bin:$PATH

}

COMPILE_RDKSERVER(){
cd $rdk_path
$rdk_resource/sbt/bin/sbt \
-Dsbt.boot.directory=$rdk_resource/rdk-resource/sbt-repo/boot/ \
-Dsbt.ivy.home=$rdk_resource/rdk-resource/sbt-repo/ivy/ \
-Dsbt.global.base=$rdk_resource/rdk-resource/sbt-repo/   package

cp ../target/scala-2.10/rdk_*.jar  ../rdk/proc/bin/lib/ 
	
}


###清理当前目录下版本
DEL_VERSION(){
    cd $pwdPath
	rm -rf rdk*.zip
	rm -rf rdk_release
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
  USAGE
  BEF_COMPILE
  COMPILE_RDKSERVER
  DEL_VERSION
  MAKE_DEP_VERSION
  MAKE_RUN_VERSION
  \cp rdk*.zip ../
  ###清理中间文件
  rm -rf ../rdk_release
}
MAIN









