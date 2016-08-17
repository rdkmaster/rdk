package com.zte.vmax.rdk.util;

import jdk.nashorn.api.scripting.ScriptObjectMirror;

import java.io.File;
import java.io.FileFilter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by 10045812 on 16-5-21.
 */
public class RegFileFilter implements FileFilter {
    private Pattern pattern;

    public RegFileFilter(Object pattern) {
        if (pattern instanceof String) {
            this.pattern = toPattern(pattern.toString());
        } else if (pattern instanceof ScriptObjectMirror) {
            this.pattern = toPattern((ScriptObjectMirror)pattern);
        }
    }

    private Pattern toPattern(String pattern) {
        Pattern ptn = Pattern.compile(pattern);
        return ptn;
    }

    private Pattern toPattern(ScriptObjectMirror pattern) {
        String src = pattern.getMember("source").toString();
        int flag = 0;
        flag |= (Boolean)pattern.getMember("ignoreCase") ? Pattern.CASE_INSENSITIVE : 0;
        flag |= (Boolean)pattern.getMember("multiline") ? Pattern.MULTILINE : 0;
        Pattern ptn = Pattern.compile(src, flag);
        return ptn;
    }

    @Override
    public boolean accept(File pathname) {
        Matcher m = pattern.matcher(pathname.toString());
        return m.find();
    }
}
