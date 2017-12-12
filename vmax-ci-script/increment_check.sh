#!/bin/bash
set -x
#################################################################### 
# Incremental check by findbugs and scalastyle
# Rev Date        Author      Comments
#--------------------------------------------------------------------
# 001 20170801    Liuyulong    Original
#################################################################### 
#################################################################### 
BASE_DIR=$(pwd)
BUILD_NUMBER=$1

# You may need to modify the below parameters for your project
JDK_HOME=../rdk-resource/jdk
Scala_Version=scala-2.10
Ivy2_Home=/home/sbt/ivy2
Sbt_Home=/home/sbt
Scalastyle_Jar=/home/scalastyle_2.12-0.9.0-batch.jar
Findbugs_Jar=/home/findbugs-3.0.1/lib/findbugs.jar
Project_Dir=rdk
Script_Dir=vmax-ci-script


index=0
index_add=0
index_del=0
index_modi=0
scala_files_st_add=""
scala_files_st_modi=""
scala_files_st_del=""
class_files_st_add=""
class_files_st_modi=""
class_files_st_del=""
auxclasspathes=""
convertedPath=""
findbugs_num_old=0
findbugs_num_new=0
scalastyle_num_old=0
scalastyle_num_new=0
#################################################################### 
#       Check git path changed
#################################################################### 
function has_source_changed()
{
	local SOURCE_PATH=$1
	echo "$SOURCE_PATH"
	git diff HEAD HEAD~ --name-only |grep "$SOURCE_PATH"
	return $?
}

#################################################################### 
#   Increment compile
####################################################################
function incrementCompile()
{
	has_source_changed $1
	if [ $? -eq 0  ]; then
		if [ $# == 1 ] ; then 
			cd $1
		else
			cd $2
		fi
	# compile and assemble adma manager
	java -Xms1024M -Xmx4096M -Xss8M -XX:+CMSClassUnloadingEnabled -XX:MaxPermSize=512M \
	     -Dsbt.log.noformat=true -Dsbt.boot.directory=$Sbt_Home/boot \
	     -Dsbt.ivy.home=$Ivy2_Home -Dsbt.override.build.repos=true \
	     -jar $Sbt_Home/bin/sbt-launch.jar compile
	cd ..
	fi	
}
#################################################################### 
#   Convert path, if necessary
####################################################################
function convertPath()
{
	local path=$1
	if [[ $path == *vmax-metadata-common* ]];then
	    path=${path/vmax-metadata-common\/common/vmax-metadata-common\/metajar}
	fi	    
	convertedPath=$path
}

# Find modified files in current commit
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
		add_files[$index_add]=${files[index+1]}
        index_add=$[index_add+1]
        index=$[index+2]
    fi
    if [ "${file:0:1}"x = "D"x ];then
        del_files[$index_del]=${files[index+1]}
        index_del=$[index_del+1]
        index=$[index+2]
    fi
    if [ "${file:0:1}"x = "M"x ];then
        modi_files[$index_modi]=${files[index+1]}
        index_modi=$[index_modi+1]
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
	       convertPath $file
	       file1=${convertedPath/src\/main\/scala/target\/$Scala_Version\/classes}
	       class_files_add[$index]=${file1/.scala/.class}
	       index=$[index+1]
	       class_files_add[$index]=${file1/.scala/\$*.class}
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
	       convertPath $file
	       file1=${convertedPath/src\/main\/scala/target\/$Scala_Version\/classes}
	       class_files_del[$index]=${file1/.scala/.class}
	       index=$[index+1]
	       class_files_del[$index]=${file1/.scala/\$*.class}
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
	       convertPath $file
	       file1=${convertedPath/src\/main\/scala/target\/$Scala_Version\/classes}
	       class_files_modi[$index]=${file1/.scala/.class}
	       index=$[index+1]
	       class_files_modi[$index]=${file1/.scala/\$*.class}
	       index=$[index+1]
       fi
    fi
done

# Judge if need to check
arr_length_add=${#scala_files_add[*]}
arr_length_modi=${#scala_files_modi[*]}
if [ $arr_length_add -eq 0 ];then
	if [ $arr_length_modi -eq 0 ];then
		echo "no scala files to check"
		exit 0
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

# Compute auxclasspathes and class_files_st for findbugs
for var in ${class_files_add[@]}
do
	class_files_st_add="$class_files_st_add $BASE_DIR/$var"
	auxclasspath="-auxclasspath $BASE_DIR/${var%classes*class}classes"
	if [[ $auxclasspathes != *$auxclasspath* ]];then
		auxclasspathes="$auxclasspathes $auxclasspath"
	fi
done
for var in ${class_files_modi[@]}
do
	class_files_st_modi="$class_files_st_modi $BASE_DIR/$var"
	auxclasspath="-auxclasspath $BASE_DIR/${var%classes*class}classes"
	if [[ $auxclasspathes != *$auxclasspath* ]];then
		auxclasspathes="$auxclasspathes $auxclasspath"
	fi
done
for var in ${class_files_del[@]}
do
	class_files_st_del="$class_files_st_del $BASE_DIR/$var"
	auxclasspath="-auxclasspath $BASE_DIR/${var%classes*class}classes"
	if [[ $auxclasspathes != *$auxclasspath* ]];then
		auxclasspathes="$auxclasspathes $auxclasspath"
	fi
done

# Check modified files for current commit
$JDK_HOME/bin/java -jar $Scalastyle_Jar --config $BASE_DIR/$Script_Dir/scalastyle-config.xml --xmlOutput $BASE_DIR/scalastyle_result_new.xml --xmlEncoding UTF-8 $scala_files_st_add $scala_files_st_modi
java -jar $Findbugs_Jar -textui -auxclasspath $Ivy2_Home $auxclasspathes -exclude $BASE_DIR/$Script_Dir/findbugs_exclude_filter.xml -sourcepath $BASE_DIR -xml -output findbugs_result_new.xml $class_files_st_modi $class_files_st_add
cat scalastyle_result_new.xml
cat findbugs_result_new.xml
cd vmax-ci-script
scalastyle_num_new=`python -c 'import xmlparser;xmlparser.parse("../scalastyle_result_new.xml")'`  
findbugs_num_new=`python -c 'import xmlparser;xmlparser.parse("../findbugs_result_new.xml")'`  
cd ..

# Get current and last commit
current_commitid=`git rev-parse HEAD`
last_commitid=`git rev-parse HEAD~1`

# Reset modified files to last commit
git checkout $last_commitid $scala_files_st_modi

# Increment compile
incrementCompile $Project_Dir
#incrementCompile "vmax-metadata-common/metajar/dataperiodmanage/"

# Check modified files for last commit
$JDK_HOME/bin/java -jar $Scalastyle_Jar --config $BASE_DIR/$Script_Dir/scalastyle-config.xml --xmlOutput $BASE_DIR/scalastyle_result_old.xml --xmlEncoding UTF-8 $scala_files_st_modi
java -jar $Findbugs_Jar -textui -auxclasspath $Ivy2_Home $auxclasspathes -exclude $BASE_DIR/$Script_Dir/findbugs_exclude_filter.xml -sourcepath $BASE_DIR -xml -output findbugs_result_old.xml $class_files_st_modi
cat scalastyle_result_old.xml
cat findbugs_result_old.xml
cd vmax-ci-script
scalastyle_num_old=`python -c 'import xmlparser;xmlparser.parse("../scalastyle_result_old.xml")'`  
findbugs_num_old=`python -c 'import xmlparser;xmlparser.parse("../findbugs_result_old.xml")'`  
cd ..

# Reset modified files to current commit
git checkout $current_commitid $scala_files_st_modi

# Check if the num of warnning increased
if [ $findbugs_num_new -gt $findbugs_num_old ] || [ $scalastyle_num_new -gt $scalastyle_num_old ];then
	exit 1
else
	exit 0
fi
