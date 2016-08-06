#!/bin/sh

. ./check_proc.sh

if [ "" != "$pid" ]; then
	echo "RDK Server (pid=$pid) has been already running..."
	exit
fi

jvm_opts="-Xms256m -Xmx1024m"

JAVA_HOME="./proc/bin/jre"

#到安装目录下运行
cd ../..

chmod 777 $JAVA_HOME/bin/*

classPath=""
classPath=$classPath":lib/io.spray/spray-servlet_2.10/jars/spray-servlet_2.10-1.3.2.jar"
classPath=$classPath":lib/io.spray/spray-http_2.10/bundles/spray-http_2.10-1.3.2.jar"
classPath=$classPath":lib/io.spray/spray-util_2.10/bundles/spray-util_2.10-1.3.2.jar"
classPath=$classPath":lib/org.parboiled/parboiled-scala_2.10/jars/parboiled-scala_2.10-1.1.6.jar"
classPath=$classPath":lib/org.parboiled/parboiled-core/bundles/parboiled-core-1.1.6.jar"
classPath=$classPath":lib/io.spray/spray-routing_2.10/jars/spray-routing_2.10-1.3.2.jar"
classPath=$classPath":lib/io.spray/spray-httpx_2.10/jars/spray-httpx_2.10-1.3.2.jar"
classPath=$classPath":lib/org.jvnet.mimepull/mimepull/jars/mimepull-1.9.4.jar"
classPath=$classPath":lib/com.chuusai/shapeless_2.10/jars/shapeless_2.10-1.2.4.jar"
classPath=$classPath":lib/io.spray/spray-can_2.10/jars/spray-can_2.10-1.3.2.jar"
classPath=$classPath":lib/io.spray/spray-io_2.10/jars/spray-io_2.10-1.3.2.jar"
classPath=$classPath":lib/com.typesafe.akka/akka-actor_2.10/jars/akka-actor_2.10-2.3.5.jar"
classPath=$classPath":lib/com.typesafe/config/jars/config-1.2.1.jar"
classPath=$classPath":lib/org.json4s/json4s-native_2.10/jars/json4s-native_2.10-3.2.4.jar"
classPath=$classPath":lib/org.json4s/json4s-core_2.10/jars/json4s-core_2.10-3.2.4.jar"
classPath=$classPath":lib/org.json4s/json4s-ast_2.10/jars/json4s-ast_2.10-3.2.4.jar"
classPath=$classPath":lib/org.scala-lang/scalap/jars/scalap-2.10.0.jar"
classPath=$classPath":lib/org.scala-lang/scala-compiler/jars/scala-compiler-2.10.0.jar"
classPath=$classPath":lib/org.scala-lang/scala-reflect/jars/scala-reflect-2.10.0.jar"
classPath=$classPath":lib/log4j/log4j/jars/log4j-1.2.17.jar"
classPath=$classPath":lib/log4j/log4j/bundles/log4j-1.2.17.jar"
classPath=$classPath":lib/com.google.code.gson/gson/jars/gson-2.2.2.jar"
classPath=$classPath":lib/org.scala-lang/scala-library/jars/scala-library-2.10.5.jar"
classPath=$classPath":lib/com.thoughtworks.paranamer/paranamer/jars/paranamer-2.6.jar"
classPath=$classPath":lib/gbase-connector-java-8.3.81.53-build52.8-bin.jar"
classPath=$classPath":lib/activemq-broker-5.13.1.jar"
classPath=$classPath":lib/activemq-client-5.13.1.jar"
classPath=$classPath":lib/activemq-vmax.jar"
classPath=$classPath":lib/geronimo-j2ee-management_1.1_spec-1.0.1.jar"
classPath=$classPath":lib/geronimo-jms_1.1_spec-1.1.1.jar"
classPath=$classPath":lib/slf4j-api-1.7.13.jar"
classPath=$classPath":lib/commons-dbcp2-2.1.1.jar"
classPath=$classPath":lib/commons-pool2-2.4.2.jar"
classPath=$classPath":lib/commons-logging-1.2.jar"
classPath=$classPath":lib/sqlpraser.jar"
classPath=$classPath":lib/opencsv-3.7.jar"
classPath=$classPath":lib/rdk-server.jar"

echo "RDK Server is starting..."
$JAVA_HOME/bin/java $jvm_opts -Dfile.encoding=UTF-8 -D$rdk_flag -classpath $classPath com.zte.vmax.rdk.Run &
