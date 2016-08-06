#!/bin/bash

#For run the rdk_server on linux machine
################################################################
#start rdk_server,and the service rest & http based on nodejs### 
#nodes:make sure the linux machine has installed nodejs!!!#####
################################################################

cur_dir=$(cd "$(dirname "$0")"; pwd) 

START() {
    ##rdk_server
    cd $cur_dir/rdk_server/proc/bin
    sh run.sh

    ##http&rest
    node="$cur_dir/tools/node-linux-x64/bin/node"
    chmod +x $node

    cd $cur_dir/tools/http_server/serv
    nohup $node server.js &
    nohup $node ../mock/rest_service.js &
}

START

