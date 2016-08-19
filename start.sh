#!/bin/bash

#For run the rdk_server on linux machine
################################################################
#start rdk_server,and the service rest & http based on nodejs### 
#nodes:make sure the linux machine has installed nodejs!!!#####
################################################################

cur_dir=$(cd "$(dirname "$0")"; pwd) 

START() {
    ##rdk_server
	sed -i 's/localhost/10\.9\.233\.35/g' $cur_dir/rdk/proc/conf/rdk.cfg
    cd $cur_dir/rdk/proc/bin/
    sh run.sh > /dev/null

    node="$cur_dir/tools/node-linux-x64/bin/node"
    chmod +x $node
	
    ##http
    cd $cur_dir/tools/http_server
    nohup $node server.js & > /dev/null

    ##http
	cd $cur_dir/doc/tools/live_demo/mock_rest
    nohup $node rest_service.js & > /dev/null
}

START

