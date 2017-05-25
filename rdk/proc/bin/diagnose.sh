#!/bin/sh

curDir=$(cd `dirname $0`; pwd)

log() {
    echo `date +%F" "%H:%M:%S`: $1 >> $curDir/../../proc/logs/diagnose.log
}

diagnose() {
    for ((time=1; time<=$3; time++));do
        curl --connect-timeout $1 --max-time $2 http://localhost:5812/rdk/service/app/console/server/diagnose
        if [ $? == 0 ]; then
            return 0
        fi
    done
    log 'rdk did not respond for '$3' times'
    return 1
}

waitForReady() {
    while true
    do
        sleep 30
        diagnose 10 30 1
        if [ $? == 0 ]; then
            break
        fi
    done
}

restartRDK() {
    log 'shutting down rdk...'
    sh $curDir/shutdown.sh 'do-not-kill-diagnose'
    sleep 5
    log 'running rdk ...'
    sh $curDir/run.sh
}

run() {
    waitTimeout=$1
    expr $waitTimeout + 0 &> /dev/null
    if [ $? != 0 ]; then
        waitTimeout=30
    fi

    log "waiting for rdk to get ready..."
    diagnose 10 30 20
    if [ $? != 0 ]; then
        log "NOT GOOD! rdk has not been ready since last restart!"
        return 1;
    fi
    log "it seems that rdk is ready for work!"

    while true
    do
        sleep $waitTimeout

        log 'diagnosing rdk ...'
        diagnose 10 30 2
        if [ $? != 0 ]; then
            log 'NOT GOOD! rdk did not respond in time, gonna restart it.'
            restartRDK
            break
        fi
    done
}

run
