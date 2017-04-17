

. ./check_proc.sh

if [ "" = "$pid" ]; then
	echo "RDK Server is not running..."
	exit
fi

echo "killing rdk process, pid="$pid
echo `date +%F" "%H:%M:%S`":!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" >> ../../proc/logs/log.txt
echo `date +%F" "%H:%M:%S`":killing rdk process, pid="$pid             >> ../../proc/logs/log.txt
echo `date +%F" "%H:%M:%S`":!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" >> ../../proc/logs/log.txt
kill -9 $pid
