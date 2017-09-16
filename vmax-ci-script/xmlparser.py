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
    except xml.parsers.expat.ExpatError:
        print "Error: 没有找到文件或读取文件失败"
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


if (__name__ == "__main__"):
    # parse("scalastyle_result.xml")
    parse("findbugs_result.xml")
