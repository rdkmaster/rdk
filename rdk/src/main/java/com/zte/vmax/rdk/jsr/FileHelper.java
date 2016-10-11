package com.zte.vmax.rdk.jsr;

import com.opencsv.CSVWriter;
import com.zte.vmax.rdk.log.AbstractAppLoggable;
import com.zte.vmax.rdk.log.AppLogger;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.internal.runtime.Undefined;

import java.io.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import jxl.Workbook;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.Label;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

/**
 * Created by 10045812 on 16-5-6.
 */
public class FileHelper extends AbstractAppLoggable {

    protected void initLogger() {
        logger = AppLogger.getLogger("FileHelper", appName);
    }

    public Properties loadProperty(String fileStr){
        Properties props = new Properties();
        FileInputStream finStream= null;
        InputStreamReader reader=null;

        try{
            finStream=new FileInputStream(fileStr);
            reader = new InputStreamReader(finStream, "UTF-8");
        }catch(Exception e){
            logger.error("create inputStream error,"+e);
        }

        try{
            props.load(reader);
        }catch (Exception e){
            logger.error("propertity load error,"+e);
        }

        try{
            finStream.close();
            reader.close();
        }catch (Exception e){
            logger.error("close inputStream error,"+e);
        }

        return props;
    }

    private boolean ensureFileExists(File file) {
        File parent = file.isDirectory() ? file : file.getParentFile();
        if (parent != null && !parent.exists()) {
            logger.debug("making parent dirs: " + parent);
            if (!parent.mkdirs()) {
                logger.error("unable to create parent dir:" + parent);
                return false;
            }
        }

        if (!file.exists()) {
            logger.debug("creating file: " + file);
            try {
                if (!file.createNewFile()) {
                    logger.error("unable to create file: " + file);
                    return false;
                }
            } catch (IOException e) {
                logger.error("createNewFile[" + file + "] error", e);
            }
        }

        return true;
    }

    public boolean save(String fileStr, String fileContent, long append, Object encoding) {
        fileStr = fixPath(fileStr, appName);

        File file = new File(fileStr);
        if (file.isDirectory()) {
            logger.error("need a file, got a path: " + fileStr);
            return false;
        }
        if (!ensureFileExists(file)) {
            return false;
        }

        OutputStreamWriter write = null;
        try {
            logger.debug("writing file: " + fileStr);
            write = new OutputStreamWriter(new FileOutputStream(file, append == 1), toEncoding(encoding));
            write.append(fileContent);
        } catch (Exception e) {
            logger.error("write file[" + fileStr + "] error", e);
            return false;
        } finally {
            try {
                if (write != null) {
                    write.close();
                }
            } catch (Exception e) {
                logger.error("close writer error", e);
            }
        }
        return true;
    }

    public boolean saveAsCSV(String file, Object content, Object excludeIndexes, Object option) {
        HashMap<String, Object> op = new HashMap<>();

        if (option instanceof ScriptObjectMirror) {
            ScriptObjectMirror som = (ScriptObjectMirror) option;
            op.put("separator", toChar(som.getMember("separator"), ','));
            op.put("quoteChar", toChar(som.getMember("quoteChar"), '"'));
            op.put("escapeChar", toChar(som.getMember("escapeChar"), '"'));
            op.put("lineEnd", toString(som.getMember("lineEnd"), "\n"));
            op.put("encoding", toString(som.getMember("encoding"), "GBK"));
            op.put("append", toBoolean(som.getMember("append")));
        } else {
            if (!(option instanceof Undefined)) {
                logger.error("unsupported option type[" + option.getClass().getName() + "]! ignoring it!");
            }
            op.put("separator", ',');
            op.put("quoteChar", '"');
            op.put("escapeChar", '"');
            op.put("lineEnd", "\n");
            op.put("encoding", "GBK");
            op.put("append", toBoolean(false));
        }

        return saveAsCSV(file, content, excludeIndexes, op);
    }

    public boolean saveAsCSV(String fileStr, Object content, Object excludeIndexes, HashMap<String, Object> option) {
        if (!likeArray(content)) {
            return false;
        }

        fileStr = fixPath(fileStr, appName);

        File file = new File(fileStr);
        if (file.isDirectory()) {
            logger.error("need a file, got a path: " + fileStr);
            return false;
        }
        if (!ensureFileExists(file)) {
            return false;
        }

        boolean append = (boolean) option.get("append");
        String encoding = (String) option.get("encoding");
        OutputStreamWriter osw;
        try {
            osw = new OutputStreamWriter(new FileOutputStream(file, append), encoding);
        } catch (UnsupportedEncodingException e) {
            logger.error("UnsupportedEncodingException, encoding=" + encoding, e);
            return false;
        } catch (FileNotFoundException e) {
            logger.error("FileNotFoundException, fileStr=" + fileStr, e);
            return false;
        }

        char separator = (char) option.get("separator");
        char quoteChar = (char) option.get("quoteChar");
        char escapeChar = (char) option.get("escapeChar");
        String lineEnd = (String) option.get("lineEnd");
        CSVWriter writer = new CSVWriter(osw, separator, quoteChar, escapeChar, lineEnd);

        ScriptObjectMirror som = (ScriptObjectMirror) content;
        int length = toInt(som.getMember("length"), 0);
        for(int i = 0; i < length; i++) {
            writeCsvRow(writer, som.getMember(Integer.toString(i)), excludeIndexes);
        }
        try {
            writer.close();
        } catch (IOException e) {
            logger.error("save to csv error", e);
            return false;
        }

        return true;
    }

    private boolean writeCsvRow(CSVWriter writer, Object rowObject, Object excludeIndexes) {
        if (!likeArray(rowObject)) {
            return false;
        }

        ArrayList<Integer> ci = toIntList(excludeIndexes);

        ScriptObjectMirror som = (ScriptObjectMirror) rowObject;
        int length = toInt(som.getMember("length"), 0);
        ArrayList<String> row = new ArrayList<String>();
        for (int i = 0; i < length; i++) {
            String idx = Integer.toString(i);
            if (som.hasMember(idx) && !ci.contains(i)) {
                Object cellObj = som.getMember(idx);
                row.add(cellObj == null ? "" : cellObj.toString());
            }
        }
        writer.writeNext(row.toArray(new String[row.size()]));

        return true;
    }

    public boolean saveAsEXCEL(String file, Object content, Object excludeIndexes, Object option) {
        HashMap<String, Object> op = new HashMap<>();
        if (option instanceof ScriptObjectMirror) {
            ScriptObjectMirror som = (ScriptObjectMirror) option;
            boolean append=(Boolean)som.get("append");
            op.put("append", append);
        } else {
            if (!(option instanceof Undefined)) {
                logger.error("unsupported option type[" + option.getClass().getName() + "]! ignoring it!");
            }
            op.put("append",false);
        }
        return saveAsEXCEL(file, content, excludeIndexes, op);
    }

    public boolean saveAsEXCEL(String fileStr, Object content, Object excludeIndexes,HashMap<String, Object> option) {

        fileStr = fixPath(fileStr, appName);

        File file = new File(fileStr);

        if (file.isDirectory()) {
            logger.error("need a file, got a path: " + fileStr);
            return false;
        }

        if (!ensureFileExists(file)) {
            return false;
        }

        int toWritesheetNums=((ScriptObjectMirror)content).size();

        boolean append= (boolean)option.get("append");

        WritableWorkbook rwb=null;

        Workbook wb=null;

        Object[] toWritesheetNames=((ScriptObjectMirror) content).keySet().toArray();

        if(!append) {   //复写
            try {
                rwb = Workbook.createWorkbook(file);
            } catch (Exception e) {
                logger.info("create workbook error:" + e);
                return false;
            }
            for (int i = 0; i < toWritesheetNums; i++) {
                String sheetname = toWritesheetNames[i].toString();
                writeEXCEL(rwb, sheetname, i, ((ScriptObjectMirror) content).get(sheetname), ((ScriptObjectMirror) excludeIndexes).get(sheetname), option);
            }

            try{
                rwb.write();
                rwb.close();
            }catch (Exception e){
                logger.error("write or close error:"+e);
                return false;
            }
        }
        else {         //追加
            try{
                wb=Workbook.getWorkbook(file);
                rwb=Workbook.createWorkbook(file, wb);
            }catch (Exception e){
                logger.error("get workbook error,creating new workbook:"+e);
                try{
                    rwb=Workbook.createWorkbook(file);
                }catch (Exception ex){
                    logger.error("create workbook error:"+e);
                    return false;
                }

            }

            for (int i = 0; i < toWritesheetNums; i++) {
                String sheetname = toWritesheetNames[i].toString();
                appendEXCEL(rwb,sheetname,((ScriptObjectMirror)content).get(sheetname),((ScriptObjectMirror)excludeIndexes).get(sheetname),option);
            }

            try{
                rwb.write();
                rwb.close();
                wb.close();
            }catch (Exception e){
                logger.error("write or close error:"+e);
                return false;
            }
        }
        return true;
    }

    private boolean writeEXCEL(WritableWorkbook workbook,String sheetname,int sheetindex,Object content,Object excludeIndexes,HashMap<String, Object> option){
        WritableSheet sheet = workbook.createSheet(sheetname, sheetindex);
        ScriptObjectMirror som = (ScriptObjectMirror) content;
        int length = toInt(som.getMember("length"), 0);
        for(int i = 0; i < length; i++) {
            writeEXCELRow(sheet, i,som.getMember(Integer.toString(i)), excludeIndexes,option);
        }
        return true;
    }

    private boolean writeEXCELRow(WritableSheet sheet,int rowIndex,Object rowContent,Object excludeIndexes,Object option){
        if (!likeArray(rowContent)) {
            return false;
        }

        ArrayList<Integer> ci = toIntList(excludeIndexes);

        ScriptObjectMirror som = (ScriptObjectMirror) rowContent;
        int length = toInt(som.getMember("length"), 0);
        int j=0;
        for (int i = 0; i < length; i++) {
            String idx = Integer.toString(i);
            if (som.hasMember(idx) && !ci.contains(i)) {
                Object cellObj = som.getMember(idx);
                Label label = new Label(j++,rowIndex,cellObj == null ? "" : cellObj.toString());
                try{
                    sheet.addCell(label);
                }catch (Exception e){
                    logger.error("addcell error:"+e);
                    return false;
                }

            }
        }
        return true;
    }

    private boolean appendEXCEL(WritableWorkbook workbook,String sheetName,Object content,Object excludeIndexes,HashMap<String, Object> option){
        WritableSheet ws =null;

        ScriptObjectMirror som = (ScriptObjectMirror) content;
        int length = toInt(som.getMember("length"), 0);

        String []sheetNames=workbook.getSheetNames();
        List<String> existsheetNames= Arrays.asList(sheetNames);
        if(existsheetNames.contains(sheetName)) {//追加表存在
            try {
                ws = workbook.getSheet(sheetName);
            } catch (Exception e) {
                logger.error("get sheet error:" + e);
                return false;
            }
            int rows = ws.getRows();
            for (int i = 0; i < length; i++) {
                writeEXCELRow(ws, i + rows, som.getMember(Integer.toString(i)), excludeIndexes, option);
            }
        }
        else {              //追加但表不存在
            ws=workbook.createSheet(sheetName,sheetNames.length+1);
            for(int i = 0; i < length; i++) {
                writeEXCELRow(ws, i,som.getMember(Integer.toString(i)), excludeIndexes,option);
            }
        }

        return true;
    }

    private String toEncoding(Object encoding) {
        return toEncoding(encoding, "utf-8");
    }

    private String toEncoding(Object encoding, String defaultValue) {
        if (encoding instanceof String) {
            return encoding.toString();
        } else {
            return defaultValue;
        }
    }

    private int toInt(Object intValue, int defaultValue) {
        try {
            return Integer.parseInt(intValue.toString());
        } catch (Exception e) {
            return defaultValue;
        }
    }

    private int toInt(Object intValue) {
        return toInt(intValue, -1);
    }

    private boolean toBoolean(Object bool) {
        if (bool instanceof Boolean) {
            return (boolean) bool;
        } else {
            return bool instanceof Long && (Long) bool != 0;
        }
    }

    private char toChar(Object value, char defaultValue) {
        return value == null || value instanceof Undefined ? defaultValue : value.toString().charAt(0);
    }

    private String toString(Object value, String defaultValue) {
        return value == null || value instanceof Undefined ? defaultValue : value.toString();
    }

    private ArrayList<Integer> toIntList(Object obj) {
        ArrayList<Integer> result = new ArrayList<>();

        if (obj instanceof Undefined) {
            return result;
        }
        if (!likeArray(obj)) {
            return result;
        }

        ScriptObjectMirror som = (ScriptObjectMirror) obj;
        int length = toInt(som.getMember("length"), 0);
        if (length <= 0) {
            return result;
        }

        for (int i = 0; i < length; i++) {
            int idx = toInt(som.getMember(Integer.toString(i)));
            if (idx == -1) {
                continue;
            }
            result.add(idx);
        }
        return result;
    }

    private boolean likeArray(Object obj) {
        if (obj == null) {
            return false;
        }

        if (obj instanceof Undefined) {
            logger.error("cast to array error: content == undefined");
            return false;
        }

        if (!(obj instanceof ScriptObjectMirror)) {
            logger.error("unsupported content type: " + obj.getClass().getName());
            return false;
        }

        ScriptObjectMirror som = (ScriptObjectMirror) obj;
        if (!som.hasMember("length")) {
            logger.error("unsupported content type, need length property");
            return false;
        }

        return true;
    }

    private static final Pattern basePattern = Pattern.compile("\\$base");
    private static final Pattern svrPattern = Pattern.compile("\\$svr");
    private static final Pattern webPattern = Pattern.compile("\\$web");

    public static String fixPath(String path, String appName) {
        Matcher webMatcher = webPattern.matcher(path);
        if (webMatcher.find()) {
            return webMatcher.replaceFirst("app/" + appName + "/web");
        }

        Matcher svrMatcher = svrPattern.matcher(path);
        if (svrMatcher.find()) {
            return svrMatcher.replaceFirst("app/" + appName + "/server");
        }

        Matcher baseMatcher = basePattern.matcher(path);
        if (baseMatcher.find()) {
            return baseMatcher.replaceFirst("app/" + appName);
        }

        return path;
    }
}
