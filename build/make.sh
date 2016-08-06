#! /bin/bash

usage() {
	echo ""
	echo "$1"
	echo ""
	echo "USAGE:"
	echo "  ./make.sh output_path  --> make a basic rdk package"
}

if [ $# -ne 1 ]; then
	copypath="."
else
	copypath="$1"
fi

if [ ! -e $copypath ]; then
	usage "ERROR: output path is not exist!"
	exit 1
fi

curDir=$(cd "$(dirname "$0")"; pwd)





