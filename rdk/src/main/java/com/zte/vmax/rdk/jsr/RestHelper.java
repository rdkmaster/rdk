package com.zte.vmax.rdk.jsr;

import com.zte.vmax.rdk.log.AbstractAppLoggable;
import com.zte.vmax.rdk.log.AppLogger;
import com.zte.vmax.rdk.config.Config;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.internal.runtime.Undefined;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by 10045812 on 16-6-27.
 */
public class RestHelper extends AbstractAppLoggable {

    protected void initLogger() {
        logger = AppLogger.getLogger("RestHelper", appName);
    }

    private static Pattern URL_PTN = Pattern.compile("^http://.+", Pattern.CASE_INSENSITIVE);

    public String get(String url, Object option) {
        return commonRest(url, null, option, "GET", false);
    }

    public String post(String url, String param, Object option) {
        return commonRest(url, param, option, "POST", true);
    }

    public String delete(String url, String param, Object option) {
        return commonRest(url, param, option, "DELETE", true);
    }

    public String put(String url, String param, Object option) {
        return commonRest(url, param, option, "PUT", true);
    }

    private String commonRest(String url, String param, Object option, String method, boolean hook) {
        url = url.trim();
        Matcher m = URL_PTN.matcher(url);
        if (!m.find()) {
            String prefix = "http://" + Config.get("http.server.ip", "localhost") + ":"
                    + Config.get("http.server.port", "26180");
            if (url.charAt(0) != '/') {
                prefix += '/';
            }
            url = prefix + url;
        }
        logger.debug("requesting(" + method + ") url=" + url);

        //需要请求的restful地址
        URL oUrl = null;
        try {
            oUrl = new URL(url);
        } catch (MalformedURLException e) {
            logger.error("Malformed URL", e);
            return null;
        }

        //打开restful链接
        HttpURLConnection conn = null;
        try {
            conn = (HttpURLConnection) oUrl.openConnection();
        } catch (IOException e) {
            logger.error("can not open connection", e);
            return null;
        }

        // 提交模式
        try {
            conn.setRequestMethod(method);
        } catch (ProtocolException e) {
            logger.error("Invalid protocol", e);
            return null;
        }

        if (hook) {
            // 发送POST,PUT,DELETE请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);

            //设置请求参数
            PrintWriter out = null;
            try {
                out = new PrintWriter(conn.getOutputStream());

                out.print(param);
                // flush输出流的缓冲
                out.flush();
            } catch (Exception e) {
                logger.error("get setoutPutStream error", e);
                return null;
            } finally {
                if (out != null) {
                    out.close();
                }
            }

        }

        setRequestProperties(conn, option);

        int connTimeout = Integer.parseInt(getProperty(option, "connectTimeout", "60000"));
        conn.setConnectTimeout(connTimeout);
        int readTimeout = Integer.parseInt(getProperty(option, "readTimeout", "20000"));
        conn.setReadTimeout(readTimeout);

        //读取请求返回值
        InputStream inStream = null;
        try {
            inStream = conn.getInputStream();
        } catch (IOException e) {
            logger.error("can not get input stream", e);
            return null;
        }
        int len = 0;
        try {
            len = inStream.available();
        } catch (IOException e) {
            logger.error("can not read length", e);
            return null;
        }
        byte[] bytes = new byte[len];
        try {
            inStream.read(bytes, 0, len);
        } catch (IOException e) {
            logger.error("can not read data", e);
            return null;
        }

        String encoding = getProperty(option, "encoding", "utf-8");
        String result;
        try {
            result = new String(bytes, encoding);
        } catch (UnsupportedEncodingException e) {
            logger.warn("invalid encoding \"" + encoding + "\" using default");
            result = new String(bytes);
        }
        return result;
    }

    private void setRequestProperties(HttpURLConnection conn, Object option) {
        if (option instanceof Undefined) {
            return;
        }
        ScriptObjectMirror som = (ScriptObjectMirror) option;
        if (!som.hasMember("requestProperty")) {
            return;
        }
        ScriptObjectMirror properties = (ScriptObjectMirror) som.getMember("requestProperty");
        String[] keys = properties.getOwnKeys(false);
        for (String key : keys) {
            conn.setRequestProperty(key, properties.getMember(key).toString());
        }
    }

    private String getProperty(Object option, String prop, String defaultValue) {
        if (option instanceof Undefined) {
            return defaultValue;
        }
        ScriptObjectMirror som = (ScriptObjectMirror) option;
        return som.hasMember(prop) ? som.getMember(prop).toString() : defaultValue;
    }
}
