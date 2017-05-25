#!/bin/sh

basepath=$(cd `dirname $0`; pwd)
rdk_flag="rdk@"$basepath
diagnose_flag="rdk-diagnose@"$basepath
pid=`ps gaux | grep $rdk_flag | grep -v grep | awk '{print $2}'`

