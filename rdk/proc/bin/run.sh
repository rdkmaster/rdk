#!/bin/sh

. ./check_proc.sh

if [ "" != "$pid" ]; then
	echo "RDK Server (pid=$pid) has been already running..."
	exit
fi

jvm_opts="-Xms256m -Xmx1024m"
#jvm_opts="$jvm_opts -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,address=8787,server=y,suspend=n"

if [ -d "./jre" ]; then
    JAVA_HOME="./proc/bin/jre"
fi

#到安装目录下运行
cd ../..

chmod 777 $JAVA_HOME/bin/*
DIRNAME=`dirname $0`
program_root=`cd "$DIRNAME"/; pwd`

classPath="$program_root/proc/bin/lib/*"

echo "RDK Server is starting..."
$JAVA_HOME/bin/java $jvm_opts -Dfile.encoding=UTF-8 -D$rdk_flag -classpath "$classPath" com.zte.vmax.rdk.Run &
