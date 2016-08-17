package com.zte.vmax.rdk.log;

import com.zte.vmax.rdk.config.Config;
import org.apache.log4j.*;
import org.apache.log4j.spi.LoggerFactory;



import java.io.IOException;
import java.util.HashMap;

/**
 * Created by 10045812 on 16-5-9.
 */
public class LogHelper {


    private static Logger logger = getSimpleLogger("LogHelper");

    private static RollingFileAppender createRollingFileAppender(Layout layout,
                                                                 String file,
                                                                 int maxBackupIndex,
                                                                 String maxFileSize)
    {
        RollingFileAppender rfa = null;
        try {
            rfa = new RollingFileAppender(layout, file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (rfa != null) {
            rfa.setMaxBackupIndex(maxBackupIndex);
            rfa.setMaxFileSize(maxFileSize);
        }
        return rfa;
    }

    private static RollingFileAppender createRollingFileAppender(Layout layout, String file) {
        int idx = Config.getInt("log.RollingFile.MaxBackupIndex", 5);
        String fileSize = Config.get("log.RollingFile.MaxFileSize", "10000000");
        return createRollingFileAppender(layout, file, idx, fileSize);
    }

    private static void initGlobalLogger(Logger logger) {
        Layout layout = new PatternLayout(Config.get("log.pattern", "%d %p [%c] - %m%n"));

        try {
            logger.addAppender(new ConsoleAppender(layout, ConsoleAppender.SYSTEM_OUT));
        } catch (Exception e) {
            e.printStackTrace();
        }
        RollingFileAppender rfa = createRollingFileAppender(layout, "/proc/logs/log.txt");
        if (rfa != null) {
            logger.addAppender(rfa);
        }

        logger.setLevel(RDKLogLevel.toLevel(Config.get("log.level", "debug")));
    }

    private static void initAppLogger(Logger logger, String appName, String pattern) {
        Layout layout = new PatternLayout(pattern);

        logger.addAppender(new ConsoleAppender(layout, ConsoleAppender.SYSTEM_OUT));

        RollingFileAppender rfa = createRollingFileAppender(layout, "/proc/logs/log.txt");
        if (rfa != null) {
            logger.addAppender(rfa);
        }

        rfa = createRollingFileAppender(layout, "app/" + appName + "/server/logs/log.txt");
        if (rfa != null) {
            logger.addAppender(rfa);
        }

        String level = Config.get("log." + appName + ".level", Config.get("log.level", "debug"));
        logger.setLevel(RDKLogLevel.toLevel(level));
    }

    private static final byte[] lock  = new byte[0];
    private static final HashMap<String, Logger> loggers = new HashMap<>();

    private static Logger getLogger(String className, String scope, LoggerFactory loggerFactory) {
        String name = className + "@" + scope;
        Logger lg;

            lg = loggers.get(name);
            if (lg == null) {
                synchronized (lock) {
                logger.debug("creating logger, name=" + name +
                        ", type=" + loggerFactory.getClass().getName());
                lg = Logger.getLogger(name, loggerFactory);
                if (lg instanceof GlobalLogger) {
                    initGlobalLogger(lg);
                } else if(lg instanceof AppLogger) {
                    String ptn = Config.get("log.pattern", "%d %p [%c] - %m%n");
                    initAppLogger(lg, scope, ptn);
                } else if (lg instanceof JSLogger) {
                    String ptn = Config.get("log.app.pattern", "%d %p %m%n");
                    initAppLogger(lg, scope, ptn);
                } else {
                    logger.error("unsupported logger type: " + loggerFactory.getClass().getName());
                }
                loggers.put(name, lg);
            }
       }
        return lg;
    }

    public static GlobalLogger getGlobalLogger(String className, LoggerFactory loggerFactory) {
        return (GlobalLogger) getLogger(className, "Global", loggerFactory);
    }

    public static AppLogger getAppLogger(String className, String appName, LoggerFactory loggerFactory) {
        return (AppLogger) getLogger(className, appName, loggerFactory);
    }

    public static JSLogger geJSLogger(String className, String appName, LoggerFactory loggerFactory) {
        return (JSLogger) getLogger(className, appName, loggerFactory);
    }

    public static GlobalLogger getSimpleLogger(String name) {
        GlobalLogger gl = (GlobalLogger) Logger.getLogger(name + "@Global", GlobalLogger.loggerFactory);
        Layout layout = new PatternLayout("%d %p [%c] - %m%n");
        gl.addAppender(new ConsoleAppender(layout, ConsoleAppender.SYSTEM_OUT));
        RollingFileAppender rfa = createRollingFileAppender(layout, "proc/logs/log.txt", 5, "10000000");
        if (rfa != null) {
            gl.addAppender(rfa);
        }
        return gl;
    }
}
