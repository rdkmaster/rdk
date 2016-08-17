package com.zte.vmax.rdk.log;


import org.apache.log4j.*;
import org.apache.log4j.spi.LoggerFactory;

import java.io.IOException;

/**
 * Created by 10045812 on 16-5-7.
 * 这类日志只会把日志记录到rdk的统一日志文件中
 */
public class GlobalLogger extends Logger {
    static String FQCN = GlobalLogger.class.getName() + ".";

    public static final LoggerFactory loggerFactory = new LoggerFactory() {
        public Logger makeNewLoggerInstance(String className) {
            return new GlobalLogger(className);
        }
    };

    public GlobalLogger(String name) {
        super(name);
    }

    public static GlobalLogger getLogger(String name) {
        return LogHelper.getGlobalLogger(name, loggerFactory);
    }

    public void crit(Object message) {
        super.log(FQCN, RDKLogLevel.CRIT, message, null);
    }

    public void warn(Object message) {
        super.log(FQCN, RDKLogLevel.WARN, message, null);
    }
}
