package com.zte.vmax.rdk.jsr;

import com.zte.vmax.rdk.actor.Messages;
import com.zte.vmax.rdk.log.AbstractAppLoggable;
import com.zte.vmax.rdk.log.AppLogger;
import com.zte.vmax.rdk.config.Config;
import com.zte.vmax.rdk.util.RdkUtil;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.internal.runtime.Undefined;
import scala.Array;

import javax.net.ssl.*;
import java.io.*;
import java.net.*;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import scala.collection.JavaConversions.*;

/**
 * Created by 10045812 on 16-6-27.
 */
public class RestHelper extends AbstractAppLoggable {
    private Array<Messages.Header> originHeaders;

    public void setOriginHeader(Array<Messages.Header> originHeader) {
        this.originHeaders = originHeader;
    }

    private static class TrustAnyHostnameVerifier implements HostnameVerifier {
        public boolean verify(String hostname, SSLSession session) {
            return true;
        }
    }

    private static class TrustAnyTrustManager implements X509TrustManager {

        public void checkClientTrusted(X509Certificate[] chain, String authType)
                throws CertificateException {
        }

        public void checkServerTrusted(X509Certificate[] chain, String authType)
                throws CertificateException {
        }

        public X509Certificate[] getAcceptedIssuers() {
            return new X509Certificate[]{};
        }
    }

    protected void initLogger() {
        logger = AppLogger.getLogger("RestHelper", appName);
    }

    private class RestError {
        private String rdkRestError;

        RestError(String rdkRestError) {
            this.rdkRestError = rdkRestError;
        }
    }

    private static Pattern URL_PTN = Pattern.compile("^https?://.+", Pattern.CASE_INSENSITIVE);

    public String get(String url, Object option, boolean ifErrorInfo) {
        return commonRest(url, null, option, "GET", ifErrorInfo);
    }

    public String post(String url, String param, Object option, boolean ifErrorInfo) {
        return commonRest(url, param, option, "POST", ifErrorInfo);
    }

    public String delete(String url, String param, Object option, boolean ifErrorInfo) {
        return commonRest(url, param, option, "DELETE", ifErrorInfo);
    }

    public String put(String url, String param, Object option, boolean ifErrorInfo) {
        return commonRest(url, param, option, "PUT", ifErrorInfo);
    }

    private String fixUrl(String url) {
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
        return url;
    }

    private Object readBytesFromConn(URLConnection connection, boolean ifErrorInfo) {
        //读取请求返回值
        InputStream inStream = null;
        ByteArrayOutputStream baos = null;
        try {
            inStream = connection.getInputStream();
            byte[] buff = new byte[1024 * 4];  //每次读4KB
            baos = new ByteArrayOutputStream();
            int len = -1;
            while ((len = inStream.read(buff)) != -1) {
                baos.write(buff, 0, len);
            }
        } catch (IOException e) {
            logger.error("get input stream or read data error:", e);
            return ifErrorInfo ? RdkUtil.toJsonString(new RestError(e.toString())) : null;
        } finally {
            try {
                if (baos != null) {
                    baos.close();
                }
            } catch (IOException e) {
                logger.error("ByteArrayOutputStream close error:", e);
            }
            try {
                if (inStream != null) {
                    inStream.close();
                }
            } catch (IOException e) {
                logger.error("inStream close error:", e);
            }
        }
        return baos.toByteArray();
    }

    private String commonRest(String url, String param, Object option, String method, boolean ifErrorInfo) {
        url = fixUrl(url);
        logger.debug("requesting(" + method + ") url=" + url);

        //需要请求的restful地址
        URL oUrl = null;
        try {
            oUrl = new URL(url);
        } catch (MalformedURLException e) {
            logger.error("Malformed URL", e);
            return ifErrorInfo ? RdkUtil.toJsonString(new RestError(e.toString())) : null;
        }

        //打开restful链接
        URLConnection conn = null;

        try {
            if (url.toLowerCase().startsWith("https")) {
                conn = oUrl.openConnection();
                SSLContext sc = SSLContext.getInstance("SSL");
                sc.init(null, new TrustManager[]{new TrustAnyTrustManager()},
                        new java.security.SecureRandom());
                ((HttpsURLConnection) conn).setSSLSocketFactory(sc.getSocketFactory());
                ((HttpsURLConnection) conn).setHostnameVerifier(new TrustAnyHostnameVerifier());
                conn.setDoOutput(true);
                ((HttpsURLConnection) conn).setRequestMethod(method);
            } else {
                conn = oUrl.openConnection();
                ((HttpURLConnection) conn).setRequestMethod(method);
            }
        } catch (ProtocolException e) {
            logger.error("Invalid protocol", e);
            return ifErrorInfo ? RdkUtil.toJsonString(new RestError(e.toString())) : null;
        } catch (IOException e) {
            logger.error("can not open connection", e);
            return ifErrorInfo ? RdkUtil.toJsonString(new RestError(e.toString())) : null;
        } catch (NoSuchAlgorithmException e) {
            logger.error("SSL algorithm missing error!", e);
            return ifErrorInfo ? RdkUtil.toJsonString(new RestError(e.toString())) : null;
        } catch (KeyManagementException e) {
            logger.error("key Management error!", e);
            return ifErrorInfo ? RdkUtil.toJsonString(new RestError(e.toString())) : null;
        }

        setRequestProperties(conn, option);

        setRequestHeaders(conn);

        int connTimeout = Integer.parseInt(getProperty(option, "connectTimeout", "60000"));
        conn.setConnectTimeout(connTimeout);
        int readTimeout = Integer.parseInt(getProperty(option, "readTimeout", "120000"));
        conn.setReadTimeout(readTimeout);

        if (!method.equals("GET")) {
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
                logger.error("write queryString error", e);
                return ifErrorInfo ? RdkUtil.toJsonString(new RestError(e.toString())) : null;
            } finally {
                if (out != null) {
                    out.close();
                }
            }

        }
        Object res = readBytesFromConn(conn, ifErrorInfo);
        byte[] bytes = null;
        if (res == null || res instanceof String) {
            return (String) res;
        } else {
            bytes = (byte[]) res;
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

    private void setRequestHeaders(URLConnection conn) {
        for (int i = 0; i < this.originHeaders.length(); i++) {
            Messages.Header header = this.originHeaders.apply(i);
            conn.setRequestProperty(header.key(), header.value());
        }
    }

    private void setRequestProperties(URLConnection conn, Object option) {
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