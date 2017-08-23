package com.zte.vmax.rdk.jsr;

import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.zte.vmax.rdk.jsr.excel.BasicExcelHelper;
import com.zte.vmax.rdk.jsr.excel.ExcelHelper;
import com.zte.vmax.rdk.log.AbstractAppLoggable;
import com.zte.vmax.rdk.log.AppLogger;
import com.zte.vmax.rdk.util.RdkUtil;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.internal.runtime.Undefined;
import org.json.JSONObject;
import org.json.XML;

import java.io.*;
import java.nio.ByteBuffer;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * Created by 10045812 on 16-5-6.
 */
@SuppressWarnings(value = {"unchecked", "deprecation"})
public class FileHelper extends AbstractAppLoggable {

    protected void initLogger() {
        logger = AppLogger.getLogger("FileHelper", appName);
    }

    // return code:
    // 0: good
    // 1: bad arguments
    // 2: source not exist
    // 3: sub file/dir not exist
    // 4: unable to create target file
    // 5: unable to write target file
    // todo: 文件夹的层次过深，会导致这个函数堆栈溢出
    // force: 未启用
    public int copy(String cpFrom, String cpTo, boolean recursive, boolean force) {
        File in = new File(fixPath(cpFrom, appName));
        File out = new File(fixPath(cpTo, appName));
        if (!in.exists()) {
            logger.error("copy file, code 2, detail: source not exist");
            return 2;
        }
        if (!out.exists()) {
            out.mkdirs();
        }

        File[] files;
        if (in.isFile()) {
            files = new File[1];
            files[0] = in;
        } else {
            files = in.listFiles();
        }

        FileChannel finChannel = null;
        FileChannel foutChannel = null;
        for (int i = 0; i < files.length; i++) {
            if (files[i].isFile()) {
                try {
                    finChannel = new FileInputStream(files[i]).getChannel();
                } catch (FileNotFoundException e) {
                    logger.error("copy file, code 3, detail: " + e.toString());
                    return 3;
                }

                try {
                    foutChannel = new FileOutputStream(new File(cpTo + "/" + files[i].getName())).getChannel();
                } catch (FileNotFoundException e) {
                    logger.error("copy file, code 4, detail: " + e.toString());
                    try {
                        finChannel.close();
                    } catch (Exception ee) {
                        logger.error("close fin error, detail: " + ee.toString());
                    }
                    return 4;
                }

                try {
                    MappedByteBuffer mbb = finChannel.map(FileChannel.MapMode.READ_ONLY, 0, finChannel.size());
                    foutChannel.write(mbb);
                } catch (IOException e) {
                    logger.error("copy file, code 5, detail: " + e.toString());
                    return 5;
                } finally {
                    try {
                        finChannel.close();
                    } catch (Exception e) {
                        logger.error("close fin error, detail: " + e.toString());
                    }
                    try {
                        foutChannel.close();
                    } catch (Exception e) {
                        logger.error("close fout error, detail: " + e.toString());
                    }
                }
            } else if (recursive) {
                int ret = copy(cpFrom + "/" + files[i].getName(), cpTo + "/" + files[i].getName(), recursive, force);
                if (ret != 0) {
                    return ret;
                }
            }
        }
        return 0;
    }

    public String readString(String path) {
        path = fixPath(path, appName);

        byte[] buf = new byte[512 * 1024];
        FileInputStream fin = null;
        StringBuilder sb = new StringBuilder();
        try {
            int len;
            fin = new FileInputStream(path);
            while ((len = fin.read(buf)) != -1) {
                sb.append(new String(buf, 0, len).toString());
            }

        } catch (FileNotFoundException e) {
            logger.error("read file not exist," + e.getCause());
        } catch (IOException e) {
            logger.error("read stream error," + e.getCause());
        } finally {
            try {
                fin.close();
            } catch (Exception e) {
                logger.error("close stream error," + e);
            }
        }
        return sb.toString();

    }

    public String readXml(String path) {
        String content = readString(path);
        JSONObject jsonObj = null;
        try {
            jsonObj = XML.toJSONObject(content.replace("\n", "").replace("\r", ""));
        } catch (Exception e) {
            logger.error("transform json object error," + e);
            return "";
        }

        try {
            return jsonObj.toString();
        } catch (Exception e) {
            logger.error("toString error," + e);
            return "";
        }
    }

    public Properties loadProperty(String fileStr) {
        Properties props = new Properties();
        FileInputStream finStream = null;
        InputStreamReader reader = null;

        try {
            finStream = new FileInputStream(fileStr);
            reader = new InputStreamReader(finStream, "UTF-8");
        } catch (Exception e) {
            logger.error("create inputStream error," + e);
        }

        try {
            props.load(reader);
        } catch (Exception e) {
            logger.error("propertity load error," + e);
        }

        try {
            finStream.close();
            reader.close();
        } catch (Exception e) {
            logger.error("close inputStream error," + e);
        }

        return props;
    }

    public boolean ensureFileExists(File file) {
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

        FileChannel fouChanel = null;
        try {
            logger.debug("writing file: " + fileStr);
            fouChanel = new FileOutputStream(file, append == 1).getChannel();
            fouChanel.write(ByteBuffer.wrap(fileContent.getBytes(toEncoding(encoding))));
        } catch (Exception e) {
            logger.error("write file[" + fileStr + "] error", e);
            return false;
        } finally {
            try {
                if (fouChanel != null) {
                    fouChanel.close();
                }
            } catch (Exception e) {
                logger.error("close writer error", e);
            }
        }
        return true;
    }

    public String readCSV(String fileStr, Object option) {
        HashMap<String, Object> op = parseCSVOptionFromScript(option);
        char separator = (char) op.get("separator");
        char quoteChar = (char) op.get("quoteChar");
        char escapeChar = (char) op.get("escapeChar");
        int line = (int) op.get("line");
        boolean strictQuotes = (boolean) op.get("strictQuotes");
        boolean ignoreLeadingWhiteSpace = (boolean) op.get("ignoreLeadingWhiteSpace");
        boolean keepCR = (boolean) op.get("keepCR");
        String encoding = (String) op.get("encoding");

        fileStr = fixPath(fileStr, appName);

        File file = new File(fileStr);

        InputStreamReader reader = null;
        try {
            reader = new InputStreamReader(new FileInputStream(file), encoding);
        } catch (FileNotFoundException ex) {
            logger.error("file not found exception:" + ex);
            return null;
        } catch (UnsupportedEncodingException ex) {
            logger.error("UnsupportedEncodingException:" + ex);
            return null;
        }

        List<String[]> result = null;
        try {
            result = new CSVReader(reader, separator, quoteChar, escapeChar, line, strictQuotes, ignoreLeadingWhiteSpace, keepCR).readAll();
        }
        catch (IOException ex) {
            logger.error("read csv file error:" + ex);
            return null;
        }finally {
            try {
                if (reader != null)
                    reader.close();
            }catch (IOException e){
                logger.error("close stream error:" + e);
            }
        }
        return RdkUtil.toJsonString(result);

    }

    private HashMap<String, Object> parseCSVOptionFromScript(Object option) {
        HashMap<String, Object> op = new HashMap<>();

        if (option instanceof ScriptObjectMirror) {
            ScriptObjectMirror som = (ScriptObjectMirror) option;
            op.put("separator", toChar(som.getMember("separator"), ','));
            op.put("quoteChar", toChar(som.getMember("quoteChar"), '"'));
            op.put("escapeChar", toChar(som.getMember("escapeChar"), '\''));
            op.put("lineEnd", toString(som.getMember("lineEnd"), "\n"));
            op.put("encoding", toString(som.getMember("encoding"), "GBK"));
            op.put("append", toBoolean(som.getMember("append")));
            op.put("line", toInt(som.getMember("line"), 0));
            op.put("strictQuotes", toBoolean(som.getMember("strictQuotes")));
            op.put("ignoreLeadingWhiteSpace", toBoolean(som.getMember("ignoreLeadingWhiteSpace")));
            op.put("keepCR", toBoolean(som.getMember("keepCR")));
        } else {
            if (!(option instanceof Undefined)) {
                logger.error("unsupported option type[" + option.getClass().getName() + "]! ignoring it!");
            }
            op.put("separator", ',');
            op.put("quoteChar", '"');
            op.put("escapeChar", '\'');
            op.put("lineEnd", "\n");
            op.put("encoding", "GBK");
            op.put("append", toBoolean(false));
            op.put("line", 0);
            op.put("strictQuotes", toBoolean(false));
            op.put("ignoreLeadingWhiteSpace", toBoolean(false));
            op.put("keepCR", toBoolean(false));
        }

        return op;
    }

    public boolean saveAsCSV(String file, Object content, Object excludeIndexes, Object option) {
        HashMap<String, Object> op = parseCSVOptionFromScript(option);
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
        for (int i = 0; i < length; i++) {
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

    private HashMap<String, Object> parseExcelOptionFromScript(Object option) {
        HashMap<String, Object> op = new HashMap<>();
        if (option instanceof ScriptObjectMirror) {
            ScriptObjectMirror som = (ScriptObjectMirror) option;
            for (String key : som.keySet()) {
                op.put(key, som.get(key));
            }
            boolean append = som.containsKey("append") ? (Boolean) som.get("append") : false;
            op.put("append", append);
            String encoding = som.containsKey("encoding") ? som.get("encoding").toString() : "UTF-8";
            op.put("encoding", encoding);
        } else {
            if (!(option instanceof Undefined)) {
                logger.warn("unsupported option type[" + option.getClass().getName() + "]! ignoring it!");
            }
            op.put("append", false);
            op.put("encoding", "UTF-8");
        }
        return op;
    }

    public String readExcel(String fileStr, Object option) {
        fileStr = fixPath(fileStr, appName);
        try{
            ExcelHelper helper = BasicExcelHelper.getRealHelper(fileStr, false);
            return helper.readExcel(fileStr);
        }catch (Exception ex){
            logger.error("Read Excel Error", ex);
            return null;
        }
    }

    public boolean saveAsEXCEL(String file, ScriptObjectMirror content, ScriptObjectMirror excludeIndexes, Object option) {
        return saveAsEXCEL(file, content, excludeIndexes, parseExcelOptionFromScript(option));
    }

    public boolean saveAsEXCEL(String fileStr, ScriptObjectMirror content, ScriptObjectMirror excludeIndexes, HashMap<String, Object> option) {
        fileStr = fixPath(fileStr, appName);
        File file = new File(fileStr);
        if (file.isDirectory()) {
            logger.error("need a file, got a path: " + fileStr);
            return false;
        }
        if (!ensureFileExists(file)) {
            return false;
        }
        try{
            boolean useStreaming = option.get("useStreaming") != null ? (boolean) option.get("useStreaming") : false;
            ExcelHelper helper = BasicExcelHelper.getRealHelper(fileStr, useStreaming);
            helper.writeExcel(fileStr, content, excludeIndexes, option);
        }catch (Exception ex){
            logger.error("Write Excel Error", ex);
            return false;
        }
        logger.info("saving excel success!");
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
            if (appName.startsWith("../")) {
                return appName;
            } else {
                return svrMatcher.replaceFirst("app/" + appName + "/server");
            }

        }

        Matcher baseMatcher = basePattern.matcher(path);
        if (baseMatcher.find()) {
            return baseMatcher.replaceFirst("app/" + appName);
        }

        return path;
    }

}

