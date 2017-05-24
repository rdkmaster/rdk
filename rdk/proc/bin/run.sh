#!/bin/sh

curDir=$(cd `dirname $0`; pwd)
. $curDir/check_proc.sh

if [ "" != "$pid" ]; then
	echo "RDK Server (pid=$pid) has been already running..."
	exit
fi
#jvm_opts="$jvm_opts -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,address=8787,server=y,suspend=n"
jvm_opts="-server -Xms4g -Xmx8g -XX:-UseGCOverheadLimit $jvm_opts"

if [ -d "$curDir/jre" ]; then
    JAVA_HOME="$curDir/../../proc/bin/jre"
fi

#到安装目录下运行
cd $curDir/../..

chmod 777 $JAVA_HOME/bin/*
#DIRNAME=`dirname $0`
#program_root=`cd "$DIRNAME"/; pwd`

classPath="$curDir/../../proc/bin/lib/*"

echo "RDK Server is starting..."
if [ ! -e $curDir/../../proc/logs ]; then
	mkdir $curDir/../../proc/logs
fi
$JAVA_HOME/bin/java $jvm_opts -Dfile.encoding=UTF-8 -D$rdk_flag -classpath "$classPath" com.zte.vmax.rdk.Run 2>> $curDir/../../proc/logs/errors.log &
