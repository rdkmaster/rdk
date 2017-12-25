#!/bin/bash
set -x
#################################################################### 
# Create measure data for person
# Rev Date        Author      Comments
#--------------------------------------------------------------------
# 001 20171220    Liuyulong    Original
#################################################################### 
#################################################################### 
BASE_DIR=$(pwd)
User_Name=$1 #如：赵士文
User_No=$2 #如：10114735
Project=$3
Sub_Project=$Project
Top_Project=$4
Commit_Id=$5

# You may need to modify the below parameters for your project
JDK_HOME=../rdk-resource/jdk # scalastyle need jdk1.8
Scala_Version=scala-2.11
Ivy2_Home=/home/sbt/ivy2
Sbt_Home=/home/sbt
Scalastyle_Jar=/home/scalastyle_2.12-0.9.0-batch.jar
#Project=vmax-metadata-manager
Script_Dir=vmax-ci-script

index=0
index_add=0
index_del=0
index_modi=0
add_files=()
del_files=()
modi_files=()
scala_files_add=()
scala_files_del=()
scala_files_modi=()
scala_files_st_add=""
scala_files_st_modi=""
scala_files_st_del=""
for_measure_num_old=0
for_measure_num_new=0
measure_result_old=""
measure_result_new=""

# Find modified files in current commit
function get_scalafiles()
{
	for file in `git diff --name-status HEAD~1 HEAD --stat`
	do
	    files[$index]=${file}
		#echo ${files[index]}
	    index=$[index+1]
	done

	# Compute add_files,del_files,modi_files
	echo "changed files: "${#files[*]}
	index=0
	for file in ${files[@]}
	do
	    if [ "${file:0:1}"x = "A"x ];then
			# Judge if the scala file match the Project
			if [[ ${files[index+1]} == ${Sub_Project}* ]];then
				add_files[$index_add]=${files[index+1]}
		        index_add=$[index_add+1]
		    fi
	        index=$[index+2]
		fi    
	    if [ "${file:0:1}"x = "D"x ];then
			# Judge if the scala file match the Project
			if [[ ${files[index+1]} == ${Sub_Project}* ]];then
		        del_files[$index_del]=${files[index+1]}
		        index_del=$[index_del+1]
			fi	
	        index=$[index+2]
	    fi
	    if [ "${file:0:1}"x = "M"x ];then
			# Judge if the scala file match the Project
			if [[ ${files[index+1]} == ${Sub_Project}* ]];then
		        modi_files[$index_modi]=${files[index+1]}
		        index_modi=$[index_modi+1]
		    fi
	        index=$[index+2]
	    fi
	done
	index=0
	# for file in `git show --pretty="format:" --name-only | awk '{print $1}'`
	for file in ${add_files[@]}
	do
	    if [ "${file##*.}"x = "scala"x ];then
	      if [[ $file == *src/main* ]];then
		       scala_files_add[$index]=$file
		       index=$[index+1]
	       fi
	    fi
	done
	index=0
	for file in ${del_files[@]}
	do
	    if [ "${file##*.}"x = "scala"x ];then
	      if [[ $file == *src/main* ]];then
		       scala_files_del[$index]=$file
		       index=$[index+1]
	       fi
	    fi
	done
	index=0
	for file in ${modi_files[@]}
	do
	    if [ "${file##*.}"x = "scala"x ];then
	      if [[ $file == *src/main* ]];then
		       scala_files_modi[$index]=$file
		       index=$[index+1]
	       fi
	    fi
	done

	# Judge if need to check
	arr_length_add=${#scala_files_add[*]}
	arr_length_modi=${#scala_files_modi[*]}
	if [ $arr_length_add -eq 0 ];then
		if [ $arr_length_modi -eq 0 ];then
			echo "no scala files to check for ${Sub_Project}"
			return 1
		fi
	fi	

	# Compute scala_files for scalastyle
	for var in ${scala_files_add[@]}
	do
		scala_files_st_add="$scala_files_st_add $BASE_DIR/$var"
	done
	for var in ${scala_files_modi[@]}
	do
		scala_files_st_modi="$scala_files_st_modi $BASE_DIR/$var"
	done
	for var in ${scala_files_del[@]}
	do
		scala_files_st_del="$scala_files_st_del $BASE_DIR/$var"
	done
}

function get_new_measure()
{
	# Check modified files for current commit
	$JDK_HOME/bin/java -jar $Scalastyle_Jar --config $BASE_DIR/$Project/scalastyle-config-for-measure.xml --xmlOutput $BASE_DIR/${Sub_Project}/scalastyle_result_for_measure_new.xml --xmlEncoding UTF-8 $scala_files_st_add $scala_files_st_modi
	if [ -f ${Sub_Project}/scalastyle_result_for_measure_new.xml ]; then
		cat ${Sub_Project}/scalastyle_result_for_measure_new.xml
		mv ${Sub_Project}/scalastyle_result_for_measure_new.xml scalastyle_result_for_measure_new.xml
	fi
	if [ -f scalastyle_result_for_measure_new.xml ]; then
		cd $BASE_DIR/$Script_Dir
		measure_result_new=`python -c 'import xmlparser;xmlparser.parseScalaStyle("../scalastyle_result_for_measure_new.xml")'`  
		cd ..
		mv scalastyle_result_for_measure_new.xml ${Sub_Project}/scalastyle_result_for_measure_new.xml
	fi	
}

function get_old_measure()
{
	# Get current and last commit
	current_commitid=`git rev-parse HEAD`
	last_commitid=`git rev-parse HEAD~1`

	# Reset modified files to last commit
	git checkout $last_commitid $scala_files_st_modi

	# Check modified files for last commit
	$JDK_HOME/bin/java -jar $Scalastyle_Jar --config $BASE_DIR/$Project/scalastyle-config-for-measure.xml --xmlOutput $BASE_DIR/${Sub_Project}/scalastyle_result_for_measure_old.xml --xmlEncoding UTF-8 $scala_files_st_modi
	if [ -f ${Sub_Project}/scalastyle_result_for_measure_old.xml ]; then
		cat ${Sub_Project}/scalastyle_result_for_measure_old.xml
		mv ${Sub_Project}/scalastyle_result_for_measure_old.xml scalastyle_result_for_measure_old.xml
	fi
	if [ -f scalastyle_result_for_measure_old.xml ]; then
		cd $BASE_DIR/$Script_Dir
		# method_count, line_count, for_measure_count, parameters_count
		measure_result_old=`python -c 'import xmlparser;xmlparser.parseScalaStyle("../scalastyle_result_for_measure_old.xml")'`  
		cd ..
		mv scalastyle_result_for_measure_old.xml ${Sub_Project}/scalastyle_result_for_measure_old.xml
	fi

	# Reset modified files to current commit
	git checkout $current_commitid $scala_files_st_modi
}

function save_to_db()
{
    HOSTNAME='10.9.233.100'
    PORT='3306'
    USERNAME='root'
    PASSWORD='root123'
    DBNAME="scan"
    TABLENAME='measure_data_by_person'

    name=$1
    no=$2
    project=$3
    top_project=$4
    cyclomatic_8=$5
    funline_40=$6
    oneline_120=$7
	parameter_5=$8

    #插入数据
    insert_sql="insert into ${TABLENAME}(name, no, project, top_project, createtime, commit_id, cyclomatic_8, funline_40, oneline_120, parameter_5) values('${name}', '${no}', '${project}', '${top_project}', now(), '${Commit_Id}', ${cyclomatic_8}, ${funline_40}, ${oneline_120}, ${parameter_5})"
    mysql -h${HOSTNAME} -P${PORT} -u${USERNAME} -p${PASSWORD} ${DBNAME} -e "${insert_sql}"
    if [ $? = 0 ];then
        echo "insert success!"
    else
        echo "insert failure!"
    fi
}

function mesure()
{
	Sub_Project=$1
	local funline_change=0
	local oneline_change=0
	local cyclomatic_change=0
	local parameter_change=0

	index=0
	index_add=0
	index_del=0
	index_modi=0
	add_files=()
	del_files=()
	modi_files=()
	scala_files_add=()
	scala_files_del=()
	scala_files_modi=()
	scala_files_st_add=""
	scala_files_st_modi=""
	scala_files_st_del=""
	for_measure_num_old=0
	for_measure_num_new=0
	measure_result_old=""
	measure_result_new=""
	
	get_scalafiles
	if [ $? -ne 1  ]; then
		get_new_measure
		get_old_measure
		#name=`echo $User_Name | cut -d \  -f 1`
		#no=`echo $User_Name | cut -d \  -f 2`
		#top_project="VMAX-O"
	    funline_40_old=`echo $measure_result_old | cut -d \, -f 1`
	    funline_40_new=`echo $measure_result_new | cut -d \, -f 1`
	    oneline_120_old=`echo $measure_result_old | cut -d \, -f 2`
	    oneline_120_new=`echo $measure_result_new | cut -d \, -f 2`
		cyclomatic_8_old=`echo $measure_result_old | cut -d \, -f 3`
	    cyclomatic_8_new=`echo $measure_result_new | cut -d \,  -f 3`
		parameter_5_old=`echo $measure_result_old | cut -d \, -f 4`
		parameter_5_new=`echo $measure_result_new | cut -d \, -f 4`

		funline_change=$[funline_40_new - funline_40_old]
		oneline_change=$[oneline_120_new - oneline_120_old]
		cyclomatic_change=$[cyclomatic_8_new - cyclomatic_8_old]
		parameter_change=$[parameter_5_new - parameter_5_old]
		if [ $funline_change -ne 0 ] || [ $oneline_change -ne 0 ] || [ $cyclomatic_change -ne 0 ] || [ $parameter_change -ne 0 ];then
			save_to_db ${User_Name} ${User_No} ${Project} ${Top_Project} $cyclomatic_change $funline_change $oneline_change $parameter_change 
		fi
	fi
}

# Not necessary, special process for some project
function process_sub_projects()
{
	local dirs
	local temp
	if [[ $Project == *vmax-metadata-manager* ]];then		
		dirs=($(find ./vmax-metadata-common/common -name project -maxdepth 2 | awk '{print $1}'))
		for path in ${dirs[@]}
		do
			temp=${path%%/project}
			Sub_Project=${temp:2}
			mesure ${Sub_Project}
		done
		mesure vmax-metadata-spark-coordinator-2.0
		mesure vmax-metadata-security
		mesure vmax-oam
	fi	
}

function main()
{
	mesure $Project
	process_sub_projects
}

main
