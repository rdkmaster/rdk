

. ./check_proc.sh

if [ "" = "$pid" ]; then
	echo "RDK Server is not running..."
	exit
fi

echo "killing rdk process, pid="$pid
echo "killing rdk process, pid="$pid >> ../logs/log.txt
kill -9 $pid
