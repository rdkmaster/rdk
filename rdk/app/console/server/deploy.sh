EXPECT_SCP(){
local src_file=$1
local dst_ip=$2
local dst_passwd=$3
local dst_path=$4
/usr/bin/expect <<EOF
set timeout -1
spawn ssh-keygen -R $dst_ip
spawn scp -r $src_file admin@$dst_ip:$dst_path
expect {
        "(yes/no)?" {send "yes\r"; exp_continue}
        "$dst_ip's password:" {send "$dst_passwd\r"}
        "Permission denied" { send_user "[exec echo "\nError: Password is wrong\n"]"; exit}
}
expect eof
EOF
}

MAIN(){
local sourceFile=$1
local appName=$2
local docker_ips=$3

echo "change file name on web server"
mv $sourceFile app/upload_files/$appName

echo "unzip file on web server"
unzip -l app/upload_files/$appName

echo "spilt docker_ips"
arr=$(echo $docker_ips|tr "," "\n")

echo "dispatch file to servers"
for ip_port in $arr
do
ip=${ip_port%:*}
echo "dispatch ${appName} to ${ip}"
EXPECT_SCP app/upload_files/$appName $ip admin /home/rdk_server/app/$appName

echo "do init rest"
curl "http://$ip:5812/rdk/service/init"
done

}

MAIN $1 $2 $3