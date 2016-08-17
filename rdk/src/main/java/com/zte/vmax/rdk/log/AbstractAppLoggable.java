package com.zte.vmax.rdk.log;

import com.zte.vmax.rdk.log.AppLogger;

/**
 * Created by 10045812 on 16-5-7.
 */
public abstract class AbstractAppLoggable {
    protected String appName = null;
    protected AppLogger logger = null;

    public void setAppName(String appName) {
        this.appName = appName;
        initLogger();
    }

    protected abstract void initLogger();
}
