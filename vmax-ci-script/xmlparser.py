#!/usr/bin/python
# -*- coding: UTF-8 -*-
from xml.dom.minidom import parse
import xml.dom.minidom

import sys
import codecs

bugnum = 0


def parse(file_name):
    global bugnum
    try:
        DOMTree = xml.dom.minidom.parse(file_name)
    except:
        #print "Error: 没有找到文件或读取文件失败"
        print bugnum
        return bugnum
    else:
        if "scalastyle_result" in file_name:
            # xmlFile = open(file_name, "r")
            # text = xmlFile.read().encode('UTF-8')
            # text = text.replace('<?xml version="1.0" encoding="GBK"?>', '<?xml version="1.0" encoding="UTF-8"?>')
            # xmlFile.close()
            # tempFileName = file_name.split('.xml')[0] + '_temp.xml'
            # xmlFile = open(tempFileName, 'wb')
            # xmlFile.write(text)
            # xmlFile.close()

            # DOMTree = xml.dom.minidom.parse(tempFileName)
            # 获取所有error
            bugnum = DOMTree.documentElement.getElementsByTagName("error").length
        elif "findbugs_result" in file_name:
            # 获取所有BugInstance
            bugnum = DOMTree.documentElement.getElementsByTagName("BugInstance").length
            # 获取所有BugInstance
            # sys.exit(bugs.length)
    print bugnum
    return bugnum

average_cyclomatic = 0
all_cyclomatic = 0
cyclomatic_count = 0

average_fileLineLengh = 0
all_fileLineLengh = 0
line_count = 0
parameters_count=0

average_methodLengh = 0
all_methodLengh = 0
method_count = 0

return_msg = ""

# 计算平均复杂度
def parseScalaStyle(file_name):
    global average_cyclomatic, all_cyclomatic, cyclomatic_count, return_msg
    global average_fileLineLengh, all_fileLineLengh, line_count, parameters_count
    global average_methodLengh, all_methodLengh, method_count
    try:
        DOMTree = xml.dom.minidom.parse(file_name)
    except:
        print "Error: 没有找到文件或读取文件失败"
        print return_msg
        return return_msg
    else:
        errors = DOMTree.documentElement.getElementsByTagName("error")
        for error in errors:
            message = error.getAttribute("message")
            #print "message: %s" % message
            if "Cyclomatic" in message:
                cyclomatic = int(message[24:27].lstrip().rstrip())
                # print "cyclomatic: %d" % cyclomatic
                all_cyclomatic = all_cyclomatic + cyclomatic
                # print "all_cyclomatic: %d" % all_cyclomatic
                cyclomatic_count = cyclomatic_count + 1
                # print "cyclomatic_count: %d" % cyclomatic_count
                average_cyclomatic = all_cyclomatic // cyclomatic_count
                # print "average_cyclomatic: %d" % average_cyclomatic
            elif "Method is longer" in message:
                methodLength = int(message[22:25].lstrip().rstrip())
                # print "methodLength: %d" % methodLength
                all_methodLengh = all_methodLengh + methodLength
                # print "all_methodLengh: %d" % all_methodLengh
                method_count = method_count + 1
                # print "method_count: %d" % method_count
                average_methodLengh = all_methodLengh // method_count
                # print "average_methodLengh: %d" % average_methodLengh
            elif "File line length" in message:
                fileLineLength = int(message[24:29].lstrip().rstrip())
                # print "fileLineLength: %d" % fileLineLength
                all_fileLineLengh = all_fileLineLengh + fileLineLength
                # print "all_fileLineLengh: %d" % all_fileLineLengh
                line_count = line_count + 1
                # print "line_count: %d" % line_count
                average_fileLineLengh = all_fileLineLengh // line_count
                # print "average_fileLineLengh: %d" % average_fileLineLengh
            elif "The number of parameters" in message:
                parameters_count = parameters_count + 1
    # return_msg = "method_count=%d,line_count=%d,cyclomatic_count=%d,parameters_count=%d" % (
    return_msg = "%d,%d,%d,%d" % (method_count, line_count, cyclomatic_count, parameters_count)
    print return_msg
    return return_msg

if (__name__ == "__main__"):
    # parse("scalastyle_result.xml")
    # parse("findbugs_result.xml")
    parseScalaStyle("scalastyle_result.xml")
