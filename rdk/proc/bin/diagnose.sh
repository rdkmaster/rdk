#!/bin/sh

curDir=$(cd `dirname $0`; pwd)

log() {
    echo `date +%F" "%H:%M:%S`: $1 >> $curDir/../../proc/logs/diagnose.log
}

diagnose() {
    for ((time=1; time<=$3; time++));do
        curl --silent --connect-timeout $1 --max-time $2 http://localhost:5812/rdk/service/app/console/server/diagnose > /dev/null
        if [ $? == 0 ]; then
            return 0
        fi
        sleep 10
    done
    log 'rdk did not respond for '$3' times'
    return 1
}

waitForReady() {
    time1=$(date +%s -s 'now')
    while true
    do
        sleep 10
        diagnose 10 30 1
        if [ $? == 0 ]; then
            return 0
        fi

        time2=$(date +%s -s 'now')
        delta=$(($time2 - $time1))
        if [ $delta -gt 1860 ]; then
            return 1
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
    waitForReady
    if [ $? != 0 ]; then
        log "NOT GOOD! rdk has not been ready since last restart!"
        return 1;
    fi
    log "it seems that rdk is ready for work!"

    while true
    do
        sleep $waitTimeout

        log 'diagnosing rdk ...'
        diagnose 10 30 3
        if [ $? != 0 ]; then
            log 'NOT GOOD! rdk did not respond in time, gonna restart it.'
            restartRDK
            break
        fi
    done
}

run
