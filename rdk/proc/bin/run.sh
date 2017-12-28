#!/bin/sh

scriptDir=$(cd `dirname $0`; pwd)
. $scriptDir/utils.sh

diagnosePid=$(getDiagnosePid)
if [ "$diagnosePid" == "" ]; then
	sh $scriptDir/diagnose.sh $scriptDir &
else
    log "rdk diagnose is running, nothing to do, pid=$diagnosePid"
fi


