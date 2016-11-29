package com.zte.vmax.rdk.jsr;

import com.zte.vmax.rdk.loader.RdkClassLoader;
import com.zte.vmax.rdk.log.AbstractAppLoggable;
import com.zte.vmax.rdk.log.AppLogger;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;

/**
 * Created by 00139520 on 16-4-13.
 */
public class JarHelper extends AbstractAppLoggable {

    protected void initLogger() {
        logger = AppLogger.getLogger("JarHelper", appName);
    }


    private void loadJars(String jar) {
        jar = FileHelper.fixPath(jar, appName);

        File file = new File(jar);
        if (!file.exists()) {
            logger.error(jar + ",this directory does not exist.");
            return;
        }

        File[] files;
        if (file.isDirectory()) {
            files = file.listFiles();
            if (files == null) {
                return;
            }
        } else {
            files = new File[1];
            files[0] = file;
        }

        for (File f : files) {
            if (f.isFile() && f.getAbsolutePath().toLowerCase().endsWith(".jar")) {
                try {
                    logger.debug("loading: " + f);
                    RdkClassLoader.addURL(f.toURI().toURL());
                } catch (MalformedURLException e) {
                    logger.error(e);
                }
            }
        }

    }

    public Class<?> loadClass(String jar, String className) {
        loadJars(jar);
        try {
           return RdkClassLoader.loadClass(className);
        } catch (Exception e) {
            logger.error("loadClass error: ", e);
            return null;
        }
    }


}
