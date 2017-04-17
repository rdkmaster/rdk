

. ./check_proc.sh

if [ "" = "$pid" ]; then
	echo "RDK Server is not running..."
	exit
fi

echo "killing rdk process, pid="$pid
echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" >> proc/logs/log.txt
echo "killing rdk process, pid="$pid             >> proc/logs/log.txt
echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" >> proc/logs/log.txt
kill -9 $pid
