#!/bin/sh

scriptDir=$(cd `dirname $0`; pwd)
logDir=$scriptDir/../logs

log() {
    if [ ! -e $logDir ]; then
        mkdir -p $logDir
    fi
    echo `date +%F" "%H:%M:%S`: ">>> $1" >> $logDir/diagnose.log
    echo `date +%F" "%H:%M:%S`: ">>> $1" >> $logDir/log.txt
}

getRDKVersion() {
    echo `ls $scriptDir/lib/rdk-server* | awk -F"-" '{print $5}' | awk -F".jar" '{print $1}'`
}

getRDKPid() {
    echo `ps gaux | grep rdk.Run | grep $scriptDir | grep -v grep | awk '{print $2}'`
}

getDiagnosePid() {
    echo `ps gaux | grep diagnose.sh | grep $scriptDir | grep -v grep | awk '{print $2}'`
}

killRDK() {
    rdkPid=$(getRDKPid)

    if [ "" != "$rdkPid" ]; then
        log "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
        log "killing rdk process, pid="$rdkPid
        log "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
        kill -9 $rdkPid
    else
        log "RDK Server is not running!"
    fi
}

startRDK() {
    rdkPid=$(getRDKPid)
    if [ "" != "$rdkPid" ]; then
        log "RDK Server is running, nothing to do!"
        return
    fi

    #jvm_opts="$jvm_opts -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,address=8787,server=y,suspend=n"
    jvm_opts="-server -Xms4g -Xmx8g -XX:+HeapDumpOnOutOfMemoryError -XX:-UseGCOverheadLimit $jvm_opts"

    if [ -d "$scriptDir/jre" ]; then
        JAVA_HOME="$scriptDir/jre"
    fi

    chmod 777 $JAVA_HOME/bin/*

    classPath="$scriptDir/lib/*"

    log "RDK Server is starting..."
    log "JAVA_HOME=$JAVA_HOME"
    log "classPath=$classPath"

    cd $scriptDir/../..
    $JAVA_HOME/bin/java $jvm_opts -Dfile.encoding=UTF-8 -classpath "$classPath" com.zte.vmax.rdk.Run 2>> $logDir/errors.log &
    cd $scriptDir

    log "RDK Server started successfully..."
}

restartRDK() {
    killRDK
    sleep 5
    startRDK
}


