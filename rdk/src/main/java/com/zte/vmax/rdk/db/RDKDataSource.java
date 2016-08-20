package com.zte.vmax.rdk.db;

import com.zte.vmax.rdk.config.Config;
import com.zte.vmax.rdk.log.GlobalLogger;
import org.apache.tomcat.dbcp.dbcp.BasicDataSource;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * Created by 10045812 on 16-5-16.
 * 作为标准sql和vmax 统一jdbc的过渡功能
 */
public class RDKDataSource {
    private static final GlobalLogger logger = GlobalLogger.getLogger("RDKDataSource");
    private static BasicDataSource dataSource = createDataSource();

    public static Connection getConnection() {
        try {
            return dataSource.getConnection();
        } catch (SQLException e) {
            logger.error("get connection failed!", e);
            return null;
        }
    }

    private static BasicDataSource createDataSource() {
        BasicDataSource bs = new BasicDataSource();

        bs.setDriverClassName("com.gbase.jdbc.Driver");
        bs.setUrl(getGbaseUrl());

        // 获取连接最大等待时长（ms）
        bs.setMaxWait(Config.getInt("database.pool.maxWait", 6000));
        // 数据库初始化时，创建的连接个数
        bs.setInitialSize(Config.getInt("database.pool.initialSize", 10));
        // 最大活跃连接数
        bs.setMaxActive(Config.getInt("database.pool.maxTotal", 100));
        // 最小空闲连接数
        bs.setMinIdle(Config.getInt("database.pool.minIdle", 10));
        // 数据库最大空闲连接数
        bs.setMaxIdle(Config.getInt("database.pool.maxIdle", 50));
        // 空闲连接60秒中后释放
        bs.setMinEvictableIdleTimeMillis(Config.getInt("database.pool.minEvictableIdleTimeMillis", 60000));
        // 在获取连接的时候检查有效性, 默认false
        bs.setTestOnBorrow(Config.getBool("database.pool.testOnBorrow", true));
        //回收泄露连接
        bs.setRemoveAbandoned(Config.getBool("database.pool.removeAbandoned", true));
        //回收泄露连接时长
        bs.setRemoveAbandonedTimeout(Config.getInt("database.pool.removeAbandonedTimeout", 300));//300 seconds

        bs.setLogAbandoned(true);

        return bs;
    }

    private static String getGbaseUrl() {
        String hostList = getConfValue("database.gbase.hostList", true);
        String databaseName = getConfValue("database.gbase.databaseName", true);
        String user = getConfValue("database.gbase.user", false);
        String password = getConfValue("database.gbase.password", false);
        String failoverEnable = getConfValue("database.gbase.failoverEnable", false);
        String gclusterId = getConfValue("database.gbase.gclusterId", false);
        String port = getConfValue("database.gbase.port", false);

        String[] hosts = hostList.split(",");
        String url = "jdbc:gbase://" + hosts[0];
        if (port.length() == 0) {
            port = "5258";
        }
        url += ":" + port + "/";
        url += databaseName + "?";
        if (user.length() > 0) {
            url += "user=" + user + "&";
        }
        if (password.length() > 0) {
            url += "password=" + password + "&";
        }
        if (gclusterId.length() > 0) {
            url += "gclusterId=" + gclusterId + "&";
        }
        url += "failoverEnable=" + failoverEnable + "&";
        url += "hostList=" + hostList;

        logger.crit("gbase url: " + url);
        return url;
    }

    private static String getConfValue(String key, boolean need) {
        String value = Config.get(key, "");
        if (value.length() == 0 && need) {
            logger.fatal("invalid gbase config, \"" + key + "\" is needed!");
        }
        return value;
    }
}