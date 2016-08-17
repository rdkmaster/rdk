
package com.zte.vmax.rdk.log;

import org.apache.log4j.Level;


public class RDKLogLevel extends Level {
    private static final long serialVersionUID = 2626753561969426769L;

    static public final int CRIT_INT = Level.FATAL_INT + 1;
    private static String CRIT_STR = "CRIT";
    public static final RDKLogLevel CRIT = new RDKLogLevel(CRIT_INT, CRIT_STR, 0);

    protected RDKLogLevel(int level, String strLevel, int syslogEquiv) {
        super(level, strLevel, syslogEquiv);
    }

    public static Level toLevel(String sArg) {
        return (Level) toLevel(sArg, Level.DEBUG);
    }

    public static Level toLevel(String sArg, Level defaultValue) {
        if(sArg == null || sArg.length() == 0) {
            return defaultValue;
        }

        if (sArg.equalsIgnoreCase(CRIT_STR)) {
            return RDKLogLevel.CRIT;
        } else {
            return Level.toLevel(sArg, (Level) defaultValue);
        }
    }

    public static Level toLevel(int i) throws IllegalArgumentException {
        switch(i) {
            case CRIT_INT: return RDKLogLevel.CRIT;
            default: return Level.toLevel(i);
        }
    }
}
  
