#!/bin/sh

scriptDir=$(cd `dirname $0`; pwd)
. $scriptDir/utils.sh

port=`more $scriptDir/../conf/rdk.cfg | grep listen.port| cut -d "=" -f2 | sed 's/^[ \t]*//g'`

diagnose() {
    rdkPid=$(getRDKPid)
    if [ "$rdkPid" == "" ]; then
        log "rdk server process is gone!"
        return 1
    fi

    for ((time=1; time<=$3; time++));do
        curl --silent --connect-timeout $1 --max-time $2 \
            http://127.0.0.1:$port/rdk/service/app/console/server/diagnose > /dev/null
        if [ $? == 0 ]; then
            return 0
        fi
        log 'rdk did not respond, I will try again later...'
        sleep 10
    done
    log 'rdk did not respond after tried '$3' times'
    return 1
}

waitForReady() {
    log "waiting for rdk to get ready ..."
    time1=$(date +%s)
    while true
    do
        sleep 10
        diagnose 10 30 1
        if [ $? == 0 ]; then
            log "it seems that rdk is ready for work!"
            return 0
        fi

        time2=$(date +%s)
        delta=$(($time2 - $time1))
        if [ $delta -gt 1860 ]; then
            log "NOT GOOD! rdk has not been ready since last restart!"
            return 1
        fi
    done
}

run() {
    waitTimeout=$1
    expr $waitTimeout + 0 &> /dev/null
    if [ $? != 0 ]; then
        waitTimeout=30
    fi

    waitForReady
    if [ $? != 0 ]; then
        log "NOT GOOD! rdk has not been ready since last restart!"
        return 1;
    fi

    while true
    do
        sleep $waitTimeout

        log 'diagnosing rdk ...'
        diagnose 10 30 3
        if [ $? != 0 ]; then
            log 'NOT GOOD! rdk did not respond in time, gonna restart it.'
            restartRDK
            waitForReady
        fi
    done
}

log "=============================================================="
startRDK
run
