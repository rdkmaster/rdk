#!/bin/sh

scriptDir=$(cd `dirname $0`; pwd)
. $scriptDir/utils.sh

port=`more $scriptDir/../conf/rdk.cfg | grep listen.port| cut -d "=" -f2 | sed 's/^[ \t]*//g'`

alarmCode=('5004000001' '5004000002' '5004000003')
alarmMsg=('rdk server process is gone!' 'rdk server did not respond after 3 tries' 'NOT GOOD! rdk has not been ready since last restart!')

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
    log 'rdk server did not respond after '$3' tries'
    return 2
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
            return 3
        fi
    done
}
sendAlarm() {
    hostName=`hostname`
    hostIp=`cat /home/netnumen/ems/ums-server/utils/vmax-conf/serviceaddress.properties | grep vmax.host | awk -F '[=]' '{ print $2 }'`
    cmdMsg='<alarm><systemtype>""</systemtype><code>'"$1"'</code><aid>""</aid><cluster>""</cluster><service>vmaxplat</service><role>RDK</role><user>""</user><process>""</process><host><name>'${hostName}'</name><ip>'${hostIp}'</ip></host><status>'"$2"'</status><level>critical</level><category>node</category><content>'"$3"'</content></alarm>'
    restUrl="http://localhost:8988/uniportal/zdh/entryServlet?taskName=alarm"  
    curlRes=`curl -l -H 'Content-Type:application/xml' -H 'charset:utf-8' -H 'authorization:administrator:SdzV4wj1ufh3+X1PgIQXj7ld9gc=' -X POST -d "${cmdMsg}" "${restUrl}"`
    if [ $? != 0 ]; then
       log 'failed to send alarm to dap, message details: cmdMsg - '"${cmdMsg}"' restURl - '"${restUrl}"' crulRes - '"${curlRes}"
    fi
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
        sendAlarm "5004000003" 0 "NOT GOOD! rdk has not responded since last restart!"
        log "send alarm: NOT GOOD! rdk has not responded since last restart!"
        return 1;
    else
        sendAlarm "5004000003" 1 "rdk server is recovered"
    fi

    while true
    do
        sleep $waitTimeout

        log 'diagnosing rdk ...'
        diagnose 10 30 3
        diagnoseRes=$?
        if [ ${diagnoseRes} != 0 ]; then
            log 'NOT GOOD! rdk did not respond in time, gonna restart it.'
            sendAlarm "${alarmCode[${diagnoseRes} -1]}" 0 "${alarmMsg[${diagnoseRes} -1]}"
            log 'send alarm: '"${alarmMsg[${diagnoseRes} -1]}"
            restartRDK
            waitForReady
            recoverMsg='rdk server is recovered'
            sendAlarm "${alarmCode[${diagnoseRes} -1]}" 1 "${recoverMsg}"
            log 'send alarm: '"${recoverMsg}"
        fi
    done
}

log "=============================================================="
startRDK
run
