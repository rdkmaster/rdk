package com.zte.vmax.rdk.log;


import org.apache.log4j.*;
import org.apache.log4j.spi.LoggerFactory;

/**
 * Created by 10045812 on 16-5-7.
 * Javascript中使用的日志都是用这个类的实例
 */
public class JSLogger extends Logger {
    static String FQCN = JSLogger.class.getName() + ".";

    private static final LoggerFactory loggerFactory = new LoggerFactory() {
        public Logger makeNewLoggerInstance(String className) {
            return new JSLogger(className);
        }
    };

    public JSLogger(String name) {
        super(name);
    }

    public static JSLogger getLogger(String appName) {
        return LogHelper.geJSLogger("JavaScript", appName, loggerFactory);
    }

    public void crit(Object message) {
        super.log(FQCN, RDKLogLevel.CRIT, message, null);
    }

    public void warn(Object message) {
        super.log(FQCN, RDKLogLevel.WARN, message, null);
    }
}
