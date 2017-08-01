package com.zte.vmax.rdk.jsr.excel;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import java.util.Map;

/**
 * Created by 10033559 on 2017/7/26.
 */
public interface ExcelHelper {
    public String readExcel(String fullPathName)throws Exception;
    public boolean writeExcel(String fullPathName, ScriptObjectMirror content, ScriptObjectMirror excludeIndexes, Map<String, Object> option)throws Exception;
}
