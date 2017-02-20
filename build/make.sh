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

##分支名
branch=$1
if [ x"${branch}" = x ] ;then
	branch="master"
fi
##sbt编译路径名
rdk_resource=$2
###默认在/home/rdk_git/目录下clone rdk版本
rdk_path=$3

##开发环境路径
DEV_ENV_DIR=./rdk_release/rdk-develop-environment
##运行环境路径
RUN_ENV_DIR=./rdk_release/rdk-runtime-environment
##RDK版本号

#dos2unix ../rdk/build.sbt
#RDK_VERSION=`cat ../rdk/build.sbt |grep version|awk -F '=' '{print $2}'| grep -o "[^ ]\+\( \+[^ ]\+\)*"|sed 's/\"//g'|dos2unix`
RDK_VERSION=`cat ../rdk/build.sbt |grep ^version|awk -F '=' '{print $2}'| grep -o "[^ ]\+\( \+[^ ]\+\)*"|sed 's/\"//g'`


USAGE() {
	echo "para1:branch 用于rdk的git分支 default:master"
	echo "para2:rdk_resource 用于编译rdk后端的sbt git clone git@gitlab.zte.com.cn:10045812/rdk-resource.git default:/tmp/rdk_git"
	echo "USAGE:"
	echo "  ./make.sh     -->para all use default values "
	echo "  ./make.sh  \$branch \$rdk_resource --> "
	echo " if you want \$branch be the default value,the command may be ./make.sh \" \" \$rdk_resource,others the same"
}

BEF_COMPILE(){
if [ x"${rdk_path}" = x ] ;then
	rdk_path=/tmp/rdk_git/rdk 
	rm -rf $rdk_path
	mkdir -p $rdk_path
	cd $rdk_path
        rm -rf .git
	git init
	git remote add origin git@gitlab.zte.com.cn:10045812/rdk.git
	git pull origin $branch
	if [ $? -ne 0 ] ;then
		echo "Remote GitLab not stable，plese try again!"
		exit 122
	fi
fi
if [ ! -d $rdk_path ] ;then
    echo "$rdk_path not exists,please make sure"
	exit 127
fi

##clone rdk编译依赖
if [ x"${rdk_resource}" = x ] ; then
    rdk_resource=/home/rdk_git/
	mkdir -p $rdk_resource
	cd  $rdk_resource
	git clone git@gitlab.zte.com.cn:10045812/rdk-resource.git
	rdk_resource=$rdk_resource/rdk-resource
fi

cd $pwdPath
if [ ! -d $rdk_resource ] ;then
    echo "$rdk_resource not exists,please make sure"
	exit 125
fi
cd $rdk_resource
git checkout *
git status|grep "Untracked"
if [ $? -eq 0 ] ;then
	echo "Buffer not clean,git add . ~~"
	exit 124
fi
git status|grep "Changes not staged"
if [ $? -eq 0 ] ;then
   echo "Buffer not clean,fix it"
   exit 121
fi   

}

COMPILE_RDKSERVER(){
export JAVA_HOME=$rdk_resource/jdk
export PATH=$JAVA_HOME/bin:$PATH
cd $pwdPath
cd $rdk_path
cd rdk
cd rdk
chmod 777 $rdk_resource/sbt/bin/sbt
chmod 777 -R $rdk_resource/jdk
##删除原有目录下的rdk*.jar
rm -rf ../rdk/proc/bin/lib/rdk*.jar

$rdk_resource/sbt/bin/sbt \
-java-home $rdk_resource/jdk \
-Dsbt.boot.directory=$rdk_resource/sbt-repo/boot/ \
-Dsbt.ivy.home=$rdk_resource/sbt-repo/ivy/ \
-Dsbt.global.base=$rdk_resource/sbt-repo/   package
if [ $? -ne 0 ] ;then
	echo "rdk-server build failed!!!"
	exit 123
fi
cp target/scala-2.10/rdk*.jar  ../rdk/proc/bin/lib/ 
rm -rf target
rm -rf project/project
rm -rf project/target
	
}


###清理当前目录下版本
DEL_VERSION(){
    cd $pwdPath
    cd $rdk_path
	buildpath=`find . -name make.sh`
	cd ${buildpath%/*}
	rm -rf rdk*.zip
	rm -rf rdk_release
}
###制作开发版本
MAKE_DEP_VERSION(){
  cd $pwdPath
  cd $rdk_path
  buildpath=`find . -name make.sh`
  cd ${buildpath%/*}
  mkdir -p $DEV_ENV_DIR
  if [ -d ../rdk-resource ];then
	 rm -rf ../rdk-resource
  fi
  \cp -r ../doc $DEV_ENV_DIR 
  \cp -r ../rdk $DEV_ENV_DIR
  \cp -r ../site $DEV_ENV_DIR
  \cp -r ../test $DEV_ENV_DIR
  \cp -r ../tools $DEV_ENV_DIR
  \cp -r ../start*  ../CHANGELOG ../index.html ../readme.md  ../favicon.ico  $DEV_ENV_DIR
  MAKR_RDK_RELEASE rdk-develop-environment
}

###制作运行版本
MAKE_RUN_VERSION(){
  cd $pwdPath
  cd $rdk_path
  buildpath=`find . -name make.sh`
  cd ${buildpath%/*}
  mkdir -p $RUN_ENV_DIR
  mkdir $RUN_ENV_DIR/rdk
  \cp -r ../rdk/app  $RUN_ENV_DIR/rdk
  \cp -r ../rdk/proc  $RUN_ENV_DIR/rdk
  MAKR_RDK_RELEASE rdk-runtime-environment
}

###制作release zip包
MAKR_RDK_RELEASE(){
  filename=$1
  cd rdk_release
  #判断当前系统
  #uname -a|grep Linux
  ##linux环境
  echo "start to zip package"
  zip -r $filename$RDK_VERSION.zip $filename > /dev/null

  echo 'version: '$filename$RDK_VERSION.zip
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









