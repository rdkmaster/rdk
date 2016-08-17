package com.zte.vmax.rdk.jsr;

import com.zte.vmax.rdk.log.AbstractAppLoggable;
import com.zte.vmax.rdk.log.AppLogger;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.lang.Exception;
import java.util.ArrayList;

/**
 * Created by 00139520 on 16-4-13.
 * 
 */
public class JarHelper extends AbstractAppLoggable {

    protected void initLogger() {
        logger = AppLogger.getLogger("JarHelper", appName);
    }

    private URLClassLoader loadJars(String jar) {
		jar = FileHelper.fixPath(jar, appName);

        File file = new File(jar);
        if (!file.exists()) {
            logger.error(jar + ",this directory does not exist.");
            return null;
        }

        File[] files;
        if (file.isDirectory()) {
            files = file.listFiles();
            if (files == null) {
                return null;
            }
        } else {
            files = new File[1];
            files[0] = file;
        }
        ArrayList<URL> urls = new ArrayList<>();
        for (File f : files) {
            if (f.isFile() && f.getAbsolutePath().toLowerCase().endsWith(".jar")) {
                try {
                    logger.debug("loading: " + f);
                    urls.add(f.toURI().toURL());
                } catch (MalformedURLException e) {
                    logger.error(e);
                }
            }
        }

        URL[] aUrls = new URL[urls.size()];
        urls.toArray(aUrls);
        return new URLClassLoader(aUrls, Thread.currentThread().getContextClassLoader());
    }

    public Class<?> loadClass(String jar, String className) {
        URLClassLoader urlLoader = loadJars(jar);
        if (urlLoader == null) {
            logger.error("invalid jar or jar path: " + jar);
            return null;
        }

        Class<?> clazz = null;
        try {
            clazz = urlLoader.loadClass(className);
        } catch (Exception e) {
            logger.error("loadClass error: ", e);
        }
        try {
            urlLoader.close();
        } catch (IOException e) {
            logger.warn("close urlLoader error: ", e);
        }
        return clazz;
    }


}
