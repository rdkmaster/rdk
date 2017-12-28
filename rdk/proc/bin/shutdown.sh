#!/bin/sh

scriptDir=$(cd `dirname $0`; pwd)
. $scriptDir/utils.sh

rdkPid=$(getRDKPid)
if [ "$rdkPid" != "" ]; then
    log "rdk server is killed, pid=$rdkPid"
    kill -9 $rdkPid
fi

diagnosePid=$(getDiagnosePid)
if [ "$diagnosePid" != "" ]; then
    log "rdk diagnose is killed, pid=$diagnosePid"
    kill -9 $diagnosePid
fi


