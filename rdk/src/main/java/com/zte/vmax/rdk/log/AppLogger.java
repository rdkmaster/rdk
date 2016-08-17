package com.zte.vmax.rdk.log;

import org.apache.log4j.*;
import org.apache.log4j.spi.LoggerFactory;

/**
 * Created by 10045812 on 16-5-7.
 * app范围唯一的类所使用的日志都是这个类的实例
 */
public class AppLogger extends Logger {
    static String FQCN = AppLogger.class.getName() + ".";

    private static final LoggerFactory loggerFactory = new LoggerFactory() {
        public Logger makeNewLoggerInstance(String className) {
            return new AppLogger(className);
        }
    };

    public AppLogger(String name) {
        super(name);
    }

    public static AppLogger getLogger(String name, String appName) {
        return LogHelper.getAppLogger(name, appName, loggerFactory);
    }

    public void crit(Object message) {
        super.log(FQCN, RDKLogLevel.CRIT, message, null);
    }

    public void warn(Object message) {
        super.log(FQCN, RDKLogLevel.WARN, message, null);
    }
}
