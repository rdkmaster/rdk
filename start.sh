#!/bin/bash

#For run the rdk_server on linux machine
##################################################################
#  start rdk_server,and the service rest & http based on nodejs  # 
#    nodes:make sure the linux machine has installed nodejs!!!   #
##################################################################

cur_dir=$(cd "$(dirname "$0")"; pwd) 


node="$cur_dir/tools/node-linux-x64/bin/node"
if [ ! -e $node ]; then 
	node="node"
fi
chmod +x $node
$node --version > /dev/null
if [ ! $? -eq 0 ]; then
	echo "ERROR: need NodeJs runtime enviroment!"
	exit 1
fi


## start http server
cd $cur_dir/tools/http_server
nohup $node server.js &

## start rest server
cd $cur_dir/doc/tools/live_demo/mock_rest
nohup $node rest_service.js &

## start rdk server
cd $cur_dir/rdk/proc/bin/
sh run.sh

