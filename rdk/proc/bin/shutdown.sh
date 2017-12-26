

curDir=$(cd `dirname $0`; pwd)
. $curDir/check_proc.sh

log() {
    echo `date +%F" "%H:%M:%S`: $1 >> $curDir/../../proc/logs/log.txt
}

if [ "$1" != "do-not-kill-diagnose" ]; then
	diagnosePid=`ps gaux | grep $diagnose_flag | grep -v grep | awk '{print $2}'`
	if [ "" != "$diagnosePid" ]; then
		echo `date +%F" "%H:%M:%S`": killing diagnose, pid="$diagnosePid   >> $curDir/../../proc/logs/diagnose.log
		kill -9 $diagnosePid
	fi
fi

if [ "" = "$pid" ]; then
	log ": <<<RDK Server is not running...>>>"
else
	echo "killing rdk process, pid="$pid
	log ":!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
	log ":killing rdk process, pid="$pid             
	log ":!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
	kill -9 $pid
fi

