#!/bin/sh

####启动时干掉*menu.json文件

jsonpath="/home/netnumen/ems/ums-server/procs/ppus/rdk_server.ppu/rdk_server-webapp.pmu/rdk_server.ear/rdk_server.war/app/portal/server"

for i in `ls $jsonpath|grep menu.json$`;do
    rm -rf $jsonpath"/"$i
done

. ./check_proc.sh

if [ "" != "$pid" ]; then
	echo "RDK Server (pid=$pid) has been already running..."
	exit
fi

jvm_opts="-Xms256m -Xmx1024m"

if [ -d "./jre" ]; then
    JAVA_HOME="./proc/bin/jre"
fi

#到安装目录下运行
cd ../..

chmod 777 $JAVA_HOME/bin/*

classPath=""
classPath=$classPath":proc/bin/lib/spray-servlet_2.10-1.3.2.jar"
classPath=$classPath":proc/bin/lib/spray-http_2.10-1.3.2.jar"
classPath=$classPath":proc/bin/lib/spray-util_2.10-1.3.2.jar"
classPath=$classPath":proc/bin/lib/parboiled-scala_2.10-1.1.6.jar"
classPath=$classPath":proc/bin/lib/parboiled-core-1.1.6.jar"
classPath=$classPath":proc/bin/lib/spray-routing_2.10-1.3.2.jar"
classPath=$classPath":proc/bin/lib/spray-httpx_2.10-1.3.2.jar"
classPath=$classPath":proc/bin/lib/mimepull-1.9.4.jar"
classPath=$classPath":proc/bin/lib/shapeless_2.10-1.2.4.jar"
classPath=$classPath":proc/bin/lib/spray-can_2.10-1.3.2.jar"
classPath=$classPath":proc/bin/lib/spray-io_2.10-1.3.2.jar"
classPath=$classPath":proc/bin/lib/akka-actor_2.10-2.3.5.jar"
classPath=$classPath":proc/bin/lib/config-1.2.1.jar"
classPath=$classPath":proc/bin/lib/json4s-native_2.10-3.2.4.jar"
classPath=$classPath":proc/bin/lib/json4s-core_2.10-3.2.4.jar"
classPath=$classPath":proc/bin/lib/json4s-ast_2.10-3.2.4.jar"
classPath=$classPath":proc/bin/lib/scalap-2.10.0.jar"
classPath=$classPath":proc/bin/lib/scala-compiler-2.10.0.jar"
classPath=$classPath":proc/bin/lib/scala-reflect-2.10.0.jar"
classPath=$classPath":proc/bin/lib/log4j-1.2.17.jar"
classPath=$classPath":proc/bin/lib/gson-2.2.2.jar"
classPath=$classPath":proc/bin/lib/scala-library-2.10.5.jar"
classPath=$classPath":proc/bin/lib/paranamer-2.6.jar"
classPath=$classPath":proc/bin/lib/gbase-connector-java-8.3.81.53-build52.8-bin.jar"
classPath=$classPath":proc/bin/lib/activemq-broker-5.13.1.jar"
classPath=$classPath":proc/bin/lib/activemq-client-5.13.1.jar"
classPath=$classPath":proc/bin/lib/activemq-vmax.jar"
classPath=$classPath":proc/bin/lib/geronimo-j2ee-management_1.1_spec-1.0.1.jar"
classPath=$classPath":proc/bin/lib/geronimo-jms_1.1_spec-1.1.1.jar"
classPath=$classPath":proc/bin/lib/slf4j-api-1.7.13.jar"
classPath=$classPath":proc/bin/lib/commons-dbcp2-2.1.1.jar"
classPath=$classPath":proc/bin/lib/commons-pool2-2.4.2.jar"
classPath=$classPath":proc/bin/lib/commons-logging-1.2.jar"
classPath=$classPath":proc/bin/lib/sqlpraser.jar"
classPath=$classPath":proc/bin/lib/opencsv-3.7.jar"
classPath=$classPath":proc/bin/lib/rdk-server.jar"

echo "RDK Server is starting..."
$JAVA_HOME/bin/java $jvm_opts -Dfile.encoding=UTF-8 -D$rdk_flag -classpath $classPath com.zte.vmax.rdk.Run &
